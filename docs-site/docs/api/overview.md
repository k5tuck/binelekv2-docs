---
sidebar_position: 1
---

# API Overview

The SMB AI Command Platform provides a RESTful API for integrating with your applications.

## Base URL

```
Production: https://api.smb-ai-platform.com
Development: http://localhost:3000
```

## Authentication

All API requests require authentication via JWT Bearer tokens.

```bash
curl -X GET https://api.smb-ai-platform.com/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-Tenant-Id: YOUR_TENANT_ID"
```

## Headers

| Header | Description | Required |
|--------|-------------|----------|
| `Authorization` | Bearer token | Yes |
| `X-Tenant-Id` | Your tenant/company ID | Yes |
| `Content-Type` | application/json | For POST/PUT |

## Response Format

All responses follow a consistent format:

```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z",
    "request_id": "uuid"
  }
}
```

## Error Responses

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  }
}
```

## Rate Limits

| Plan | Requests/minute |
|------|-----------------|
| Free | 60 |
| Pro | 300 |
| Enterprise | 1000 |

## Core Endpoints

### Authentication
- `POST /api/auth/register` - Register new account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### AI Query
- `POST /api/query` - Natural language query
- `POST /api/query/stream` - Streaming response

### Connectors
- `GET /api/connectors` - List connectors
- `POST /api/connectors` - Add connector
- `DELETE /api/connectors/:id` - Remove connector

### Modules
- `/api/modules/ops-copilot/*`
- `/api/modules/mini-foundry/*`
- `/api/modules/cybersecurity-scanner/*`
- `/api/modules/marketplace-intel/*`

## SDKs

Coming soon:
- JavaScript/TypeScript SDK
- Python SDK

## OpenAPI Specification

Download the full OpenAPI spec:
- [openapi.json](https://api.smb-ai-platform.com/openapi.json)
- [openapi.yaml](https://api.smb-ai-platform.com/openapi.yaml)
