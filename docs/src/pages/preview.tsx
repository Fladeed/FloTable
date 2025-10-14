import React from 'react';
import { Tabs } from 'antd';
import Layout from '@theme/Layout';
import UsersTable from '../components/UsersTable';
import PaymentsTable from '../components/PaymentsTable';
import StudentsTable from '../components/StudentsTable';
import { AntdConfigProvider } from '../components/AntdConfigProvider';

export default function PreviewPage() {
    const items = [
        {
            key: 'users',
            label: 'User Management',
            children: <UsersTable />,
        },
        {
            key: 'payments',
            label: 'Payment Processing',
            children: <PaymentsTable />,
        },
        {
            key: 'students',
            label: 'Student Records',
            children: <StudentsTable />,
        },
    ];

    return (
        <Layout
            title="Live Preview"
            description="Interactive demonstration of FloTable components showcasing Ant Design ProTable features"
        >
            <div className="container" style={{ padding: '2rem 0' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1>Live Preview - FloTable with Ant Design ProTable Features</h1>
                    <p>
                        Interactive demonstration showcasing advanced Ant Design ProTable features including:
                        fixed columns, custom renderers, statistics cards, progress indicators, badges, tooltips, 
                        and interactive components. These examples demonstrate why we chose Ant Design as our foundation.
                    </p>
                </div>

                <AntdConfigProvider>
                    <Tabs
                        defaultActiveKey="users"
                        items={items}
                        size="large"
                        style={{
                            padding: '1rem',
                            borderRadius: '8px'
                        }}
                    />
                </AntdConfigProvider>
            </div>
        </Layout>
    );
}