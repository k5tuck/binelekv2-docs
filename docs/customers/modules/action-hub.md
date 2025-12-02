---
sidebar_position: 2
---

# Action Hub

The **Action Hub** is where you transform insights into results. Run simulations, plan initiatives, and automate workflows all in one place.

## Overview

Access the Action Hub at `/action` in your dashboard. It provides four tabs for taking action on your business:

| Tab | Purpose |
|-----|---------|
| Simulator | "What-if" scenario modeling |
| Planner | Initiative tradeoff analysis |
| Automations | Workflow management |
| History | Action tracking and outcomes |

## Simulator Tab

The Simulator lets you model "what-if" scenarios using causal relationships in your business data.

### How It Works

1. **Select a Metric** - Choose the metric you want to change (e.g., "Marketing Spend")
2. **Set the Change** - Enter the percentage or absolute change
3. **Run Simulation** - The system calculates downstream effects
4. **Review Results** - See impact on related metrics

### Causal Graph

The simulator uses a causal graph that maps relationships between business metrics:

```
Marketing Spend → Website Traffic → Conversions → Revenue
                                  ↘ Cart Abandonment Rate

Price Change → Demand → Revenue
            ↘ Customer Satisfaction
```

### Simulation Results

Results are displayed as:
- **Waterfall Chart** - Shows cascade of effects
- **Impact Table** - Quantified changes per metric
- **Confidence Levels** - How certain each prediction is
- **Time Lag** - When effects are expected to materialize

### Example Scenario

**Scenario:** Increase marketing spend by 20%

| Metric | Current | Projected | Change | Confidence |
|--------|---------|-----------|--------|------------|
| Website Traffic | 10,000/mo | 12,400/mo | +24% | High |
| Conversions | 200/mo | 236/mo | +18% | Medium |
| Revenue | $50,000 | $58,000 | +16% | Medium |

## Planner Tab

The Planner helps you analyze and compare business initiatives before committing resources.

### Initiative Analysis

For each initiative, the planner calculates:
- **Expected ROI** - Return on investment
- **Time to Value** - When you'll see results
- **Risk Score** - Likelihood of failure
- **Resource Requirements** - Budget, time, people needed

### Tradeoff Visualization

Compare multiple initiatives side-by-side:

| Initiative | ROI | Time | Risk | Investment |
|------------|-----|------|------|------------|
| New Product Launch | 150% | 6 mo | Medium | $50,000 |
| Marketing Campaign | 80% | 1 mo | Low | $10,000 |
| Process Automation | 200% | 3 mo | Low | $25,000 |

### Creating an Initiative

1. Click "New Initiative"
2. Fill in details:
   - Name and description
   - Expected outcomes
   - Resource requirements
   - Timeline
3. Run analysis
4. Compare with other initiatives
5. Approve and track

## Automations Tab

Manage your business automations powered by Ops Copilot.

### Active Automations

View and manage running automations:
- **Status** - Active, paused, or failed
- **Trigger** - What initiates the automation
- **Last Run** - When it last executed
- **Success Rate** - Historical performance

### Automation Types

| Type | Description | Example |
|------|-------------|---------|
| Scheduled | Runs on a schedule | Daily reports |
| Triggered | Runs on events | New customer welcome |
| Conditional | Runs when conditions met | Low inventory alert |
| AI-Suggested | Recommended by AI | Churn prevention |

### Creating Automations

1. Click "New Automation"
2. Select trigger type
3. Define conditions
4. Add actions
5. Test and activate

## History Tab

Track all actions taken and their outcomes.

### Timeline View

The history shows a chronological timeline of:
- **Simulations Run** - What-if scenarios tested
- **Initiatives Launched** - Business initiatives started
- **Automations Executed** - Workflow executions
- **Manual Actions** - User-initiated changes

### Filtering History

Filter by:
- Date range
- Action type
- User
- Status (success/failure)
- Impact level

### Learning from History

Each history entry includes:
- **What was done** - The action taken
- **What was expected** - Predicted outcomes
- **What happened** - Actual results
- **Lessons learned** - AI-generated insights

## API Reference

### Get Causal Relationships

```bash
GET /api/hubs/action/simulator/relationships
Authorization: Bearer {token}
```

### Run Simulation

```bash
POST /api/hubs/action/simulator/simulate
Authorization: Bearer {token}
Content-Type: application/json

{
  "metricId": "marketing_spend",
  "changePercent": 20,
  "timeHorizon": 90
}
```

### Get Initiatives

```bash
GET /api/hubs/action/planner/initiatives
Authorization: Bearer {token}
```

### Get Action History

```bash
GET /api/hubs/action/history?startDate=2024-01-01&type=simulation
Authorization: Bearer {token}
```

## Best Practices

1. **Start Small** - Test simulations with small changes first
2. **Validate Assumptions** - Check that causal relationships match your business
3. **Track Outcomes** - Compare predictions to actual results
4. **Iterate** - Use history to improve future predictions
5. **Combine Tools** - Use Simulator to test, Planner to prioritize, Automations to execute
