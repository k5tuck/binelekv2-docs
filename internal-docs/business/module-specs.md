# Module Specifications

## Overview

The SMB AI Command Platform consists of four core modules, each addressing a specific business need. This document provides detailed specifications for each module.

---

## 1. Ops Copilot

### Purpose
Automate routine business operations through AI-powered task management and workflow automation.

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Business owner | Set up automated invoice reminders | I don't forget to follow up on payments |
| Operations manager | Create approval workflows | Processes are consistent and documented |
| Sales rep | Automate lead follow-ups | I never miss a potential customer |
| Admin | Generate reports automatically | Weekly reports are ready without manual work |

### Key Features

#### Task Automation
- **Scheduled Tasks**: Cron-based scheduling for recurring tasks
- **Trigger-Based Tasks**: Execute based on events (new order, payment received, etc.)
- **Manual Tasks**: On-demand execution with single click

#### Email Automation
- **Templates**: Pre-built and custom email templates
- **Personalization**: Dynamic content based on recipient data
- **Sequences**: Multi-step email campaigns
- **Tracking**: Open and click tracking

#### Workflow Builder
- **Visual Builder**: Drag-and-drop workflow creation
- **Conditions**: If/then logic for branching
- **Integrations**: Connect with external services
- **Approvals**: Human-in-the-loop approval steps

### Data Model

```
automations
├── id (uuid)
├── tenant_id (uuid, FK)
├── name (string)
├── status (enum: active, paused, draft)
├── trigger_type (enum: schedule, event, manual)
├── trigger_config (jsonb)
├── actions (jsonb[])
├── created_at (timestamp)
├── updated_at (timestamp)
└── last_run_at (timestamp)

automation_runs
├── id (uuid)
├── automation_id (uuid, FK)
├── status (enum: running, completed, failed)
├── started_at (timestamp)
├── completed_at (timestamp)
├── result (jsonb)
└── error (text)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /modules/ops-copilot/automations | List automations |
| POST | /modules/ops-copilot/automations | Create automation |
| GET | /modules/ops-copilot/automations/:id | Get automation |
| PUT | /modules/ops-copilot/automations/:id | Update automation |
| DELETE | /modules/ops-copilot/automations/:id | Delete automation |
| POST | /modules/ops-copilot/automations/:id/run | Run automation |
| GET | /modules/ops-copilot/automations/:id/runs | Get run history |

---

## 2. Mini Foundry

### Purpose
Consolidate business data from multiple sources and provide visual dashboards and metrics.

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Business owner | See all my metrics in one place | I understand business health at a glance |
| Finance manager | Track revenue trends | I can forecast and plan |
| Marketing lead | Monitor campaign performance | I know what's working |
| Operations manager | View inventory levels | I can prevent stockouts |

### Key Features

#### Data Consolidation
- **Multi-Source**: Connect Shopify, Stripe, QuickBooks, etc.
- **Automatic Sync**: Data refreshed on schedule
- **Data Mapping**: Normalize data across sources
- **Historical Data**: Import up to 2 years of history

#### Dashboard Builder
- **Templates**: Pre-built dashboards for common use cases
- **Custom Dashboards**: Build your own with drag-and-drop
- **Widget Library**: Charts, tables, metrics, maps
- **Real-time Updates**: Live data where supported

#### Metrics Engine
- **Standard Metrics**: Revenue, orders, customers, etc.
- **Custom Metrics**: Define your own calculations
- **Comparisons**: Period-over-period, year-over-year
- **Alerts**: Notify when metrics cross thresholds

### Data Model

```
dashboards
├── id (uuid)
├── tenant_id (uuid, FK)
├── name (string)
├── type (string)
├── layout (jsonb)
├── widgets (jsonb[])
├── is_default (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)

metrics_cache
├── id (uuid)
├── tenant_id (uuid, FK)
├── metric_type (string)
├── period (string)
├── value (decimal)
├── metadata (jsonb)
├── calculated_at (timestamp)
└── expires_at (timestamp)

data_sources
├── id (uuid)
├── tenant_id (uuid, FK)
├── connector_id (uuid, FK)
├── source_type (string)
├── sync_status (enum)
├── last_sync_at (timestamp)
└── record_count (integer)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /modules/mini-foundry/dashboards | List dashboards |
| POST | /modules/mini-foundry/dashboards | Create dashboard |
| GET | /modules/mini-foundry/dashboards/:id | Get dashboard |
| GET | /modules/mini-foundry/dashboards/:id/data | Get dashboard data |
| GET | /modules/mini-foundry/metrics | Get metrics |
| POST | /modules/mini-foundry/metrics/custom | Create custom metric |

---

## 3. Cybersecurity Scanner

### Purpose
Monitor security posture, track compliance, and identify security issues before they become problems.

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Business owner | Know my security score | I understand our risk level |
| IT admin | See who has MFA enabled | I can enforce security policies |
| Compliance officer | Track compliance progress | We meet regulatory requirements |
| Manager | Get security alerts | I'm aware of issues immediately |

### Key Features

#### Security Score
- **Overall Score**: 0-100 composite score
- **Component Breakdown**: Auth, access, data, compliance
- **Trend Tracking**: Score history over time
- **Benchmarking**: Compare to industry average

#### Issue Detection
- **Automated Scanning**: Continuous monitoring
- **Issue Classification**: Critical, high, medium, low
- **Remediation Guidance**: Step-by-step fix instructions
- **Issue Tracking**: Status, assignee, due date

#### Compliance Tracking
- **Checklist Templates**: SOC 2, GDPR, PCI-DSS
- **Progress Tracking**: % complete per framework
- **Evidence Collection**: Attach proof of compliance
- **Audit Reports**: Generate compliance reports

### Data Model

```
security_scores
├── id (uuid)
├── tenant_id (uuid, FK)
├── score (integer)
├── breakdown (jsonb)
├── calculated_at (timestamp)
└── valid_until (timestamp)

security_issues
├── id (uuid)
├── tenant_id (uuid, FK)
├── title (string)
├── description (text)
├── severity (enum: critical, high, medium, low)
├── category (string)
├── status (enum: open, in_progress, resolved)
├── detected_at (timestamp)
├── resolved_at (timestamp)
└── assigned_to (uuid, FK)

compliance_items
├── id (uuid)
├── tenant_id (uuid, FK)
├── framework (string)
├── requirement_id (string)
├── title (string)
├── status (enum: compliant, non_compliant, in_progress)
├── evidence (jsonb[])
└── last_reviewed_at (timestamp)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /modules/security/score | Get security score |
| GET | /modules/security/issues | List security issues |
| PUT | /modules/security/issues/:id | Update issue |
| GET | /modules/security/compliance | Get compliance status |
| PUT | /modules/security/compliance/:id | Update compliance item |
| POST | /modules/security/scan | Trigger manual scan |

---

## 4. Marketplace Intelligence

### Purpose
Track competitor pricing, monitor market trends, and optimize pricing strategy.

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| Business owner | See competitor prices | I can price competitively |
| Product manager | Track price changes | I know when to adjust |
| Marketing lead | Find pricing opportunities | I can run effective promotions |
| Analyst | Analyze price trends | I understand market dynamics |

### Key Features

#### Product Tracking
- **URL-Based**: Add products by URL
- **Multi-Marketplace**: Amazon, Shopify, Etsy
- **Automatic Updates**: Prices checked every 4 hours
- **Historical Data**: Price history graphs

#### Competitor Monitoring
- **Store Tracking**: Monitor competitor stores
- **Product Matching**: Match your products to competitors
- **Activity Alerts**: New products, price changes
- **Competitor Profiles**: Aggregate competitor data

#### Price Analysis
- **Price Comparison**: Side-by-side comparison
- **Gap Analysis**: Where you're over/under priced
- **Trend Analysis**: Price movement over time
- **Recommendations**: AI-powered pricing suggestions

### Data Model

```
tracked_products
├── id (uuid)
├── tenant_id (uuid, FK)
├── name (string)
├── your_price (decimal)
├── product_url (string)
├── marketplace (string)
├── status (enum: active, paused)
├── created_at (timestamp)
└── last_checked_at (timestamp)

competitor_prices
├── id (uuid)
├── product_id (uuid, FK)
├── competitor_name (string)
├── price (decimal)
├── availability (boolean)
├── checked_at (timestamp)
└── source_url (string)

price_history
├── id (uuid)
├── product_id (uuid, FK)
├── competitor_name (string)
├── price (decimal)
├── recorded_at (timestamp)

price_alerts
├── id (uuid)
├── tenant_id (uuid, FK)
├── product_id (uuid, FK)
├── alert_type (enum: drop, increase, availability)
├── threshold (decimal)
├── triggered_at (timestamp)
└── acknowledged_at (timestamp)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /modules/marketplace/products | List tracked products |
| POST | /modules/marketplace/products | Track new product |
| GET | /modules/marketplace/products/:id | Get product details |
| GET | /modules/marketplace/products/:id/comparison | Get price comparison |
| GET | /modules/marketplace/products/:id/history | Get price history |
| GET | /modules/marketplace/competitors | List competitors |
| POST | /modules/marketplace/competitors | Add competitor |
| GET | /modules/marketplace/alerts | List price alerts |
