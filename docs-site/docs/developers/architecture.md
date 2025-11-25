---
sidebar_position: 1
---

# Architecture Overview

The SMB AI Command Platform uses a hybrid microservices architecture combining Node.js/TypeScript and Python/FastAPI.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Clients                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Web App   │  │  Mobile App │  │   MCP CLI   │  │ Third-party Apps    │ │
│  │  (React)    │  │    (PWA)    │  │  (Claude)   │  │    (via API)        │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
└─────────┼────────────────┼────────────────┼────────────────────┼────────────┘
          │                │                │                    │
          └────────────────┴────────────────┴────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            API Gateway                                       │
│                      (Node.js/TypeScript + Fastify)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │ Authentication│  │ Rate Limiting │  │ Tenant Routing│  │   Logging    │ │
│  └───────────────┘  └───────────────┘  └───────────────┘  └──────────────┘ │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│   AI Orchestrator │  │    Connectors     │  │     Modules       │
│ (Python/FastAPI)  │  │ (Python/FastAPI)  │  │  (Future services)│
├───────────────────┤  ├───────────────────┤  ├───────────────────┤
│ - LLM Providers   │  │ - Shopify         │  │ - Ops Copilot     │
│ - Query Router    │  │ - Stripe          │  │ - Mini Foundry    │
│ - Task Planner    │  │ - QuickBooks      │  │ - Security Scanner│
│ - Tool Execution  │  │ - HubSpot         │  │ - Marketplace     │
└─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Data Layer                                        │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │  PostgreSQL   │  │     Redis     │  │     Kafka     │  │    Qdrant    │ │
│  │  (Primary DB) │  │    (Cache)    │  │   (Events)    │  │  (Vectors)   │ │
│  └───────────────┘  └───────────────┘  └───────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### API Gateway (Node.js/TypeScript)

The gateway handles all incoming requests and provides:

- **Authentication**: JWT-based auth with refresh tokens
- **Rate Limiting**: Protect against abuse (100 req/min default)
- **Tenant Isolation**: Extract and validate tenant context
- **Request Routing**: Route to appropriate backend services
- **Response Transformation**: Normalize responses across services

**Tech Stack:**
- Fastify (high-performance web framework)
- @fastify/jwt (authentication)
- @fastify/rate-limit (rate limiting)
- Winston (logging)

### AI Orchestrator (Python/FastAPI)

Handles all AI-related operations:

- **LLM Providers**: OpenAI, Anthropic, with fallback support
- **Query Router**: Classify user intent and route to handlers
- **Task Planner**: Create multi-step execution plans
- **Tool Execution**: Execute actions on behalf of users

**Tech Stack:**
- FastAPI (async web framework)
- LangChain (LLM orchestration)
- Pydantic (validation)
- httpx (async HTTP client)

### Connectors Service (Python/FastAPI)

Manages third-party integrations:

- **OAuth Flows**: Handle authentication with external services
- **Data Sync**: Pull data from connected services
- **Webhook Handling**: Process incoming webhooks
- **Credential Management**: Secure storage of API keys

### Data Layer

#### PostgreSQL
Primary relational database for structured data:
- Users and authentication
- Tenant configuration
- Workflows and automations
- Audit logs

#### Redis
High-speed caching and sessions:
- Session storage
- Rate limiting counters
- Query result caching
- Real-time data

#### Kafka
Event streaming for async operations:
- Data sync events
- Webhook processing
- Audit trail
- Inter-service communication

#### Qdrant
Vector database for AI features:
- Semantic search embeddings
- Document similarity
- RAG context retrieval

## Multi-Tenancy

All data is isolated by tenant. The architecture enforces tenant isolation at multiple levels:

1. **Gateway Level**: Tenant ID extracted from JWT or header
2. **Service Level**: Tenant context propagated via headers
3. **Database Level**: All queries filtered by `tenant_id`

```typescript
// Every request carries tenant context
headers: {
  'Authorization': 'Bearer <jwt>',
  'X-Tenant-Id': 'tenant_123',
  'X-Request-Id': 'req_abc'
}
```

## Security Model

- All inter-service communication is authenticated
- Secrets stored in AWS Secrets Manager (production)
- Database credentials rotated automatically
- All data encrypted at rest and in transit
