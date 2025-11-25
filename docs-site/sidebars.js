// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Customer-facing documentation sidebar
  customerSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'customers/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/ops-copilot',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/mcp',
      ],
    },
  ],

  // Developer documentation sidebar (for API integrators)
  developerSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'developers/architecture',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'developers/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'MCP Integration',
      items: [
        'developers/mcp-integration',
      ],
    },
  ],
};

export default sidebars;
