# FloTable

<div align="center">

**Powerful, responsive table components for React with views system, advanced filtering & mobile optimization**

[![npm version](https://badge.fury.io/js/flo-table-with-views.svg)](https://badge.fury.io/js/flo-table-with-views)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Documentation](https://your-flo-table-docs.vercel.app) • [🎮 Live Demo](https://your-flo-table-docs.vercel.app/preview) • [Examples](https://your-flo-table-docs.vercel.app/docs/examples)

</div>

## Key Features

### Core Features
- **Views System** - Multiple predefined filtered views with one-click switching
- **Advanced Filtering** - Search, sort, and filter with custom components  
- **Mobile First** - Responsive design with touch-friendly interactions
- **Infinite Scroll** - Handle large datasets with automatic loading
- **Action System** - Configurable toolbar with custom buttons and dropdowns

### Developer Experience
- **TypeScript First** - Full type safety and comprehensive IntelliSense
- **Ant Design Integration** - Built on proven, professional UI components
- **Flexible API** - Extensive customization options for any use case
- **Performance Optimized** - Virtual scrolling and efficient rendering
- **Theme Support** - Complete styling control and dark mode ready

## Quick Start

### Installation

```bash
npm install flo-table-with-views
# or
yarn add flo-table-with-views
```

### Basic Usage

```tsx
import { FloTableWithViews } from 'flo-table-with-views';
import type { ProColumns } from '@ant-design/pro-components';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const UserManagement = () => {
  // Define your columns with full TypeScript support
  const columns: ProColumns<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        active: { text: 'Active', status: 'Success' },
        inactive: { text: 'Inactive', status: 'Default' },
      },
    },
  ];

  // Create multiple views of your data
  const views = [
    {
      key: 'all',
      label: 'All Users',
      shortLabel: 'All',
      query: '',
      filters: {},
    },
    {
      key: 'active',
      label: 'Active Users Only',
      shortLabel: 'Active',
      query: 'status:active',
      filters: { status: 'active' },
    },
    {
      key: 'recent',
      label: 'Recently Joined',
      shortLabel: 'Recent',
      query: 'created:last-7-days',
      filters: { createdAt: 'last-7-days' },
    },
  ];

  // Add custom actions to the toolbar
  const actions = [
    {
      key: 'add',
      label: 'Add User',
      type: 'primary',
      icon: <PlusOutlined />,
      onClick: () => setAddModalVisible(true),
    },
    {
      key: 'export',
      label: 'Export Data',
      onClick: () => exportUsers(),
    },
  ];

  // Your data fetching function
  const fetchUsers = async (params) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    
    return {
      data: data.users,
      total: data.total,
      success: true,
    };
  };

  return (
    <FloTableWithViews
      id="users-table"
      title="User Management"
      description="Manage all users in your system"
      columns={columns}
      request={fetchUsers}
      views={views}
      actions={actions}
      enableInfiniteScroll={true}
      initQuickFilterColumns={['name', 'email']}
    />
  );
};
```

## Live Examples

Try FloTable with real-world examples:

- **[User Management](https://your-demo.vercel.app/users)** - Role filtering, status management, activity tracking
- **[Payment Processing](https://your-demo.vercel.app/payments)** - Transaction status, payment methods, date ranges
- **[Student Records](https://your-demo.vercel.app/students)** - Grade tracking, enrollment status, course management
- **[Mobile Experience](https://your-demo.vercel.app/mobile)** - Touch-optimized interface with infinite scroll

## Mobile Experience

FloTable automatically optimizes for mobile devices:

```tsx
<FloTableWithViews
  // Mobile-specific configurations
  enableInfiniteScroll={true}        // Infinite scroll on mobile
  defaultMobilePageSize={30}         // Larger page sizes for mobile
  initQuickFilterColumns={['name']}  // Quick search for mobile
/>
```

**Mobile Features:**
- ✅ Touch-friendly interactions
- ✅ Horizontal scrolling helpers
- ✅ Adaptive column visibility
- ✅ Infinite scroll loading
- ✅ Compact UI elements

## Advanced Filtering

Powerful filtering system with multiple options:

```tsx
const advancedColumns = [
  {
    title: 'Date Range',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    sorter: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: true,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <CustomPriceFilter 
        value={selectedKeys}
        onChange={setSelectedKeys}
        onConfirm={confirm}
      />
    ),
  },
];
```

**Filter Features:**
- ✅ Column-specific filters
- ✅ Quick search across multiple columns
- ✅ Custom filter components
- ✅ Date range filtering
- ✅ Number range filtering

## Performance Features

Built for handling large datasets efficiently:

```tsx
<FloTableWithViews
  enableInfiniteScroll={true}    // Infinite loading
  defaultPageSize={50}           // Configurable page sizes  
  // Virtual scrolling automatically enabled for large datasets
/>
```

**Performance Benefits:**
- ✅ Virtual scrolling for large datasets
- ✅ Efficient re-rendering with memoization
- ✅ Debounced search and filtering
- ✅ Lazy loading of heavy components

## Styling & Themes

Complete control over appearance:

```tsx
<FloTableWithViews
  // Custom CSS classes
  className="custom-table"
  headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  titleClassName="text-2xl font-bold"
  cardClassName="shadow-2xl rounded-lg"
  
  // Inline styles
  style={{ 
    maxWidth: '1200px',
    margin: '2rem auto' 
  }}
/>
```

**Styling Options:**
- ✅ CSS classes for every component
- ✅ Inline style support
- ✅ Theme integration ready
- ✅ Dark mode support
- ✅ Responsive styling

## Integration Examples

### With React Query
```tsx
import { useQuery } from '@tanstack/react-query';

const ReactQueryTable = () => {
  const fetchData = async (params) => {
    const { data } = await useQuery({
      queryKey: ['users', params],
      queryFn: () => api.getUsers(params),
    });
    return data;
  };

  return <FloTableWithViews request={fetchData} {...otherProps} />;
};
```

### With Redux Toolkit
```tsx
import { useDispatch } from 'react-redux';

const ReduxTable = () => {
  const dispatch = useDispatch();
  
  const fetchData = async (params) => {
    const result = await dispatch(fetchUsersThunk(params));
    return {
      data: result.payload.users,
      total: result.payload.total,
      success: true,
    };
  };

  return <FloTableWithViews request={fetchData} {...otherProps} />;
};
```

## Real-World Use Cases

FloTable is perfect for:

- **Admin Dashboards** - User management, analytics, system monitoring
- **Payment Systems** - Transaction tracking, payment processing, financial reporting
- **Education Management** - Student records, grade tracking, course administration
- **CRM Systems** - Customer data, sales tracking, communication logs
- **Data Analytics** - Report tables, data visualization, business intelligence

## API Reference

### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique table identifier |
| `title` | `string` | ✅ | Table title |
| `columns` | `ProColumns[]` | ✅ | Column definitions |
| `request` | `Function` | ✅ | Data fetching function |
| `views` | `View[]` | ❌ | Predefined filtered views |
| `actions` | `ActionConfig[]` | ❌ | Toolbar action buttons |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableInfiniteScroll` | `boolean` | `true` | Enable infinite scroll |
| `defaultPageSize` | `number` | `10` | Items per page |
| `initQuickFilterColumns` | `string[]` | `[]` | Quick filter columns |

[**Full API Documentation →**](https://your-docs.vercel.app/docs/api)

## 🌟 Why Choose FloTable?

### vs. Ant Design Pro Table
- ✅ **Built-in Views System** - No manual setup needed
- ✅ **Mobile Optimized** - Works perfectly on all devices
- ✅ **Infinite Scroll** - Better performance for large datasets
- ✅ **TypeScript First** - Superior developer experience

### vs. TanStack Table  
- ✅ **Complete UI Solution** - No need to build UI components
- ✅ **Integrated Filtering** - Advanced filters out of the box
- ✅ **Professional Design** - Ant Design components included
- ✅ **Less Configuration** - Sensible defaults for rapid development

### vs. React Table
- ✅ **Modern Architecture** - Built for React 18+
- ✅ **Mobile Ready** - Responsive design included
- ✅ **Action System** - Toolbar management built-in
- ✅ **View Management** - Multiple data perspectives

## Documentation

- **[Getting Started](https://your-docs.vercel.app/docs/intro)** - Quick start guide
- **[⚡ Features Overview](https://your-docs.vercel.app/docs/features)** - Complete feature list
- **[📋 Examples](https://your-docs.vercel.app/docs/examples)** - Real-world examples
- **[🔧 API Reference](https://your-docs.vercel.app/docs/api)** - Complete API docs
- **[🎨 Theming Guide](https://your-docs.vercel.app/docs/theme-configuration)** - Styling and themes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Fladeed](https://github.com/Fladeed)

---

<div align="center">

**[Get Started](https://your-docs.vercel.app/docs/intro) • [Documentation](https://your-docs.vercel.app) • [🎮 Live Demo](https://your-docs.vercel.app/preview)**

Made with ❤️ by [Fladeed](https://github.com/Fladeed)

</div>
  
  // Card and table styling
  cardClassName="shadow-lg border-2 border-gray-200"
  tabsClassName="custom-tabs"
  
  // Sub-components styling
  tableClassName="custom-table-styles"
/>
```

### All Available className Props

| Prop | Description | Component |
|------|-------------|-----------|
| `className` | Main wrapper container | Root div |
| `headerClassName` | Header section container | Header div |
| `titleClassName` | Table title styling | H1 element |
| `descriptionClassName` | Table description styling | P element |
| `cardClassName` | Ant Design Card component | Card |
| `tabsClassName` | Ant Design Tabs component | Tabs |
| `tableClassName` | ProTable component styling | ProTable |

### Filter Component Styling

```tsx
// Filter components also support custom styling
<FloTableFilters
  // ... other props
  className="custom-filter-container"
  buttonClassName="custom-filter-button bg-blue-500 text-white"
/>

<QuickFilter
  // ... other props
  className="custom-quick-filter border-blue-300"
  buttonClassName="custom-button hover:bg-blue-50"
/>
```

### Using with CSS Modules

```tsx
import styles from './MyTable.module.css';

<FloTableWithViews
  titleClassName={styles.customTitle}
  cardClassName={styles.customCard}
  tableClassName={styles.customTable}
  // ... other props
/>
```

### Using with Tailwind CSS

```tsx
<FloTableWithViews
  className="max-w-6xl mx-auto"
  headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-lg"
  titleClassName="text-2xl font-bold"
  descriptionClassName="text-blue-100 mt-2"
  cardClassName="shadow-2xl border-0 rounded-lg"
  tabsClassName="[&_.ant-tabs-tab]:text-blue-600"
  tableClassName="[&_.ant-table-thead]:bg-gray-50"
  // ... other props
/>
```

### Dark Mode Support

For dark mode support, wrap your app with Ant Design's ConfigProvider:

```tsx
import { ConfigProvider, theme } from 'antd';
import { FloTableWithViews } from 'flo-table-with-views';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff', // Your brand color
        },
      }}
    >
      <FloTableWithViews
        className={isDark ? 'dark-theme-table' : 'light-theme-table'}
        // ... other props
      />
    </ConfigProvider>
  );
}
```

### Advanced Theming (Optional)

For advanced theming needs, you can still use the provided theming utilities:

```tsx
import { AntdConfigProvider, detectTheme } from 'flo-table-with-views';

function App() {
  return (
    <AntdConfigProvider 
      primaryColor="#1890ff"
      themeDetector={detectTheme}
    >
      <FloTableWithViews
        // ... your props
      />
    </AntdConfigProvider>
  );
}
```

## Filtering Features

### Search Functionality
The component includes a built-in search input that filters across all searchable columns:

```tsx
<TableWithViews
  // ... other props
  initQuickFilterColumns={['name', 'email']} // Columns to include in quick search
/>
```

### Filter Drawer
Click the "All Filters" button to open a drawer with detailed filtering options for each column:

- **Text Columns**: Free text search
- **Select Columns**: Dropdown with predefined options  
- **Date Columns**: Date picker for date ranges
- **Number Columns**: Numeric input with validation

### Custom Filter Configuration
Define which columns should be available for quick filtering:

```tsx
const columns: ProColumns<User>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text', // Enables text filter
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      active: 'Active',
      inactive: 'Inactive',
    },
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    valueType: 'date', // Enables date filter
  },
];
```

## Documentation & Live Preview

- **Documentation & Live Preview**: [https://flotable-docs.vercel.app](https://flotable-docs.vercel.app)

## Single Unified Application

This repository includes a unified application that serves both documentation and live preview:

```bash
# Run the documentation and preview app
cd docs
npm install
npm run dev
# Opens on http://localhost:3000
```

The unified app includes:
- Complete documentation with installation guides and API reference
- Interactive restaurant management demo with realistic data
- Multiple table examples (Restaurants, Menu Items)
- Multiple views (All, Open, Closed, Pending, Top Rated)
- Search and filtering functionality
- Custom actions and responsive design
- Mobile optimization examples

## Repository Structure

```
FloTable/
├── src/                    # Component library source
│   ├── components/
│   │   ├── TableWithViews.tsx
│   │   ├── SimpleTable.tsx
│   │   ├── TableActions.tsx
│   │   ├── AntdConfigProvider.tsx
│   │   └── withTheme.tsx
│   ├── hooks/
│   │   ├── useIsMobile.ts
│   │   └── useTranslation.tsx
│   ├── utils/
│   │   ├── cn.ts
│   │   └── theme.ts
│   └── index.ts
├── docs/                  # Unified documentation and preview app
│   ├── docusaurus.config.ts
│   ├── app/
│   │   ├── page.tsx       # Main landing page
│   │   ├── docs/page.tsx  # Documentation
│   │   ├── preview/page.tsx # Live preview
│   │   └── examples/page.tsx # Examples gallery
│   ├── src/
│   │   ├── components/    # Demo components (RestaurantsTable, etc.)
│   │   ├── data/          # Mock data and API
│   │   └── types/         # Demo types
│   ├── docs/             # Documentation pages
│   └── static/           # Static assets
├── package.json           # Core library dependencies
├── tsconfig.json          # TypeScript configuration
├── rollup.config.js       # Build configuration
└── README.md              # This file
```

## Development

### Building the Library

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests  
npm test

# Watch mode for development
npm run dev
```

### Documentation & Preview

```bash
# Navigate to docs folder
cd docs

# Install dependencies
npm install

# Start development server (usually runs on port 3000)
npm run dev

# Build for production
npm run build
```

## Components

### TableWithViews\<T\>

Main table component with views system and advanced features.

**Props:**
- `columns: ProColumns<T>[]` - Table column definitions
- `views: View[]` - Predefined filtered views
- `request: RequestFunction` - Data fetching function
- `actions?: Action[]` - Custom toolbar actions
- `title?: string` - Table title
- `description?: string` - Table description

### SimpleTable\<T\>

Basic table wrapper around ProTable with enhanced request handling.

### TableActions

Toolbar actions component for custom buttons.

## Key Features

### Views System
- Create multiple filtered views of your data
- Each view can have custom filters and search queries
- Responsive view switching on mobile

### Mobile Optimization
- Automatic column hiding on smaller screens
- Touch-friendly interactions
- Responsive pagination and actions

### TypeScript Support
- Full type safety with generic components
- Comprehensive type definitions
- IntelliSense support in IDE

### Customization
- Custom actions in toolbar
- Configurable pagination
- Theme customization
- Custom empty states

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Core Library Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

### Documentation & Preview

```bash
# Navigate to docs folder
cd docs

# Install dependencies
npm install

# Start development server (usually runs on port 3000)
npm run dev

# Build for production
npm run build
```

## 🙏 Acknowledgments

- Built on [Ant Design Pro Components](https://procomponents.ant.design/)
- Inspired by modern data table patterns
- Mobile-first responsive design principles

## 📞 Support

- **Documentation & Preview**: [https://flotable-docs.vercel.app](https://flotable-docs.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/Fladeed/FloTable/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Fladeed/FloTable/discussions)
