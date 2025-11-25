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
              View Documentation
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
  badge?: string;
  icon: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Architecture',
    description: 'System design, infrastructure, and technical decisions that power the Binelek platform.',
    link: '/docs/architecture/system-overview',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Business',
    description: 'Roadmap, pricing strategy, go-to-market plans, and competitive analysis.',
    link: '/docs/business/product-vision',
    badge: 'Confidential',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Security',
    description: 'Security policies, compliance requirements, data protection, and incident response.',
    link: '/docs/security/security-model',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Data Flow',
    description: 'How data moves through the system, from ingestion to processing to storage.',
    link: '/docs/architecture/data-flow',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

function Feature({title, description, link, badge, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIconWrapper}>
          {icon}
        </div>
        <div className={styles.featureContent}>
          <div className={styles.featureHeader}>
            <h3>{title}</h3>
            {badge && <span className={styles.badge}>{badge}</span>}
          </div>
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

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Internal documentation for the Binelek team">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Internal Resources</h2>
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
