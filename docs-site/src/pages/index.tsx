import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/api/overview">
              API Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customer Documentation',
    description: 'Learn how to use Binelek to streamline your business operations, manage workflows, and get insights from your data.',
    link: '/docs/intro',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Developer API',
    description: 'Build powerful integrations with our REST API. Connect your tools, automate workflows, and extend Binelek functionality.',
    link: '/docs/api/overview',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'MCP Integration',
    description: 'Use Model Context Protocol to connect Binelek with AI assistants like Claude for natural language business operations.',
    link: '/docs/developers/mcp-integration',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Integrations',
    description: 'Connect with QuickBooks, Shopify, Google Workspace, and 50+ other popular business tools.',
    link: '/docs/integrations/mcp',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

function Feature({title, description, link, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIconWrapper}>
          {icon}
        </div>
        <div className={styles.featureContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.featureArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.quickLinksGrid}>
          <Link to="/docs/getting-started/installation" className={styles.quickLink}>
            <span>Installation Guide</span>
          </Link>
          <Link to="/docs/modules/ops-copilot" className={styles.quickLink}>
            <span>Ops Copilot</span>
          </Link>
          <Link to="/docs/api/overview" className={styles.quickLink}>
            <span>REST API</span>
          </Link>
          <Link to="/docs/developers/mcp-integration" className={styles.quickLink}>
            <span>MCP Setup</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation for Binelek - The AI-powered command center for growing businesses">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Explore the Documentation</h2>
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
        <QuickLinks />
      </main>
    </Layout>
  );
}
