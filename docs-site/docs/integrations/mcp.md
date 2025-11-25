---
sidebar_position: 1
---

# Model Context Protocol (MCP) Integration

The SMB AI Command Platform supports the **Model Context Protocol (MCP)**, allowing you to connect AI assistants like Claude directly to your business data and tools.

## What is MCP?

MCP is an open protocol that enables AI models to securely access external data sources and tools. With MCP, you can:

- Query your business data using natural language
- Execute actions in connected systems
- Build custom AI-powered workflows

## Setting Up the MCP Server

### Prerequisites

- Node.js 18+
- SMB AI Platform account
- API key

### Installation

```bash
# Clone the MCP server (included as submodule)
cd binelekv2-smb-platform-backend/mcp-server

# Install dependencies
npm install

# Configure
cp .env.example .env
# Edit .env with your API credentials
```

### Configuration

Create a `.env` file:

```bash
SMB_API_URL=https://api.smb-ai-platform.com
SMB_API_KEY=your-api-key
SMB_TENANT_ID=your-tenant-id
```

### Running the Server

```bash
npm start
```

## Connecting to Claude Desktop

Add to your Claude Desktop config (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "smb-ai-platform": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "SMB_API_URL": "https://api.smb-ai-platform.com",
        "SMB_API_KEY": "your-api-key",
        "SMB_TENANT_ID": "your-tenant-id"
      }
    }
  }
}
```

## Available Tools

### Query Tool
Execute natural language queries against your business data.

```typescript
// Example: Query revenue
{
  "tool": "smb_query",
  "arguments": {
    "query": "What's our revenue this month?"
  }
}
```

### Connector Tools

#### Shopify
```typescript
{
  "tool": "shopify_orders",
  "arguments": {
    "action": "list",
    "status": "unfulfilled"
  }
}
```

#### HubSpot
```typescript
{
  "tool": "hubspot_contacts",
  "arguments": {
    "action": "search",
    "query": "last_contact > 30 days"
  }
}
```

#### QuickBooks
```typescript
{
  "tool": "quickbooks_invoices",
  "arguments": {
    "action": "list",
    "status": "overdue"
  }
}
```

## Example Conversations

### Check Sales Performance
**User:** "How are sales doing this week compared to last week?"

**Claude:** Uses the `smb_query` tool to fetch sales data and provides analysis.

### Send Invoice Reminders
**User:** "Send email reminders to customers with overdue invoices"

**Claude:**
1. Uses `quickbooks_invoices` to get overdue invoices
2. Uses `gmail_send` to compose and send reminder emails
3. Reports results

### Monitor Security
**User:** "Which employees don't have MFA enabled?"

**Claude:** Uses `security_check` tool to fetch MFA status and lists non-compliant users.

## Security Considerations

- API keys are stored securely and never exposed to the LLM
- All requests are authenticated and authorized
- Audit logs track all MCP actions
- Sensitive operations require confirmation

## Troubleshooting

### Connection Issues
```bash
# Test API connectivity
curl https://api.smb-ai-platform.com/health
```

### Authentication Errors
- Verify API key is correct
- Check tenant ID matches your account
- Ensure API key has required permissions

## Support

For MCP integration support:
- Email: support@binelek.io
