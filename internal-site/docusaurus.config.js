// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: 'Binelek Internal Docs',
  tagline: 'Internal documentation and resources for the Binelek team',
  favicon: 'img/favicon.ico',

  // Production URL - Password protected via Vercel
  url: 'https://internal.binelek.io',
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
    // Internal site is password protected via Vercel Deployment Protection
    isInternalSite: true,
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
          editUrl: 'https://github.com/k5tuck/binelekv2-docs/tree/main/internal-site/',
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
      // Internal banner to indicate protected content
      announcementBar: {
        id: 'internal_notice',
        content:
          'This is an internal documentation site. Do not share access credentials.',
        backgroundColor: '#0c4a6e',
        textColor: '#f0f9ff',
        isCloseable: false,
      },
      image: 'img/binelek-social-card.jpg',
      navbar: {
        title: 'Binelek Internal',
        logo: {
          alt: 'Binelek Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'internalSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/architecture/overview',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/business/roadmap',
            label: 'Business',
            position: 'left',
          },
          {
            href: 'https://docs.binelek.io',
            label: 'Public Docs',
            position: 'right',
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
            title: 'Internal Docs',
            items: [
              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
              },
              {
                label: 'Business',
                to: '/docs/business/roadmap',
              },
              {
                label: 'Security',
                to: '/docs/security/overview',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Public Documentation',
                href: 'https://docs.binelek.io',
              },
              {
                label: 'Main Website',
                href: 'https://binelek.io',
              },
            ],
          },
          {
            title: 'Team',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/k5tuck/binelekv2-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Binelek. Internal Use Only.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python', 'typescript', 'yaml', 'csharp', 'docker'],
      },
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'binelek-internal',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
      },
    }),
};

export default config;
