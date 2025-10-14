import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Views System',
    icon: '👁️',
    description: (
      <>
        Multiple predefined filtered views of your data. Switch between different
        perspectives with a single click - no manual filter configuration needed.
        Perfect for dashboards and data management.
      </>
    ),
  },
  {
    title: 'Advanced Filtering',
    icon: '🔍',
    description: (
      <>
        Built-in search, sort, and filter capabilities with quick filters for common
        use cases. Powerful filtering system that works seamlessly with the views.
      </>
    ),
  },
  {
    title: 'Mobile Optimized',
    icon: '📱',
    description: (
      <>
        Automatically optimized for mobile devices with touch-friendly interactions,
        horizontal scrolling helpers, and adaptive layouts for any screen size.
      </>
    ),
  },
  {
    title: 'Infinite Scroll',
    icon: '♾️',
    description: (
      <>
        Handle large datasets effortlessly with infinite scrolling. Automatically
        loads more data as users scroll, with pagination fallback for desktop.
      </>
    ),
  },
  {
    title: 'Action System',
    icon: '⚡',
    description: (
      <>
        Flexible action system for row and bulk operations. Custom actions, 
        confirmations, and seamless integration with your business logic.
      </>
    ),
  },
  {
    title: 'TypeScript Ready',
    icon: '🔷',
    description: (
      <>
        Full TypeScript support with comprehensive type definitions. 
        IntelliSense support and type safety for better development experience.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '3rem' }}>
      <div style={{ 
        textAlign: 'center',
        padding: '2rem 1rem',
        backgroundColor: 'var(--ifm-background-surface-color)',
        borderRadius: '12px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        height: '100%',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}>
          {icon}
        </div>
        <Heading as="h3" style={{ 
          fontSize: '1.4rem',
          marginBottom: '1rem',
          color: 'var(--ifm-color-content)',
          fontWeight: '600'
        }}>
          {title}
        </Heading>
        <p style={{ 
          color: 'var(--ifm-color-content-secondary)',
          lineHeight: '1.6',
          fontSize: '0.95rem',
          margin: '0'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section style={{ 
      padding: '4rem 0',
      backgroundColor: 'var(--ifm-background-color)'
    }}>
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
          maxWidth: '600px',
          margin: '0 auto 4rem auto'
        }}>
          <Heading as="h2" style={{ 
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: 'var(--ifm-color-content)'
          }}>
            Why Choose FloTable?
          </Heading>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'var(--ifm-color-content-secondary)',
            lineHeight: '1.6'
          }}>
            Built for modern React applications with performance, accessibility, and developer experience in mind.
          </p>
        </div>
        <div className="row">
          {FeatureList.slice(0, 3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          {FeatureList.slice(3, 6).map((props, idx) => (
            <Feature key={idx + 3} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}