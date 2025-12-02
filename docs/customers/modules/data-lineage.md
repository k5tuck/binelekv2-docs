---
sidebar_position: 3
---

# Data Lineage

**Data Lineage** provides full transparency into where your data comes from, how it flows through the platform, and how trustworthy it is.

## Overview

Access Data Lineage at `/data-lineage` in your dashboard. It helps you:

- **Track Origins** - Know exactly where each data point comes from
- **Assess Quality** - Understand data accuracy, completeness, and freshness
- **Visualize Flow** - See how data moves through your systems
- **Build Trust** - Make confident decisions with transparent data

## Data Sources

View all connected data sources and their health:

| Source | Status | Last Sync | Records | Quality |
|--------|--------|-----------|---------|---------|
| Shopify | Connected | 5 min ago | 12,450 | 98% |
| Stripe | Connected | 2 min ago | 8,230 | 99% |
| HubSpot | Connected | 15 min ago | 3,120 | 95% |
| QuickBooks | Syncing | In progress | 5,890 | 92% |

### Source Health Indicators

- **Connected** - Active connection, regular syncs
- **Syncing** - Currently pulling data
- **Stale** - No recent updates (>1 hour)
- **Error** - Connection issues

## Quality Scores

Every data entity has quality metrics:

### Quality Dimensions

| Dimension | Description | How Measured |
|-----------|-------------|--------------|
| Accuracy | Data correctness | Cross-source validation |
| Completeness | Required fields present | Field fill rate |
| Freshness | How recent the data is | Time since last update |
| Consistency | Cross-source agreement | Deduplication matching |

### Quality Score Calculation

```
Overall Quality = (Accuracy × 0.35) + (Completeness × 0.30) +
                  (Freshness × 0.20) + (Consistency × 0.15)
```

### Quality Badges

| Score | Badge | Meaning |
|-------|-------|---------|
| 90-100 | Excellent | Highly reliable data |
| 75-89 | Good | Reliable with minor gaps |
| 60-74 | Fair | Usable but verify important decisions |
| <60 | Poor | Needs attention before use |

## Data Flow Visualization

The flow diagram shows how data moves through the platform:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Shopify   │────▶│  Connector  │────▶│  Unified    │
│   (Orders)  │     │   Layer     │     │  Schema     │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Stripe    │────▶│  Connector  │────▶│  Customer   │
│  (Payments) │     │   Layer     │     │   360      │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │  Insights   │
                                        │    Hub      │
                                        └─────────────┘
```

### Flow Features

- **Click nodes** to see details
- **Hover connections** to see record counts
- **Filter by source** to focus on specific flows
- **Highlight issues** to see problematic paths

## Entity Provenance

For any entity (customer, order, product), view its complete history:

### Customer Provenance Example

```json
{
  "entity": "customer",
  "id": "cust_123",
  "sources": [
    {
      "connector": "shopify",
      "sourceId": "shop_456",
      "fields": ["email", "name", "orders"],
      "lastUpdate": "2024-01-15T10:30:00Z"
    },
    {
      "connector": "hubspot",
      "sourceId": "hs_789",
      "fields": ["company", "phone", "tags"],
      "lastUpdate": "2024-01-15T09:00:00Z"
    }
  ],
  "mergeConfidence": 0.95,
  "qualityScore": 0.92
}
```

### Provenance Details

- **Source List** - All systems contributing data
- **Field Mapping** - Which fields come from which source
- **Merge Confidence** - How certain the system is about identity resolution
- **Change History** - Timeline of updates

## Quality Alerts

Set up alerts for data quality issues:

### Alert Types

| Alert | Trigger | Action |
|-------|---------|--------|
| Sync Failure | Connector fails to sync | Email notification |
| Quality Drop | Score drops below threshold | Dashboard warning |
| Stale Data | No update in X hours | Badge indicator |
| Duplicate Detected | Potential duplicate found | Review queue |

### Configuring Alerts

1. Navigate to Data Lineage settings
2. Click "Alert Rules"
3. Add new rule:
   - Select condition
   - Set threshold
   - Choose notification channel
4. Save and activate

## Data Quality Widgets

Data quality indicators appear throughout the platform:

### Confidence Indicator

A circular badge showing confidence level:
- **Green ring** - High confidence (>80%)
- **Yellow ring** - Medium confidence (60-80%)
- **Red ring** - Low confidence (<60%)

### Freshness Indicator

Shows how recent the data is:
- **Pulse animation** - Updated within last hour
- **Static green** - Updated within last 24 hours
- **Yellow** - 1-7 days old
- **Red** - Over 7 days old

### Provenance Tooltip

Hover over any metric to see:
- Source systems
- Last update time
- Quality score
- Link to full lineage

## API Reference

### Get Data Sources

```bash
GET /api/data-lineage/sources
Authorization: Bearer {token}
```

### Get Quality Scores

```bash
GET /api/data-lineage/quality-scores
Authorization: Bearer {token}
```

### Get Entity Provenance

```bash
GET /api/data-lineage/entity/customer/cust_123
Authorization: Bearer {token}
```

### Get Data Flow

```bash
GET /api/data-lineage/flow
Authorization: Bearer {token}
```

### Get Quality Trends

```bash
GET /api/data-lineage/trends?days=30
Authorization: Bearer {token}
```

## Best Practices

1. **Monitor Regularly** - Check data quality daily
2. **Set Thresholds** - Define acceptable quality levels
3. **Investigate Drops** - Don't ignore quality degradation
4. **Document Sources** - Keep source documentation updated
5. **Validate Critical Data** - Extra scrutiny for high-impact data
