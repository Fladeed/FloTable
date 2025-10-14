'use client';

import { ProColumns } from '@ant-design/pro-components';
import { Tag, Avatar, Switch, Badge } from 'antd';
import { MenuItem } from '../types';
import { FloTableWithViews, View, FloTableActionConfig } from '../../../src';
import { mockAPI } from '../data/mockData';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';

const menuItemColumns: ProColumns<MenuItem>[] = [
    {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
        valueType: 'text',
        width: '40%',
        fixed: 'left',
        render: (_, record) => (
            <div className="flex items-center space-x-3">
                <Avatar
                    src={record.imageUrl}
                    size={50}
                    shape="square"
                />
                <div>
                    <div className="font-medium">{record.name}</div>
                    <div className="text-sm opacity-60 line-clamp-2">{record.description}</div>
                    <div className="text-xs opacity-80">{record.restaurantName}</div>
                </div>
            </div>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        valueType: 'money',
        width: 100,
        render: (_, record) => (
            <span className="font-bold">${record.price}</span>
        ),
        sorter: true,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        valueType: 'select',
        width: 120,
        valueEnum: {
            'Pizza': 'Pizza',
            'Pasta': 'Pasta',
            'Burgers': 'Burgers',
            'Appetizer': 'Appetizer',
            'Main Course': 'Main Course',
        },
        render: (_, record) => (
            <Tag color="blue">{record.category}</Tag>
        ),
        filters: [
            { text: 'Pizza', value: 'Pizza' },
            { text: 'Pasta', value: 'Pasta' },
            { text: 'Burgers', value: 'Burgers' },
            { text: 'Appetizer', value: 'Appetizer' },
            { text: 'Main Course', value: 'Main Course' },
        ],
    },
    {
        title: 'Dietary',
        key: 'dietary',
        width: 120,
        render: (_, record) => (
            <div className="flex flex-wrap gap-1">
                {record.vegetarian && <Tag color="green">Vegetarian</Tag>}
                {record.vegan && <Tag color="lime">Vegan</Tag>}
                {record.spicy && <Tag color="red">Spicy</Tag>}
            </div>
        ),
    },
    {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        valueType: 'select',
        valueEnum: {
            true: { text: 'Available', status: 'Success' },
            false: { text: 'Unavailable', status: 'Error' },
        },
        width: 100,
        render: (_, record) => (
            <Switch
                checked={record.available}
                size="small"
                onChange={(checked) => console.log(`Toggle availability for ${record.id}:`, checked)}
            />
        ),
        filters: [
            { text: 'Available', value: true },
            { text: 'Unavailable', value: false },
        ],
    },
    {
        title: 'Popular',
        dataIndex: 'popular',
        key: 'popular',
        width: 100,
        render: (_, record) => (
            record.popular ? (
                <Badge color="gold" text="Popular" />
            ) : (
                <span className="opacity-60">Regular</span>
            )
        ),
    },
    {
        title: 'Calories',
        dataIndex: 'calories',
        key: 'calories',
        width: 100,
        render: (_, record) => (
            record.calories ? (
                <span className="text-sm">{record.calories} cal</span>
            ) : (
                <span className="opacity-60">N/A</span>
            )
        ),
    },
    {
        title: 'Allergens',
        dataIndex: 'allergens',
        key: 'allergens',
        width: 150,
        render: (_, record) => (
            <div className="flex flex-wrap gap-1">
                {record.allergens.map(allergen => (
                    <Tag key={allergen} color="orange">
                        {allergen}
                    </Tag>
                ))}
            </div>
        ),
    },
];

const menuItemViews: View[] = [
    {
        key: 'all',
        label: 'All Menu Items',
        shortLabel: 'All',
        query: '',
        filters: {},
    },
    {
        key: 'available',
        label: 'Available Items',
        shortLabel: 'Available',
        query: 'available:true',
        filters: { available: true },
    },
    {
        key: 'vegetarian',
        label: 'Vegetarian Options',
        shortLabel: 'Vegetarian',
        query: 'vegetarian:true',
        filters: { vegetarian: true },
    },
    {
        key: 'popular',
        label: 'Popular Items',
        shortLabel: 'Popular',
        query: 'popular:true',
        filters: { popular: true },
    },
    {
        key: 'pizza',
        label: 'Pizza Category',
        shortLabel: 'Pizza',
        query: 'category:Pizza',
        filters: { category: 'Pizza' },
    },
];

const menuItemActions: FloTableActionConfig[] = [
    {
        label: 'Add Menu Item',
        icon: <PlusOutlined />,
        type: 'primary',
        handler: () => {
            console.log('Add new menu item');
        },
    },
    {
        label: 'Export Menu',
        icon: <ExportOutlined />,
        handler: () => {
            console.log('Export menu data');
        },
    },
    {
        label: 'Bulk Update',
        handler: () => {
            console.log('Bulk update items');
        },
    },
];

export default function MenuItemsTable() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRequest = async (params: Record<string, any>, sort: Record<string, any>, filter: { filters?: Record<string, any> }) => {
        const requestParams = {
            ...params,
            ...filter.filters,
            keyword: params.keyword,
        };

        return mockAPI.getMenuItems(requestParams);
    };

    return (
        <FloTableWithViews<MenuItem>
            id="menu-items-table"
            title="Menu Management"
            description="Manage menu items across all restaurants"
            dataName="menu items"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={menuItemColumns as any}
            request={handleRequest}
            initQuickFilterColumns={['name', 'category', 'available']}
            views={menuItemViews}
            actions={menuItemActions}
            rowKey="id"
            defaultPageSize={6}
            enableInfiniteScroll={false}
        />
    );
}