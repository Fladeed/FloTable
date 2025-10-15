'use client';

import React from 'react';
import { FloTableWithViews, View, FloTableActionConfig } from '../../../src';
import { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, ExportOutlined, DollarOutlined, CreditCardOutlined, PayCircleOutlined, BankOutlined, WalletOutlined, UserOutlined } from '@ant-design/icons';
import { Tag, Badge, Button, Tooltip, Space, Statistic, Card, Avatar } from 'antd';

// Mock payment data
interface Payment {
  id: string;
  transactionId: string;
  customer: string;
  email: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  method: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Digital Wallet';
  date: string;
  description: string;
}

const generateMockPayments = (count: number): Payment[] => {
  const statuses: Payment['status'][] = ['Completed', 'Pending', 'Failed', 'Refunded'];
  const methods: Payment['method'][] = ['Credit Card', 'PayPal', 'Bank Transfer', 'Digital Wallet'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD'];
  const customers = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Chen', 'David Wilson',
    'Lisa Anderson', 'Tom Brown', 'Anna Martinez', 'Chris Taylor', 'Maria Garcia'
  ];
  const descriptions = [
    'Product purchase', 'Subscription renewal', 'Service fee', 'Premium upgrade',
    'Monthly subscription', 'One-time purchase', 'Consulting service', 'Software license'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    transactionId: `TXN-${String(i + 1).padStart(6, '0')}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    email: `customer${i + 1}@example.com`,
    amount: Math.floor(Math.random() * 2000) + 10,
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
    description: descriptions[Math.floor(Math.random() * descriptions.length)]
  }));
};

const mockPayments = generateMockPayments(200);

const paymentColumns: ProColumns<Payment>[] = [
  {
    title: 'Transaction Details',
    key: 'transaction',
    dataIndex: 'customer',
    width: 360,
    fixed: 'left',
    render: (_, record) => (
      <div style={{ 
        padding: '16px', 
        borderRadius: '8px', 
        border: '1px solid var(--ifm-color-emphasis-200)',
        backgroundColor: 'var(--ifm-background-surface-color)',
        width: '100%',
        minHeight: '140px'
      }}>
        {/* First Row: Avatar + Transaction ID + Method */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '12px'
        }}>
          <Avatar 
            size={48}
            style={{ 
              backgroundColor: 
                record.method === 'Credit Card' ? '#52c41a' : 
                record.method === 'PayPal' ? '#1890ff' : 
                record.method === 'Bank Transfer' ? '#722ed1' : '#faad14'
            }}
            icon={
              record.method === 'Credit Card' ? <CreditCardOutlined /> : 
              record.method === 'PayPal' ? <PayCircleOutlined /> : 
              record.method === 'Bank Transfer' ? <BankOutlined /> : <DollarOutlined />
            }
          />
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '14px',
              fontFamily: 'monospace',
              marginBottom: '4px',
              color: 'var(--ifm-color-content)'
            }}>
              {record.transactionId}
            </div>
            <Tag 
              color={
                record.method === 'Credit Card' ? 'green' : 
                record.method === 'PayPal' ? 'blue' : 
                record.method === 'Bank Transfer' ? 'purple' : 'orange'
              }
              style={{ fontSize: '10px', fontWeight: 'bold' }}
            >
              {record.method}
            </Tag>
          </div>
        </div>
        
        {/* Second Row: Amount + Status */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '8px'
        }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#81C177',
            flex: 1
          }}>
            ${record.amount.toLocaleString()}
          </div>
          <Tag 
            color={
              record.status === 'Completed' ? 'success' : 
              record.status === 'Pending' ? 'processing' : 
              record.status === 'Failed' ? 'error' : 'default'
            }
          >
            {record.status}
          </Tag>
        </div>
        
        {/* Third Row: Customer + Date */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '11px',
          color: 'var(--ifm-color-content-secondary)'
        }}>
          <UserOutlined style={{ fontSize: '10px' }} />
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {record.customer}
          </span>
          <span style={{ fontFamily: 'monospace' }}>
            {new Date(record.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    ),
  },
  {
    title: 'Customer Info',
    key: 'customer',
    width: 260,
    render: (_, record) => (
      <div>
        <div className="font-semibold text-gray-900">{record.customer}</div>
        <div className="text-sm text-blue-600">{record.email}</div>
        <Badge 
          status="default" 
          text={<span className="text-xs">Premium Customer</span>}
        />
      </div>
    ),
  },
  // Hidden columns for quick filtering
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    hideInTable: true,
    key: 'transaction_id_filter',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    hideInTable: true,
    key: 'description_filter',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 180,
    valueType: 'money',
    render: (_, record) => (
      <Card size="small" className="text-center" style={{ minWidth: 120 }}>
        <Statistic
          value={record.amount}
          precision={2}
          prefix={record.currency === 'USD' ? '$' : record.currency}
          valueStyle={{ 
            color: record.amount > 1000 ? '#3f8600' : '#cf1322',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        />
        <div className="text-xs text-gray-500 mt-1">
          {record.amount > 1000 ? 'High Value' : 'Standard'}
        </div>
      </Card>
    ),
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Payment Method',
    dataIndex: 'method',
    key: 'method',
    width: 200,
    valueType: 'select',
    valueEnum: {
      'Credit Card': { text: 'Credit Card', status: 'Default' },
      'PayPal': { text: 'PayPal', status: 'Processing' },
      'Bank Transfer': { text: 'Bank Transfer', status: 'Success' },
      'Digital Wallet': { text: 'Digital Wallet', status: 'Warning' },
    },
    render: (_, record) => {
      const getIcon = (method: string) => {
        switch (method) {
          case 'Credit Card': return <CreditCardOutlined />;
          case 'PayPal': return <PayCircleOutlined />;
          case 'Bank Transfer': return <BankOutlined />;
          case 'Digital Wallet': return <WalletOutlined />;
          default: return <DollarOutlined />;
        }
      };
      
      const getColor = (method: string) => {
        switch (method) {
          case 'Credit Card': return 'blue';
          case 'PayPal': return 'gold';
          case 'Bank Transfer': return 'green';
          case 'Digital Wallet': return 'purple';
          default: return 'default';
        }
      };

      return (
        <Tag icon={getIcon(record.method)} color={getColor(record.method)}>
          {record.method}
        </Tag>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    valueType: 'select',
    valueEnum: {
      'Completed': { text: 'Completed', status: 'Success' },
      'Pending': { text: 'Pending', status: 'Processing' },
      'Failed': { text: 'Failed', status: 'Error' },
      'Refunded': { text: 'Refunded', status: 'Warning' },
    },
    render: (_, record) => (
      <Badge 
        status={
          record.status === 'Completed' ? 'success' :
          record.status === 'Pending' ? 'processing' :
          record.status === 'Failed' ? 'error' : 'warning'
        }
        text={
          <span className={`font-medium ${
            record.status === 'Completed' ? 'text-green-600' :
            record.status === 'Failed' ? 'text-red-600' :
            record.status === 'Pending' ? 'text-blue-600' : 'text-orange-600'
          }`}>
            {record.status}
          </span>
        }
      />
    ),
  },
  {
    title: 'Processing Info',
    key: 'processing_info',
    width: 200,
    render: (_, record) => {
      const processingTime = Math.floor(Math.random() * 300) + 10; // 10-310 seconds
      const fees = (record.amount * 0.029).toFixed(2);
      return (
        <div>
          <div className="text-sm font-medium">Processing: {processingTime}s</div>
          <div className="text-xs text-gray-500">Fee: ${fees}</div>
          <div className="text-xs text-blue-600">
            {['Standard', 'Express', 'Instant'][Math.floor(Math.random() * 3)]} Processing
          </div>
        </div>
      );
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 200,
    valueType: 'dateTime',
    render: (_, record) => {
      const date = new Date(record.date);
      const isToday = date.toDateString() === new Date().toDateString();
      return (
        <Tooltip title={`Full timestamp: ${date.toLocaleString()}`}>
          <div>
            <div className={`font-medium ${isToday ? 'text-green-600' : 'text-gray-900'}`}>
              {date.toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            {isToday && <div className="text-xs text-green-600 font-medium">Today</div>}
          </div>
        </Tooltip>
      );
    },
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 180,
    render: (_, record) => (
      <Space size="small" direction="vertical">
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="link" 
              size="small"
              onClick={() => console.log('View payment:', record.transactionId)}
            >
              View
            </Button>
          </Tooltip>
          {record.status === 'Completed' && (
            <Tooltip title="Refund Payment">
              <Button 
                type="link" 
                size="small" 
                danger
                onClick={() => console.log('Refund payment:', record.transactionId)}
              >
                Refund
              </Button>
            </Tooltip>
          )}
        </Space>
        {record.status === 'Failed' && (
          <Button 
            type="primary" 
            size="small"
            onClick={() => console.log('Retry payment:', record.transactionId)}
          >
            Retry
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
    key: 'completed',
    label: 'Completed Payments',
    shortLabel: 'Completed',
    query: 'status:completed',
    filters: { status: 'Completed' },
  },
  {
    key: 'pending',
    label: 'Pending Payments',
    shortLabel: 'Pending',
    query: 'status:pending',
    filters: { status: 'Pending' },
  },
  {
    key: 'failed',
    label: 'Failed Payments',
    shortLabel: 'Failed',
    query: 'status:failed',
    filters: { status: 'Failed' },
  },
  {
    key: 'high-value',
    label: 'High Value Payments',
    shortLabel: 'High Value',
    query: 'amount:>1000',
    filters: { amount: '>1000' },
  },
  {
    key: 'refunded',
    label: 'Refunded Payments',
    shortLabel: 'Refunded',
    query: 'status:refunded',
    filters: { status: 'Refunded' },
  },
];

const paymentActions: FloTableActionConfig[] = [
  {
    label: 'Process Payment',
    description: 'Process a new payment',
    handler: () => console.log('Process payment clicked'),
    icon: <PlusOutlined />,
    type: 'primary',
  },
  {
    label: 'Export Report',
    description: 'Export payment report',
    handler: () => console.log('Export report clicked'),
    icon: <ExportOutlined />,
  },
  {
    label: 'Financial Summary',
    description: 'View financial summary',
    handler: () => console.log('Financial summary clicked'),
    icon: <DollarOutlined />,
  },
];

// Mock API function
const fetchPayments = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let filteredPayments = [...mockPayments];
  
  // Apply view filters
  if (params.status) {
    filteredPayments = filteredPayments.filter(payment => 
      payment.status.toLowerCase() === params.status.toLowerCase()
    );
  }
  
  if (params.method) {
    filteredPayments = filteredPayments.filter(payment => 
      payment.method === params.method
    );
  }
  
  // Apply search
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredPayments = filteredPayments.filter(payment =>
      payment.customer.toLowerCase().includes(searchTerm) ||
      payment.transactionId.toLowerCase().includes(searchTerm) ||
      payment.email.toLowerCase().includes(searchTerm) ||
      payment.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply sorting
  if (params.sort && params.order) {
    filteredPayments.sort((a, b) => {
      const aValue = a[params.sort as keyof Payment];
      const bValue = b[params.sort as keyof Payment];
      
      if (params.order === 'ascend') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }
  
  // Apply pagination
  const { current = 1, pageSize = 10 } = params;
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: filteredPayments.slice(start, end),
    total: filteredPayments.length,
    success: true,
  };
};

export const PaymentsTable: React.FC = () => {
  return (
    <FloTableWithViews
      id="payments-table"
      title="Payment Processing System"
      description="Advanced payment management with Ant Design ProTable features: fixed columns, custom statistics, interactive badges, and comprehensive transaction tracking"
      dataName="payment"
      columns={paymentColumns}
      rowKey="id"
      request={fetchPayments}
      views={paymentViews}
      actions={paymentActions}
      initQuickFilterColumns={['customer', 'method', 'status']}
      enableInfiniteScroll={false}
      defaultPageSize={15}
      className="full-width-table"
    />
  );
};

export default PaymentsTable;