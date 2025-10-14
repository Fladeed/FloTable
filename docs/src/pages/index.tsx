import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Heading as="h1" className="hero__title" style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            marginBottom: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle" style={{ 
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
            marginBottom: '3rem',
            color: 'var(--ifm-color-content-secondary)',
            lineHeight: '1.6'
          }}>
            {siteConfig.tagline}
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
              style={{
                borderRadius: '8px',
                padding: '0.8rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}>
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/preview"
              style={{
                borderRadius: '8px',
                padding: '0.8rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                border: '2px solid var(--ifm-color-primary)',
                color: 'var(--ifm-color-primary)',
                backgroundColor: 'transparent'
              }}>
              Live Preview
            </Link>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            flexWrap: 'wrap',
            opacity: '0.8'
          }}>
            <Link
              className="button button--secondary button--sm"
              to="/docs/features"
              style={{ 
                borderRadius: '6px',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>
              Features
            </Link>
            <Link
              className="button button--secondary button--sm"
              to="/docs/examples"
              style={{ 
                borderRadius: '6px',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>
              Examples
            </Link>
            <Link
              className="button button--secondary button--sm"
              to="/docs/api"
              style={{ 
                borderRadius: '6px',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>
              API Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Documentation`}
      description="Powerful, responsive table components for React with views system, advanced filtering, infinite scroll, mobile optimization, and TypeScript support">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
