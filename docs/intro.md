---
sidebar_position: 1
---

# Introduction

Welcome to the **SMB AI Command Platform** documentation.

## What is SMB AI Command Platform?

SMB AI Command Platform is a modular AI-powered SaaS platform designed specifically for Small and Medium Businesses. It provides intelligent automation, data insights, security monitoring, and competitive intelligence - all accessible through natural language queries.

## Core Modules

### 🤖 Ops Copilot
Automate your daily operations with AI-powered task management, email automation, and workflow orchestration.

**Key Features:**
- Natural language task creation
- Email compose & send automation
- Calendar management
- CRM integration
- Workflow automation

### 📊 Mini Foundry
Consolidate your business data and gain actionable insights with AI-powered analytics.

**Key Features:**
- Unified data layer across all your tools
- Natural language data queries
- Auto-generated dashboards
- Revenue forecasting
- KPI tracking

### 🔒 Cybersecurity Scanner
Monitor your security posture and maintain compliance with automated security checks.

**Key Features:**
- MFA status monitoring
- Device health checks
- Compliance reports (SOC2, HIPAA)
- Security alerts
- Access audit logs

### 📈 Marketplace Intelligence
Stay competitive with real-time pricing intelligence and market analysis.

**Key Features:**
- Competitor price tracking
- Product performance analytics
- Market trend detection
- Multi-marketplace support (Amazon, Shopify, Etsy, eBay)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React PWA)                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│                    API Gateway (Node.js)                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  AI Orchestrator │ │   Connectors    │ │   MCP Server    │
│  (Python/FastAPI)│ │ (Python/FastAPI)│ │   (TypeScript)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Quick Start

Get started in minutes:

```bash
# Clone the repository
git clone --recursive https://github.com/k5tuck/binelekv2-smb-platform-backend.git

# Start with Docker
cd binelekv2-smb-platform-backend
cp .env.example .env
docker-compose up -d
```

## Support

- **Documentation**: You're here!
- **GitHub Issues**: [Report bugs](https://github.com/k5tuck/binelekv2-smb-platform-backend/issues)
- **Email**: support@smb-ai-platform.com
