---
sidebar_position: 2
---

# API Reference

Complete API reference for the SMB AI Command Platform.

## Base URL

```
Production: https://api.smb-ai-platform.com
Staging:    https://api-staging.smb-ai-platform.com
Local:      http://localhost:3000
```

## Authentication

All API requests require authentication via JWT bearer token.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJ..."
}
```

### Using the Token

Include the access token in all subsequent requests:

```http
GET /api/some-endpoint
Authorization: Bearer eyJ...
X-Tenant-Id: tenant_123
```

## Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

## AI Query Endpoint

The main endpoint for interacting with the AI assistant.

### Submit Query

```http
POST /api/ai/query
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "query": "What was my revenue last month?",
  "context": {
    "module": "mini-foundry",
    "conversationId": "conv_123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "Your revenue last month was $24,580, which is a 12% increase from the previous month.",
    "sources": [
      { "type": "shopify", "dataPoints": 156 },
      { "type": "stripe", "dataPoints": 89 }
    ],
    "suggestedActions": [
      { "label": "View detailed breakdown", "action": "navigate", "path": "/mini-foundry/revenue" }
    ],
    "conversationId": "conv_123"
  }
}
```

## Module Endpoints

### Ops Copilot

#### List Automations

```http
GET /api/modules/ops-copilot/automations
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Create Automation

```http
POST /api/modules/ops-copilot/automations
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "name": "Weekly Invoice Reminder",
  "trigger": {
    "type": "schedule",
    "cron": "0 9 * * 1"
  },
  "actions": [
    {
      "type": "send_email",
      "template": "invoice_reminder",
      "recipients": "overdue_customers"
    }
  ]
}
```

### Mini Foundry

#### List Dashboards

```http
GET /api/modules/mini-foundry/dashboards
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Dashboard Data

```http
GET /api/modules/mini-foundry/dashboards/:id/data
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Cybersecurity Scanner

#### Get Security Score

```http
GET /api/modules/security/score
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "breakdown": {
      "mfaAdoption": 75,
      "accessControl": 90,
      "dataEncryption": 95,
      "compliance": 80
    },
    "issues": [
      {
        "id": "issue_123",
        "severity": "high",
        "title": "3 users without MFA",
        "category": "authentication"
      }
    ]
  }
}
```

### Marketplace Intelligence

#### List Tracked Products

```http
GET /api/modules/marketplace/products
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Price Comparison

```http
GET /api/modules/marketplace/products/:id/comparison
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Predictive Analytics

AI-powered forecasting and prediction capabilities.

#### Get Overview

```http
GET /api/modules/predictive-analytics/overview
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activePredictions": 12,
    "dataSources": 5,
    "averageAccuracy": 91.5,
    "recentPredictions": [
      {
        "id": "pred_123",
        "templateName": "Sales Forecast",
        "status": "completed",
        "accuracy": 94.2
      }
    ]
  }
}
```

#### List Prediction Templates

```http
GET /api/modules/predictive-analytics/templates
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Query Parameters:**
- `category` - Filter by category (sales, inventory, churn, custom)
- `search` - Search templates by name
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

#### Create Prediction

```http
POST /api/modules/predictive-analytics/predictions
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "templateId": "template_sales_forecast",
  "parameters": {
    "timeRange": "next_30_days",
    "granularity": "daily",
    "confidenceLevel": 0.95
  },
  "dataSourceIds": ["ds_shopify", "ds_stripe"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "pred_456",
    "status": "processing",
    "estimatedCompletionTime": "2024-01-15T10:35:00Z"
  }
}
```

#### Get Prediction Results

```http
GET /api/modules/predictive-analytics/predictions/:id
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "pred_456",
    "status": "completed",
    "templateName": "Sales Forecast",
    "results": {
      "predictions": [
        { "date": "2024-01-16", "value": 12500, "lower": 11800, "upper": 13200 },
        { "date": "2024-01-17", "value": 13200, "lower": 12400, "upper": 14000 }
      ],
      "summary": {
        "totalPredicted": 385000,
        "averageDaily": 12833,
        "trend": "increasing"
      }
    },
    "accuracy": {
      "score": 94.2,
      "mape": 5.8,
      "rmse": 1250
    }
  }
}
```

#### Natural Language Query (Ask)

```http
POST /api/modules/predictive-analytics/ask
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "question": "What will my sales be next month?",
  "context": {
    "dataSourceIds": ["ds_shopify"],
    "conversationId": "conv_789"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "Based on your historical data and current trends, I predict your sales next month will be approximately $142,500.",
    "prediction": {
      "value": 142500,
      "confidence": 0.92,
      "range": { "lower": 135000, "upper": 150000 }
    },
    "factors": [
      { "name": "Seasonal trend", "impact": "positive", "contribution": 0.45 },
      { "name": "Recent growth", "impact": "positive", "contribution": 0.35 }
    ],
    "conversationId": "conv_789"
  }
}
```

#### List Data Sources

```http
GET /api/modules/predictive-analytics/data-sources
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Create Custom Connector

```http
POST /api/modules/predictive-analytics/data-sources/custom-connectors
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "name": "my_api_connector",
  "displayName": "My Custom API",
  "connectionType": "rest_api",
  "config": {
    "baseUrl": "https://api.example.com/v1",
    "authType": "bearer_token",
    "authConfig": {
      "token": "your-api-token"
    }
  },
  "fieldMappings": [
    {
      "sourceField": "order_total",
      "targetField": "revenue",
      "dataType": "number"
    }
  ]
}
```

#### Detect API Schema

Automatically detect fields and types from an API endpoint.

```http
POST /api/modules/predictive-analytics/data-sources/detect-schema
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "url": "https://api.example.com/v1/orders",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer token123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "detectedFields": [
      { "name": "id", "type": "string", "path": "data[].id" },
      { "name": "total", "type": "number", "path": "data[].total" },
      { "name": "created_at", "type": "datetime", "path": "data[].created_at" }
    ],
    "sampleData": {},
    "openApiSpec": "https://api.example.com/openapi.json"
  }
}
```

#### Get Model Accuracy

```http
GET /api/modules/predictive-analytics/accuracy
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Query Parameters:**
- `templateId` - Filter by template
- `startDate` - Start of date range
- `endDate` - End of date range

#### Train Model

Manually trigger model training for a template.

```http
POST /api/modules/predictive-analytics/train
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "templateId": "template_sales_forecast",
  "dataSourceIds": ["ds_shopify", "ds_stripe"],
  "trainingConfig": {
    "algorithm": "xgboost",
    "hyperparameters": {
      "n_estimators": 100,
      "max_depth": 6
    }
  }
}
```

## Hub Endpoints (NEW)

### Insights Hub

#### Get Overview

```http
GET /api/hubs/insights/overview
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "revenue": { "current": 125000, "change": 12.5, "trend": "up" },
      "orders": { "current": 450, "change": 8.2, "trend": "up" },
      "customers": { "current": 1250, "change": 5.1, "trend": "up" },
      "conversionRate": { "current": 3.2, "change": -0.3, "trend": "down" }
    },
    "alerts": [
      { "id": "alert_1", "type": "warning", "message": "Inventory low on 3 products" }
    ],
    "recentActivity": []
  }
}
```

#### Get Forecasts

```http
GET /api/hubs/insights/forecasts?type=revenue&horizon=30
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Customer Segments

```http
GET /api/hubs/insights/segments
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Market Intelligence

```http
GET /api/hubs/insights/market-intel
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Action Hub

#### Get Causal Relationships

```http
GET /api/hubs/action/simulator/relationships
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nodes": [
      { "id": "marketing_spend", "label": "Marketing Spend", "type": "input" },
      { "id": "website_traffic", "label": "Website Traffic", "type": "intermediate" },
      { "id": "revenue", "label": "Revenue", "type": "output" }
    ],
    "edges": [
      { "source": "marketing_spend", "target": "website_traffic", "weight": 0.85 },
      { "source": "website_traffic", "target": "revenue", "weight": 0.72 }
    ]
  }
}
```

#### Run Simulation

```http
POST /api/hubs/action/simulator/simulate
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "metricId": "marketing_spend",
  "changePercent": 20,
  "timeHorizon": 90
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "simulationId": "sim_123",
    "inputChange": { "metric": "Marketing Spend", "change": "+20%" },
    "effects": [
      { "metric": "Website Traffic", "change": "+24%", "confidence": 0.85, "lag": "1 week" },
      { "metric": "Conversions", "change": "+18%", "confidence": 0.72, "lag": "2 weeks" },
      { "metric": "Revenue", "change": "+16%", "confidence": 0.61, "lag": "3 weeks" }
    ]
  }
}
```

#### Get Initiatives

```http
GET /api/hubs/action/planner/initiatives
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Analyze Initiative

```http
POST /api/hubs/action/planner/analyze
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "name": "New Product Launch",
  "expectedOutcome": { "revenue": 50000 },
  "investment": 25000,
  "timeline": "6 months"
}
```

#### Get Automations

```http
GET /api/hubs/action/automations
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Action History

```http
GET /api/hubs/action/history?startDate=2024-01-01&type=simulation
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Data Lineage

#### Get Data Sources

```http
GET /api/data-lineage/sources
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sources": [
      {
        "id": "src_shopify",
        "name": "Shopify",
        "type": "connector",
        "status": "connected",
        "lastSync": "2024-01-15T10:30:00Z",
        "recordCount": 12450,
        "qualityScore": 0.98
      }
    ]
  }
}
```

#### Get Quality Scores

```http
GET /api/data-lineage/quality-scores
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": 0.94,
    "dimensions": {
      "accuracy": 0.96,
      "completeness": 0.92,
      "freshness": 0.98,
      "consistency": 0.90
    },
    "bySource": [
      { "source": "shopify", "score": 0.98 },
      { "source": "stripe", "score": 0.99 },
      { "source": "hubspot", "score": 0.85 }
    ]
  }
}
```

#### Get Entity Provenance

```http
GET /api/data-lineage/entity/:type/:id
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

**Example:** `GET /api/data-lineage/entity/customer/cust_123`

**Response:**
```json
{
  "success": true,
  "data": {
    "entityType": "customer",
    "entityId": "cust_123",
    "sources": [
      {
        "connector": "shopify",
        "sourceId": "shop_456",
        "fields": ["email", "name", "orders"],
        "lastUpdate": "2024-01-15T10:30:00Z",
        "confidence": 0.98
      }
    ],
    "mergeConfidence": 0.95,
    "qualityScore": 0.92
  }
}
```

#### Get Data Flow

```http
GET /api/data-lineage/flow
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Quality Trends

```http
GET /api/data-lineage/trends?days=30
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Customer Segmentation

#### Get All Segments

```http
GET /api/segmentation/segments
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Segment Details

```http
GET /api/segmentation/segments/:id
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get Customers in Segment

```http
GET /api/segmentation/segments/:id/customers
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Get 2D Projection (Latent Space)

```http
GET /api/segmentation/latent-space?xAxis=frequency&yAxis=monetary
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

#### Discover Segments

```http
POST /api/segmentation/discover
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "algorithm": "kmeans",
  "numClusters": 5,
  "features": ["recency", "frequency", "monetary"]
}
```

## Connectors

### List Connectors

```http
GET /api/connectors
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

### Connect Integration

```http
POST /api/connectors/:type/connect
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "credentials": {
    "apiKey": "sk_...",
    "shopDomain": "mystore.myshopify.com"
  }
}
```

### Trigger Sync

```http
POST /api/connectors/:id/sync
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password |
| `AUTH_TOKEN_EXPIRED` | Access token has expired |
| `AUTH_INVALID_TOKEN` | Token is malformed or invalid |
| `TENANT_NOT_FOUND` | Tenant ID not found |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist |
| `VALIDATION_ERROR` | Request body validation failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `CONNECTOR_AUTH_FAILED` | Failed to authenticate with integration |
| `AI_QUERY_FAILED` | AI processing error |

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Authentication | 10 req/min |
| AI Query | 30 req/min |
| General API | 100 req/min |
| Webhooks | 1000 req/min |

## Webhooks

Configure webhooks to receive real-time notifications.

### Register Webhook

```http
POST /api/webhooks
Authorization: Bearer <token>
X-Tenant-Id: <tenant_id>
Content-Type: application/json

{
  "url": "https://your-server.com/webhook",
  "events": ["automation.completed", "security.issue.created"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload

```json
{
  "event": "automation.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "automationId": "auto_123",
    "status": "success"
  }
}
```

Verify webhook signatures using HMAC-SHA256 with your secret.
