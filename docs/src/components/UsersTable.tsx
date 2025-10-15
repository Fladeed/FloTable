import React from 'react';
import { FloTableWithViews, View, FloTableActionConfig } from '../../../src';
import { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, ExportOutlined, MailOutlined, UserOutlined, CrownOutlined } from '@ant-design/icons';
import { Tag, Avatar, Switch, Badge, Button, Tooltip, Space, Progress } from 'antd';

// Mock data for demonstration
const generateMockUsers = (count: number) => {
  const statuses = ['active', 'inactive', 'pending'];
  const roles = ['Admin', 'Manager', 'User', 'Guest'];
  const departments = ['Engineering', 'Sales', 'Marketing', 'Support', 'HR'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@company.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const mockUsers = generateMockUsers(150);

const userColumns: ProColumns<any>[] = [
  {
    title: 'User Profile',
    key: 'user',
    dataIndex: 'name',
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
        {/* First Row: Avatar + Name + Department */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ position: 'relative' }}>
            <Avatar 
              size={48} 
              style={{ 
                backgroundColor: record.department === 'Engineering' ? '#1890ff' : 
                               record.department === 'Marketing' ? '#52c41a' : 
                               record.department === 'Sales' ? '#faad14' : '#722ed1'
              }}
              icon={<UserOutlined />}
            >
              {record.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            {record.role === 'Admin' && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '16px',
                height: '16px',
                backgroundColor: '#ff4d4f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CrownOutlined style={{ fontSize: '8px', color: '#fff' }} />
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '14px',
              marginBottom: '4px'
            }}>
              {record.name}
            </div>
            <Tag 
              color={record.department === 'Engineering' ? 'blue' : 
                    record.department === 'Marketing' ? 'green' : 
                    record.department === 'Sales' ? 'orange' : 'purple'}
              style={{ fontSize: '10px', fontWeight: 'bold' }}
            >
              {record.department}
            </Tag>
          </div>
        </div>
        
        {/* Second Row: Email + Role */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '8px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            fontSize: '11px', 
            color: 'var(--ifm-color-content)',
            fontFamily: 'monospace',
            backgroundColor: 'var(--ifm-color-emphasis-200)',
            padding: '2px 6px', 
            borderRadius: '4px',
            flex: 1,
            minWidth: '120px'
          }}>
            {record.email}
          </div>
          <Tag color={record.role === 'Admin' ? 'red' : record.role === 'Manager' ? 'gold' : 'default'}>
            {record.role}
          </Tag>
        </div>
        
        {/* Third Row: Status */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: record.status === 'active' ? '#81C177' : '#ef4444'
          }}></div>
          <span style={{ 
            fontSize: '11px', 
            color: 'var(--ifm-color-content-secondary)',
            fontWeight: '500' 
          }}>
            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
          </span>
        </div>
      </div>
    ),
  },
  // Hidden columns for quick filtering
  {
    title: 'Email',
    dataIndex: 'email',
    hideInTable: true,
    key: 'email_filter',
  },
  {
    title: 'Role & Department',
    key: 'role_department',
    dataIndex: 'role',
    width: 250,
    render: (_, record) => (
      <div>
        <Tag 
          color={
            record.role === 'Admin' ? 'red' : 
            record.role === 'Manager' ? 'orange' : 
            record.role === 'User' ? 'blue' : 'default'
          }
          icon={record.role === 'Admin' ? <CrownOutlined /> : <UserOutlined />}
          style={{ marginBottom: 4 }}
        >
          {record.role}
        </Tag>
        <div className="text-sm text-gray-600">{record.department}</div>
      </div>
    ),
    filters: true,
    valueEnum: {
      'Admin': { text: 'Admin', status: 'Error' },
      'Manager': { text: 'Manager', status: 'Warning' },
      'User': { text: 'User', status: 'Success' },
      'Guest': { text: 'Guest', status: 'Default' },
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    valueType: 'select',
    valueEnum: {
      'active': { 
        text: 'Active', 
        status: 'Success',
        color: 'success'
      },
      'inactive': { 
        text: 'Inactive', 
        status: 'Default',
        color: 'default'
      },
      'pending': { 
        text: 'Pending', 
        status: 'Processing',
        color: 'processing'
      },
    },
    render: (_, record) => (
      <Badge 
        status={record.status === 'active' ? 'success' : record.status === 'pending' ? 'processing' : 'default'}
        text={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
      />
    ),
  },
  {
    title: 'Department & Location',
    key: 'department_location',
    dataIndex: 'department',
    render: (_, record) => (
      <div>
        <div className="font-medium text-gray-900">{record.department}</div>
        <div className="text-sm text-gray-500">
          {['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 5)]} Office
        </div>
        <div className="text-xs text-blue-600">
          {['Remote', 'Hybrid', 'On-site'][Math.floor(Math.random() * 3)]}
        </div>
      </div>
    ),
  },
  {
    title: 'Activity Score',
    key: 'activity',
    width: 180,
    render: (_, record) => {
      const score = Math.floor(Math.random() * 100);
      const color = score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#ff4d4f';
      return (
        <div>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={color}
            format={(percent) => `${percent}%`}
          />
          <div className="text-xs text-gray-500 mt-1">Engagement Score</div>
        </div>
      );
    },
    sorter: (a, b) => {
      const scoreA = Math.floor(Math.random() * 100);
      const scoreB = Math.floor(Math.random() * 100);
      return scoreA - scoreB;
    },
  },
  {
    title: 'Join Date',
    dataIndex: 'joinDate',
    key: 'joinDate',
    valueType: 'date',
    width: 160,
    sorter: true,
    render: (_, record) => (
      <Tooltip title={`Joined ${new Date(record.joinDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`}>
        <div>
          <div className="font-medium">{new Date(record.joinDate).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {Math.floor((Date.now() - new Date(record.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
          </div>
        </div>
      </Tooltip>
    ),
  },
  {
    title: 'Login',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    valueType: 'dateTime',
    width: 160,
    sorter: true,
    render: (_, record) => {
      const lastLogin = new Date(record.lastLogin);
      const isRecent = (Date.now() - lastLogin.getTime()) < (24 * 60 * 60 * 1000);
      return (
        <div>
          <div className={`text-sm ${isRecent ? 'text-green-600' : 'text-gray-600'}`}>
            {lastLogin.toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {lastLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 180,
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Send Message">
          <Button 
            type="text" 
            icon={<MailOutlined />} 
            size="small"
            onClick={() => console.log('Message user:', record.name)}
          />
        </Tooltip>
        <Tooltip title="Edit User">
          <Button 
            type="text" 
            icon={<UserOutlined />} 
            size="small"
            onClick={() => console.log('Edit user:', record.name)}
          />
        </Tooltip>
        <Switch
          size="small"
          checked={record.status === 'active'}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(checked) => console.log(`${record.name} status:`, checked ? 'active' : 'inactive')}
        />
      </Space>
    ),
  },
];

const userViews: View[] = [
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
  {
    key: 'admins',
    label: 'Administrators',
    shortLabel: 'Admins',
    query: 'role:admin',
    filters: { role: 'Admin' },
  },
  {
    key: 'recent',
    label: 'Recently Joined',
    shortLabel: 'Recent',
    query: 'joined:last-30-days',
    filters: { joinDate: 'last-30-days' },
  },
  {
    key: 'inactive',
    label: 'Inactive Users',
    shortLabel: 'Inactive',
    query: 'status:inactive',
    filters: { status: 'inactive' },
  },
];

const userActions: FloTableActionConfig[] = [
  {
    label: 'Add User',
    description: 'Create a new user account',
    handler: () => console.log('Add user clicked'),
    icon: <PlusOutlined />,
    type: 'primary',
  },
  {
    label: 'Export',
    description: 'Export user data to CSV',
    handler: () => console.log('Export clicked'),
    icon: <ExportOutlined />,
  },
  {
    label: 'Bulk Actions',
    description: 'Perform actions on multiple users',
    handler: () => console.log('Bulk actions clicked'),
    icon: <MailOutlined />,
  },
];const UsersTable = () => {
  const handleRequest = async (params: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...mockUsers];
    
    // Apply filters
    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters[key] && params.filters[key] !== '') {
          filteredData = filteredData.filter(item => 
            item[key]?.toString().toLowerCase().includes(params.filters[key].toString().toLowerCase())
          );
        }
      });
    }
    
    // Apply search
    if (params.keyword) {
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(params.keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(params.keyword.toLowerCase())
      );
    }
    
    // Apply pagination
    const { current = 1, pageSize = 10 } = params;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      success: true,
      total: filteredData.length,
    };
  };

  return (
    <FloTableWithViews
      id="users-table"
      title="User Management System"
      description="Comprehensive user management with advanced Ant Design ProTable features including fixed columns, custom renderers, and interactive components"
      columns={userColumns}
      request={handleRequest}
      views={userViews}
      actions={userActions}
      enableInfiniteScroll={false}
      initQuickFilterColumns={['name', 'email', 'role', 'status', 'department']}
      defaultMobilePageSize={20}
      defaultPageSize={15}
      className="full-width-table"
    />
  );
};

export default UsersTable;