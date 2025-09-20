import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                FloTable with Views
                            </h1>
                            <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                v1.0.0
                            </span>
                        </div>
                        <nav className="flex space-x-8">
                            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                                Documentation
                            </Link>
                            <Link href="/examples" className="text-gray-600 hover:text-gray-900">
                                Examples
                            </Link>
                            <Link href="/preview" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Live Preview
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            FloTable with Views
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            A powerful, responsive table component with views, filtering, and actions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/docs"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/preview"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                View Examples
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <p className="text-lg text-gray-600">Everything you need for modern data tables</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H5m8 12H5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Views System</h3>
                            <p className="text-gray-600">Multiple predefined filtered views of your data with customizable filters and search.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design</h3>
                            <p className="text-gray-600">Automatically optimized for mobile devices with responsive columns and touch-friendly interactions.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">TypeScript</h3>
                            <p className="text-gray-600">Full TypeScript support with comprehensive type definitions and IntelliSense.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance</h3>
                            <p className="text-gray-600">Optimized for large datasets with virtual scrolling, pagination, and efficient rendering.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable</h3>
                            <p className="text-gray-600">Highly customizable with custom actions, themes, and styling options.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ant Design</h3>
                            <p className="text-gray-600">Built on Ant Design Pro Components with consistent design language and accessibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
                        <p className="text-lg text-gray-600">Install and use FloTable with Views in minutes</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Installation</h3>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                npm install flo-table-with-views
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Example</h3>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                {`import { TableWithViews } from 'flo-table-with-views';

<TableWithViews
  columns={columns}
  views={views}
  request={handleRequest}
  rowKey="id"
/>`}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/preview"
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View Live Examples
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* API Reference */}
            <section id="api" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
                        <p className="text-lg text-gray-600">Complete API documentation for all components</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">TableWithViews</h3>
                            <p className="text-gray-600 mb-4">Main table component with views, filtering, and actions.</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><code className="text-blue-600">columns</code> - Table column definitions</li>
                                <li><code className="text-blue-600">views</code> - Predefined filtered views</li>
                                <li><code className="text-blue-600">request</code> - Data fetching function</li>
                                <li><code className="text-blue-600">actions</code> - Custom toolbar actions</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">SimpleTable</h3>
                            <p className="text-gray-600 mb-4">Basic table wrapper around ProTable with enhanced features.</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><code className="text-blue-600">enhancedRequest</code> - Enhanced request handling</li>
                                <li><code className="text-blue-600">pagination</code> - Pagination configuration</li>
                                <li><code className="text-blue-600">responsive</code> - Mobile optimization</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">TableActions</h3>
                            <p className="text-gray-600 mb-4">Toolbar actions component for custom buttons.</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><code className="text-blue-600">actions</code> - Array of action objects</li>
                                <li><code className="text-blue-600">isMobile</code> - Mobile responsive behavior</li>
                                <li><code className="text-blue-600">loading</code> - Loading state handling</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-semibold mb-4">FloTable with Views</h3>
                            <p className="text-gray-400 mb-4">
                                A powerful, responsive table component library for React applications.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Documentation</h4>
                            <ul className="space-y-2">
                                <li><a href="#getting-started" className="text-gray-400 hover:text-white">Getting Started</a></li>
                                <li><a href="#api" className="text-gray-400 hover:text-white">API Reference</a></li>
                                <li><a href="#examples" className="text-gray-400 hover:text-white">Examples</a></li>
                                <li><a href="/preview" className="text-gray-400 hover:text-white">Live Preview</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Community</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">GitHub</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Issues</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Discussions</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contributing</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FloTable with Views. Released under the MIT License.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}