import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FloTableWithViews, View, FloTableActionConfig } from '../../../src';

// Mock data for demonstration
const generateMockData = (count: number) => {
  const statuses = ['active', 'inactive', 'pending'];
  const departments = ['Engineering', 'Sales', 'Marketing', 'Support'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    salary: Math.floor(Math.random() * 100000) + 40000,
  }));
};

const mockData = generateMockData(200);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text, record) => (
      <div>
        <div className="font-semibold">{text}</div>
        <div className="text-sm text-gray-500">{record.email}</div>
      </div>
    ),
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
    render: (status: string) => (
      <span className={clsx(
        'px-2 py-1 rounded-full text-xs font-medium',
        {
          'bg-green-100 text-green-800': status === 'active',
          'bg-red-100 text-red-800': status === 'inactive',
          'bg-yellow-100 text-yellow-800': status === 'pending',
        }
      )}>
        {status}
      </span>
    ),
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Join Date',
    dataIndex: 'joinDate',
    key: 'joinDate',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    render: (salary: number) => `$${salary.toLocaleString()}`,
  },
];

const views: View[] = [
  {
    key: 'all',
    label: 'All Employees',
    shortLabel: 'All',
    query: '',
    filters: {}
  },
  {
    key: 'active',
    label: 'Active Employees',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' }
  },
  {
    key: 'engineering',
    label: 'Engineering Team',
    shortLabel: 'Engineering',
    query: 'department:Engineering',
    filters: { department: 'Engineering' }
  },
  {
    key: 'high-earners',
    label: 'High Earners (>$80k)',
    shortLabel: 'High Earners',
    query: 'salary:>80000',
    filters: { salary: '>80000' }
  }
];

const mockRequest = async (params: any) => {
  console.log('Request params:', params);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = [...mockData];
  
  // Apply search filter
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      item.department.toLowerCase().includes(keyword)
    );
  }
  
  // Apply other filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value && value !== '') {
        if (key === 'salary' && typeof value === 'string' && value.startsWith('>')) {
          const threshold = parseInt(value.substring(1));
          filteredData = filteredData.filter(item => item.salary > threshold);
        } else {
          filteredData = filteredData.filter(item => 
            String(item[key as keyof typeof item]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      }
    });
  }
  
  // Pagination
  const start = ((params.current || 1) - 1) * (params.pageSize || 10);
  const end = start + (params.pageSize || 10);
  const paginatedData = filteredData.slice(start, end);
  
  return {
    data: paginatedData,
    total: filteredData.length,
  };
};

export default function Playground(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [customTheme, setCustomTheme] = useState(false);

  return (
    <Layout
      title="Component Playground"
      description="Interactive playground for FloTable components"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <h1>FloTable Component Playground</h1>
            <p>
              Interact with the FloTable component below. Try different filters, search terms, and views to see how the component behaves.
            </p>
            
            <div className="margin-bottom--md">
              <label>
                <input 
                  type="checkbox" 
                  checked={customTheme}
                  onChange={(e) => setCustomTheme(e.target.checked)}
                />
                <span className="margin-left--sm">Apply Custom Theme</span>
              </label>
            </div>

            <FloTableWithViews
              id="playground-table"
              title="Employee Management System"
              description="A demonstration of FloTable with various features including views, filtering, and search"
              dataName="employees"
              columns={columns}
              request={mockRequest}
              views={views}
              initQuickFilterColumns={['name', 'email', 'department']}
              enableInfiniteScroll={false}
              defaultPageSize={15}
              defaultMobilePageSize={10}
              className={customTheme ? 'border-2 border-blue-500 rounded-lg' : undefined}
              headerClassName={customTheme ? 'bg-blue-50 p-4 rounded-t-lg' : undefined}
              titleClassName={customTheme ? 'text-blue-900 font-bold text-3xl' : undefined}
              descriptionClassName={customTheme ? 'text-blue-700' : undefined}
              cardClassName={customTheme ? 'shadow-2xl border-blue-200' : undefined}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
