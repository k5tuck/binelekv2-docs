---
sidebar_position: 3
---

# MCP Integration Guide

The Model Context Protocol (MCP) server allows AI assistants like Claude to interact with the SMB AI Command Platform.

## What is MCP?

MCP (Model Context Protocol) is an open protocol that enables AI assistants to interact with external tools and data sources. The SMB Platform provides an MCP server that exposes platform functionality as tools.

## Available Tools

### Query Tools

#### `smb_query`
Ask natural language questions about your business data.

```json
{
  "name": "smb_query",
  "arguments": {
    "query": "What was my revenue last month?"
  }
}
```

#### `smb_search`
Search across all connected data sources.

```json
{
  "name": "smb_search",
  "arguments": {
    "query": "customer orders over $500",
    "sources": ["shopify", "stripe"]
  }
}
```

### Automation Tools

#### `smb_list_automations`
List all configured automations.

```json
{
  "name": "smb_list_automations",
  "arguments": {}
}
```

#### `smb_run_automation`
Trigger an automation to run immediately.

```json
{
  "name": "smb_run_automation",
  "arguments": {
    "automationId": "auto_123"
  }
}
```

#### `smb_create_automation`
Create a new automation.

```json
{
  "name": "smb_create_automation",
  "arguments": {
    "name": "Daily Sales Report",
    "trigger": "schedule",
    "schedule": "0 9 * * *",
    "actions": [
      {
        "type": "generate_report",
        "template": "daily_sales"
      },
      {
        "type": "send_email",
        "to": "team@company.com"
      }
    ]
  }
}
```

### Dashboard Tools

#### `smb_get_metrics`
Get current business metrics.

```json
{
  "name": "smb_get_metrics",
  "arguments": {
    "metrics": ["revenue", "orders", "customers"],
    "period": "last_30_days"
  }
}
```

#### `smb_list_dashboards`
List available dashboards.

```json
{
  "name": "smb_list_dashboards",
  "arguments": {}
}
```

### Security Tools

#### `smb_security_status`
Get current security score and issues.

```json
{
  "name": "smb_security_status",
  "arguments": {}
}
```

#### `smb_list_users`
List team members and their security status.

```json
{
  "name": "smb_list_users",
  "arguments": {}
}
```

### Marketplace Tools

#### `smb_track_product`
Start tracking a product for price monitoring.

```json
{
  "name": "smb_track_product",
  "arguments": {
    "productUrl": "https://amazon.com/dp/B08XYZ123",
    "yourPrice": 49.99
  }
}
```

#### `smb_price_comparison`
Get price comparison for tracked products.

```json
{
  "name": "smb_price_comparison",
  "arguments": {
    "productId": "prod_123"
  }
}
```

### Connector Tools

#### `smb_list_connectors`
List all connected integrations.

```json
{
  "name": "smb_list_connectors",
  "arguments": {}
}
```

#### `smb_sync_connector`
Trigger a data sync for a connector.

```json
{
  "name": "smb_sync_connector",
  "arguments": {
    "connectorId": "conn_shopify_123"
  }
}
```

## Installation

### With Claude Desktop

Add to your Claude Desktop configuration:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "smb-platform": {
      "command": "npx",
      "args": ["-y", "@smb-platform/mcp-server"],
      "env": {
        "SMB_API_URL": "https://api.smb-ai-platform.com",
        "SMB_API_TOKEN": "your-api-token",
        "SMB_TENANT_ID": "your-tenant-id"
      }
    }
  }
}
```

### Running Locally

```bash
# Clone the repository
git clone https://github.com/k5tuck/binelekv2-smb-platform-backend.git
cd binelekv2-smb-platform-backend/mcp-server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Build and run
npm run build
npm start
```

## Authentication

The MCP server requires:

1. **API Token**: Generate from Settings > API Keys in the platform
2. **Tenant ID**: Found in Settings > Organization

```bash
# .env file
SMB_API_URL=https://api.smb-ai-platform.com
SMB_API_TOKEN=smb_sk_...
SMB_TENANT_ID=tenant_...
```

## Example Conversations

### Business Query

**User:** "What was my best-selling product last month?"

**Claude uses:** `smb_query` tool

**Response:** "Based on your Shopify data, your best-selling product last month was the 'Wireless Bluetooth Earbuds' with 234 units sold, generating $11,466 in revenue."

### Automation

**User:** "Set up a reminder to send invoice emails every Monday at 9am"

**Claude uses:** `smb_create_automation` tool

**Response:** "I've created a weekly automation that will send invoice reminder emails every Monday at 9:00 AM. The automation is now active and will run automatically."

### Security Check

**User:** "How's our security looking?"

**Claude uses:** `smb_security_status` tool

**Response:** "Your security score is 85/100. There are 2 open issues: 3 team members haven't enabled MFA yet, and there's an outdated integration that needs reconnecting."

## Development

### Running in Development Mode

```bash
cd mcp-server
npm run dev
```

This watches for file changes and rebuilds automatically.

### Testing Tools

Use the MCP Inspector to test tools:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

### Adding New Tools

1. Create tool definition in `src/tools/`
2. Register in `src/index.ts`
3. Implement handler
4. Document in this guide

## Troubleshooting

### Connection Issues

```
Error: Failed to connect to SMB API
```

- Verify `SMB_API_URL` is correct
- Check your API token is valid
- Ensure your tenant ID exists

### Authentication Errors

```
Error: Authentication failed
```

- Regenerate API token in platform settings
- Verify token has necessary permissions

### Tool Errors

```
Error: Tool execution failed
```

- Check the tool arguments are correct
- Verify you have access to the requested resource
- Check connector is connected (for data queries)
