'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import RestaurantsTable from '../../src/components/RestaurantsTable';
import MenuItemsTable from '../../src/components/MenuItemsTable';
import AppLayout from '../../src/components/AppLayout';
import Link from 'next/link';
import { useState } from 'react';

export default function PreviewPage() {
    const [activeTab, setActiveTab] = useState('restaurants');

    return (
        <AntdRegistry>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                                    FloTable with Views
                                </Link>
                                <span className="ml-3 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Live Preview
                                </span>
                            </div>
                            <nav className="flex space-x-8">
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Home
                                </Link>
                                <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                                    Documentation
                                </Link>
                                <Link href="/examples" className="text-gray-600 hover:text-gray-900">
                                    Examples
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Tab Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="bg-white rounded-lg shadow-sm border mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('restaurants')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'restaurants'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Restaurants Table
                                </button>
                                <button
                                    onClick={() => setActiveTab('menu')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'menu'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Menu Items Table
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {activeTab === 'restaurants' ? 'Restaurant Management' : 'Menu Items Management'}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    {activeTab === 'restaurants'
                                        ? 'Interactive preview showing restaurant data with views, filtering, and actions.'
                                        : 'Interactive preview showing menu items with filtering, search, and management features.'
                                    }
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900 mb-2">Views System</h3>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        {activeTab === 'restaurants' ? (
                                            <>
                                                <li>• All Restaurants</li>
                                                <li>• Open Restaurants</li>
                                                <li>• Closed Restaurants</li>
                                                <li>• Pending Approval</li>
                                                <li>• Top Rated (4+ stars)</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>• All Menu Items</li>
                                                <li>• Available Items</li>
                                                <li>• Out of Stock</li>
                                                <li>• Popular Items</li>
                                                <li>• Vegetarian Options</li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-green-900 mb-2">Interactive Features</h3>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>• Search functionality</li>
                                        <li>• Column filtering</li>
                                        <li>• Sort by multiple fields</li>
                                        <li>• Pagination controls</li>
                                        <li>• Custom action buttons</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-purple-900 mb-2">Responsive Design</h3>
                                    <ul className="text-sm text-purple-700 space-y-1">
                                        <li>• Mobile-optimized layout</li>
                                        <li>• Touch-friendly interactions</li>
                                        <li>• Responsive columns</li>
                                        <li>• Compact mobile views</li>
                                        <li>• Accessible design</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <AppLayout>
                        {activeTab === 'restaurants' && <RestaurantsTable />}
                        {activeTab === 'menu' && <MenuItemsTable />}
                    </AppLayout>
                </main>

                {/* Instructions */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Try These Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">📱 Test Responsiveness</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Resize your browser window</li>
                                    <li>• Open developer tools and use device simulation</li>
                                    <li>• Notice how columns adapt to smaller screens</li>
                                    <li>• Views switch to short labels on mobile</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 Explore Functionality</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Switch between different views using the tabs</li>
                                    <li>• Use the search bar to find specific items</li>
                                    <li>• Click on column headers to sort</li>
                                    <li>• Try the custom action buttons</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/docs"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                                >
                                    View Documentation
                                </Link>
                                <Link
                                    href="/examples"
                                    className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                                >
                                    More Examples
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AntdRegistry>
    );
}