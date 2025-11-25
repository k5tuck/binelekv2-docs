# System Architecture Overview

## Executive Summary

The SMB AI Command Platform is a multi-tenant SaaS application that provides AI-powered business operations tools for small and medium businesses. The system uses a hybrid architecture combining Node.js/TypeScript for the API Gateway and Python/FastAPI for AI-intensive services.

## Architecture Principles

1. **Microservices-based** - Independent, deployable services with clear boundaries
2. **API-first** - All functionality exposed through well-defined APIs
3. **Multi-tenant by design** - Tenant isolation at every layer
4. **Cloud-native** - Containerized, scalable, and resilient
5. **AI-ready** - Infrastructure optimized for LLM and ML workloads

## System Architecture Diagram

```
                                    ┌─────────────────────────────────────┐
                                    │           Load Balancer             │
                                    │         (AWS ALB / CloudFlare)      │
                                    └─────────────────┬───────────────────┘
                                                      │
                    ┌─────────────────────────────────┼─────────────────────────────────┐
                    │                                 │                                 │
              ┌─────▼─────┐                    ┌──────▼──────┐                   ┌──────▼──────┐
              │  Web App  │                    │  Mobile App │                   │  MCP Server │
              │  (React)  │                    │    (PWA)    │                   │  (Claude)   │
              └─────┬─────┘                    └──────┬──────┘                   └──────┬──────┘
                    │                                 │                                 │
                    └─────────────────────────────────┼─────────────────────────────────┘
                                                      │
                                    ┌─────────────────▼───────────────────┐
                                    │           API Gateway               │
                                    │     (Node.js/TypeScript + Fastify)  │
                                    │                                     │
                                    │  • JWT Authentication               │
                                    │  • Rate Limiting (100 req/min)      │
                                    │  • Tenant Context Extraction        │
                                    │  • Request Routing                  │
                                    │  • Response Transformation          │
                                    └────────────────┬────────────────────┘
                                                     │
                ┌────────────────────────────────────┼────────────────────────────────────┐
                │                                    │                                    │
     ┌──────────▼──────────┐            ┌───────────▼───────────┐            ┌───────────▼───────────┐
     │   AI Orchestrator   │            │      Connectors       │            │   Module Services     │
     │  (Python/FastAPI)   │            │   (Python/FastAPI)    │            │     (Planned)         │
     │                     │            │                       │            │                       │
     │  • LLM Providers    │            │  • Shopify            │            │  • Ops Copilot        │
     │  • Query Router     │            │  • Stripe             │            │  • Mini Foundry       │
     │  • Task Planner     │            │  • QuickBooks         │            │  • Security Scanner   │
     │  • Tool Executor    │            │  • HubSpot            │            │  • Marketplace Intel  │
     └──────────┬──────────┘            │  • Gmail              │            └───────────────────────┘
                │                       │  • OAuth Flows        │
                │                       └───────────┬───────────┘
                │                                   │
                └───────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
┌───────▼───────┐          ┌────────▼────────┐         ┌────────▼────────┐
│  PostgreSQL   │          │     Redis       │         │     Qdrant      │
│  (Primary DB) │          │    (Cache)      │         │   (Vectors)     │
│               │          │                 │         │                 │
│  • Users      │          │  • Sessions     │         │  • Embeddings   │
│  • Tenants    │          │  • Rate Limits  │         │  • Semantic     │
│  • Data       │          │  • Query Cache  │         │    Search       │
└───────────────┘          └─────────────────┘         └─────────────────┘
        │
┌───────▼───────┐
│     Kafka     │
│   (Events)    │
│               │
│  • Data Sync  │
│  • Webhooks   │
│  • Audit Log  │
└───────────────┘
```

## Service Responsibilities

### API Gateway (Node.js/TypeScript)
- **Primary responsibility**: Entry point for all client requests
- **Technology**: Fastify, TypeScript, JWT
- **Scaling**: Horizontal (multiple instances behind load balancer)
- **Key functions**:
  - Authenticate and authorize requests
  - Extract tenant context
  - Route requests to appropriate services
  - Apply rate limiting
  - Transform responses

### AI Orchestrator (Python/FastAPI)
- **Primary responsibility**: AI query processing and orchestration
- **Technology**: FastAPI, LangChain, OpenAI/Anthropic SDKs
- **Scaling**: Horizontal with GPU support for local models
- **Key functions**:
  - Classify user intent
  - Route to appropriate handlers
  - Execute multi-step AI plans
  - Manage conversation context

### Connectors Service (Python/FastAPI)
- **Primary responsibility**: Third-party integrations
- **Technology**: FastAPI, OAuth2, async HTTP
- **Scaling**: Horizontal
- **Key functions**:
  - OAuth flows for integrations
  - Data synchronization
  - Webhook processing
  - Credential management

## Data Architecture

### PostgreSQL (Primary Database)
- Stores all persistent application data
- Multi-tenant with row-level security
- Connection pooling via PgBouncer in production

### Redis (Caching Layer)
- Session storage
- Rate limiting counters
- Query result caching
- Real-time pub/sub

### Kafka (Event Streaming)
- Async data synchronization
- Webhook event processing
- Audit trail
- Inter-service communication

### Qdrant (Vector Database)
- Semantic search embeddings
- Document similarity
- RAG context retrieval

## Deployment Architecture

### Development
- Docker Compose for local development
- All services run locally
- Hot reloading enabled

### Staging
- AWS ECS Fargate
- Single availability zone
- Reduced capacity

### Production
- AWS ECS Fargate
- Multi-AZ deployment
- Auto-scaling enabled
- CloudFront CDN for frontend
- RDS Multi-AZ for PostgreSQL

## Technology Decisions

| Component | Technology | Rationale |
|-----------|------------|-----------|
| API Gateway | Node.js/Fastify | High performance, good TypeScript support |
| AI Services | Python/FastAPI | Best ecosystem for AI/ML, LangChain support |
| Primary DB | PostgreSQL | Reliable, feature-rich, good multi-tenant support |
| Cache | Redis | Fast, versatile, good Pub/Sub support |
| Events | Kafka | Scalable, durable, industry standard |
| Vectors | Qdrant | Purpose-built for vectors, good performance |
| Container | Docker/ECS | Easy deployment, good AWS integration |
