---
sidebar_position: 1
---

# Getting Started

Welcome to **FloTable** - a powerful, responsive table component library for React applications with built-in views system, advanced filtering, infinite scroll, mobile optimization, and complete TypeScript support.

## Quick Start

Get started with FloTable in your React project in less than 5 minutes.

### Installation

```bash
npm install flo-table-with-views
# or
yarn add flo-table-with-views
```

### Basic Usage

```tsx
import { TableWithViews } from 'flo-table-with-views';
import type { ProColumns } from '@ant-design/pro-components';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

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
    label: 'Active Users',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' },
  },
  {
    key: 'recent',
    label: 'Recent Users',
    shortLabel: 'Recent',
    query: 'created:recent',
    filters: { createdAt: 'last-7-days' },
  },
];

function MyTable() {
  const handleRequest = async (params) => {
    // Your API call here
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    const data = await response.json();
    
    return {
      data: data.users,
      success: true,
      total: data.total,
    };
  };

  return (
    <TableWithViews
      id="users-table"
      title="User Management"
      description="Manage and view all users in your system"
      columns={columns}
      request={handleRequest}
      views={views}
      rowKey="id"
      enableInfiniteScroll={true}
      defaultPageSize={10}
      initQuickFilterColumns={['name', 'email']}
    />
  );
}
```

## Core Features

### Views System
Switch between predefined filtered views of your data with a single click. Perfect for dashboards and data management interfaces.

### Advanced Filtering
- Built-in search across multiple columns
- Quick filters for common use cases
- Custom filter components
- Column-based sorting and filtering

### Mobile First Design
- Automatically optimized layouts for all screen sizes
- Touch-friendly interactions
- Horizontal scroll helpers for mobile
- Responsive column visibility

### Infinite Scroll & Pagination
- Handle large datasets effortlessly
- Automatic infinite scrolling on mobile
- Traditional pagination for desktop
- Configurable page sizes

### Action System
- Configurable action buttons with tooltips
- Dropdown menus for bulk actions
- Custom action handlers
- Integrated toolbar system

### Developer Experience
- Full TypeScript support with comprehensive types
- Built on Ant Design Pro Components
- Extensive customization options
- Professional documentation and examples

## Try It Live

Check out our [Live Preview](/preview) to see FloTable in action with real-world examples:

- **User Management** - Role filtering, status management, activity tracking
- **Payment Processing** - Transaction status, payment methods, date ranges
- **Student Records** - Grade tracking, enrollment status, course management

## Architecture

FloTable is built on top of proven technologies:

- **React** - Component-based architecture
- **TypeScript** - Type safety and developer experience  
- **Ant Design** - Professional UI components
- **Pro Components** - Advanced table functionality

## Next Steps

Ready to dive deeper? Explore our comprehensive documentation:

- [**Table Configuration**](./table-configuration) - Learn all configuration options
- [**Views System**](./views-system) - Master the views and filtering system
- [**Examples**](./examples) - See real-world implementation examples
- [**API Reference**](./api) - Complete API documentation
- [**Theme Configuration**](./theme-configuration) - Customize the appearance

## Ready to Build?

FloTable makes it easy to build powerful, responsive data tables for any React application. Whether you're building admin dashboards, e-commerce interfaces, or data management tools, FloTable provides the foundation you need.

[Get Started →](./table-configuration) or [Try the Live Demo →](/preview)
