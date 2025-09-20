import React, { JSX, useState, useEffect } from 'react';
import { Tabs, ConfigProvider, theme } from 'antd';
import Layout from '@theme/Layout';
import RestaurantsTable from '../components/RestaurantsTable';
import MenuItemsTable from '../components/MenuItemsTable';
import 'antd/dist/reset.css';

export default function PreviewPage(): JSX.Element {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Function to detect theme
        const detectTheme = () => {
            const htmlElement = document.documentElement;
            const isDarkMode = htmlElement.getAttribute('data-theme') === 'dark';
            setIsDark(isDarkMode);
        };

        // Initial detection
        detectTheme();

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            detectTheme();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

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
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
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
                            background: isDark ? '#1f1f1f' : '#fff',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: isDark ? '1px solid #333' : '1px solid #d9d9d9'
                        }}
                    />
                </div>
            </Layout>
        </ConfigProvider>
    );
}