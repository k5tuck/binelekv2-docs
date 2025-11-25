---
sidebar_position: 5
---

# Contributing Guide

Guidelines for contributing to the SMB AI Command Platform.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Set up the development environment (see [Local Development](./local-development))
4. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

## Code Standards

### TypeScript (Gateway, MCP Server)

- Use strict TypeScript with explicit types
- Prefer `async/await` over callbacks
- Use meaningful variable and function names
- Add JSDoc comments for public functions

```typescript
/**
 * Processes an AI query and returns a response.
 * @param query - The natural language query
 * @param tenantId - The tenant making the request
 * @returns The AI-generated response
 */
async function processQuery(query: string, tenantId: string): Promise<QueryResponse> {
  // Implementation
}
```

### Python (AI Services)

- Use Python 3.11+ features
- Add type hints to all functions
- Use docstrings for modules, classes, and functions
- Follow PEP 8 style guide

```python
async def process_query(query: str, tenant_id: str) -> QueryResponse:
    """
    Process an AI query and return a response.

    Args:
        query: The natural language query
        tenant_id: The tenant making the request

    Returns:
        The AI-generated response
    """
    # Implementation
```

## Branch Naming

Use descriptive branch names:

- `feature/add-shopify-connector`
- `fix/auth-token-expiry`
- `docs/update-api-reference`
- `refactor/query-router`

## Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(connectors): add Stripe integration

fix(auth): handle expired refresh tokens correctly

docs(api): update query endpoint documentation
```

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests**
   ```bash
   # Gateway
   cd gateway && npm test

   # AI Orchestrator
   cd services/ai-orchestrator && pytest
   ```

3. **Run linters**
   ```bash
   # Gateway
   cd gateway && npm run lint

   # AI Orchestrator
   cd services/ai-orchestrator && black app && flake8 app
   ```

4. **Update documentation** if needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
How was this tested?

## Checklist
- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Documentation updated
- [ ] No secrets committed
```

### Review Process

1. Submit PR against `main` branch
2. Automated CI checks run
3. Request review from maintainers
4. Address feedback
5. Merge after approval

## Testing Guidelines

### Unit Tests

Test individual functions in isolation:

```typescript
// gateway/src/services/__tests__/auth.test.ts
describe('AuthService', () => {
  describe('validateToken', () => {
    it('should return user for valid token', async () => {
      const token = createTestToken();
      const user = await authService.validateToken(token);
      expect(user).toBeDefined();
    });

    it('should throw for expired token', async () => {
      const expiredToken = createExpiredToken();
      await expect(authService.validateToken(expiredToken))
        .rejects.toThrow('Token expired');
    });
  });
});
```

### Integration Tests

Test API endpoints:

```typescript
// gateway/src/routes/__tests__/auth.test.ts
describe('POST /api/auth/login', () => {
  it('should return tokens for valid credentials', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        email: 'test@example.com',
        password: 'password123'
      }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toHaveProperty('data.accessToken');
  });
});
```

### Python Tests

```python
# services/ai-orchestrator/tests/test_query_router.py
import pytest
from app.services.query_router import QueryRouter

@pytest.fixture
def router():
    return QueryRouter()

async def test_classify_revenue_query(router):
    result = await router.classify("What was my revenue?")
    assert result.intent == "metrics"
    assert result.module == "mini-foundry"
```

## Security Guidelines

- Never commit secrets or credentials
- Use environment variables for configuration
- Validate all user input
- Use parameterized queries (no SQL injection)
- Follow OWASP security guidelines
- Report security issues privately

## Documentation

- Update API docs when changing endpoints
- Add JSDoc/docstrings to new functions
- Update README if setup changes
- Add examples for new features

## Getting Help

- Open a GitHub issue for bugs
- Use discussions for questions
- Join our Discord for real-time help

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
