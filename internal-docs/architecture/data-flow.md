# Data Flow Documentation

## Overview

This document describes how data flows through the SMB AI Command Platform, including request handling, data synchronization, and event processing.

## Request Flow

### User Query Flow

```
User                 Frontend          Gateway           AI Orchestrator       Data Layer
  │                    │                 │                    │                   │
  │  "What's my       │                 │                    │                   │
  │   revenue?"       │                 │                    │                   │
  │ ─────────────────>│                 │                    │                   │
  │                    │  POST /ai/query│                    │                   │
  │                    │ ───────────────>│                    │                   │
  │                    │                 │  Validate JWT      │                   │
  │                    │                 │  Extract Tenant    │                   │
  │                    │                 │                    │                   │
  │                    │                 │  POST /process    │                   │
  │                    │                 │ ──────────────────>│                   │
  │                    │                 │                    │  Classify Intent  │
  │                    │                 │                    │  Route to Handler │
  │                    │                 │                    │                   │
  │                    │                 │                    │  Query Data       │
  │                    │                 │                    │ ─────────────────>│
  │                    │                 │                    │                   │
  │                    │                 │                    │<─────────────────│
  │                    │                 │                    │                   │
  │                    │                 │                    │  Generate Response│
  │                    │                 │                    │  (Call LLM)       │
  │                    │                 │                    │                   │
  │                    │                 │<──────────────────│                   │
  │                    │<───────────────│                    │                   │
  │<─────────────────│                 │                    │                   │
  │  "$24,580"        │                 │                    │                   │
```

### Authentication Flow

```
User                 Frontend          Gateway           Auth Service          Database
  │                    │                 │                    │                   │
  │  Login Request     │                 │                    │                   │
  │ ─────────────────>│                 │                    │                   │
  │                    │  POST /login   │                    │                   │
  │                    │ ───────────────>│                    │                   │
  │                    │                 │  Validate Creds   │                   │
  │                    │                 │ ──────────────────>│                   │
  │                    │                 │                    │  Query User       │
  │                    │                 │                    │ ─────────────────>│
  │                    │                 │                    │<─────────────────│
  │                    │                 │                    │                   │
  │                    │                 │                    │  Verify Password  │
  │                    │                 │                    │  Generate JWT     │
  │                    │                 │<──────────────────│                   │
  │                    │<───────────────│                    │                   │
  │<─────────────────│                 │                    │                   │
  │  JWT Tokens        │                 │                    │                   │
```

## Data Synchronization Flow

### Connector Data Sync

```
┌──────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Scheduler  │────>│  Connectors │────>│    Kafka    │────>│   Workers   │
│  (Cron Job)  │     │   Service   │     │   (Queue)   │     │             │
└──────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                     │
                                                                     ▼
                     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                     │  PostgreSQL │<────│  Transform  │<────│  External   │
                     │   (Store)   │     │   & Load    │     │    APIs     │
                     └─────────────┘     └─────────────┘     └─────────────┘
```

### Sync Process Details

1. **Trigger**: Scheduler triggers sync based on plan frequency
2. **Fetch**: Connector service fetches data from external API
3. **Queue**: Raw data pushed to Kafka topic
4. **Process**: Workers consume and transform data
5. **Store**: Transformed data saved to PostgreSQL
6. **Index**: Relevant data indexed in Qdrant for search

### Webhook Processing

```
External             Webhook            Kafka              Worker            Database
Service              Endpoint
   │                    │                 │                  │                  │
   │  POST /webhook     │                 │                  │                  │
   │ ──────────────────>│                 │                  │                  │
   │                    │  Validate       │                  │                  │
   │                    │  Signature      │                  │                  │
   │                    │                 │                  │                  │
   │  202 Accepted      │                 │                  │                  │
   │<──────────────────│                 │                  │                  │
   │                    │                 │                  │                  │
   │                    │  Publish Event  │                  │                  │
   │                    │ ───────────────>│                  │                  │
   │                    │                 │  Consume         │                  │
   │                    │                 │ ────────────────>│                  │
   │                    │                 │                  │  Process &       │
   │                    │                 │                  │  Update          │
   │                    │                 │                  │ ────────────────>│
```

## AI Query Processing

### Intent Classification

```
User Query
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Query Router                                │
│                                                                  │
│  1. Extract entities (dates, amounts, products, etc.)           │
│  2. Classify intent (metrics, search, action, conversation)     │
│  3. Identify target module (mini-foundry, ops-copilot, etc.)    │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────┬──────────────────┬──────────────────┐
│   Metrics        │     Search       │     Action       │
│   Handler        │     Handler      │     Handler      │
│                  │                  │                  │
│  - Revenue       │  - Semantic      │  - Send email    │
│  - Orders        │  - Keyword       │  - Create task   │
│  - Customers     │  - Hybrid        │  - Run workflow  │
└────────┬─────────┴────────┬─────────┴────────┬─────────┘
         │                  │                  │
         ▼                  ▼                  ▼
    ┌─────────────────────────────────────────────────────┐
    │                  Task Planner                        │
    │                                                      │
    │  Creates execution plan with steps:                  │
    │  1. Fetch required data                             │
    │  2. Transform/aggregate                             │
    │  3. Generate natural language response              │
    └─────────────────────────────────────────────────────┘
```

### LLM Integration

```
                    ┌─────────────────────────────────┐
                    │        LLM Provider             │
                    │                                 │
                    │  ┌─────────────────────────┐   │
                    │  │       Primary           │   │
                    │  │    (OpenAI GPT-4)       │   │
                    │  └───────────┬─────────────┘   │
                    │              │                 │
                    │              │ Fallback        │
                    │              ▼                 │
                    │  ┌─────────────────────────┐   │
                    │  │       Secondary         │   │
                    │  │   (Anthropic Claude)    │   │
                    │  └─────────────────────────┘   │
                    └─────────────────────────────────┘
```

## Caching Strategy

### Cache Layers

| Layer | Purpose | TTL | Invalidation |
|-------|---------|-----|--------------|
| Redis L1 | Hot query results | 5 min | On data change |
| Redis L2 | Session data | 1 hour | On logout |
| Redis L3 | Rate limit counters | 1 min | Auto-expire |
| Qdrant | Vector embeddings | Persistent | On re-index |

### Cache Key Structure

```
# Query cache
cache:query:{tenant_id}:{hash(query)}

# Session cache
session:{session_id}

# Rate limit
ratelimit:{tenant_id}:{user_id}:{endpoint}

# Connector data
connector:{tenant_id}:{connector_type}:{resource}
```

## Event Schema

### Data Sync Event

```json
{
  "event_type": "connector.sync.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "tenant_id": "tenant_123",
  "payload": {
    "connector_id": "conn_shopify_456",
    "connector_type": "shopify",
    "records_synced": 1250,
    "duration_ms": 4523,
    "status": "success"
  }
}
```

### User Action Event

```json
{
  "event_type": "user.query.submitted",
  "timestamp": "2024-01-15T10:30:00Z",
  "tenant_id": "tenant_123",
  "user_id": "user_789",
  "payload": {
    "query": "What was my revenue last month?",
    "intent": "metrics",
    "module": "mini-foundry",
    "response_time_ms": 1234
  }
}
```
