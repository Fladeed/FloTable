import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '�️ Views System',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Multiple predefined filtered views of your data. Switch between different
        perspectives with a single click - no manual filter configuration needed.
        Perfect for dashboards and data management.
      </>
    ),
  },
  {
    title: '🔍 Advanced Filtering',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Built-in search, sort, and filter capabilities with quick filters for common
        use cases. Powerful filtering system that works seamlessly with the views.
      </>
    ),
  },
  {
    title: '📱 Mobile First',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Automatically optimized for mobile devices with touch-friendly interactions,
        horizontal scrolling helpers, and adaptive layouts for any screen size.
      </>
    ),
  },
  {
    title: '♾️ Infinite Scroll',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Handle large datasets effortlessly with infinite scrolling. Automatically
        loads more data as users scroll, with pagination fallback for desktop.
      </>
    ),
  },
  {
    title: '⚡ Action System',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Configurable action buttons with tooltips, dropdowns, and custom handlers.
        Build powerful table toolbars for CRUD operations and bulk actions.
      </>
    ),
  },
  {
    title: '🛠️ TypeScript First',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Built with TypeScript and React. Full type safety, comprehensive API,
        extensive customization options, and seamless Ant Design integration.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.slice(0, 3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row" style={{ marginTop: '2rem' }}>
          {FeatureList.slice(3, 6).map((props, idx) => (
            <Feature key={idx + 3} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
