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
            View Documentation
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
  badge?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Architecture',
    description: 'System design, infrastructure, and technical decisions that power the Binelek platform.',
    link: '/docs/architecture/overview',
  },
  {
    title: 'Business',
    description: 'Roadmap, pricing strategy, go-to-market plans, and competitive analysis.',
    link: '/docs/business/roadmap',
    badge: 'Confidential',
  },
  {
    title: 'Security',
    description: 'Security policies, compliance requirements, data protection, and incident response.',
    link: '/docs/security/overview',
  },
  {
    title: 'Operations',
    description: 'Deployment procedures, monitoring, runbooks, and on-call processes.',
    link: '/docs/operations/deployment',
  },
];

function Feature({title, description, link, badge}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureHeader}>
          <h3>{title}</h3>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
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
      description="Internal documentation for the Binelek team">
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
