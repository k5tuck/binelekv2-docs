# Backend Implementation Prompt

Use this prompt when starting a new Claude Code session to implement the backend features.

---

## Initial Setup

**IMPORTANT:** Before starting work, clone the repo and initialize submodules:

```bash
# Clone the repository
git clone https://github.com/k5tuck/binelekv2-smb-platform-backend.git
cd binelekv2-smb-platform-backend

# Initialize and pull the docs submodule
git submodule update --init --recursive

# Verify docs are present
ls docs/  # Should show ARCHITECTURE.md, prompts/, etc.

# If docs submodule is empty, manually pull:
cd docs && git pull origin main && cd ..
```

---

## Context

You are working on the **SMB AI Command Platform** backend repository: `binelekv2-smb-platform-backend`

This is a multi-service architecture with:
- **Gateway** (Node.js/Fastify) - `/gateway/`
- **AI Orchestrator** (Python/FastAPI) - `/services/ai-orchestrator/`
- **Connectors** (Python/FastAPI) - `/services/connectors/`
- **MCP Server** (Node.js/TypeScript) - `/mcp-server/` - Model Context Protocol server
- **Marketplace Scraper** (Python/FastAPI) - NEW, to be created at `/services/marketplace-scraper/`

**Reference:** See `docs/ARCHITECTURE.md` for full system architecture.

---

## Current Implementation Status

**IMPLEMENTED (exists but needs completion):**
- SQLAlchemy ORM models for all entities
- Service layer structure (TaskService, DashboardService, SecurityService, MarketplaceService, LLMService)
- LLM API routes with multi-provider support
- Connector Pydantic schemas
- Database schema and seed data
- MCP Server structure

**NOT IMPLEMENTED (only in docs/planned):**
- Real authentication (auth.ts is all placeholders)
- Module route implementations (all return mock data)
- Connector OAuth flows (TODOs in code)
- Workflow execution engine (placeholder)
- Marketplace scraper service (doesn't exist)
- Competitor discovery (doesn't exist)
- Price tracking automation (doesn't exist)

---

## Implementation Tasks

### Priority 1: Real Authentication Implementation

**Location:** `gateway/src/services/auth.ts`

**Current State:** All methods return placeholder data with TODO comments.

**Tasks:**
1. Implement `login()` with:
   - Database user lookup using `postgres` package
   - Password verification with bcrypt (`await bcrypt.compare(password, user.password_hash)`)
   - Real JWT token generation with proper expiry (15min access, 7day refresh)
   - Refresh token storage in `refresh_tokens` table

2. Implement `register()` with:
   - Email uniqueness validation
   - Password hashing with bcrypt (`await bcrypt.hash(password, 12)`)
   - Tenant creation (if new org)
   - User creation with proper roles
   - Welcome email trigger (placeholder OK)

3. Implement `refreshToken()` with:
   - Validate refresh token from database
   - Check expiry
   - Generate new access token
   - Optionally rotate refresh token

4. Implement `logout()` with:
   - Invalidate refresh tokens for user
   - Clear session data

5. Implement `getCurrentUser()` with:
   - Database lookup by user ID
   - Include tenant and role information

**Files to create/modify:**
- `gateway/src/services/auth.ts` - Main implementation
- `gateway/src/services/database.ts` - NEW: Database connection pool
- `gateway/src/utils/jwt.ts` - NEW: JWT utilities
- `gateway/package.json` - Add: pg, bcrypt, @types/bcrypt

**Security Requirements:**
- Never store plain-text passwords
- JWT secret from environment variable (error if missing in production)
- Implement rate limiting on auth endpoints (10 req/min)
- Log all auth events to audit table

---

### Priority 2: Connect Module Routes to Python Services

**Location:** `gateway/src/routes/modules.ts`

**Current State:** All 16 endpoints return hardcoded mock objects.

**Tasks:**
1. Create proxy functions to forward requests to Python services:
   - Ops Copilot routes → AI Orchestrator service
   - Mini Foundry routes → AI Orchestrator service
   - Cybersecurity Scanner routes → AI Orchestrator service
   - Marketplace Intel routes → AI Orchestrator service + Marketplace Scraper

2. Implement proper error handling:
   - Service unavailable → 503 with retry-after
   - Timeout → 504
   - Validation errors → 400 with details

3. Add request transformation:
   - Inject tenant context
   - Map frontend field names to backend

**Files to modify:**
- `gateway/src/routes/modules.ts` - Replace mock data with proxy calls
- `gateway/src/routes/proxy.ts` - Add retry logic and circuit breaker

**New Endpoints to implement in AI Orchestrator:**
- `services/ai-orchestrator/app/routers/ops_copilot.py` - NEW
- `services/ai-orchestrator/app/routers/mini_foundry.py` - NEW
- `services/ai-orchestrator/app/routers/security.py` - NEW
- `services/ai-orchestrator/app/routers/marketplace.py` - NEW

---

### Priority 3: Implement Connector OAuth Flows

**Location:** `services/connectors/app/main.py`

**Current State:** Uses in-memory dictionary, OAuth functions have TODO comments.

**Tasks:**
1. Replace in-memory storage with PostgreSQL:
   - Use SQLAlchemy async with `connector_configs` and `oauth_tokens` tables
   - Encrypt sensitive data before storage

2. Implement OAuth authorization URL generation for each provider:
   ```python
   # Shopify
   f"https://{shop}.myshopify.com/admin/oauth/authorize?client_id={client_id}&scope={scopes}&redirect_uri={redirect}&state={state}"

   # Stripe
   f"https://connect.stripe.com/oauth/authorize?client_id={client_id}&scope=read_write&redirect_uri={redirect}&state={state}"

   # HubSpot
   f"https://app.hubspot.com/oauth/authorize?client_id={client_id}&scope={scopes}&redirect_uri={redirect}&state={state}"
   ```

3. Implement token exchange for each provider:
   - POST to provider's token endpoint
   - Store access_token, refresh_token, expires_at
   - Handle token refresh automatically

4. Implement data sync for top 3 connectors:
   - **Shopify**: Products, Orders, Customers
   - **Stripe**: Customers, Charges, Subscriptions
   - **HubSpot**: Contacts, Companies, Deals

**Files to create/modify:**
- `services/connectors/app/main.py` - Core implementation
- `services/connectors/app/providers/shopify.py` - NEW
- `services/connectors/app/providers/stripe.py` - NEW
- `services/connectors/app/providers/hubspot.py` - NEW
- `services/connectors/app/database.py` - NEW: DB connection

**Environment Variables Required:**
```
SHOPIFY_CLIENT_ID=
SHOPIFY_CLIENT_SECRET=
STRIPE_CLIENT_ID=
STRIPE_CLIENT_SECRET=
HUBSPOT_CLIENT_ID=
HUBSPOT_CLIENT_SECRET=
ENCRYPTION_KEY=  # For Fernet encryption
```

---

### Priority 4: Implement Workflow Execution Engine

**Location:** `services/ai-orchestrator/app/services/task_service.py`

**Current State:** `run_workflow()` is a placeholder (line 208).

**Tasks:**
1. Create workflow executor that processes step definitions:
   ```python
   # Step types to support:
   - "send_email" - Send email via configured provider
   - "create_task" - Create new task
   - "update_record" - Update database record
   - "call_api" - Make external API call
   - "llm_query" - Run LLM query
   - "conditional" - Branch based on condition
   - "delay" - Wait for specified time
   ```

2. Implement trigger handlers:
   - `manual` - Direct API call
   - `schedule` - Cron-based execution (use APScheduler)
   - `event` - Event-driven (new task created, connector sync, etc.)

3. Add execution logging:
   - Create `workflow_executions` table
   - Track step-by-step progress
   - Store errors for debugging

**Files to create/modify:**
- `services/ai-orchestrator/app/services/task_service.py` - Update run_workflow
- `services/ai-orchestrator/app/services/workflow_executor.py` - NEW
- `services/ai-orchestrator/app/services/step_handlers.py` - NEW
- `services/ai-orchestrator/app/models/workflow_execution.py` - NEW

---

### Priority 5: Create Marketplace Scraper Service

**Location:** NEW service at `/services/marketplace-scraper/`

**Tasks:**
1. Create new FastAPI service structure:
   ```
   services/marketplace-scraper/
   ├── app/
   │   ├── __init__.py
   │   ├── main.py
   │   ├── config.py
   │   ├── routers/
   │   │   ├── scraper.py      # Manual scrape endpoints
   │   │   └── discovery.py    # Competitor discovery
   │   ├── services/
   │   │   ├── price_tracker.py
   │   │   ├── competitor_finder.py
   │   │   └── scheduler.py
   │   └── scrapers/
   │       ├── amazon.py
   │       ├── ebay.py
   │       └── shopify_store.py
   ├── Dockerfile
   └── requirements.txt
   ```

2. Implement price scraping with Playwright:
   ```python
   from playwright.async_api import async_playwright

   async def scrape_amazon_price(asin: str) -> dict:
       async with async_playwright() as p:
           browser = await p.chromium.launch()
           page = await browser.new_page()
           await page.goto(f"https://amazon.com/dp/{asin}")
           price = await page.query_selector("#priceblock_ourprice")
           # Extract and return price
   ```

3. Implement APScheduler for automated scraping:
   ```python
   from apscheduler.schedulers.asyncio import AsyncIOScheduler
   from apscheduler.triggers.cron import CronTrigger

   scheduler = AsyncIOScheduler()
   scheduler.add_job(
       scrape_all_tracked_products,
       CronTrigger(hour=6),  # Run at 6 AM daily
       id="daily_price_check"
   )
   ```

4. Implement competitor discovery:

   **Location-Based (using Google Places API):**
   ```python
   async def find_competitors_by_location(
       business_type: str,
       latitude: float,
       longitude: float,
       radius_miles: int = 10
   ) -> list[Competitor]:
       # Query Google Places API
       # Filter by business category
       # Return matched businesses
   ```

   **Similarity-Based:**
   ```python
   async def find_competitors_by_similarity(
       tenant_id: UUID,
       keywords: list[str],
       product_categories: list[str]
   ) -> list[Competitor]:
       # Use Qdrant vector search
       # Match by product embeddings
       # Score by business description similarity
   ```

5. Add to docker-compose.yml:
   ```yaml
   marketplace-scraper:
     build: ./services/marketplace-scraper
     ports:
       - "8004:8004"
     environment:
       - DATABASE_URL=${DATABASE_URL}
       - GOOGLE_PLACES_API_KEY=${GOOGLE_PLACES_API_KEY}
     depends_on:
       - postgres
       - redis
   ```

**Requirements.txt:**
```
fastapi==0.109.0
uvicorn==0.27.0
playwright==1.41.0
apscheduler==3.10.4
sqlalchemy[asyncio]==2.0.25
asyncpg==0.29.0
google-cloud-places==1.0.0
httpx==0.26.0
```

---

### Priority 6: Security Hardening

**Tasks:**
1. Remove hardcoded secrets:
   - `gateway/src/config.ts` - JWT_SECRET must be from env
   - Add validation at startup: throw if secrets missing in production

2. Fix CORS:
   - Replace `allow_origins=["*"]` with specific origins
   - Load from environment variable

3. Add rate limiting:
   - Use `@fastify/rate-limit` for gateway
   - Configure per-endpoint limits

4. Implement request signing for service-to-service:
   - HMAC signature on internal requests
   - Verify signature in Python services

---

## Testing Requirements

For each implementation:
1. Unit tests with pytest (Python) or Jest (Node.js)
2. Integration tests for API endpoints
3. Manual testing checklist

---

## Commit Strategy

Make atomic commits for each major feature:
1. `feat(auth): Implement real authentication with bcrypt and JWT`
2. `feat(modules): Connect module routes to Python services`
3. `feat(connectors): Implement OAuth flows for Shopify, Stripe, HubSpot`
4. `feat(workflow): Implement workflow execution engine`
5. `feat(scraper): Add marketplace scraper service with price tracking`
6. `feat(discovery): Add competitor discovery by location and similarity`
7. `fix(security): Remove hardcoded secrets and fix CORS`

---

## Verification Checklist

After implementation, verify:
- [ ] Login/register flow works end-to-end
- [ ] Protected routes require valid JWT
- [ ] Token refresh works correctly
- [ ] Module endpoints return real data from Python services
- [ ] At least one connector (Shopify) OAuth flow works
- [ ] Workflow can be created and executed
- [ ] Price scraper fetches real prices
- [ ] Competitor discovery returns relevant results
- [ ] No secrets in codebase
- [ ] CORS properly configured
