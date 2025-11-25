// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: 'Binelek Documentation',
  tagline: 'The AI-powered command center for growing businesses',
  favicon: 'img/favicon.ico',

  // Production URL
  url: 'https://docs.binelek.io',
  baseUrl: '/',

  organizationName: 'k5tuck',
  projectName: 'binelekv2-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
  },

  scripts: [
    {
      src: 'https://cdn.vercel-insights.com/v1/script.js',
      defer: true,
      'data-endpoint': '/api/_vercel/insights/event',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-XXXXXXX',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/binelek-social-card.jpg',
      navbar: {
        title: 'Binelek',
        logo: {
          alt: 'Binelek Logo',
          src: 'img/logo.png',
          style: { height: '32px' },
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'customerSidebar',
            position: 'left',
            label: 'Customers',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developerSidebar',
            position: 'left',
            label: 'Developers',
          },
          {
            to: '/docs/api/overview',
            label: 'API Reference',
            position: 'left',
          },
          {
            href: 'https://binelek.io',
            label: 'Main Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/customers/getting-started',
              },
              {
                label: 'API Reference',
                to: '/docs/api/overview',
              },
              {
                label: 'MCP Integration',
                to: '/docs/integrations/mcp',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Main Website',
                href: 'https://binelek.io',
              },
              {
                label: 'Schedule a Demo',
                href: 'https://binelek.io/demo',
              },
              {
                label: 'Status',
                href: 'https://binelek.io/status',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Contact Us',
                href: 'https://binelek.io/contact',
              },
              {
                label: 'Help Center',
                href: 'https://binelek.io/help',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Binelek. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python', 'typescript', 'yaml'],
      },
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'binelek-docs',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
      },
    }),
};

export default config;
