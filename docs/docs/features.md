---
sidebar_position: 2
---

# Features Overview

FloTable provides a comprehensive set of features for building powerful, responsive data tables in React applications.

## Core Features

### Views System
**Switch between predefined filtered views of your data**

- **Multiple Perspectives**: Create different views for the same dataset
- **One-Click Switching**: No manual filter configuration needed
- **Mobile Optimized**: Short labels automatically used on mobile devices
- **Custom Filters**: Each view can have its own filter parameters
- **Dynamic Views**: Add/remove views dynamically at runtime

```tsx
const views = [
  {
    key: 'all',
    label: 'All Items',
    shortLabel: 'All',
    query: '',
    filters: {},
  },
  {
    key: 'active',
    label: 'Active Items Only',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' },
  },
];
```

### Advanced Filtering
**Powerful filtering capabilities built-in**

- **Quick Filters**: Search across specified columns instantly
- **Column Filters**: Individual filters for each column
- **Custom Filter Components**: Build your own filter interfaces
- **Range Filters**: Date ranges, number ranges, and more
- **Filter Persistence**: Filters maintained across view switches

### Mobile First Design
**Optimized for all screen sizes**

- **Responsive Layouts**: Automatically adapts to screen size
- **Touch Friendly**: Optimized for touch interactions
- **Horizontal Scrolling**: Smooth scrolling helpers for wide tables
- **Adaptive UI**: Different interfaces for mobile vs desktop
- **Column Visibility**: Hide/show columns based on screen size

### Performance Optimized
**Handle large datasets efficiently**

- **Infinite Scroll**: Automatic loading on mobile devices
- **Pagination**: Traditional pagination for desktop
- **Virtual Scrolling**: Efficient rendering of large lists
- **Lazy Loading**: Load data only when needed
- **Configurable Page Sizes**: Different sizes for mobile/desktop

## Advanced Features

### Action System
**Powerful toolbar and action management**

- **Custom Buttons**: Add any action buttons to the toolbar
- **Dropdown Menus**: Group related actions in dropdowns
- **Tooltips**: Helpful tooltips for all actions
- **Icon Support**: Full icon library integration
- **Bulk Actions**: Actions that work on multiple selected items

```tsx
const actions = [
  {
    key: 'add',
    label: 'Add Item',
    type: 'primary',
    icon: <PlusOutlined />,
    onClick: handleAdd,
  },
  {
    key: 'more',
    label: 'More Actions',
    children: [
      { key: 'export', label: 'Export Data', onClick: handleExport },
      { key: 'import', label: 'Import Data', onClick: handleImport },
    ],
  },
];
```

### Theme & Styling
**Complete customization control**

- **CSS Classes**: Custom classes for every component
- **Inline Styles**: Direct style overrides
- **Theme Integration**: Works with your existing design system
- **Responsive Styling**: Different styles for different screen sizes
- **Dark Mode**: Full dark mode support

### Integration Ready
**Works with your existing stack**

- **TypeScript First**: Full type safety and IntelliSense
- **React Query**: Seamless integration with data fetching libraries
- **Redux/Zustand**: State management integration
- **Ant Design**: Built on proven UI components
- **Custom APIs**: Works with any backend API

## Data Features

### Column Configuration
**Flexible column system**

- **Data Types**: Support for all data types (text, numbers, dates, etc.)
- **Custom Renderers**: Custom cell content rendering
- **Sorting**: Built-in sorting for any column
- **Fixed Columns**: Pin important columns to left/right
- **Resizable**: User-resizable column widths
- **Copyable**: One-click copy functionality

### Real-time Updates
**Live data synchronization**

- **Auto Refresh**: Automatic data refreshing
- **WebSocket Support**: Real-time data updates
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful error handling and retry

### Export & Import
**Data management features**

- **Export Formats**: CSV, Excel, JSON export
- **Import Validation**: Data validation on import
- **Bulk Operations**: Mass data operations
- **Backup/Restore**: Data backup functionality

## User Experience

### Interaction Features
**Rich user interactions**

- **Row Selection**: Single and multiple row selection
- **Drag & Drop**: Reorder rows and columns
- **Context Menus**: Right-click context actions
- **Keyboard Navigation**: Full keyboard accessibility
- **Touch Gestures**: Swipe actions on mobile

### Search & Discovery
**Help users find what they need**

- **Global Search**: Search across all visible columns
- **Column Search**: Search within specific columns
- **Saved Searches**: Save frequently used searches
- **Search History**: Recent search suggestions
- **Fuzzy Search**: Intelligent matching algorithms

### Analytics & Insights
**Built-in data insights**

- **Summary Statistics**: Automatic data summaries
- **Quick Calculations**: Sum, average, count functions
- **Data Visualization**: Mini charts and indicators
- **Trend Analysis**: Data trend indicators

## Performance Benefits

### Speed Optimizations
- **Virtual Rendering**: Only render visible rows
- **Debounced Search**: Efficient search performance
- **Memoized Calculations**: Cached computations
- **Optimized Re-renders**: Minimal React re-renders

### Bundle Size
- **Tree Shaking**: Only bundle what you use
- **Code Splitting**: Lazy load heavy components
- **Optimized Dependencies**: Minimal external dependencies
- **Gzip Friendly**: Excellent compression ratios

### Developer Experience
- **TypeScript Support**: Full type definitions
- **IDE Integration**: Excellent IntelliSense support
- **Documentation**: Comprehensive docs and examples
- **Debug Tools**: Built-in debugging utilities

## Browser Support

### Supported Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Mobile Support
- **iOS Safari**: iOS 12+
- **Android Chrome**: Android 8+
- **Mobile Responsive**: All features work on mobile

## Reliability

### Type Safety
- **Full TypeScript**: 100% TypeScript codebase
- **Generic Support**: Type-safe data handling
- **API Types**: Complete API type definitions

### Testing
- **Unit Tests**: Comprehensive test coverage
- **Integration Tests**: End-to-end testing
- **Accessibility Tests**: A11y compliance testing

### Documentation
- **API Reference**: Complete API documentation
- **Examples**: Real-world usage examples
- **Migration Guides**: Upgrade assistance
- **Best Practices**: Performance and usage guides

---

FloTable combines all these features into a cohesive, easy-to-use package that scales from simple data display to complex data management interfaces. Whether you're building a simple admin panel or a complex analytics dashboard, FloTable provides the foundation you need.

[Get Started →](./intro) | [See Examples →](./examples) | [API Reference →](./api)