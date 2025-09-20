'use client';

import { ProColumns } from '@ant-design/pro-components';
import { Tag, Avatar, Rate } from 'antd';
import { Restaurant } from '../types';
import { TableWithViews, View, TableActionConfig } from '../../../src';
import { mockAPI } from '../data/mockData';
import { EditOutlined } from '@ant-design/icons';

const restaurantColumns: ProColumns<Restaurant>[] = [
    {
        title: 'Restaurant',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 200,
        render: (_, record) => (
            <div className="flex items-center space-x-3">
                <Avatar
                    src={record.imageUrl}
                    size={40}
                    shape="square"
                />
                <div>
                    <div className="font-medium">{record.name}</div>
                    <div className="text-sm text-gray-500">{record.cuisine}</div>
                </div>
            </div>
        ),
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        width: 120,
        render: (_, record) => (
            <div className="flex items-center space-x-2">
                <Rate disabled defaultValue={record.rating} allowHalf />
                <span className="text-sm font-medium">{record.rating}</span>
            </div>
        ),
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (_, record) => {
            const statusConfig = {
                open: { color: 'green', text: 'Open' },
                closed: { color: 'red', text: 'Closed' },
                busy: { color: 'orange', text: 'Busy' },
            };
            const config = statusConfig[record.status as keyof typeof statusConfig];
            return <Tag color={config.color}>{config.text}</Tag>;
        },
        filters: [
            { text: 'Open', value: 'open' },
            { text: 'Closed', value: 'closed' },
            { text: 'Busy', value: 'busy' },
        ],
    },
    {
        title: 'Delivery Time',
        dataIndex: 'deliveryTime',
        key: 'deliveryTime',
        width: 120,
    },
    {
        title: 'Price Range',
        dataIndex: 'priceRange',
        key: 'priceRange',
        width: 100,
        render: (_, record) => (
            <span className="font-mono text-lg">{record.priceRange}</span>
        ),
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 200,
        ellipsis: true,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
    },
    {
        title: 'Featured',
        dataIndex: 'featured',
        key: 'featured',
        width: 100,
        render: (_, record) => (
            <Tag color={record.featured ? 'gold' : 'default'}>
                {record.featured ? 'Featured' : 'Regular'}
            </Tag>
        ),
    },
];

const restaurantViews: View[] = [
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
        key: 'italian',
        label: 'Italian Cuisine',
        shortLabel: 'Italian',
        query: 'cuisine:Italian',
        filters: { cuisine: 'Italian' },
    },
    {
        key: 'high-rated',
        label: 'High Rated (4.5+)',
        shortLabel: 'Top Rated',
        query: 'rating:>=4.5',
        filters: { minRating: 4.5 },
    },
];

const restaurantActions: TableActionConfig[] = [
    {
        label: 'Add Restaurant',
        icon: <EditOutlined />,
        type: 'primary',
        handler: () => {
            console.log('Add new restaurant');
        },
    },
    {
        label: 'Export Data',
        handler: () => {
            console.log('Export restaurant data');
        },
    },
];

export default function RestaurantsTable() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRequest = async (params: Record<string, any>, sort: Record<string, any>, filter: { filters?: Record<string, any> }) => {
        // Combine URL params with view filters
        const requestParams = {
            ...params,
            ...filter.filters,
            keyword: params.keyword,
        };

        return mockAPI.getRestaurants(requestParams);
    };

    return (
        <TableWithViews<Restaurant>
            id="restaurants-table"
            title="Restaurant Management"
            description="Manage restaurants, view their status, and track performance"
            dataName="restaurants"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={restaurantColumns as any}
            request={handleRequest}
            views={restaurantViews}
            actions={restaurantActions}
            rowKey="id"
            defaultPageSize={8}
        />
    );
}