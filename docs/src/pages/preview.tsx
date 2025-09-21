import React from 'react';
import { Tabs } from 'antd';
import Layout from '@theme/Layout';
import RestaurantsTable from '../components/RestaurantsTable';
import MenuItemsTable from '../components/MenuItemsTable';
import 'antd/dist/reset.css';

export default function PreviewPage() {
    const items = [
        {
            key: 'restaurants',
            label: 'Restaurants',
            children: <RestaurantsTable />,
        },
        {
            key: 'menu-items',
            label: 'Menu Items',
            children: <MenuItemsTable />,
        },
    ];

    return (
        <Layout
            title="Live Preview"
            description="Interactive demonstration of FloTable with Views components"
        >
            <div className="container" style={{ padding: '2rem 0' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1>Live Preview</h1>
                    <p>
                        Interactive demonstration of FloTable with Views components with real restaurant data.
                        Try the different views, search functionality, and responsive features.
                    </p>
                </div>

                <Tabs
                    defaultActiveKey="restaurants"
                    items={items}
                    size="large"
                    style={{
                        padding: '1rem',
                        borderRadius: '8px'
                    }}
                />
            </div>
        </Layout>
    );
}