---
sidebar_position: 1
---

# Ops Copilot

Automate your daily operations with AI-powered task management, email automation, and workflow orchestration.

## Overview

Ops Copilot is your AI assistant for day-to-day business operations. It can:

- **Manage Tasks**: Create, update, and track tasks using natural language
- **Automate Email**: Draft, send, and respond to emails intelligently
- **Orchestrate Workflows**: Set up automated workflows triggered by events
- **CRM Integration**: Sync with HubSpot, Zoho, and other CRMs

## Getting Started

### Example Queries

```
"Create a task to follow up with John next Tuesday"
"Send an email to all customers with overdue invoices"
"Set up a workflow to email new leads within 24 hours"
"Show me my tasks due this week"
```

## API Endpoints

### Tasks

```bash
# List tasks
GET /api/modules/ops-copilot/tasks

# Create task
POST /api/modules/ops-copilot/tasks
{
  "title": "Follow up with John",
  "due_date": "2025-01-15",
  "priority": "high"
}

# Update task
PUT /api/modules/ops-copilot/tasks/:id

# Delete task
DELETE /api/modules/ops-copilot/tasks/:id
```

### Workflows

```bash
# List workflows
GET /api/modules/ops-copilot/workflows

# Create workflow
POST /api/modules/ops-copilot/workflows
{
  "name": "New Lead Welcome",
  "trigger": {
    "type": "event",
    "event": "hubspot.contact.created"
  },
  "steps": [
    {
      "action": "gmail.send",
      "template": "welcome_email"
    }
  ]
}
```

### Email Actions

```bash
# Send email
POST /api/modules/ops-copilot/email/send
{
  "to": "customer@example.com",
  "subject": "Following up",
  "body": "Hi, just checking in..."
}

# Draft email (AI-generated)
POST /api/modules/ops-copilot/email/draft
{
  "prompt": "Write a follow-up email to John about the Q4 proposal",
  "context": {
    "customer_name": "John Smith",
    "proposal_date": "2024-12-15"
  }
}
```

## Workflow Triggers

| Trigger Type | Description | Example |
|-------------|-------------|---------|
| `schedule` | Time-based | "Every Monday at 9am" |
| `event` | External event | "When new HubSpot contact" |
| `manual` | User-initiated | "Run now" button |
| `condition` | Data condition | "When invoice > 30 days" |

## Connectors Used

- **Gmail** - Email send/receive
- **HubSpot** - CRM contacts and deals
- **Google Calendar** - Event management
- **Slack** - Notifications (coming soon)

## Best Practices

1. **Be Specific**: "Send invoice reminder to customers with invoices over 30 days" is better than "Send reminders"

2. **Use Templates**: Set up email templates for common scenarios

3. **Review Before Sending**: Enable confirmation for bulk actions

4. **Monitor Workflows**: Check workflow logs regularly
