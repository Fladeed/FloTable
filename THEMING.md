# Theming Support

The `flo-table-with-views` library now includes comprehensive theming support for Ant Design components. This ensures that your table components will automatically adapt to your application's theme (light/dark mode).

## Features

- ✅ Automatic light/dark theme detection
- ✅ Support for multiple theme detection methods
- ✅ Comprehensive Ant Design component theming
- ✅ Customizable primary colors
- ✅ Framework-agnostic (works with Docusaurus, Next.js, etc.)

## Quick Start

### Option 1: Automatic Theming (Recommended)

The `TableWithViews` component includes automatic theming by default:

```tsx
import { TableWithViews } from 'flo-table-with-views';

function MyComponent() {
  return (
    <TableWithViews
      // ... your props
      enableTheming={true} // Default value
    />
  );
}
```

### Option 2: App-Level Theming

For better performance and consistency across multiple components, wrap your app with the `AntdConfigProvider`:

```tsx
import { AntdConfigProvider, TableWithViews } from 'flo-table-with-views';

function App() {
  return (
    <AntdConfigProvider>
      <TableWithViews
        // ... your props
        enableTheming={false} // Disable component-level theming
      />
      {/* Other components that use Ant Design */}
    </AntdConfigProvider>
  );
}
```

### Option 3: Using Higher-Order Component

```tsx
import { withTheme, TableWithViews } from 'flo-table-with-views';

const ThemedTable = withTheme(TableWithViews);

function MyComponent() {
  return (
    <ThemedTable
      // ... your props
      enableTheming={false} // HOC handles theming
    />
  );
}
```

## Theme Detection

The library automatically detects themes using the following methods (in order):

1. **Data attribute**: `<html data-theme="dark">` (Docusaurus, many frameworks)
2. **CSS classes**: `<html class="dark">` or `<html class="light">`
3. **Media query**: `prefers-color-scheme: dark`

### Custom Theme Detection

You can provide your own theme detection logic:

```tsx
import { AntdConfigProvider, createThemeDetector } from 'flo-table-with-views';

// Create a custom detector
const customDetector = createThemeDetector({
  dataAttribute: 'data-color-scheme',
  classNames: { dark: 'dark-mode', light: 'light-mode' },
  useMediaQuery: true
});

function App() {
  return (
    <AntdConfigProvider themeDetector={customDetector}>
      {/* Your app */}
    </AntdConfigProvider>
  );
}
```

## Customization

### Custom Primary Colors

```tsx
<AntdConfigProvider
  primaryColor={{
    light: '#1890ff',
    dark: '#177ddc'
  }}
>
  {/* Your app */}
</AntdConfigProvider>
```

### Force Specific Theme

```tsx
<AntdConfigProvider forceTheme="dark">
  {/* Always use dark theme */}
</AntdConfigProvider>
```

### Component-Level Customization

```tsx
<TableWithViews
  enableTheming={true}
  primaryColor="#ff6b6b"
  forceTheme="light"
  // ... other props
/>
```

## Framework Integration

### Docusaurus

The library works out-of-the-box with Docusaurus themes:

```tsx
// In your Docusaurus Root.tsx or similar
import { AntdConfigProvider } from 'flo-table-with-views';

export default function Root({ children }) {
  return (
    <AntdConfigProvider>
      {children}
    </AntdConfigProvider>
  );
}
```

### Next.js

```tsx
// In your _app.tsx or layout
import { AntdConfigProvider } from 'flo-table-with-views';

export default function App({ Component, pageProps }) {
  return (
    <AntdConfigProvider>
      <Component {...pageProps} />
    </AntdConfigProvider>
  );
}
```

### Other Frameworks

The theming system is framework-agnostic and will work with any React application. Just make sure to:

1. Wrap your app with `AntdConfigProvider` at the root level, or
2. Enable theming on individual components

## Styled Components

The following Ant Design components are fully themed:

- Card
- Table  
- Tabs
- Button
- Input
- Select
- Tag
- Rate
- Avatar
- Pagination
- Switch
- Badge
- Dropdown
- Menu
- Tooltip
- Divider

## TypeScript Support

All theming components and utilities are fully typed:

```tsx
import type { 
  AntdConfigProviderProps,
  WithThemeOptions 
} from 'flo-table-with-views';
```

## Performance Notes

- **App-level theming** is recommended for applications with multiple Ant Design components
- **Component-level theming** is fine for isolated use cases
- Theme detection uses efficient observers and is optimized for performance
- Theme changes are debounced to prevent excessive re-renders

## Migration from Custom Theming

If you're currently using a custom `AntdConfigProvider`, you can migrate to the library's version:

```tsx
// Before
import { AntdConfigProvider } from './path/to/your/provider';

// After  
import { AntdConfigProvider } from 'flo-table-with-views';
```

The library's provider is feature-compatible and includes additional optimizations.