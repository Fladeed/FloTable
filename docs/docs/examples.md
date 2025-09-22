# Examples

This page contains practical examples of using FloTable components in different scenarios.

## Basic Table Example

```tsx
import { FloTableWithViews } from '@fladeed/flo-table';

const BasicExample = () => {
  const columns = [
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

  const request = async (params) => {
    // Fetch your data here
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.json();
  };

  return (
    <FloTableWithViews
      id="users-table"
      title="Users"
      description="Manage your application users"
      columns={columns}
      request={request}
      initQuickFilterColumns={['name', 'email']}
    />
  );
};
```

## Table with Views Example

```tsx
import { FloTableWithViews, View } from '@fladeed/flo-table';

const views: View[] = [
  {
    key: 'all',
    label: 'All Users',
    shortLabel: 'All',
    query: '',
    filters: {}
  },
  {
    key: 'active',
    label: 'Active Users',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' }
  },
  {
    key: 'inactive',
    label: 'Inactive Users', 
    shortLabel: 'Inactive',
    query: 'status:inactive',
    filters: { status: 'inactive' }
  }
];

const ViewsExample = () => {
  return (
    <FloTableWithViews
      id="users-with-views"
      title="Users Management"
      description="User management with predefined views"
      columns={columns}
      request={request}
      views={views}
      initQuickFilterColumns={['name', 'email']}
    />
  );
};
```

## Custom Styling Example

```tsx
import { FloTableWithViews } from '@fladeed/flo-table';

const StyledExample = () => {
  return (
    <FloTableWithViews
      id="styled-table"
      title="Styled Table"
      columns={columns}
      request={request}
      className="my-custom-table"
      headerClassName="bg-blue-50 p-4"
      titleClassName="text-blue-900 font-bold"
      cardClassName="shadow-lg border-blue-200"
      tabsClassName="custom-tabs"
    />
  );
};
```

## With Actions Example

```tsx
import { FloTableWithViews, FloTableActionConfig } from '@fladeed/flo-table';

const actions: FloTableActionConfig[] = [
  {
    key: 'export',
    label: 'Export',
    onClick: () => {
      // Handle export
    }
  },
  {
    key: 'import',
    label: 'Import',
    onClick: () => {
      // Handle import
    }
  }
];

const ActionsExample = () => {
  return (
    <FloTableWithViews
      id="table-with-actions"
      title="Table with Actions"
      columns={columns}
      request={request}
      actions={actions}
    />
  );
};
```

## Infinite Scroll Example

```tsx
import { FloTableWithViews } from '@fladeed/flo-table';

const InfiniteScrollExample = () => {
  return (
    <FloTableWithViews
      id="infinite-scroll-table"
      title="Large Dataset"
      description="Table with infinite scrolling for better performance"
      columns={columns}
      request={request}
      enableInfiniteScroll={true}
      defaultMobilePageSize={50}
      defaultPageSize={25}
    />
  );
};
```
