# FloTable

<div align="center">

**Powerful, responsive table components for React with views system, advanced filtering & mobile optimization**

[![npm version](https://badge.fury.io/js/flo-table-with-views.svg)](https://badge.fury.io/js/flo-table-with-views)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Documentation](https://flotable-docs.vercel.app) • [🎮 Live Demo](https://flotable-docs.vercel.app/preview) • [Examples](https://flotable-docs.vercel.app/docs/examples)

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

- **[User Management](https://flotable-docs.vercel.app/preview/users)** - Role filtering, status management, activity tracking
- **[Payment Processing](https://flotable-docs.vercel.app/preview/payments)** - Transaction status, payment methods, date ranges
- **[Student Records](https://flotable-docs.vercel.app/preview/students)** - Grade tracking, enrollment status, course management
- **[Mobile Experience](https://flotable-docs.vercel.app/preview/mobile)** - Touch-optimized interface with infinite scroll

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

[**Full API Documentation →**](https://flotable-docs.vercel.app/docs/api)

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

- **[Getting Started](https://flotable-docs.vercel.app/docs/intro)** - Quick start guide
- **[⚡ Features Overview](https://flotable-docs.vercel.app/docs/features)** - Complete feature list
- **[📋 Examples](https://flotable-docs.vercel.app/docs/examples)** - Real-world examples
- **[🔧 API Reference](https://flotable-docs.vercel.app/docs/api)** - Complete API docs
- **[🎨 Theming Guide](https://flotable-docs.vercel.app/docs/theme-configuration)** - Styling and themes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Fladeed](https://github.com/Fladeed)

---

<div align="center">

**[Get Started](https://flotable-docs.vercel.app/docs/intro) • [Documentation](https://flotable-docs.vercel.app) • [🎮 Live Demo](https://flotable-docs.vercel.app/preview)**

Made with ❤️ by [Fladeed](https://github.com/Fladeed)

</div>
