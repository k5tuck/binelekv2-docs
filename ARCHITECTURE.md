# SMB AI Command Platform - Master Architecture Document

## Executive Summary

The SMB AI Command Platform is an AI-powered business operations platform designed for small and medium businesses. It provides intelligent automation, data analytics, security monitoring, and competitive intelligence through a modular architecture.

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React/TypeScript PWA)                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ Ops Copilot │ │Mini Foundry │ │  Security   │ │ Marketplace │            │
│  │   Module    │ │   Module    │ │   Scanner   │ │    Intel    │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (Node.js/Fastify)                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │     Auth     │ │   Routing    │ │ Rate Limit   │ │    Tenant    │        │
│  │  Middleware  │ │    Proxy     │ │  Middleware  │ │   Context    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│    AI ORCHESTRATOR    │ │    CONNECTORS     │ │   MARKETPLACE     │
│   (Python/FastAPI)    │ │  (Python/FastAPI) │ │    SCRAPER        │
│                       │ │                   │ │  (Python/FastAPI) │
│ - LLM Query Engine    │ │ - OAuth Manager   │ │                   │
│ - Agent Framework     │ │ - Data Sync       │ │ - Price Tracker   │
│ - Tool Executor       │ │ - Transformers    │ │ - Competitor      │
│ - Workflow Engine     │ │                   │ │   Discovery       │
└───────────────────────┘ └───────────────────┘ └───────────────────┘
                    │                 │                 │
                    └─────────────────┴─────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │  PostgreSQL  │ │    Redis     │ │    Kafka     │ │    Qdrant    │        │
│  │   Primary    │ │    Cache     │ │   Events     │ │   Vectors    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Repositories

| Repository | Purpose | Tech Stack |
|------------|---------|------------|
| `binelekv2-smb-platform-backend` | API Gateway + Python Services | Node.js/Fastify, Python/FastAPI |
| `binelekv2-smb-platform-frontend` | Web Application | React, TypeScript, TailwindCSS |
| `binelekv2-docs` | Documentation (submodule) | Markdown, Docusaurus |

---

## Modules

### 1. Ops Copilot
**Purpose:** AI-powered task management and workflow automation

**Features:**
- Task CRUD with AI suggestions
- Workflow automation engine
- Email/calendar integration
- Priority-based task scheduling

**Database Tables:**
- `tasks` - Task records with status, priority, due dates
- `workflows` - Automation definitions with triggers and steps

**Key Endpoints:**
```
GET/POST /api/modules/ops-copilot/tasks
POST /api/modules/ops-copilot/workflows
POST /api/modules/ops-copilot/automations
```

### 2. Mini Foundry
**Purpose:** Business intelligence and custom dashboards

**Features:**
- Drag-and-drop dashboard builder
- Data source connections
- Custom metrics and KPIs
- Natural language querying

**Database Tables:**
- `dashboards` - Dashboard configurations
- `data_sources` - Connected data sources
- `widgets` - Dashboard widget definitions

**Key Endpoints:**
```
GET/POST /api/modules/mini-foundry/dashboards
GET /api/modules/mini-foundry/insights
POST /api/modules/mini-foundry/query
```

### 3. Cybersecurity Scanner
**Purpose:** Security posture monitoring and compliance

**Features:**
- Security posture scoring
- Vulnerability scanning
- Device inventory
- Compliance reporting (SOC2, GDPR, HIPAA)

**Database Tables:**
- `security_issues` - Detected vulnerabilities
- `security_devices` - Device inventory

**Key Endpoints:**
```
GET /api/modules/cybersecurity-scanner/posture
GET /api/modules/cybersecurity-scanner/compliance
GET /api/modules/cybersecurity-scanner/alerts
GET /api/modules/cybersecurity-scanner/devices
```

### 4. Marketplace Intel
**Purpose:** Competitive intelligence and price tracking

**Features:**
- Competitor monitoring
- Product price tracking
- Market trend analysis
- Competitor discovery (location/similarity based)

**Database Tables:**
- `competitors` - Competitor profiles
- `tracked_products` - Products being monitored with price history

**Key Endpoints:**
```
GET/POST /api/modules/marketplace-intel/competitors
GET /api/modules/marketplace-intel/pricing
GET /api/modules/marketplace-intel/trends
GET/POST /api/modules/marketplace-intel/products
POST /api/modules/marketplace-intel/discover
```

---

## Service Architecture

### API Gateway (Node.js/Fastify)
**Location:** `/gateway/`

**Responsibilities:**
- JWT authentication and authorization
- Request routing to Python services
- Rate limiting
- Tenant context injection
- CORS handling

**Key Files:**
- `src/routes/auth.ts` - Authentication endpoints
- `src/routes/modules.ts` - Module-specific routing
- `src/routes/proxy.ts` - Service proxy
- `src/services/auth.ts` - Auth business logic
- `src/middleware/tenant.ts` - Multi-tenant context

### AI Orchestrator (Python/FastAPI)
**Location:** `/services/ai-orchestrator/`

**Responsibilities:**
- LLM query processing (OpenAI, Anthropic, Google, Ollama)
- Agent framework for complex tasks
- Tool execution coordination
- Workflow engine

**Key Files:**
- `app/routers/query.py` - LLM query endpoints
- `app/routers/llm.py` - LLM configuration
- `app/services/query_service.py` - Multi-provider LLM
- `app/services/orchestrator.py` - Agent orchestration
- `app/services/task_service.py` - Task/workflow management

### Connectors Service (Python/FastAPI)
**Location:** `/services/connectors/`

**Responsibilities:**
- OAuth flow management
- Data synchronization from external services
- Credential encryption and storage
- Data transformation

**Supported Connectors:**
| Category | Connectors |
|----------|------------|
| Commerce | Shopify, Stripe, Square |
| CRM | HubSpot, Zoho |
| Finance | QuickBooks, Xero |
| Email | Gmail, Outlook |

**Key Files:**
- `app/main.py` - Connector endpoints
- `app/schemas/` - Pydantic schemas for each connector

### Marketplace Scraper Service (Python/FastAPI)
**Location:** `/services/marketplace-scraper/`

**Responsibilities:**
- Automated price fetching from marketplaces
- Competitor discovery
- Scheduled data collection
- Rate-limited scraping

---

## Data Models

### Core Entities

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Tenant    │───────│    User     │───────│   Task      │
│             │       │             │       │             │
│ - id        │       │ - id        │       │ - id        │
│ - name      │       │ - email     │       │ - title     │
│ - plan      │       │ - tenant_id │       │ - status    │
│ - modules   │       │ - roles     │       │ - priority  │
└─────────────┘       └─────────────┘       └─────────────┘
      │                     │
      │                     │
      ▼                     ▼
┌─────────────┐       ┌─────────────┐
│ Connector   │       │  Workflow   │
│             │       │             │
│ - type      │       │ - trigger   │
│ - config    │       │ - steps     │
│ - oauth     │       │ - is_active │
└─────────────┘       └─────────────┘
```

### SQLAlchemy Models
**Location:** `/services/ai-orchestrator/app/models/`

| Model | Table | Purpose |
|-------|-------|---------|
| User | users | User accounts |
| Tenant | tenants | Multi-tenant orgs |
| Task | tasks | Ops Copilot tasks |
| Workflow | workflows | Automation definitions |
| Dashboard | dashboards | Mini Foundry dashboards |
| Competitor | competitors | Marketplace competitors |
| TrackedProduct | tracked_products | Price-tracked products |
| SecurityIssue | security_issues | Security vulnerabilities |
| LLMApiKey | llm_api_keys | Encrypted API keys |
| ConnectorConfig | connector_configs | Connector settings |

---

## Authentication & Authorization

### JWT Token Flow
```
1. User logs in → POST /api/auth/login
2. Server validates credentials → Returns access_token + refresh_token
3. Client stores tokens → localStorage/secure cookie
4. Client sends requests → Authorization: Bearer <access_token>
5. Token expires → Client calls POST /api/auth/refresh
6. Server validates refresh_token → Returns new access_token
```

### Token Refresh (Frontend)
The frontend API client (`src/services/api.ts`) implements automatic token refresh:
- Intercepts 401 responses
- Calls refresh endpoint
- Retries original request
- Deduplicates concurrent refresh requests

### Multi-Tenancy
- Every request includes `X-Tenant-ID` header
- Middleware validates tenant access
- All database queries filter by `tenant_id`
- Tenant isolation enforced at service layer

---

## Connector Integration

### OAuth Flow
```
1. User clicks "Connect" → GET /api/connectors/oauth/{type}/authorize
2. Redirect to provider OAuth page
3. User grants access
4. Provider redirects to callback → POST /api/connectors/oauth/{type}/callback
5. Exchange code for tokens
6. Store encrypted tokens in database
7. Begin initial data sync
```

### Data Sync
- Full sync on initial connection
- Incremental sync via webhooks or polling
- Data transformed to common schema
- Stored in PostgreSQL with tenant isolation

---

## Marketplace Intelligence

### Price Tracking System
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Scheduler     │────▶│   Scraper       │────▶│   Database      │
│   (APScheduler) │     │   (Playwright)  │     │   (PostgreSQL)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
   ┌─────────┐           ┌─────────────┐
   │  Cron   │           │  Rate Limit │
   │  Jobs   │           │   Queue     │
   └─────────┘           └─────────────┘
```

### Competitor Discovery

**Location-Based Discovery:**
- Google Places API for nearby businesses
- Yelp Fusion API for local competitors
- Configurable radius (1-50 miles)

**Similarity-Based Discovery:**
- Product category matching
- Business type classification
- Keyword/description similarity
- Market segment analysis

---

## Security Model

### Data Encryption
- API keys encrypted with Fernet (AES-128-CBC)
- OAuth tokens encrypted at rest
- Database connection over SSL
- HTTPS enforced in production

### Access Control
- Role-based access control (RBAC)
- Roles: `admin`, `member`, `viewer`
- Module-level permissions
- Tenant isolation

### Audit Logging
- All auth events logged
- Data access tracked
- Admin actions recorded
- 90-day retention

---

## Deployment Architecture

### Docker Services
```yaml
services:
  gateway:        # Node.js API Gateway
  ai-orchestrator: # Python AI Service
  connectors:     # Python Connector Service
  marketplace-scraper: # Python Scraper Service
  postgres:       # Primary Database
  redis:          # Cache/Sessions
  kafka:          # Event Streaming
  qdrant:         # Vector Database
```

### Environment Variables
| Variable | Purpose |
|----------|---------|
| DATABASE_URL | PostgreSQL connection |
| REDIS_URL | Redis connection |
| JWT_SECRET | Token signing key |
| ENCRYPTION_KEY | Fernet encryption key |
| OPENAI_API_KEY | OpenAI API access |
| ANTHROPIC_API_KEY | Anthropic API access |

---

## API Reference

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/login | POST | User login |
| /api/auth/register | POST | User registration |
| /api/auth/refresh | POST | Refresh access token |
| /api/auth/logout | POST | Invalidate tokens |

### LLM
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/llm/providers | GET | List available providers |
| /api/llm/api-keys | GET/POST/DELETE | Manage API keys |
| /api/llm/settings | GET/PUT | User LLM preferences |
| /api/query | POST | Execute LLM query |

### Connectors
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/connectors | GET | List connected services |
| /api/connectors/{id} | GET/DELETE | Manage connector |
| /api/connectors/oauth/{type}/authorize | GET | Start OAuth flow |
| /api/connectors/sync/{id} | POST | Trigger data sync |

---

## Implementation Status

### Completed
- [x] Database schema and ORM models
- [x] Service layer structure
- [x] LLM API routes
- [x] Connector data schemas
- [x] JWT token refresh (frontend)
- [x] Multi-tenant middleware

### In Progress
- [ ] Real authentication implementation
- [ ] Module route implementations
- [ ] Connector OAuth flows
- [ ] Frontend API integration
- [ ] Workflow execution engine
- [ ] Marketplace scraper

### Planned
- [ ] Real-time notifications
- [ ] Webhook support
- [ ] File upload/export
- [ ] Usage tracking/billing
- [ ] Mobile app

---

## Development Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+

### Quick Start
```bash
# Clone repositories
git clone https://github.com/k5tuck/binelekv2-smb-platform-backend.git
git clone https://github.com/k5tuck/binelekv2-smb-platform-frontend.git

# Initialize submodules
cd binelekv2-smb-platform-backend
git submodule update --init --recursive

# Start services
docker-compose up -d

# Run database migrations
docker-compose exec postgres psql -U postgres -d smb_platform -f /docker-entrypoint-initdb.d/01_create_database.sql
docker-compose exec postgres psql -U postgres -d smb_platform -f /docker-entrypoint-initdb.d/02_additional_tables.sql

# Seed data
docker-compose exec postgres psql -U postgres -d smb_platform -f /seeds/01_seed_data.sql

# Start frontend
cd ../binelekv2-smb-platform-frontend
npm install
npm run dev
```

---

## Contributing

See [Contributing Guide](docs/developers/contributing.md) for development guidelines.

## License

Proprietary - All rights reserved.
