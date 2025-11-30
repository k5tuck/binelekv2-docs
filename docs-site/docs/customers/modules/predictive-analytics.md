---
sidebar_position: 5
---

# Predictive Analytics

Predictive Analytics uses AI and machine learning to forecast your business outcomes. Ask questions in plain English and get data-driven predictions for sales, inventory, customer behavior, and more.

## Features

### Sales Forecasting
Predict future sales based on historical data, seasonal trends, and market factors.

**Capabilities:**
- Revenue forecasting (daily, weekly, monthly, quarterly)
- Product-level sales predictions
- Seasonal trend analysis
- What-if scenario modeling

### Inventory Prediction
Optimize stock levels by predicting demand before it happens.

**Capabilities:**
- Demand forecasting per SKU
- Reorder point recommendations
- Stockout risk alerts
- Seasonal inventory planning

### Customer Churn Prevention
Identify at-risk customers before they leave and take action.

**Capabilities:**
- Churn probability scoring
- Risk factor identification
- Recommended retention actions
- Customer segment analysis

### Custom Connectors
Connect any data source to feed your predictions.

**Supported Sources:**
- REST APIs with automatic schema detection
- Webhooks for real-time data
- Database connections (PostgreSQL, MySQL)
- File uploads (CSV, Excel, JSON)

## Getting Started

### Step 1: Connect Your Data

1. Go to **Predictive Analytics** in the sidebar
2. Click **Data Sources**
3. Connect your existing platform connectors or add new sources
4. Wait for initial data processing (10-30 minutes)

### Step 2: Choose a Prediction Template

1. Browse available prediction templates
2. Select one that matches your business need
3. Configure parameters (time range, confidence level, etc.)
4. The system will train a model on your data

### Step 3: Get Predictions

1. View predictions in the dashboard
2. Ask follow-up questions in natural language
3. Export results or set up alerts

## Natural Language Queries

Ask questions in plain English:

| Question | What You Get |
|----------|--------------|
| "What will my sales be next month?" | Revenue forecast with confidence interval |
| "When will I run out of inventory for Product X?" | Stockout date prediction |
| "Which customers are likely to churn?" | Risk-scored customer list |
| "What if I raise prices by 10%?" | Revenue impact analysis |
| "What are my best-selling products next quarter?" | Ranked product predictions |

## Prediction Templates

### Built-in Templates

| Template | Use Case | Required Data |
|----------|----------|---------------|
| Sales Forecast | Predict revenue | Transaction history |
| Inventory Demand | Forecast stock needs | Sales + inventory data |
| Customer Churn | Identify at-risk customers | Customer activity data |
| Cash Flow | Predict cash position | Financial transactions |
| Seasonal Trends | Identify patterns | 12+ months of data |

### Custom Templates

Create custom prediction models:

1. Go to **Templates** → **Create Custom**
2. Select target variable (what to predict)
3. Choose input features (data that influences prediction)
4. Configure training parameters
5. Review accuracy metrics before deploying

## Understanding Accuracy

### Model Accuracy Dashboard

Monitor how well your predictions perform:

- **Accuracy Score**: Overall prediction accuracy (target: 85%+)
- **Confidence Interval**: Range where predictions typically fall
- **Drift Detection**: Alerts when model performance degrades
- **Improvement Trend**: Accuracy over time as model learns

### Accuracy Factors

Predictions improve with:
- More historical data (12+ months ideal)
- Consistent data quality
- Regular model retraining
- Feedback on prediction outcomes

## Custom Connectors

### REST API Connector

Connect any REST API:

1. **Basic Setup**
   - Enter base URL
   - Configure authentication (API key, Bearer token, OAuth)

2. **Schema Detection**
   - System automatically detects API fields
   - Or upload OpenAPI/Swagger specification

3. **Field Mapping**
   - Map API fields to prediction inputs
   - Set data types and transformations

### Webhook Connector

Receive real-time data:

1. Generate a unique webhook URL
2. Configure your source to POST data
3. Define the expected payload schema
4. Data flows automatically into predictions

### Database Connector

Direct database connections:

- PostgreSQL
- MySQL
- SQL Server
- MongoDB (coming soon)

### File Upload

Manual data imports:

- CSV files
- Excel spreadsheets (.xlsx)
- JSON files

## API Endpoints

Key API endpoints for developers:

| Endpoint | Description |
|----------|-------------|
| `GET /api/modules/predictive-analytics/overview` | Dashboard overview |
| `GET /api/modules/predictive-analytics/templates` | List prediction templates |
| `POST /api/modules/predictive-analytics/predictions` | Create new prediction |
| `GET /api/modules/predictive-analytics/predictions/{id}` | Get prediction results |
| `POST /api/modules/predictive-analytics/ask` | Natural language query |
| `GET /api/modules/predictive-analytics/data-sources` | List connected sources |
| `POST /api/modules/predictive-analytics/data-sources/custom-connectors` | Create custom connector |

See [API Reference](/docs/developers/api-reference) for complete documentation.

## Best Practices

1. **Start with quality data** - Clean, consistent data produces better predictions
2. **Use appropriate time ranges** - Match prediction horizon to your planning needs
3. **Monitor accuracy** - Regularly check model performance and retrain when needed
4. **Combine with dashboards** - Use Mini Foundry dashboards alongside predictions
5. **Act on insights** - Set up automations in Ops Copilot based on predictions

## Data Privacy

- All prediction models are tenant-isolated
- Your data never trains models for other customers
- Models can be deleted at any time
- Export or delete your data on request

## Frequently Asked Questions

**Q: How much data do I need for accurate predictions?**
A: Minimum 3 months of data for basic predictions. 12+ months recommended for seasonal patterns.

**Q: How often should I retrain models?**
A: Monthly retraining is recommended. The system will alert you if accuracy drops.

**Q: Can I use external data in predictions?**
A: Yes! Use custom connectors to bring in any external data (weather, market data, etc.).

**Q: What if a prediction is wrong?**
A: Provide feedback through the interface. This helps improve future predictions.

**Q: Are predictions updated automatically?**
A: Yes, predictions refresh when new data arrives. Frequency depends on your data sync schedule.
