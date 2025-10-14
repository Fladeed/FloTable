# Examples

Comprehensive examples showing all FloTable features and real-world usage patterns.

## Quick Start Example

A simple table to get you started quickly.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';
import type { ProColumns } from '@ant-design/pro-components';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const QuickStartExample = () => {
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
      description="Manage your application users"
      columns={columns}
      request={fetchUsers}
      initQuickFilterColumns={['name', 'email']}
    />
  );
};
```

## Views System Example

Create predefined filtered views for different data perspectives.

```tsx
import { FloTableWithViews, View } from 'flo-table-with-views';

const ViewsExample = () => {
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
    {
      key: 'recent',
      label: 'Recently Joined',
      shortLabel: 'Recent',
      query: 'created:last-30-days',
      filters: { createdAt: 'last-30-days' },
    },
    {
      key: 'vip',
      label: 'VIP Members',
      shortLabel: 'VIP',
      query: 'tier:vip',
      filters: { tier: 'vip', status: 'active' },
    },
  ];

  return (
    <FloTableWithViews
      id="users-with-views"
      title="Advanced User Management"
      description="Switch between different user perspectives"
      columns={userColumns}
      request={fetchUsers}
      views={views}
      initQuickFilterColumns={['name', 'email']}
    />
  );
};
```

## Actions & Toolbar Example

Add custom action buttons with dropdowns and handlers.

```tsx
import { FloTableWithViews, FloTableActionConfig } from 'flo-table-with-views';
import { PlusOutlined, ExportOutlined, ImportOutlined, MoreOutlined } from '@ant-design/icons';

const ActionsExample = () => {
  const actions: FloTableActionConfig[] = [
    {
      key: 'add',
      label: 'Add User',
      icon: <PlusOutlined />,
      type: 'primary',
      tooltip: 'Create a new user account',
      onClick: () => {
        // Open add user modal
        setAddModalVisible(true);
      },
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      tooltip: 'Export user data',
      onClick: async () => {
        // Export functionality
        const data = await exportUsers();
        downloadFile(data, 'users.csv');
      },
    },
    {
      key: 'more',
      label: 'More Actions',
      icon: <MoreOutlined />,
      children: [
        {
          key: 'import',
          label: 'Import Users',
          icon: <ImportOutlined />,
          onClick: () => setImportModalVisible(true),
        },
        {
          key: 'bulk-delete',
          label: 'Bulk Delete',
          danger: true,
          onClick: () => setBulkDeleteModalVisible(true),
        },
        {
          key: 'send-email',
          label: 'Send Email Campaign',
          onClick: () => setEmailCampaignModalVisible(true),
        },
      ],
    },
  ];

  return (
    <FloTableWithViews
      id="table-with-actions"
      title="User Management Dashboard"
      description="Complete user management with actions"
      columns={userColumns}
      request={fetchUsers}
      actions={actions}
      views={userViews}
    />
  );
};
```

## Mobile Optimized Example

Perfect mobile experience with infinite scroll and responsive design.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';

const MobileOptimizedExample = () => {
  const mobileColumns: ProColumns<Student>[] = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left', // Pin important columns on mobile
      render: (text, record) => (
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-gray-500 text-sm">{record.studentId}</div>
          <div className="text-sm text-blue-600">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      sorter: true,
      render: (grade) => (
        <span className={grade >= 85 ? 'text-green-600 font-semibold' : grade >= 70 ? 'text-yellow-600' : 'text-red-600'}>
          {grade}%
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'active' ? 'text-green-600' : 'text-gray-600'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      hideInTable: true, // Hide on small screens
      responsive: ['md'],  // Show only on medium+ screens
    },
  ];

  return (
    <FloTableWithViews
      id="mobile-students"
      title="Student Management"
      description="Manage student records and grades"
      columns={mobileColumns}
      request={fetchStudents}
      enableInfiniteScroll={true}
      defaultMobilePageSize={30}
      defaultPageSize={15}
      initQuickFilterColumns={['name', 'studentId']}
    />
  );
};
```

## Advanced Filtering Example

Sophisticated filtering with custom components and search.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';

const AdvancedFilteringExample = () => {
  const advancedColumns: ProColumns<Order>[] = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      copyable: true,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      filterDropdown: true, // Enable column filter
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        pending: { text: 'Pending', status: 'Processing' },
        confirmed: { text: 'Confirmed', status: 'Success' },
        shipped: { text: 'Shipped', status: 'Default' },
        delivered: { text: 'Delivered', status: 'Success' },
        cancelled: { text: 'Cancelled', status: 'Error' },
      },
      filters: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      sorter: true,
      render: (total) => `$${total.toFixed(2)}`,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input.Group compact>
            <Input
              style={{ width: '40%' }}
              placeholder="Min"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            />
            <Input
              style={{ width: '40%' }}
              placeholder="Max"
              value={selectedKeys[1]}
              onChange={(e) => {
                const keys = [...selectedKeys];
                keys[1] = e.target.value;
                setSelectedKeys(keys);
              }}
            />
          </Input.Group>
          <Space style={{ marginTop: 8 }}>
            <Button onClick={() => confirm()}>Filter</Button>
            <Button onClick={() => clearFilters()}>Reset</Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateRange',
      sorter: true,
    },
  ];

  const orderViews: View[] = [
    {
      key: 'all',
      label: 'All Orders',
      shortLabel: 'All',
      query: '',
      filters: {},
    },
    {
      key: 'pending',
      label: 'Pending Orders',
      shortLabel: 'Pending',
      query: 'status:pending',
      filters: { status: 'pending' },
    },
    {
      key: 'today',
      label: "Today's Orders",
      shortLabel: 'Today',
      query: 'date:today',
      filters: { createdAt: 'today' },
    },
    {
      key: 'high-value',
      label: 'High Value Orders',
      shortLabel: 'High Value',
      query: 'total:>500',
      filters: { total: { min: 500 } },
    },
  ];

  return (
    <FloTableWithViews
      id="orders-advanced"
      title="Order Management"
      description="Advanced order tracking with comprehensive filtering"
      columns={advancedColumns}
      request={fetchOrders}
      views={orderViews}
      initQuickFilterColumns={['id', 'customerName']}
      enableInfiniteScroll={false} // Use pagination for complex data
    />
  );
};
```

## Custom Styling Example

Fully customized table with theme integration.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';

const CustomStyledExample = () => {
  return (
    <FloTableWithViews
      id="styled-table"
      title="Custom Styled Table"
      description="Example with custom styling and themes"
      columns={columns}
      request={fetchData}
      // Custom CSS classes
      className="custom-table-container"
      headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-lg"
      titleClassName="text-2xl font-bold text-white"
      descriptionClassName="text-blue-100 mt-2"
      cardClassName="shadow-2xl border-0 rounded-lg overflow-hidden"
      tabsClassName="custom-tabs bg-white"
      // Custom inline styles
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '1rem',
        padding: '1rem',
      }}
    />
  );
};
```

## 🏢 Real-World Payment Management Example

Complete payment processing management table.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';

const PaymentManagementExample = () => {
  const paymentColumns: ProColumns<Payment>[] = [
    {
      title: 'Transaction',
      key: 'transaction',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {record.method.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-semibold">{record.transactionId}</div>
            <div className="text-sm text-gray-500">{record.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (amount, record) => (
        <div>
          <div className="font-semibold">${amount.toFixed(2)}</div>
          <div className="text-sm text-gray-500">{record.currency}</div>
        </div>
      ),
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      filters: true,
      valueEnum: {
        'credit-card': { text: 'Credit Card' },
        'debit-card': { text: 'Debit Card' },
        'paypal': { text: 'PayPal' },
        'bank-transfer': { text: 'Bank Transfer' },
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        pending: { text: 'Pending', status: 'Processing' },
        completed: { text: 'Completed', status: 'Success' },
        failed: { text: 'Failed', status: 'Error' },
        refunded: { text: 'Refunded', status: 'Warning' },
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => viewDetails(record.id)}>
            Details
          </Button>
          {record.status === 'completed' && (
            <Button size="small" onClick={() => processRefund(record.id)}>
              Refund
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const paymentViews: View[] = [
    {
      key: 'all',
      label: 'All Payments',
      shortLabel: 'All',
      query: '',
      filters: {},
    },
    {
      key: 'pending',
      label: 'Pending Payments',
      shortLabel: 'Pending',
      query: 'status:pending',
      filters: { status: 'pending' },
    },
    {
      key: 'today',
      label: "Today's Transactions",
      shortLabel: 'Today',
      query: 'date:today',
      filters: { createdAt: 'today' },
    },
    {
      key: 'high-value',
      label: 'High Value ($1000+)',
      shortLabel: 'High Value',
      query: 'amount:>1000',
      filters: { amount: { min: 1000 } },
    },
    {
      key: 'failed',
      label: 'Failed Transactions',
      shortLabel: 'Failed',
      query: 'status:failed',
      filters: { status: 'failed' },
    },
  ];

  const paymentActions: FloTableActionConfig[] = [
    {
      key: 'export',
      label: 'Export Report',
      type: 'primary',
      icon: <DownloadOutlined />,
      onClick: () => exportPaymentReport(),
    },
    {
      key: 'reconcile',
      label: 'Reconcile',
      icon: <CheckCircleOutlined />,
      onClick: () => startReconciliation(),
    },
    {
      key: 'bulk',
      label: 'Bulk Actions',
      children: [
        {
          key: 'bulk-refund',
          label: 'Bulk Refund',
          icon: <UndoOutlined />,
          onClick: () => setBulkRefundModalVisible(true),
        },
        {
          key: 'bulk-export',
          label: 'Export Selected',
          onClick: () => exportSelected(),
        },
      ],
    },
  ];

  return (
    <FloTableWithViews
      id="payment-management"
      title="Payment Management"
      description="Monitor and manage all payment transactions"
      columns={paymentColumns}
      request={fetchPayments}
      views={paymentViews}
      actions={paymentActions}
      enableInfiniteScroll={true}
      initQuickFilterColumns={['transactionId', 'customerEmail']}
      defaultMobilePageSize={25}
      defaultPageSize={20}
    />
  );
};
```

## Integration Examples

### With React Query
```tsx
import { useQuery } from '@tanstack/react-query';

const ReactQueryExample = () => {
  const fetchUsers = async (params) => {
    const { data } = await useQuery({
      queryKey: ['users', params],
      queryFn: () => api.getUsers(params),
    });
    return data;
  };

  return (
    <FloTableWithViews
      id="react-query-table"
      title="React Query Integration"
      columns={columns}
      request={fetchUsers}
    />
  );
};
```

### With Redux Toolkit
```tsx
import { useDispatch, useSelector } from 'react-redux';

const ReduxExample = () => {
  const dispatch = useDispatch();
  const { users, loading, total } = useSelector(state => state.users);

  const fetchUsers = async (params) => {
    const result = await dispatch(fetchUsersThunk(params));
    return {
      data: result.payload.users,
      total: result.payload.total,
      success: true,
    };
  };

  return (
    <FloTableWithViews
      id="redux-table"
      title="Redux Integration"
      columns={columns}
      request={fetchUsers}
    />
  );
};
```

## 🎓 Student Management Example

Complete student records management with grade tracking.

```tsx
import { FloTableWithViews } from 'flo-table-with-views';

const StudentManagementExample = () => {
  const studentColumns: ProColumns<Student>[] = [
    {
      title: 'Student',
      key: 'student',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            {record.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold">{record.name}</div>
            <div className="text-sm text-gray-500">ID: {record.studentId}</div>
            <div className="text-sm text-blue-600">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      filters: true,
      valueEnum: {
        'computer-science': { text: 'Computer Science' },
        'mathematics': { text: 'Mathematics' },
        'physics': { text: 'Physics' },
        'chemistry': { text: 'Chemistry' },
      },
    },
    {
      title: 'Grade',
      dataIndex: 'currentGrade',
      key: 'currentGrade',
      sorter: true,
      render: (grade) => (
        <div className="flex items-center space-x-2">
          <div className={`font-semibold ${
            grade >= 90 ? 'text-green-600' : 
            grade >= 80 ? 'text-blue-600' : 
            grade >= 70 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {grade}%
          </div>
          <div className={`px-2 py-1 rounded text-xs ${
            grade >= 90 ? 'bg-green-100 text-green-800' : 
            grade >= 80 ? 'bg-blue-100 text-blue-800' : 
            grade >= 70 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {grade >= 90 ? 'A' : grade >= 80 ? 'B' : grade >= 70 ? 'C' : 'D'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'enrollmentStatus',
      key: 'enrollmentStatus',
      valueEnum: {
        active: { text: 'Active', status: 'Success' },
        probation: { text: 'Probation', status: 'Warning' },
        suspended: { text: 'Suspended', status: 'Error' },
        graduated: { text: 'Graduated', status: 'Default' },
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => viewTranscript(record.id)}>
            Transcript
          </Button>
          <Button size="small" onClick={() => contactStudent(record.id)}>
            Contact
          </Button>
        </Space>
      ),
    },
  ];

  const studentViews: View[] = [
    {
      key: 'all',
      label: 'All Students',
      shortLabel: 'All',
      query: '',
      filters: {},
    },
    {
      key: 'active',
      label: 'Active Students',
      shortLabel: 'Active',
      query: 'status:active',
      filters: { enrollmentStatus: 'active' },
    },
    {
      key: 'high-performers',
      label: 'High Performers (A Grade)',
      shortLabel: 'A Students',
      query: 'grade:>=90',
      filters: { currentGrade: { min: 90 } },
    },
    {
      key: 'at-risk',
      label: 'At Risk Students',
      shortLabel: 'At Risk',
      query: 'grade:<70',
      filters: { currentGrade: { max: 70 } },
    },
  ];

  return (
    <FloTableWithViews
      id="student-management"
      title="Student Management System"
      description="Track student progress, grades, and enrollment status"
      columns={studentColumns}
      request={fetchStudents}
      views={studentViews}
      enableInfiniteScroll={true}
      initQuickFilterColumns={['name', 'studentId', 'email']}
      defaultMobilePageSize={20}
      defaultPageSize={15}
    />
  );
};
```

These examples demonstrate the full power and flexibility of FloTable components. Mix and match features to create the perfect table for your use case!
