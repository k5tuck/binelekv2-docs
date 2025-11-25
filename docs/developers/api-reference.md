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
