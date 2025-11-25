# Security Model

## Overview

This document describes the security architecture of the SMB AI Command Platform, covering authentication, authorization, data protection, and compliance.

## Security Principles

1. **Defense in Depth** - Multiple layers of security controls
2. **Least Privilege** - Minimum access required for functionality
3. **Zero Trust** - Verify every request, trust nothing by default
4. **Data Minimization** - Collect and retain only necessary data
5. **Transparency** - Clear communication about data handling

## Authentication

### User Authentication

```
┌──────────────────────────────────────────────────────────────────┐
│                     Authentication Flow                           │
│                                                                   │
│   User        Frontend        Gateway        Auth Service    DB   │
│    │             │               │               │            │   │
│    │ Login      │               │               │            │   │
│    │ ──────────>│               │               │            │   │
│    │            │ POST /login   │               │            │   │
│    │            │ ─────────────>│               │            │   │
│    │            │               │ Validate      │            │   │
│    │            │               │ ─────────────>│            │   │
│    │            │               │               │ Query User │   │
│    │            │               │               │ ──────────>│   │
│    │            │               │               │<───────────│   │
│    │            │               │               │            │   │
│    │            │               │  Generate JWT │            │   │
│    │            │               │<──────────────│            │   │
│    │            │<──────────────│               │            │   │
│    │<───────────│               │               │            │   │
│    │ JWT Tokens │               │               │            │   │
└──────────────────────────────────────────────────────────────────┘
```

### JWT Token Structure

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_123",
    "iss": "smb-platform",
    "aud": "smb-platform-api",
    "exp": 1704153600,
    "iat": 1704150000,
    "tenant_id": "tenant_456",
    "roles": ["user", "admin"],
    "permissions": ["read:metrics", "write:automations"]
  }
}
```

### Token Lifecycle

| Token Type | Lifetime | Storage | Refresh |
|------------|----------|---------|---------|
| Access Token | 1 hour | Memory | Via refresh token |
| Refresh Token | 7 days | HttpOnly cookie | Re-authentication |
| API Key | Until revoked | Secure storage | Manual rotation |

### Multi-Factor Authentication

- **Supported Methods**: TOTP (Google Authenticator, Authy)
- **Enforcement**: Optional for users, required for admin roles
- **Recovery**: Backup codes (10 one-time codes)

## Authorization

### Role-Based Access Control (RBAC)

```
┌─────────────────────────────────────────────────────────────┐
│                    RBAC Model                                │
│                                                              │
│   ┌─────────┐     ┌─────────┐     ┌─────────────────────┐  │
│   │  User   │────>│  Role   │────>│    Permissions      │  │
│   └─────────┘     └─────────┘     └─────────────────────┘  │
│                                                              │
│   Roles:                   Permissions:                      │
│   - Owner                  - read:* (all read)              │
│   - Admin                  - write:* (all write)            │
│   - Member                 - read:metrics                   │
│   - Viewer                 - write:automations              │
│   - API                    - admin:users                    │
│                            - admin:billing                   │
└─────────────────────────────────────────────────────────────┘
```

### Default Role Permissions

| Permission | Owner | Admin | Member | Viewer | API |
|------------|-------|-------|--------|--------|-----|
| read:metrics | ✓ | ✓ | ✓ | ✓ | ✓ |
| write:automations | ✓ | ✓ | ✓ | - | ✓ |
| read:security | ✓ | ✓ | ✓ | ✓ | - |
| write:security | ✓ | ✓ | - | - | - |
| admin:users | ✓ | ✓ | - | - | - |
| admin:billing | ✓ | - | - | - | - |
| admin:connectors | ✓ | ✓ | - | - | - |

### Resource-Level Authorization

```python
# Example authorization check
async def authorize_resource(user, resource, action):
    # Check role permissions
    if action not in user.permissions:
        raise ForbiddenError("Insufficient permissions")

    # Check resource ownership (tenant isolation)
    if resource.tenant_id != user.tenant_id:
        raise ForbiddenError("Resource not accessible")

    # Check resource-specific permissions (optional)
    if resource.owner_id and resource.owner_id != user.id:
        if not user.has_role("admin"):
            raise ForbiddenError("Not resource owner")

    return True
```

## Data Protection

### Encryption

| Data State | Method | Key Management |
|------------|--------|----------------|
| In Transit | TLS 1.3 | AWS ACM certificates |
| At Rest (DB) | AES-256 | AWS KMS |
| At Rest (Files) | AES-256 | AWS KMS |
| Secrets | AES-256-GCM | AWS Secrets Manager |

### Sensitive Data Handling

```
┌─────────────────────────────────────────────────────────────┐
│                 Credential Storage Flow                      │
│                                                              │
│   Connector          Encryption           Secrets Manager    │
│   Credentials        Service              (AWS)              │
│       │                  │                     │             │
│       │ Store Creds      │                     │             │
│       │ ────────────────>│                     │             │
│       │                  │ Encrypt with        │             │
│       │                  │ data key            │             │
│       │                  │                     │             │
│       │                  │ Store encrypted     │             │
│       │                  │ ───────────────────>│             │
│       │                  │                     │             │
│       │                  │<────────────────────│             │
│       │<─────────────────│                     │             │
│       │ Encrypted Ref    │                     │             │
└─────────────────────────────────────────────────────────────┘
```

### Data Classification

| Classification | Examples | Handling |
|----------------|----------|----------|
| Public | Marketing content | No restrictions |
| Internal | Business metrics | Tenant-isolated |
| Confidential | User PII, credentials | Encrypted, access logged |
| Restricted | Payment data | PCI-DSS compliant, minimal access |

## Multi-Tenancy Isolation

### Database Isolation

```sql
-- All tables include tenant_id
CREATE TABLE automations (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    -- ...
);

-- All queries include tenant filter
SELECT * FROM automations
WHERE tenant_id = :tenant_id  -- Always filtered
AND id = :automation_id;

-- Row-level security policy
CREATE POLICY tenant_isolation ON automations
    USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Service Isolation

```python
# Tenant context middleware
@app.middleware("http")
async def tenant_context(request, call_next):
    tenant_id = request.headers.get("X-Tenant-Id")

    if not tenant_id:
        raise UnauthorizedError("Tenant ID required")

    # Set tenant context for entire request
    set_tenant_context(tenant_id)

    try:
        response = await call_next(request)
        return response
    finally:
        clear_tenant_context()
```

## API Security

### Rate Limiting

| Endpoint Category | Limit | Window | Action on Exceed |
|------------------|-------|--------|------------------|
| Authentication | 10 | 1 minute | Block 5 minutes |
| AI Query | 30 | 1 minute | 429 response |
| General API | 100 | 1 minute | 429 response |
| Webhooks | 1000 | 1 minute | Queue backoff |

### Input Validation

```python
# Pydantic models for all inputs
class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    module: Optional[ModuleType] = None
    conversation_id: Optional[UUID] = None

    @validator('query')
    def sanitize_query(cls, v):
        # Remove potential injection attempts
        return sanitize_input(v)
```

### Output Security

- Sensitive fields redacted in responses
- No internal IDs exposed (use public-facing IDs)
- Error messages don't leak internal details
- Response size limits enforced

## Audit Logging

### Logged Events

| Event Type | Details Captured |
|------------|------------------|
| Authentication | User, IP, success/failure, MFA used |
| Authorization | Resource, action, allowed/denied |
| Data Access | Resource type, operation, user |
| Data Modification | Before/after values, user |
| Admin Actions | Action, target, user |
| Security Events | Type, severity, details |

### Log Format

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "INFO",
  "event_type": "data.access",
  "tenant_id": "tenant_123",
  "user_id": "user_456",
  "action": "read",
  "resource_type": "automation",
  "resource_id": "auto_789",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "request_id": "req_abc",
  "outcome": "success"
}
```

## Incident Response

### Severity Levels

| Level | Definition | Response Time | Examples |
|-------|------------|---------------|----------|
| Critical | Active data breach | 15 minutes | Unauthorized data access |
| High | Security vulnerability | 4 hours | Authentication bypass |
| Medium | Security weakness | 24 hours | Missing rate limiting |
| Low | Security improvement | 1 week | Logging enhancement |

### Response Process

1. **Detection** - Automated monitoring, user reports
2. **Triage** - Assess severity, assign responder
3. **Containment** - Limit damage, preserve evidence
4. **Eradication** - Remove threat
5. **Recovery** - Restore services
6. **Post-Mortem** - Document and improve

## Compliance

### Frameworks

- **SOC 2 Type II** - Annual audit
- **GDPR** - EU data protection
- **CCPA** - California privacy
- **PCI-DSS** - Payment data (when applicable)

### Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| User data | Account lifetime + 30 days | Hard delete |
| Audit logs | 2 years | Archive then delete |
| Analytics | 1 year | Anonymize |
| Backups | 30 days | Secure delete |
