---
sidebar_position: 1
---

# Installation

Get the SMB AI Command Platform running locally or in production.

## Prerequisites

- **Node.js** 20+ (for API Gateway)
- **Python** 3.11+ (for AI services)
- **Docker** & Docker Compose
- **pnpm** (recommended for Node.js)

## Quick Install (Docker)

The fastest way to get started:

Contact the team at support@binelek.io for repository access.

```bash
# Clone with submodules
git clone --recursive <repository-url>
cd binelekv2-smb-platform-backend

# Copy environment file
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start everything
docker-compose up -d
```

Services will be available at:
- API Gateway: http://localhost:3000
- AI Orchestrator: http://localhost:8100
- Connectors: http://localhost:8101

## Manual Installation

### 1. Infrastructure Services

Start the required databases and message queue:

```bash
docker-compose up -d postgres redis kafka qdrant
```

### 2. API Gateway (Node.js)

```bash
cd gateway
pnpm install
pnpm dev
```

### 3. AI Orchestrator (Python)

```bash
cd services/ai-orchestrator
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8100
```

### 4. Connectors Service (Python)

```bash
cd services/connectors
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8101
```

## Verify Installation

Check all services are running:

```bash
# API Gateway
curl http://localhost:3000/health

# AI Orchestrator
curl http://localhost:8100/health

# Connectors
curl http://localhost:8101/health
```

## Next Steps

- [Configuration](/docs/getting-started/configuration) - Set up API keys and connectors
- [Quick Start](/docs/getting-started/quick-start) - Make your first query
