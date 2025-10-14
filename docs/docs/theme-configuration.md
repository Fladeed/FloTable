---
sidebar_position: 4
---

# Theme Configuration

FloTable components are designed to work seamlessly with your application's existing theme system. The library no longer includes built-in theme handling, giving you complete control over styling and theming.

## Why No Built-in Theming?

We removed built-in theme handling from FloTable for several key reasons:

- **Separation of Concerns**: Theme management is an application-level responsibility
- **Flexibility**: Works with any theme system (Material-UI, Chakra UI, custom CSS, etc.)
- **Simplicity**: Reduces library complexity and bundle size
- **Consistency**: Ensures theme consistency across your entire application

## Setting Up Ant Design Theming

Since FloTable uses Ant Design components internally, you'll need to configure Ant Design's theme provider in your application.

### Basic Setup

```tsx
import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { TableWithViews } from 'flo-table-with-views';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <TableWithViews
        // ... your props
      />
    </ConfigProvider>
  );
}
```

### Dark Mode Support

```tsx
import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect theme from your application's theme system
    const detectTheme = () => {
      // Example: reading from data attribute
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(isDarkMode);
    };

    detectTheme();

    // Listen for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: isDark ? '#177ddc' : '#1890ff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

### Integration with Popular Frameworks

#### Next.js with next-themes

```tsx
import { useTheme } from 'next-themes';
import { ConfigProvider, theme } from 'antd';

function AntdThemeProvider({ children }) {
  const { theme: nextTheme } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: nextTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: nextTheme === 'dark' ? '#177ddc' : '#1890ff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

#### Docusaurus Integration

```tsx
// src/theme/Root.tsx
import React, { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';

export default function Root({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const detectTheme = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(isDarkMode);
    };

    detectTheme();
    
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: isDark ? '#25c2a0' : '#2e8555',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

## Custom Styling

FloTable components accept className props for custom styling:

```tsx
<TableWithViews
  className="my-custom-table"
  headerClassName="table-header"
  titleClassName="table-title"
  cardClassName="table-card"
  tabsClassName="table-tabs"
  tableClassName="inner-table"
  // ... other props
/>
```

## Best Practices

1. **Set up theme provider at the root level** of your application
2. **Use consistent color schemes** across your app and FloTable
3. **Test theme switching** to ensure all components update correctly
4. **Consider accessibility** when choosing color combinations
5. **Use CSS custom properties** for easy theme customization

## Migration from v1.x

If you were using the built-in theming features (`enableTheming`, `primaryColor`, `forceTheme`), you'll need to:

1. Remove these props from your `TableWithViews` components
2. Set up Ant Design's `ConfigProvider` at your application root
3. Implement your own theme detection logic if needed

This change gives you more control and flexibility over your application's theming while reducing the library's complexity.
