---
sidebar_position: 3
---

# Views System

The views system is one of the most powerful features of FloTable, allowing users to quickly switch between different filtered states of your data.

## What are Views?

Views are predefined filtered states of your table data. They allow users to quickly switch between different perspectives of the same dataset without having to manually configure filters each time.

## View Configuration

Each view is defined with the following properties:

```tsx
interface View {
  key: string;           // Unique identifier
  label: string;         // Full label for desktop
  shortLabel: string;    // Short label for mobile
  query: string;         // Human-readable query description
  filters: object;       // Filter parameters to apply
}
```

## Example Views

```tsx
const views: View[] = [
  {
    key: 'all',
    label: 'All Restaurants',
    shortLabel: 'All',
    query: '',
    filters: {},
  },
  {
    key: 'open',
    label: 'Open Now',
    shortLabel: 'Open',
    query: 'status:open',
    filters: { status: 'open' },
  },
  {
    key: 'featured',
    label: 'Featured Restaurants',
    shortLabel: 'Featured',
    query: 'featured:true',
    filters: { featured: true },
  },
  {
    key: 'high-rated',
    label: 'High Rated (4.5+)',
    shortLabel: 'Top Rated',
    query: 'rating:>=4.5',
    filters: { minRating: 4.5 },
  },
];
```

## Responsive Behavior

Views automatically adapt to different screen sizes:

- **Desktop**: Shows full labels with icons
- **Tablet**: Shows shortened labels
- **Mobile**: Shows short labels in a horizontal scrollable list

## Advanced Filters

Views can include complex filter combinations:

```tsx
{
  key: 'premium-active',
  label: 'Premium Active Users',
  shortLabel: 'Premium',
  query: 'plan:premium AND status:active',
  filters: {
    plan: 'premium',
    status: 'active',
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    }
  },
}
```

## Dynamic Views

You can also create views dynamically based on your data:

```tsx
const createViewsFromCategories = (categories: string[]) => {
  return categories.map(category => ({
    key: category.toLowerCase(),
    label: `${category} Items`,
    shortLabel: category,
    query: `category:${category}`,
    filters: { category },
  }));
};
```