---
sidebar_position: 4
---

# Local Development

Guide for setting up the development environment.

## Prerequisites

- Node.js 20+
- Python 3.11+
- Docker and Docker Compose
- Git

## Quick Start

### 1. Clone the Repository

Contact the team at support@binelek.io for repository access.

```bash
git clone <repository-url>
cd binelekv2-smb-platform-backend
```

### 2. Start Infrastructure

```bash
# Start PostgreSQL, Redis, Kafka, Qdrant
docker-compose up -d postgres redis kafka qdrant
```

### 3. Configure Environment

```bash
# Copy example env files
cp .env.example .env
cp gateway/.env.example gateway/.env
cp services/ai-orchestrator/.env.example services/ai-orchestrator/.env
```

Edit the `.env` files with your configuration.

### 4. Start Services

**Option A: All services via Docker**
```bash
docker-compose up -d
```

**Option B: Services individually (for development)**

Terminal 1 - Gateway:
```bash
cd gateway
npm install
npm run dev
```

Terminal 2 - AI Orchestrator:
```bash
cd services/ai-orchestrator
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Terminal 3 - MCP Server (optional):
```bash
cd mcp-server
npm install
npm run dev
```

### 5. Verify Setup

```bash
# Health check
curl http://localhost:3000/health

# Should return:
# {"status":"ok","services":{"gateway":"up","aiOrchestrator":"up"}}
```

## Environment Variables

### Gateway (.env)

```bash
# Server
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your-development-secret-key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/smb_platform

# Redis
REDIS_URL=redis://localhost:6379

# Services
AI_ORCHESTRATOR_URL=http://localhost:8001
CONNECTORS_URL=http://localhost:8002

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3001
```

### AI Orchestrator (.env)

```bash
# Server
PORT=8001
ENV=development

# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DEFAULT_LLM_PROVIDER=openai
DEFAULT_MODEL=gpt-4-turbo-preview

# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=smb_platform

# Redis
REDIS_URL=redis://localhost:6379

# Gateway (for callbacks)
GATEWAY_URL=http://localhost:3000
GATEWAY_API_KEY=internal-api-key
```

## Database Setup

### Initialize Schema

```bash
# Connect to PostgreSQL
psql -h localhost -U postgres -d smb_platform

# Or use Docker
docker-compose exec postgres psql -U postgres -d smb_platform
```

The schema is automatically applied from `database/init/01_create_database.sql` when the container starts.

### Create Test Data

```sql
-- Create a test tenant
INSERT INTO tenants (id, name, slug)
VALUES ('tenant_test', 'Test Company', 'test-company');

-- Create a test user
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name)
VALUES (
  'user_test',
  'tenant_test',
  'test@example.com',
  '$2b$10$...',  -- bcrypt hash of 'password123'
  'Test',
  'User'
);
```

## Running Tests

### Gateway

```bash
cd gateway
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### AI Orchestrator

```bash
cd services/ai-orchestrator
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov=app         # Coverage report
pytest -k "test_query"   # Run specific tests
```

## Code Style

### TypeScript (Gateway)

We use ESLint and Prettier:

```bash
cd gateway
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format with Prettier
```

### Python (Services)

We use Black and flake8:

```bash
cd services/ai-orchestrator
black app           # Format code
flake8 app          # Lint code
mypy app            # Type checking
```

## Hot Reloading

### Gateway
Runs with `tsx watch` - changes auto-reload.

### AI Orchestrator
Runs with `--reload` flag - changes auto-reload.

### Frontend
Connect to `http://localhost:5173` - Vite HMR enabled.

## Common Issues

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Database Connection Failed

1. Check PostgreSQL is running: `docker-compose ps`
2. Check credentials in `.env`
3. Try restarting: `docker-compose restart postgres`

### Redis Connection Failed

```bash
# Check Redis is running
docker-compose exec redis redis-cli ping
# Should return: PONG
```

### Module Not Found (Python)

```bash
# Ensure venv is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

## Debugging

### Gateway (VS Code)

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Gateway",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}/gateway",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### AI Orchestrator (VS Code)

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "python",
      "request": "launch",
      "name": "Debug AI Orchestrator",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8001"],
      "cwd": "${workspaceFolder}/services/ai-orchestrator",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/services/ai-orchestrator"
      }
    }
  ]
}
```

## Docker Development

### Rebuild Single Service

```bash
docker-compose build gateway
docker-compose up -d gateway
```

### View Logs

```bash
docker-compose logs -f gateway
docker-compose logs -f ai-orchestrator
```

### Access Container Shell

```bash
docker-compose exec gateway sh
docker-compose exec ai-orchestrator bash
```

### Reset Everything

```bash
docker-compose down -v  # Remove volumes too
docker-compose up -d
```
