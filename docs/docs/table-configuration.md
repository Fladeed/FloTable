---
sidebar_position: 3
---

# Table Configuration

Complete guide to configuring and customizing your FloTable components for any use case.

## Basic Configuration

The `FloTableWithViews` component provides extensive configuration options:

### Required Props

```tsx
<FloTableWithViews
  id="my-table"              // Unique table identifier
  title="My Data Table"      // Table title
  columns={columns}          // Column definitions
  request={fetchData}        // Data fetching function
/>
```

### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `Key` | ✅ | Unique identifier for the table instance |
| `title` | `string` | ✅ | Title displayed above the table |
| `columns` | `ProColumns<T>[]` | ✅ | Column definitions |
| `request` | `FloRequest<T>` | ✅ | Data fetching function |

### Optional Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | - | Optional description below title |
| `dataName` | `string` | - | Name for data (e.g., "users", "products") |
| `rowKey` | `string` | `"id"` | Unique identifier field for rows |
| `views` | `View[]` | `[]` | Predefined filtered views |
| `actions` | `ActionConfig[]` | `[]` | Toolbar action buttons |

## Column Configuration

Columns use Ant Design's ProColumns interface with FloTable enhancements:

### Basic Column Setup

```tsx
const columns: ProColumns<User>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,                    // Enable sorting
    fixed: 'left',                   // Pin column to left
    copyable: true,                  // Enable copy functionality
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,                  // Truncate long text
    filterDropdown: true,            // Enable column filter
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    valueEnum: {                     // Status badge rendering
      active: { text: 'Active', status: 'Success' },
      inactive: { text: 'Inactive', status: 'Default' },
    },
    filters: true,                   // Enable filter dropdown
  },
];
```

### Advanced Column Features

#### Custom Renderers
```tsx
{
  title: 'User Profile',
  key: 'profile',
  render: (_, record) => (
    <div className="flex items-center space-x-3">
      <img 
        src={record.avatar} 
        alt={record.name}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <div className="font-semibold">{record.name}</div>
        <div className="text-sm text-gray-500">{record.role}</div>
      </div>
    </div>
  ),
}
```

#### Custom Filters
```tsx
{
  title: 'Price Range',
  dataIndex: 'price',
  sorter: true,
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div className="p-4 space-y-2">
      <Input
        placeholder="Min Price"
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      />
      <Input
        placeholder="Max Price"
        value={selectedKeys[1]}
        onChange={(e) => {
          const keys = [...selectedKeys];
          keys[1] = e.target.value;
          setSelectedKeys(keys);
        }}
      />
      <div className="flex space-x-2">
        <Button size="small" onClick={confirm}>Filter</Button>
        <Button size="small" onClick={clearFilters}>Reset</Button>
      </div>
    </div>
  ),
}
```

#### Responsive Columns
```tsx
{
  title: 'Description',
  dataIndex: 'description',
  responsive: ['md'],        // Only show on medium+ screens
  hideInTable: isMobile,     // Conditionally hide
}
```

## Views Configuration

Create multiple perspectives of your data with the views system:

### Basic Views Setup

```tsx
const views: View[] = [
  {
    key: 'all',
    label: 'All Items',
    shortLabel: 'All',           // Mobile display
    query: '',                   // Search query
    filters: {},                 // Filter parameters
  },
  {
    key: 'active',
    label: 'Active Items Only',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' },
  },
  {
    key: 'recent',
    label: 'Recently Added',
    shortLabel: 'Recent',
    query: 'created:last-7-days',
    filters: { 
      createdAt: 'last-7-days',
      status: 'active' 
    },
  },
];
```

### Advanced Views

```tsx
const advancedViews: View[] = [
  {
    key: 'high-priority',
    label: 'High Priority Tasks',
    shortLabel: 'High',
    query: 'priority:high status:open',
    filters: { 
      priority: 'high',
      status: 'open',
      assignee: { exists: true }
    },
  },
  {
    key: 'overdue',
    label: 'Overdue Items',
    shortLabel: 'Overdue',
    query: 'due:overdue',
    filters: { 
      dueDate: { before: new Date() },
      status: { not: 'completed' }
    },
  },
];
```

## Action Configuration

Add custom action buttons to your table toolbar:

### Basic Actions

```tsx
const actions: FloTableActionConfig[] = [
  {
    key: 'add',
    label: 'Add Item',
    type: 'primary',
    icon: <PlusOutlined />,
    tooltip: 'Create a new item',
    onClick: () => setAddModalVisible(true),
  },
  {
    key: 'export',
    label: 'Export',
    icon: <ExportOutlined />,
    onClick: handleExport,
  },
];
```

### Dropdown Actions

```tsx
const dropdownActions: FloTableActionConfig[] = [
  {
    key: 'bulk-actions',
    label: 'Bulk Actions',
    icon: <MoreOutlined />,
    children: [
      {
        key: 'bulk-edit',
        label: 'Bulk Edit',
        icon: <EditOutlined />,
        onClick: handleBulkEdit,
      },
      {
        key: 'bulk-delete',
        label: 'Bulk Delete',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: handleBulkDelete,
      },
    ],
  },
];
```

## Performance Configuration

Optimize for large datasets and mobile devices:

### Infinite Scroll Configuration

```tsx
<FloTableWithViews
  enableInfiniteScroll={true}      // Enable infinite scroll
  defaultMobilePageSize={30}       // Mobile page size
  defaultPageSize={15}             // Desktop page size
/>
```

### Pagination Configuration

```tsx
<FloTableWithViews
  enableInfiniteScroll={false}     // Use pagination instead
  defaultPageSize={25}             // Items per page
  pagination={{
    showSizeChanger: true,         // Allow page size changes
    showQuickJumper: true,         // Quick page navigation
    showTotal: (total, range) => 
      `${range[0]}-${range[1]} of ${total} items`,
  }}
/>
```

## Filtering Configuration

Set up advanced filtering capabilities:

### Quick Filters

```tsx
<FloTableWithViews
  initQuickFilterColumns={['name', 'email', 'description']}
  // Users can quickly search across these columns
/>
```

### Default Filters

```tsx
const defaultFilters = {
  status: 'active',
  category: ['electronics', 'clothing'],
  dateRange: [moment().subtract(30, 'days'), moment()],
};

<FloTableWithViews
  defaultFilters={defaultFilters}
/>
```

## Request Function Configuration

Configure how your table fetches data:

### Basic Request Function

```tsx
const fetchData: FloRequest<User> = async (params) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: params.current,
      pageSize: params.pageSize,
      search: params.keyword,
      filters: params.filters,
      sort: params.sort,
    }),
  });
  
  const data = await response.json();
  
  return {
    data: data.users,
    total: data.total,
    success: true,
  };
};
```

### Advanced Request with Error Handling

```tsx
const fetchDataWithErrorHandling: FloRequest<User> = async (params) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      data: data.users || [],
      total: data.total || 0,
      success: true,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    
    return {
      data: [],
      total: 0,
      success: false,
      errorMessage: error.message,
    };
  }
};
```

## Styling Configuration

Customize the appearance of your table:

### CSS Classes

```tsx
<FloTableWithViews
  className="custom-table"
  headerClassName="bg-blue-50 p-4 rounded-t-lg"
  titleClassName="text-2xl font-bold text-blue-900"
  descriptionClassName="text-gray-600 mt-2"
  cardClassName="shadow-lg border-blue-200"
  tabsClassName="custom-tabs"
/>
```

### Inline Styles

```tsx
<FloTableWithViews
  style={{
    maxWidth: '1200px',
    margin: '2rem auto',
    borderRadius: '12px',
  }}
  headerStyle={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
  }}
/>
```

## Mobile Configuration

Optimize for mobile devices:

### Mobile-Specific Settings

```tsx
<FloTableWithViews
  // Mobile optimizations
  enableInfiniteScroll={true}
  defaultMobilePageSize={20}
  
  // Quick filters for mobile search
  initQuickFilterColumns={['name']}
  
  // Responsive column configuration
  columns={columns.map(col => ({
    ...col,
    responsive: col.key === 'description' ? ['md'] : undefined,
  }))}
/>
```

### Mobile Column Adaptations

```tsx
const mobileOptimizedColumns = [
  {
    title: 'User',
    key: 'user',
    render: (_, record) => (
      <div>
        <div className="font-semibold">{record.name}</div>
        <div className="text-sm text-gray-500">{record.email}</div>
        {/* Show status inline on mobile */}
        <div className="mt-1">
          <Badge status={record.status === 'active' ? 'success' : 'default'}>
            {record.status}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 80,
    render: (_, record) => (
      <Button size="small" onClick={() => viewDetails(record)}>
        View
      </Button>
    ),
  },
];
```

## Complete Configuration Example

Here's a comprehensive example showing all configuration options:

```tsx
const CompleteTableExample = () => {
  const columns: ProColumns<Product>[] = [
    {
      title: 'Product',
      key: 'product',
      width: 250,
      fixed: 'left',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <img src={record.image} className="w-12 h-12 rounded-lg" />
          <div>
            <div className="font-semibold">{record.name}</div>
            <div className="text-sm text-gray-500">{record.sku}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: true,
      valueEnum: {
        electronics: { text: 'Electronics' },
        clothing: { text: 'Clothing' },
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: true,
      render: (stock) => (
        <span className={stock > 0 ? 'text-green-600' : 'text-red-600'}>
          {stock} units
        </span>
      ),
    },
  ];

  const views: View[] = [
    { key: 'all', label: 'All Products', shortLabel: 'All', query: '', filters: {} },
    { key: 'low-stock', label: 'Low Stock', shortLabel: 'Low', query: 'stock:<10', filters: { stock: { max: 10 } } },
  ];

  const actions: FloTableActionConfig[] = [
    {
      key: 'add',
      label: 'Add Product',
      type: 'primary',
      icon: <PlusOutlined />,
      onClick: () => setAddModalVisible(true),
    },
  ];

  return (
    <FloTableWithViews
      id="products-table"
      title="Product Catalog"
      description="Manage your product inventory"
      columns={columns}
      request={fetchProducts}
      views={views}
      actions={actions}
      enableInfiniteScroll={true}
      defaultMobilePageSize={20}
      defaultPageSize={15}
      initQuickFilterColumns={['name', 'sku']}
      className="product-table"
      headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
      style={{ maxWidth: '1200px', margin: '2rem auto' }}
    />
  );
};
```

This configuration creates a fully-featured, responsive table with all FloTable capabilities enabled. Adjust these options based on your specific requirements.

## Request Function

The `request` function handles data fetching with server-side processing:

```tsx
const handleRequest = async (params, sort, filter) => {
  const response = await fetch('/api/data', {
    method: 'POST',
    body: JSON.stringify({ ...params, sort, filter }),
  });
  
  const result = await response.json();
  
  return {
    data: result.items,
    success: true,
    total: result.total,
  };
};
```

### Request Parameters

- **`params`**: Contains pagination, search, and filter parameters
- **`sort`**: Sorting configuration
- **`filter`**: Active filters from views and columns