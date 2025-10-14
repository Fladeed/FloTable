# API Reference

Complete API reference for FloTable components and utilities.

## FloTableWithViews

Main component for displaying data tables with customizable views, filtering, and mobile optimization.

### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `Key` | ✅ | Unique identifier for the table instance |
| `title` | `string` | ✅ | Title displayed above the table |
| `columns` | `ProColumns<T>[]` | ✅ | Column definitions (Ant Design Pro format) |
| `request` | `FloRequest<T>` | ✅ | Data fetching function |
| `description` | `string` | ❌ | Optional description text below title |
| `dataName` | `string` | ❌ | Name for the data being displayed (e.g., "users", "products") |
| `rowKey` | `string` | ❌ | Key field for table rows (default: "id") |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `views` | `View[]` | `[]` | Predefined filtered views of data |
| `actions` | `FloTableActionConfig[]` | `[]` | Action buttons in toolbar |
| `initQuickFilterColumns` | `string[]` | `[]` | Initial columns for quick filtering |
| `enableInfiniteScroll` | `boolean` | `true` | Enable infinite scroll on mobile |
| `defaultMobilePageSize` | `number` | `20` | Items per page on mobile |
| `defaultPageSize` | `number` | `10` | Items per page on desktop |

### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS class for the main container |
| `headerClassName` | `string` | CSS class for the header section |
| `titleClassName` | `string` | CSS class for the title element |
| `descriptionClassName` | `string` | CSS class for the description text |
| `cardClassName` | `string` | CSS class for the card wrapper |
| `tabsClassName` | `string` | CSS class for the tabs component |
| `style` | `React.CSSProperties` | Inline styles for main container |

### Example Usage

```tsx
<FloTableWithViews
  id="users-table"
  title="User Management"
  description="Manage all users in your system"
  columns={userColumns}
  request={fetchUsers}
  views={userViews}
  actions={userActions}
  enableInfiniteScroll={true}
  initQuickFilterColumns={['name', 'email']}
/>
```

## FloTable (Simple)

Basic table component without views system, used internally by FloTableWithViews.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `Key` | ✅ | Unique identifier |
| `columns` | `ProColumns<T>[]` | ✅ | Column definitions |
| `request` | `FloRequest<T>` | ✅ | Data fetching function |
| `dataName` | `string` | ❌ | Data name for display |
| `rowKey` | `string` | ❌ | Row key field (default: "id") |
| `initQuickFilterColumns` | `string[]` | ❌ | Quick filter columns |
| `enableInfiniteScroll` | `boolean` | ❌ | Enable infinite scroll |
| `defaultMobilePageSize` | `number` | ❌ | Mobile page size |
| `defaultPageSize` | `number` | ❌ | Desktop page size |
| `className` | `string` | ❌ | Container CSS class |
| `tableClassName` | `string` | ❌ | Table CSS class |
| `style` | `React.CSSProperties` | ❌ | Inline styles |

## FloTableActions

Action buttons component for table toolbars.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `Key` | ✅ | Unique identifier |
| `actions` | `FloTableActionConfig[]` | ✅ | Action configurations |

## FloTableFilters

Advanced filtering component with drawer interface.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `Key` | ✅ | Unique identifier |
| `columns` | `ProColumns<T>[]` | ✅ | Column definitions |
| `quickFilterColumns` | `string[]` | ✅ | Current quick filter columns |
| `initQuickFilterColumns` | `string[]` | ✅ | Initial quick filter columns |
| `setFilterVisible` | `(visible: boolean) => void` | ✅ | Filter drawer visibility control |
| `filters` | `FloFilters<T>` | ✅ | Current filter values |
| `onFiltersChange` | `(filters: FloFilters<T>) => void` | ❌ | Filter change handler |
| `onQuickFilterColumnsChange` | `(columns: string[]) => void` | ❌ | Quick filter change handler |
| `className` | `string` | ❌ | Container CSS class |
| `buttonClassName` | `string` | ❌ | Button CSS class |

## Type Definitions

### View

Defines a predefined filtered view of table data.

```typescript
type View = {
  key: string;           // Unique view identifier
  label: string;         // Display name for desktop
  shortLabel: string;    // Display name for mobile
  query: string;         // Search query string
  filters?: Record<string, any>; // Filter parameters
};
```

**Example:**
```typescript
const views: View[] = [
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
];
```

### FloTableActionConfig

Configuration for action buttons in the toolbar.

```typescript
type FloTableActionConfig = {
  key: string;                    // Unique action identifier
  label: string;                  // Button text
  icon?: React.ReactNode;         // Optional icon
  tooltip?: string;               // Tooltip text
  onClick?: () => void;           // Click handler
  danger?: boolean;               // Danger styling
  disabled?: boolean;             // Disabled state
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  children?: FloTableActionConfig[]; // Dropdown menu items
};
```

**Example:**
```typescript
const actions: FloTableActionConfig[] = [
  {
    key: 'add',
    label: 'Add User',
    icon: <PlusOutlined />,
    type: 'primary',
    onClick: () => setAddModalVisible(true),
  },
  {
    key: 'more',
    label: 'More Actions',
    children: [
      {
        key: 'export',
        label: 'Export Data',
        onClick: handleExport,
      },
      {
        key: 'import',
        label: 'Import Data',
        onClick: handleImport,
      },
    ],
  },
];
```

### FloFilters

Type-safe filter object for table data.

```typescript
type FloFilterKey<T> = keyof T | "search";
type FloFilters<T> = Record<FloFilterKey<T>, any>;
```

### FloRequest

Data fetching function signature for table requests.

```typescript
type FloRequest<T> = (params: {
  current?: number;              // Current page number
  pageSize?: number;             // Items per page
  keyword?: string;              // Search keyword
  filters?: Record<string, any>; // Filter parameters
}) => Promise<{
  data: T[];                     // Array of table data
  total: number;                 // Total number of items
  success?: boolean;             // Request success status
}>;
```

**Example:**
```typescript
const fetchUsers: FloRequest<User> = async (params) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  const result = await response.json();
  
  return {
    data: result.users,
    total: result.total,
    success: true,
  };
};
```

## Hooks

### useIsMobile

Hook for detecting mobile devices and responsive behavior.

```typescript
function useIsMobile(): boolean;
```

**Usage:**
```typescript
import { useIsMobile } from 'flo-table-with-views';

function MyComponent() {
  const isMobile = useIsMobile();
  return <div>{isMobile ? 'Mobile View' : 'Desktop View'}</div>;
}
```

### useInfiniteScroll

Hook for implementing infinite scroll functionality.

```typescript
function useInfiniteScroll<T>(options: {
  request: FloRequest<T>;
  filters: FloFilters<T>;
  pageSize: number;
}): {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
};
```

## Utilities

### cn (Class Names)

Utility for conditional CSS class composition.

```typescript
function cn(...classes: (string | undefined | null | false)[]): string;
```

**Usage:**
```typescript
import { cn } from 'flo-table-with-views';

const className = cn(
  'base-class',
  isActive && 'active',
  isMobile && 'mobile'
);
```

### MobileTableType

Enum for mobile table display types.

```typescript
enum MobileTableType {
  CARD = 'card',
  LIST = 'list',
  TABLE = 'table',
}
```
