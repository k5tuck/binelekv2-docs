---
sidebar_position: 1
---

# Insights Hub

The **Insights Hub** is your central command center for understanding your business. It consolidates data from all connected sources into a unified view with AI-powered analytics.

## Overview

Access the Insights Hub at `/insights` in your dashboard. It provides six tabs for comprehensive business intelligence:

| Tab | Purpose |
|-----|---------|
| Overview | Key metrics, trends, and alerts |
| Forecasts | AI-powered predictive analytics |
| Customers | Customer health and lifecycle analysis |
| Segments | Visual customer segmentation |
| Market Intel | Competitor and pricing intelligence |
| Reports | Automated report generation |

## Overview Tab

The Overview tab provides a snapshot of your business health:

- **Key Metrics** - Revenue, orders, customers, conversion rate
- **Trend Indicators** - Week-over-week and month-over-month changes
- **Active Alerts** - Issues requiring attention
- **Quick Actions** - Shortcut buttons to common tasks

### Metrics Displayed

| Metric | Description | Update Frequency |
|--------|-------------|------------------|
| Revenue | Total revenue across all channels | Real-time |
| Orders | Order count and average value | Real-time |
| Customers | Active customer count | Daily |
| Conversion Rate | Visitor to customer conversion | Hourly |

## Forecasts Tab

Access AI-powered predictions for your business:

- **Revenue Forecasting** - Predict next 30/60/90 day revenue
- **Demand Forecasting** - Product demand predictions
- **Seasonality Analysis** - Identify seasonal patterns
- **Anomaly Detection** - Flag unusual patterns

### Using Forecasts

1. Select a forecast type from the dropdown
2. Choose your time horizon (30, 60, or 90 days)
3. View the prediction with confidence intervals
4. Drill down into contributing factors

## Customers Tab

Analyze your customer base:

- **Customer Health Score** - Overall customer satisfaction indicator
- **Lifetime Value (LTV)** - Average and segmented LTV
- **Churn Analysis** - At-risk customers and churn trends
- **Acquisition Metrics** - New customer trends

### Customer Health Indicators

| Score | Status | Description |
|-------|--------|-------------|
| 80-100 | Excellent | Highly engaged, low churn risk |
| 60-79 | Good | Active, moderate engagement |
| 40-59 | Fair | Declining engagement, monitor closely |
| 0-39 | At Risk | High churn risk, intervention needed |

## Segments Tab

Visualize and manage customer segments:

- **2D Scatter Plot** - Interactive customer visualization
- **Segment Cards** - Summary of each segment
- **Segment Comparison** - Side-by-side metrics
- **Custom Segments** - Create your own segments

### Default Segments

| Segment | Criteria |
|---------|----------|
| Champions | High frequency, high monetary value |
| Loyal | Consistent purchases over time |
| Potential Loyalists | Recent purchasers with good engagement |
| At Risk | Previously active, now declining |
| Hibernating | No recent activity |

## Market Intel Tab

Monitor your competitive landscape:

- **Competitor Dashboard** - Track competitor activity
- **Price Monitoring** - Compare pricing across competitors
- **Market Trends** - Industry trend analysis
- **Alerts** - Price change notifications

### Setting Up Competitor Tracking

1. Navigate to Market Intel tab
2. Click "Add Competitor"
3. Enter competitor name and website
4. Select products to track
5. Set alert thresholds

## Reports Tab

Generate and schedule automated reports:

- **Pre-built Templates** - Common report formats
- **Custom Reports** - Build your own
- **Scheduling** - Daily, weekly, monthly automation
- **Export** - PDF, CSV, Excel formats

### Available Report Templates

| Template | Contents | Frequency |
|----------|----------|-----------|
| Executive Summary | High-level KPIs | Weekly |
| Sales Report | Revenue, orders, trends | Daily |
| Customer Report | Acquisition, retention, LTV | Weekly |
| Competitive Analysis | Pricing, market position | Monthly |

## API Reference

### Get Overview Data

```bash
GET /api/hubs/insights/overview
Authorization: Bearer {token}
```

### Get Forecasts

```bash
GET /api/hubs/insights/forecasts?type=revenue&horizon=30
Authorization: Bearer {token}
```

### Get Customer Segments

```bash
GET /api/hubs/insights/segments
Authorization: Bearer {token}
```

## Data Quality

All data in the Insights Hub includes quality indicators:

- **Confidence Score** - How reliable is this metric
- **Freshness** - When was this data last updated
- **Source** - Which connectors contributed to this data

Look for the quality badge on each metric for transparency.
