---
sidebar_position: 2
---

# Table Configuration

Learn how to configure and customize your FloTable components.

## Basic Configuration

The `TableWithViews` component accepts several props for configuration:

### Required Props

- **`columns`**: Array of column definitions using Ant Design ProColumns
- **`request`**: Function to fetch data from your API
- **`views`**: Array of predefined view configurations
- **`rowKey`**: Unique identifier for each row

### Optional Props

- **`title`**: Table title
- **`description`**: Table description
- **`actions`**: Array of action button configurations
- **`defaultPageSize`**: Default number of rows per page
- **`enableInfiniteScroll`**: Enable infinite scrolling

## Column Configuration

Columns use Ant Design's ProColumns interface with additional features:

```tsx
const columns: ProColumns<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    fixed: 'left',
    width: 200,
    render: (_, record) => (
      <div>
        <strong>{record.name}</strong>
        <br />
        <small>{record.description}</small>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
  },
];
```

## Request Function

The request function should return a promise with data in the following format:

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