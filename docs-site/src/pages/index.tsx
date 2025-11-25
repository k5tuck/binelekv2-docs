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
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customer Documentation',
    description: 'Learn how to use Binelek to streamline your business operations, manage workflows, and get insights from your data.',
    link: '/docs/getting-started/quick-start',
  },
  {
    title: 'Developer API',
    description: 'Build powerful integrations with our REST API. Connect your tools, automate workflows, and extend Binelek functionality.',
    link: '/docs/api/overview',
  },
  {
    title: 'MCP Integration',
    description: 'Use Model Context Protocol to connect Binelek with AI assistants like Claude for natural language business operations.',
    link: '/docs/developers/mcp/overview',
  },
  {
    title: 'Integrations',
    description: 'Connect with QuickBooks, Shopify, Google Workspace, and 50+ other popular business tools.',
    link: '/docs/integrations/overview',
  },
];

function Feature({title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <Link to={link} className={styles.featureCard}>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </div>
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
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
