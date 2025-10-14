'use client';

import { Layout, Menu, Typography, theme } from 'antd';
import {
    TableOutlined,
    ShopOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    HomeOutlined,
    GithubOutlined,
    BookOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link href="/">Dashboard</Link>,
        },
        {
            key: '/restaurants',
            icon: <ShopOutlined />,
            label: <Link href="/restaurants">Restaurants</Link>,
        },
        {
            key: '/menu-items',
            icon: <AppstoreOutlined />,
            label: <Link href="/menu-items">Menu Items</Link>,
        },
        {
            key: '/orders',
            icon: <ShoppingCartOutlined />,
            label: <Link href="/orders">Orders</Link>,
        },
        {
            key: '/reviews',
            icon: <StarOutlined />,
            label: <Link href="/reviews">Reviews</Link>,
        },
        {
            key: 'divider',
            type: 'divider' as const,
        },
        {
            key: 'external',
            icon: <BookOutlined />,
            label: 'External Links',
            children: [
                {
                    key: 'docs',
                    icon: <BookOutlined />,
                    label: (
                        <a href="/docs" target="_blank" rel="noopener noreferrer">
                            Documentation
                        </a>
                    ),
                },
                {
                    key: 'github',
                    icon: <GithubOutlined />,
                    label: (
                        <a
                            href="https://github.com/Fladeed/FloTable"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub Repository
                        </a>
                    ),
                },
            ],
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                theme="light"
                width={250}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <TableOutlined className="text-xl" />
                        <div>
                            <Title level={4} className="!mb-0">
                                FloTable
                            </Title>
                            <div className="text-xs opacity-60">with Views Demo</div>
                        </div>
                    </div>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={pathname ? [pathname] : []}
                    className="border-0"
                    items={menuItems}
                />
            </Sider>

            <Layout style={{ marginLeft: 250 }}>
                <Header
                    style={{
                        padding: '0 24px',
                        background: colorBgContainer,
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <div className="flex items-center justify-between h-full">
                        <Title level={3} className="!mb-0">
                            Restaurant Management System
                        </Title>
                        <div className="text-sm opacity-60">
                            Powered by FloTable
                        </div>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px',
                        padding: '24px',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}