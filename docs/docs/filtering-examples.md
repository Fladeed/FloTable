---
title: Filtering Examples
description: Examples of how to implement filtering in FloTable
---

# Filtering Examples

This page demonstrates the filtering capabilities of FloTable with practical examples.

## Basic Filtering Setup

```tsx
import { TableWithViews } from 'flo-table-with-views';
import type { ProColumns } from '@ant-design/pro-components';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const columns: ProColumns<Product>[] = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    valueType: 'select',
    valueEnum: {
      electronics: 'Electronics',
      clothing: 'Clothing',
      books: 'Books',
      home: 'Home & Garden',
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    valueType: 'money',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      active: { text: 'Active', status: 'Success' },
      inactive: { text: 'Inactive', status: 'Error' },
      pending: { text: 'Pending', status: 'Processing' },
    },
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
];

// Mock data request function
const fetchProducts = async (params: any, sort: any, filter: any) => {
  const { current = 1, pageSize = 10 } = params;
  const { filters = {} } = filter;
  
  // Simulate API call with filtering
  let filteredData = mockProductData;
  
  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply status filter
  if (filters.status) {
    filteredData = filteredData.filter(item => item.status === filters.status);
  }
  
  // Apply category filter
  if (filters.category) {
    filteredData = filteredData.filter(item => item.category === filters.category);
  }
  
  // Apply pagination
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    success: true,
    total: filteredData.length,
  };
};

export default function ProductTable() {
  return (
    <TableWithViews
      id="products-table"
      title="Product Management"
      description="Manage your product inventory with advanced filtering"
      columns={columns}
      request={fetchProducts}
      initQuickFilterColumns={['name', 'category']} // Enable quick filters for these columns
      views={[
        {
          key: 'all',
          label: 'All Products',
          shortLabel: 'All',
          query: '',
          filters: {},
        },
        {
          key: 'active',
          label: 'Active Products',
          shortLabel: 'Active',
          query: 'status:active',
          filters: { status: 'active' },
        },
        {
          key: 'electronics',
          label: 'Electronics',
          shortLabel: 'Electronics',
          query: 'category:electronics',
          filters: { category: 'electronics' },
        },
      ]}
    />
  );
}
```

## Advanced Filtering with Custom Request Handler

```tsx
const advancedFetchProducts = async (params: any, sort: any, filter: any) => {
  const { current = 1, pageSize = 10 } = params;
  const { filters = {} } = filter;
  
  // Build query parameters
  const queryParams = new URLSearchParams({
    page: current.toString(),
    limit: pageSize.toString(),
  });
  
  // Add filter parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && key !== 'search') {
      queryParams.append(key, value);
    }
  });
  
  // Handle search separately (might search across multiple fields)
  if (filters.search) {
    queryParams.append('q', filters.search);
  }
  
  // Add sorting
  if (sort && Object.keys(sort).length > 0) {
    const sortField = Object.keys(sort)[0];
    const sortOrder = sort[sortField] === 'ascend' ? 'asc' : 'desc';
    queryParams.append('sort', `${sortField}:${sortOrder}`);
  }
  
  try {
    const response = await fetch(`/api/products?${queryParams}`);
    const data = await response.json();
    
    return {
      data: data.items,
      success: true,
      total: data.total,
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      total: 0,
    };
  }
};
```

## Filter State Management

```tsx
import { useState, useCallback } from 'react';

export default function ProductTableWithState() {
  const [filterState, setFilterState] = useState({});
  
  const handleFilterChange = useCallback((newFilters: any) => {
    setFilterState(newFilters);
    // Optionally persist to localStorage or URL params
    localStorage.setItem('productFilters', JSON.stringify(newFilters));
  }, []);
  
  return (
    <TableWithViews
      id="products-table-with-state"
      title="Products with Persistent Filters"
      columns={columns}
      request={fetchProducts}
      initQuickFilterColumns={['name', 'category', 'status']}
      // The table manages its own filter state internally
    />
  );
}
```

## Filter Types and ValueTypes

Different column `valueType` configurations enable different filter UI components:

- `text` - Text input for free-form search
- `select` - Dropdown with predefined options (requires `valueEnum`)
- `date` - Date picker for date filtering
- `dateRange` - Date range picker
- `digit` - Numeric input with validation
- `money` - Currency input with formatting
- `percent` - Percentage input

```tsx
const columnsWithDifferentTypes: ProColumns<Product>[] = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    valueType: 'text', // Text input filter
  },
  {
    title: 'Price Range',
    dataIndex: 'priceRange',
    valueType: 'digitRange', // Number range filter
  },
  {
    title: 'Launch Date',
    dataIndex: 'launchDate',
    valueType: 'dateRange', // Date range filter
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    valueType: 'percent', // Percentage filter
  },
];
```

## Tips for Optimal Filtering Performance

1. **Debounce Search Input**: The search input automatically debounces user input to avoid excessive API calls.

2. **Server-Side Filtering**: Always implement filtering on the server side for large datasets.

3. **Index Searchable Fields**: Ensure your database has proper indexes on frequently filtered columns.

4. **Use Views for Common Filters**: Pre-configure common filter combinations as views for better UX.

5. **Clear Filter State**: Provide easy ways for users to clear all filters and return to the default view.
