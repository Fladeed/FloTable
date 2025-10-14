'use client';

import React from 'react';
import { FloTableWithViews, View, FloTableActionConfig } from '../../../src';
import { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, ExportOutlined, BookOutlined, TrophyOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Tag, Progress, Avatar, Button, Tooltip, Space, Rate, Card, Statistic } from 'antd';

// Mock student data
interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  program: string;
  year: number;
  gpa: number;
  status: 'Active' | 'Graduated' | 'On Leave' | 'Dropped';
  enrollmentDate: string;
  major: string;
  credits: number;
  advisor: string;
}

const generateMockStudents = (count: number): Student[] => {
  const programs = ['Computer Science', 'Business Administration', 'Engineering', 'Psychology', 'Biology', 'Art', 'Mathematics', 'English Literature'];
  const majors = ['Software Engineering', 'Data Science', 'Marketing', 'Finance', 'Mechanical Engineering', 'Clinical Psychology', 'Molecular Biology', 'Fine Arts'];
  const statuses: Student['status'][] = ['Active', 'Graduated', 'On Leave', 'Dropped'];
  const advisors = ['Dr. Smith', 'Prof. Johnson', 'Dr. Williams', 'Prof. Brown', 'Dr. Davis', 'Prof. Miller', 'Dr. Wilson', 'Prof. Moore'];
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Cameron', 'Drew', 'Sage'];
  const lastNames = ['Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris', 'Johnson', 'Lopez'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const year = Math.floor(Math.random() * 4) + 1;
    
    return {
      id: (i + 1).toString(),
      studentId: `STU${String(i + 1).padStart(6, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@university.edu`,
      program: programs[Math.floor(Math.random() * programs.length)],
      year,
      gpa: Math.round((Math.random() * 3 + 1) * 100) / 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      enrollmentDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      major: majors[Math.floor(Math.random() * majors.length)],
      credits: Math.floor(Math.random() * 120) + 30,
      advisor: advisors[Math.floor(Math.random() * advisors.length)]
    };
  });
};

const mockStudents = generateMockStudents(300);

const studentColumns: ProColumns<Student>[] = [
  {
    title: 'Student Profile',
    key: 'student',
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
        {/* First Row: Avatar + Name + Year */}
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
                backgroundColor: record.year === 4 ? '#722ed1' : record.year === 3 ? '#1890ff' : record.year === 2 ? '#52c41a' : '#faad14'
              }}
              icon={record.gpa >= 3.5 ? <TrophyOutlined /> : <UserOutlined />}
            >
              {record.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            {record.gpa >= 3.5 && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '16px',
                height: '16px',
                backgroundColor: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrophyOutlined style={{ fontSize: '8px', color: '#fff' }} />
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
              color={record.year === 4 ? 'purple' : record.year === 3 ? 'blue' : record.year === 2 ? 'green' : 'orange'}
              style={{ fontSize: '10px', fontWeight: 'bold' }}
            >
              Year {record.year}
            </Tag>
          </div>
        </div>
        
        {/* Second Row: Student ID + GPA + Honor */}
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
            minWidth: '80px'
          }}>
            {record.studentId}
          </div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 'bold',
            color: record.gpa >= 3.5 ? '#81C177' : 'var(--ifm-color-content)',
            padding: '2px 6px',
            backgroundColor: record.gpa >= 3.5 ? '#ecfdf5' : 'var(--ifm-color-emphasis-100)',
            borderRadius: '4px'
          }}>
            GPA: {record.gpa}
          </div>
          {record.gpa >= 3.5 && (
            <Tag color="gold" icon={<TrophyOutlined />} style={{ fontSize: '9px', padding: '1px 4px' }}>
              Honor
            </Tag>
          )}
        </div>
        
        {/* Third Row: Email + Status */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '11px'
        }}>
          <div style={{ 
            color: 'var(--ifm-color-content-secondary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1
          }}>
            {record.email}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 
                record.status === 'Active' ? '#81C177' : 
                record.status === 'Graduated' ? '#3b82f6' : 
                record.status === 'On Leave' ? '#f59e0b' : '#ef4444'
            }}></div>
            <span style={{ 
              fontSize: '10px', 
              color: 'var(--ifm-color-content-secondary)',
              fontWeight: '500' 
            }}>
              {record.status}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  // Hidden columns for quick filtering
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    hideInTable: true,
    key: 'student_id_filter',
  },
  {
    title: 'Academic Program',
    key: 'program_major',
    dataIndex: 'program',
    width: 220,
    render: (_, record) => (
      <div>
        <Tag 
          color={
            record.program === 'Computer Science' ? 'blue' :
            record.program === 'Engineering' ? 'orange' :
            record.program === 'Business Administration' ? 'green' : 'default'
          }
          icon={<BookOutlined />}
          style={{ marginBottom: 4 }}
        >
          {record.program}
        </Tag>
        <div className="text-sm text-gray-600 font-medium">{record.major}</div>
        <div className="text-xs text-gray-500">Advisor: {record.advisor}</div>
      </div>
    ),
    valueEnum: {
      'Computer Science': { text: 'Computer Science', status: 'Processing' },
      'Business Administration': { text: 'Business Administration', status: 'Success' },
      'Engineering': { text: 'Engineering', status: 'Warning' },
      'Psychology': { text: 'Psychology', status: 'Error' },
      'Biology': { text: 'Biology', status: 'Default' },
      'Art': { text: 'Art', status: 'Processing' },
      'Mathematics': { text: 'Mathematics', status: 'Success' },
      'English Literature': { text: 'English Literature', status: 'Warning' },
    },
  },
  // Hidden columns for quick filtering
  {
    title: 'Major',
    dataIndex: 'major',
    hideInTable: true,
    key: 'major_filter',
  },
  {
    title: 'Advisor',
    dataIndex: 'advisor', 
    hideInTable: true,
    key: 'advisor_filter',
  },
  {
    title: 'Year & Status',
    key: 'year_status',
    dataIndex: 'status',
    width: 140,
    render: (_, record) => (
      <div className="text-center">
        <Tag 
          color={record.year === 4 ? 'purple' : record.year === 3 ? 'blue' : record.year === 2 ? 'green' : 'orange'}
          style={{ marginBottom: 8, fontSize: '12px', fontWeight: 'bold' }}
        >
          Year {record.year}
        </Tag>
        <div>
          <Tag 
            color={record.status === 'Active' ? 'success' : record.status === 'Graduated' ? 'default' : 'warning'}
          >
            {record.status}
          </Tag>
        </div>
        {record.year === 4 && record.status === 'Active' && (
          <div className="text-xs text-purple-600 font-medium mt-1">Graduating Soon</div>
        )}
      </div>
    ),
    valueType: 'select',
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: 'GPA Performance',
    key: 'gpa_performance',
    width: 180,
    render: (_, record) => (
      <Card size="small" className="text-center">
        <Statistic
          value={record.gpa}
          precision={2}
          suffix="/ 4.0"
          valueStyle={{ 
            color: record.gpa >= 3.5 ? '#52c41a' : record.gpa >= 3.0 ? '#1890ff' : record.gpa >= 2.5 ? '#faad14' : '#ff4d4f',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        />
        <Progress 
          percent={Math.round((record.gpa / 4.0) * 100)} 
          size="small" 
          status={record.gpa >= 3.5 ? 'success' : record.gpa >= 2.5 ? 'normal' : 'exception'}
          strokeColor={record.gpa >= 3.5 ? '#52c41a' : record.gpa >= 2.5 ? '#1890ff' : '#ff4d4f'}
        />
        <div className="text-xs mt-1">
          <Rate 
            disabled 
            value={Math.round(record.gpa)} 
            style={{ fontSize: '12px' }}
          />
        </div>
      </Card>
    ),
    sorter: (a, b) => a.gpa - b.gpa,
  },
  {
    title: 'Credit Progress',
    key: 'credits',
    width: 160,
    render: (_, record) => {
      const progressPercent = Math.round((record.credits / 120) * 100);
      const isEligibleToGraduate = record.credits >= 120;
      return (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{record.credits}</span>
            <span className="text-xs text-gray-500">/ 120</span>
          </div>
          <Progress 
            percent={progressPercent > 100 ? 100 : progressPercent}
            size="small" 
            status={isEligibleToGraduate ? 'success' : 'normal'}
            strokeColor={isEligibleToGraduate ? '#52c41a' : '#1890ff'}
          />
          <div className="text-xs mt-1">
            {isEligibleToGraduate ? (
              <span className="text-green-600 font-medium">✓ Eligible to Graduate</span>
            ) : (
              <span className="text-gray-500">{120 - record.credits} credits remaining</span>
            )}
          </div>
        </div>
      );
    },
    sorter: (a, b) => a.credits - b.credits,
  },
  {
    title: 'Enrollment Date',
    dataIndex: 'enrollmentDate',
    key: 'enrollmentDate',
    width: 140,
    valueType: 'date',
    render: (_, record) => {
      const enrollDate = new Date(record.enrollmentDate);
      const yearsEnrolled = Math.floor((Date.now() - enrollDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
      return (
        <Tooltip title={`Enrolled ${enrollDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}`}>
          <div className="text-center">
            <div className="font-medium">{enrollDate.toLocaleDateString()}</div>
            <div className="text-xs text-gray-500">
              <CalendarOutlined /> {yearsEnrolled} year{yearsEnrolled !== 1 ? 's' : ''} ago
            </div>
          </div>
        </Tooltip>
      );
    },
    sorter: (a, b) => new Date(a.enrollmentDate).getTime() - new Date(b.enrollmentDate).getTime(),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 160,
    fixed: 'right',
    render: (_, record) => (
      <Space size="small" direction="vertical">
        <Space size="small">
          <Tooltip title="View Academic Record">
            <Button 
              type="link" 
              icon={<BookOutlined />} 
              size="small"
              onClick={() => console.log('View record:', record.name)}
            >
              Record
            </Button>
          </Tooltip>
          <Tooltip title="Contact Student">
            <Button 
              type="link" 
              icon={<UserOutlined />} 
              size="small"
              onClick={() => console.log('Contact:', record.name)}
            >
              Contact
            </Button>
          </Tooltip>
        </Space>
        {record.gpa < 2.5 && (
          <Button 
            type="primary" 
            size="small" 
            danger
            onClick={() => console.log('Academic intervention for:', record.name)}
          >
            Intervention
          </Button>
        )}
        {record.credits >= 120 && record.status === 'Active' && (
          <Button 
            type="primary" 
            size="small"
            onClick={() => console.log('Process graduation for:', record.name)}
          >
            Graduate
          </Button>
        )}
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
    filters: { status: 'Active' },
  },
  {
    key: 'graduating',
    label: 'Graduating Students',
    shortLabel: 'Graduating',
    query: 'year:4 AND status:active',
    filters: { year: 4, status: 'Active' },
  },
  {
    key: 'high-gpa',
    label: 'High GPA (3.5+)',
    shortLabel: 'High GPA',
    query: 'gpa:>=3.5',
    filters: { gpa: '>=3.5' },
  },
  {
    key: 'cs-program',
    label: 'Computer Science',
    shortLabel: 'CS',
    query: 'program:"Computer Science"',
    filters: { program: 'Computer Science' },
  },
  {
    key: 'at-risk',
    label: 'At Risk (GPA < 2.5)',
    shortLabel: 'At Risk',
    query: 'gpa:<2.5',
    filters: { gpa: '<2.5' },
  },
];

const studentActions: FloTableActionConfig[] = [
  {
    label: 'Enroll Student',
    description: 'Register a new student',
    handler: () => console.log('Enroll student clicked'),
    icon: <PlusOutlined />,
    type: 'primary',
  },
  {
    label: 'Export Records',
    description: 'Export student records',
    handler: () => console.log('Export records clicked'),
    icon: <ExportOutlined />,
  },
  {
    label: 'Academic Report',
    description: 'Generate academic performance report',
    handler: () => console.log('Academic report clicked'),
    icon: <BookOutlined />,
  },
];

// Mock API function
const fetchStudents = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredStudents = [...mockStudents];
  
  // Apply view filters
  if (params.status) {
    filteredStudents = filteredStudents.filter(student => 
      student.status === params.status
    );
  }
  
  if (params.program) {
    filteredStudents = filteredStudents.filter(student => 
      student.program === params.program
    );
  }
  
  if (params.year) {
    filteredStudents = filteredStudents.filter(student => 
      student.year === parseInt(params.year)
    );
  }
  
  // Apply GPA filters
  if (params.gpa) {
    if (params.gpa === '>=3.5') {
      filteredStudents = filteredStudents.filter(student => student.gpa >= 3.5);
    } else if (params.gpa === '<2.5') {
      filteredStudents = filteredStudents.filter(student => student.gpa < 2.5);
    }
  }
  
  // Apply search
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredStudents = filteredStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm) ||
      student.major.toLowerCase().includes(searchTerm) ||
      student.advisor.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply sorting
  if (params.sort && params.order) {
    filteredStudents.sort((a, b) => {
      const aValue = a[params.sort as keyof Student];
      const bValue = b[params.sort as keyof Student];
      
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
    data: filteredStudents.slice(start, end),
    total: filteredStudents.length,
    success: true,
  };
};

export const StudentsTable: React.FC = () => {
  return (
    <FloTableWithViews
      id="students-table"
      title="Student Management System"
      description="Advanced academic records management showcasing Ant Design ProTable features: statistics cards, rating components, progress indicators, and interactive academic tracking"
      dataName="student"
      columns={studentColumns}
      rowKey="id"
      request={fetchStudents}
      views={studentViews}
      actions={studentActions}
      initQuickFilterColumns={['name', 'studentId', 'program', 'major', 'status', 'advisor']}
      enableInfiniteScroll={false}
      defaultPageSize={15}
      className="full-width-table"
    />
  );
};

export default StudentsTable;