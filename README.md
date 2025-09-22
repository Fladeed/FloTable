    # FloTable with Views

A powerful, responsive table component library for React applications with built-in views system, filtering, and mobile optimization.

## 🚀 Features

- **Views System**: Multiple predefined filtered views of your data
- **Responsive Design**: Automatically optimized for mobile devices  
- **TypeScript**: Full type safety and IntelliSense support
- **Customizable Actions**: Add custom buttons to table toolbar
- **Search & Filter**: Built-in search with column filtering
- **Pagination**: Configurable pagination with size options
- **Ant Design Integration**: Built on Ant Design Pro Components

## 📦 Installation

```bash
npm install flo-table-with-views
```

## 🏃 Quick Start

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

export default function UserTable() {
  const handleRequest = async (params: any, sort: any, filter: any) => {
    // Your API call logic here
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ ...params, ...filter.filters, sort }),
    });
    const data = await response.json();
    
    return {
      data: data.users,
      success: true,
      total: data.total,
    };
  };

  return (
    <TableWithViews<User>
      id="user-table"
      title="User Management"
      columns={columns}
      request={handleRequest}
      views={views}
      rowKey="id"
    />
  );
}
```

## 🎨 Styling & Customization

The components use **Ant Design's default theme** and provide extensive `className` and `style` props for customization. No built-in theming is applied, giving you full control over styling.

### Available Styling Props

```tsx
<FloTableWithViews<User>
  id="user-table"
  title="User Management"
  columns={columns}
  request={handleRequest}
  views={views}
  rowKey="id"
  
  // Component-level styling
  className="my-custom-wrapper"
  style={{ backgroundColor: 'white' }}
  
  // Header section styling
  headerClassName="custom-header bg-gray-50 p-4"
  titleClassName="text-3xl font-bold text-blue-600"
  descriptionClassName="text-gray-600 italic"
  
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

## 🔍 Filtering Features

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

## 📖 Documentation & Live Preview

- **Documentation & Live Preview**: [http://localhost:3001](http://localhost:3001)

## 🎮 Single Unified Application

This repository includes a unified application that serves both documentation and live preview:

```bash
# Run the documentation and preview app
cd docs
npm install
npm run dev
# Opens on http://localhost:3001
```

The unified app includes:
- Complete documentation with installation guides and API reference
- Interactive restaurant management demo with realistic data
- Multiple table examples (Restaurants, Menu Items)
- Multiple views (All, Open, Closed, Pending, Top Rated)
- Search and filtering functionality
- Custom actions and responsive design
- Mobile optimization examples

## 🏗️ Repository Structure

```
flo-table-with-views/
├── src/                    # Component library source
│   ├── components/
│   │   ├── TableWithViews.tsx
│   │   ├── SimpleTable.tsx
│   │   └── TableActions.tsx
│   ├── hooks/
│   └── types/
├── docs/                  # Unified documentation and preview app
│   ├── app/
│   │   ├── page.tsx       # Main landing page
│   │   ├── docs/page.tsx  # Documentation
│   │   ├── preview/page.tsx # Live preview
│   │   └── examples/page.tsx # Examples gallery
│   └── src/
│       ├── components/    # Demo components (RestaurantsTable, etc.)
│       ├── data/          # Mock data and API
│       └── types/         # Demo types
└── dist/                  # Built package
```

## 🔧 Development

### Building the Library

```bash
npm install
npm run build
```

### Running Documentation & Preview

```bash
cd docs
npm install
npm run dev
```

## 📋 Components

### TableWithViews&lt;T&gt;

Main table component with views system and advanced features.

**Props:**
- `columns: ProColumns<T>[]` - Table column definitions
- `views: View[]` - Predefined filtered views
- `request: RequestFunction` - Data fetching function
- `actions?: Action[]` - Custom toolbar actions
- `title?: string` - Table title
- `description?: string` - Table description

### SimpleTable&lt;T&gt;

Basic table wrapper around ProTable with enhanced request handling.

### TableActions

Toolbar actions component for custom buttons.

## 🎯 Key Features

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

## � Project Structure

```
flo-table-with-views/
├── src/                    # Core component library
│   ├── components/         # Main table components
│   │   ├── TableWithViews/ # Primary component
│   │   ├── SimpleTable/    # Basic table component
│   │   └── TableActions/   # Action buttons component
│   ├── types/             # TypeScript definitions
│   ├── hooks/             # Custom React hooks
│   └── index.ts           # Main exports
├── docs/                  # Documentation and preview app
│   ├── app/               # Next.js app router pages
│   │   ├── page.tsx       # Landing page
│   │   ├── docs/          # API documentation
│   │   ├── preview/       # Live demos
│   │   └── examples/      # Code examples
│   ├── src/               # Demo components and data
│   │   ├── components/    # Example table implementations
│   │   ├── data/          # Mock data and API
│   │   └── types/         # Demo type definitions
│   └── public/            # Static assets
├── package.json           # Core library dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🚀 Development

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

# Start development server (usually runs on port 3000 or 3001)
npm run dev

# Build for production
npm run build
```

## �🙏 Acknowledgments

- Built on [Ant Design Pro Components](https://procomponents.ant.design/)
- Inspired by modern data table patterns
- Mobile-first responsive design principles

## 📞 Support

- **Documentation & Preview**: [http://localhost:3001](http://localhost:3001)
- **Issues**: [GitHub Issues](https://github.com/your-org/flo-table-with-views/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/flo-table-with-views/discussions)