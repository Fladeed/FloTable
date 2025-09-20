---
sidebar_position: 1
---

# Getting Started

Welcome to **FloTable with Views** - a powerful, responsive table component library for React applications with built-in views system, filtering, and mobile optimization.

## 🚀 Quick Start

Get started with FloTable in your React project in less than 5 minutes.

### Installation

```bash
npm install flo-table-with-views
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
}

const columns: ProColumns<User>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
];

function MyTable() {
  const handleRequest = async (params) => {
    // Your API call here
    return {
      data: users,
      success: true,
      total: users.length,
    };
  };

  return (
    <TableWithViews
      columns={columns}
      request={handleRequest}
      views={views}
      rowKey="id"
    />
  );
}
```

## ✨ Key Features

- **📱 Responsive Design**: Automatically optimized for mobile devices
- **👁️ Views System**: Multiple predefined filtered views of your data  
- **🔍 Advanced Search**: Built-in search with column filtering
- **⚡ Performance**: Efficient rendering with pagination and virtual scrolling
- **🎨 Customizable**: Extensive theming and styling options
- **📊 Rich Display**: Support for complex cell renderers and data types
- **🛠️ Developer Friendly**: Full TypeScript support with comprehensive type definitions

## 🎮 Try It Live

Check out our [Live Preview](/preview) to see FloTable in action with restaurant management examples.

## 📚 What's Next?

- Learn about [Table Configuration](./table-configuration)
- Explore [Views System](./views-system)
- Check out [Examples](./examples)
- See [API Reference](./api)

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
