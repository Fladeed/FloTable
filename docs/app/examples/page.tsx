import Link from 'next/link';

export default function ExamplesPage() {
    const examples = [
        {
            title: 'Restaurant Management',
            description: 'Complete restaurant management system with views, filtering, and actions.',
            features: ['Multiple views', 'Search functionality', 'Custom actions', 'Responsive design'],
            link: '/preview',
            category: 'Full Featured'
        },
        {
            title: 'Basic User Table',
            description: 'Simple user management table with basic views and filtering.',
            features: ['User listing', 'Status filtering', 'Search by name', 'Pagination'],
            code: `import { TableWithViews } from 'flo-table-with-views';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const views = [
  { key: 'all', label: 'All Users', filters: {} },
  { key: 'active', label: 'Active', filters: { status: 'active' } },
];

<TableWithViews columns={columns} views={views} request={handleRequest} />`,
            category: 'Basic'
        },
        {
            title: 'E-commerce Products',
            description: 'Product catalog with inventory management and pricing views.',
            features: ['Product categories', 'Stock status', 'Price ranges', 'Bulk actions'],
            code: `const productViews = [
  { key: 'all', label: 'All Products', filters: {} },
  { key: 'in-stock', label: 'In Stock', filters: { stock: { gt: 0 } } },
  { key: 'low-stock', label: 'Low Stock', filters: { stock: { lt: 10 } } },
  { key: 'out-of-stock', label: 'Out of Stock', filters: { stock: 0 } },
];`,
            category: 'Business'
        },
        {
            title: 'Customer Support Tickets',
            description: 'Support ticket management with priority levels and status tracking.',
            features: ['Priority filtering', 'Status workflow', 'Agent assignment', 'Time tracking'],
            code: `const ticketViews = [
  { key: 'open', label: 'Open Tickets', filters: { status: 'open' } },
  { key: 'urgent', label: 'Urgent', filters: { priority: 'urgent' } },
  { key: 'my-tickets', label: 'My Tickets', filters: { assignee: userId } },
];`,
            category: 'Business'
        },
        {
            title: 'Financial Transactions',
            description: 'Transaction history with filtering by amount, date, and type.',
            features: ['Date range filtering', 'Amount ranges', 'Transaction types', 'Export options'],
            code: `const transactionActions = [
  { key: 'export', label: 'Export CSV', icon: <DownloadOutlined /> },
  { key: 'filter', label: 'Advanced Filter', icon: <FilterOutlined /> },
];`,
            category: 'Advanced'
        },
        {
            title: 'Project Management',
            description: 'Project and task management with team collaboration features.',
            features: ['Project phases', 'Team member filtering', 'Due date sorting', 'Progress tracking'],
            code: `const projectColumns = [
  { title: 'Project', dataIndex: 'name', sorter: true },
  { title: 'Team', dataIndex: 'team', render: (team) => <TeamAvatars team={team} /> },
  { title: 'Progress', dataIndex: 'progress', render: (p) => <Progress percent={p} /> },
];`,
            category: 'Advanced'
        }
    ];

    const categories = ['All', 'Basic', 'Business', 'Advanced', 'Full Featured'];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                                FloTable with Views
                            </Link>
                            <span className="ml-3 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                Examples
                            </span>
                        </div>
                        <nav className="flex space-x-8">
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                Home
                            </Link>
                            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                                Documentation
                            </Link>
                            <Link href="/preview" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Live Preview
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Examples</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore different implementations of FloTable with Views across various use cases.
                        From simple user tables to complex business applications.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-2 inline-flex space-x-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 text-gray-600"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Examples Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {examples.map((example, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h3>
                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {example.category}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{example.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Features:</h4>
                                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                                        {example.features.map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {example.code && (
                                    <details className="mb-4">
                                        <summary className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700">
                                            View Code Example
                                        </summary>
                                        <div className="mt-2 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <pre>{example.code}</pre>
                                        </div>
                                    </details>
                                )}

                                <div className="flex space-x-3">
                                    {example.link ? (
                                        <Link
                                            href={example.link}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Try Live Demo
                                        </Link>
                                    ) : (
                                        <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                                            Coming Soon
                                        </button>
                                    )}
                                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                        View Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Example */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-white p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Try the Full Restaurant Demo</h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Experience all features of FloTable with Views in our comprehensive restaurant management demo.
                            Includes multiple table types, advanced filtering, and responsive design.
                        </p>
                        <Link
                            href="/preview"
                            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Open Interactive Demo
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Get Started */}
                <div className="mt-12 bg-white rounded-xl shadow-sm border p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Build Your Own?</h2>
                        <p className="text-gray-600 mb-6">
                            Start with our documentation and create your first table in minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/docs"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                            >
                                Read Documentation
                            </Link>
                            <a
                                href="#"
                                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                            >
                                Download Starter Template
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}