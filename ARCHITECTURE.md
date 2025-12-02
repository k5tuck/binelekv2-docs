# SMB AI Command Platform - Master Architecture Document

## Executive Summary

The SMB AI Command Platform is an AI-powered business operations platform designed for small and medium businesses. It provides intelligent automation, data analytics, security monitoring, and competitive intelligence through a **hub-based architecture** with unified data lineage and causal analytics.

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React/TypeScript PWA)                 │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         HUB ARCHITECTURE                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │ │
│  │  │ Insights Hub│  │ Action Hub  │  │Data Lineage │                     │ │
│  │  │ - Forecasts │  │ - Simulator │  │ - Provenance│                     │ │
│  │  │ - Customers │  │ - Planner   │  │ - Quality   │                     │ │
│  │  │ - Segments  │  │ - Automations│ │ - Flow Viz  │                     │ │
│  │  │ - Market    │  │ - History   │  │             │                     │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         LEGACY MODULES                                  │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │ Ops Copilot │ │Mini Foundry │ │  Security   │ │ Marketplace │      │ │
│  │  │   Module    │ │   Module    │ │   Scanner   │ │    Intel    │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  │  ┌─────────────┐                                                       │ │
│  │  │ Predictive  │                                                       │ │
│  │  │ Analytics   │                                                       │ │
│  │  └─────────────┘                                                       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (Node.js/Fastify)                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │     Auth     │ │   Routing    │ │ Rate Limit   │ │    Tenant    │        │
│  │  Middleware  │ │    Proxy     │ │  Middleware  │ │   Context    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                         │
│  │  Hub Routes  │ │ Data Lineage │ │ Segmentation │                         │
│  │  (insights,  │ │   Routes     │ │   Routes     │                         │
│  │   action)    │ │              │ │              │                         │
│  └──────────────┘ └──────────────┘ └──────────────┘                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│    AI ORCHESTRATOR    │ │    CONNECTORS     │ │   MARKETPLACE     │
│   (Python/FastAPI)    │ │  (Python/FastAPI) │ │    SCRAPER        │
│                       │ │                   │ │  (Python/FastAPI) │
│ - LLM Query Engine    │ │ - Plugin System   │ │                   │
│ - Agent Framework     │ │ - OAuth Manager   │ │ - Price Tracker   │
│ - Tool Executor       │ │ - Data Sync       │ │ - Competitor      │
│ - Workflow Engine     │ │ - Transformers    │ │   Discovery       │
│ - Prediction Service  │ │                   │ │                   │
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
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    UNIFIED DATA SCHEMA                                  │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │ │
│  │  │  Unified    │ │   Causal    │ │  Customer   │ │   Data      │       │ │
│  │  │  Customers  │ │ Relationships│ │  Segments   │ │  Quality    │       │ │
│  │  │  /Orders    │ │ /Simulations│ │             │ │  Scores     │       │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
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

## Hub Architecture (NEW)

### Insights Hub (`/insights`)
**Purpose:** Centralized business insights, analytics, and reporting

**Tabs:**
1. **Overview** - Key metrics, trends, alerts
2. **Forecasts** - Predictive analytics integration
3. **Customers** - Customer health, LTV, churn analysis
4. **Segments** - Customer segmentation visualization
5. **Market Intel** - Competitor and pricing intelligence
6. **Reports** - Report generation and scheduling

**Key Endpoints:**
```
GET /api/hubs/insights/overview
GET /api/hubs/insights/forecasts
GET /api/hubs/insights/customers
GET /api/hubs/insights/segments
GET /api/hubs/insights/alerts
```

### Action Hub (`/action`)
**Purpose:** Business actions, simulations, and automation

**Tabs:**
1. **Simulator** - Causal graph "what-if" scenarios
2. **Planner** - Business initiative tradeoff analysis
3. **Automations** - Ops Copilot integration
4. **History** - Action history timeline

**Key Endpoints:**
```
GET /api/hubs/action/simulator/relationships
POST /api/hubs/action/simulator/simulate
GET /api/hubs/action/planner/initiatives
POST /api/hubs/action/planner/analyze
GET /api/hubs/action/automations
GET /api/hubs/action/history
```

### Data Lineage (`/data-lineage`)
**Purpose:** Data provenance, quality tracking, and flow visualization

**Features:**
- Data source tracking
- Quality scores (accuracy, completeness, freshness)
- Visual flow diagrams
- Confidence indicators
- Entity-level provenance

**Key Endpoints:**
```
GET /api/data-lineage/sources
GET /api/data-lineage/quality-scores
GET /api/data-lineage/flow
GET /api/data-lineage/entity/:type/:id
GET /api/data-lineage/trends
```

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

### 5. Predictive Analytics (NEW)
**Purpose:** AI-powered forecasting with 518 prediction templates

**Features:**
- Industry-specific prediction templates (19 industries)
- Time-series forecasting
- Anomaly detection
- Custom model training

**Database Tables:**
- `prediction_templates` - 518 pre-configured templates
- `prediction_history` - User prediction results
- `model_configs` - Custom model configurations

**Key Endpoints:**
```
GET /api/modules/predictive-analytics/templates
GET /api/modules/predictive-analytics/templates/:templateId
POST /api/modules/predictive-analytics/predict
GET /api/modules/predictive-analytics/history
```

---

## Three-Layer Data Architecture

### Layer 1: Connector Layer
Raw data ingestion from external sources via plugins.

**Supported Connectors:**
| Category | Connectors |
|----------|------------|
| Commerce | Shopify, Stripe, Square |
| CRM | HubSpot, Zoho |
| Finance | QuickBooks, Xero |
| Email | Gmail, Outlook |

### Layer 2: Normalization Layer ("Rosetta Stone")
Transforms connector-specific data into unified schema.

**Unified Tables:**
- `unified_customers` - Normalized customer data
- `unified_orders` - Normalized order data
- `unified_transactions` - Normalized financial transactions
- `unified_products` - Normalized product catalog

### Layer 3: Semantic/Intelligent Layer
AI-enriched data with causal relationships and predictions.

**Intelligent Tables:**
- `business_events` - Timeline of business events
- `causal_relationships` - Cause-effect relationships between metrics
- `causal_simulations` - What-if scenario results
- `customer_segments` - AI-generated customer segments
- `data_quality_scores` - Per-entity quality metrics

---

## Causal Simulation Algorithm

The Action Hub Simulator uses BFS-based propagation:

```
1. User modifies a metric (e.g., "Increase marketing spend by 20%")
2. System identifies connected metrics via causal_relationships table
3. BFS traverses the causal graph
4. Each hop applies:
   - Effect multiplier (positive/negative correlation)
   - Confidence degradation (15% per hop)
   - Lag time estimation
5. Results aggregated and displayed in waterfall chart
```

---

## Customer Segmentation

**Segmentation Explorer** provides 2D visualization of customer clusters:

- **RFM Segmentation** - Recency, Frequency, Monetary value
- **Behavioral Clustering** - Purchase patterns, engagement
- **Predictive Segments** - Churn risk, LTV potential
- **Custom Dimensions** - User-defined axes

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
- `src/routes/hubs/insights.ts` - Insights Hub routes
- `src/routes/hubs/action.ts` - Action Hub routes
- `src/routes/data-lineage.ts` - Data lineage routes
- `src/routes/segmentation.ts` - Customer segmentation routes
- `src/routes/modules.ts` - Legacy module routing
- `src/middleware/tenant.ts` - Multi-tenant context

### AI Orchestrator (Python/FastAPI)
**Location:** `/services/ai-orchestrator/`

**Responsibilities:**
- LLM query processing (OpenAI, Anthropic, Google, Ollama)
- Agent framework for complex tasks
- Tool execution coordination
- Workflow engine
- Prediction service

**Key Files:**
- `app/routers/query.py` - LLM query endpoints
- `app/routers/predictions.py` - Prediction endpoints
- `app/services/query_service.py` - Multi-provider LLM
- `app/services/orchestrator.py` - Agent orchestration

### Connectors Service (Python/FastAPI)
**Location:** `/services/connectors/`

**Responsibilities:**
- OAuth flow management
- Data synchronization from external services
- Credential encryption and storage
- Data transformation to unified schema

**Plugin System:**
- `app/plugins/shopify.py` - Shopify connector
- `app/plugins/stripe.py` - Stripe connector
- `app/plugins/hubspot.py` - HubSpot connector
- `app/plugins/gmail.py` - Gmail connector
- `app/plugins/quickbooks.py` - QuickBooks connector

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
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ Connector   │       │  Workflow   │       │  Segment    │
│             │       │             │       │             │
│ - type      │       │ - trigger   │       │ - name      │
│ - config    │       │ - steps     │       │ - criteria  │
│ - oauth     │       │ - is_active │       │ - customers │
└─────────────┘       └─────────────┘       └─────────────┘
```

### Unified Schema Tables (NEW)

| Table | Purpose |
|-------|---------|
| unified_customers | Normalized customer data from all connectors |
| unified_orders | Normalized order/transaction data |
| unified_transactions | Financial transaction records |
| unified_products | Product catalog across platforms |
| business_events | Timeline of significant business events |
| causal_relationships | Metric cause-effect relationships |
| causal_simulations | What-if scenario simulation results |
| customer_segments | AI-generated customer segments |
| business_initiatives | Planned business actions with tradeoffs |
| data_quality_scores | Per-entity data quality metrics |

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

### Multi-Tenancy
- Every request includes `X-Tenant-ID` header
- Middleware validates tenant access
- All database queries filter by `tenant_id`
- Tenant isolation enforced at service layer

---

## Implementation Status

### Completed ✅
- [x] Database schema and ORM models
- [x] Unified data schema (10 new tables)
- [x] Hub architecture (Insights + Action)
- [x] Data lineage service and UI
- [x] Customer segmentation explorer
- [x] Story timeline visualization
- [x] Predictive analytics module (518 templates)
- [x] Connector plugin system (5 plugins)
- [x] JWT token refresh (frontend)
- [x] Multi-tenant middleware

### In Progress 🚧
- [ ] Real causal graph population
- [ ] Production NLP query engine
- [ ] Real-time data sync
- [ ] Email/calendar integration
- [ ] Security scoring engine
- [ ] Price discovery scraping

### Planned 📋
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
docker-compose exec postgres psql -U postgres -d smb_platform -f /docker-entrypoint-initdb.d/07_unified_schema.sql

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
