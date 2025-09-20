import Link from 'next/link';

export default function DocsPage() {
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
                            <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Documentation
                            </span>
                        </div>
                        <nav className="flex space-x-8">
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                Home
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <nav className="sticky top-8">
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#installation" className="text-blue-600 hover:text-blue-700 block py-1">
                                            Installation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#quick-start" className="text-gray-600 hover:text-gray-700 block py-1">
                                            Quick Start
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#api-reference" className="text-gray-600 hover:text-gray-700 block py-1">
                                            API Reference
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#components" className="text-gray-600 hover:text-gray-700 block py-1">
                                            Components
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#examples" className="text-gray-600 hover:text-gray-700 block py-1">
                                            Examples
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            {/* Installation */}
                            <section id="installation" className="mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-6">Getting Started</h1>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
                                <p className="text-gray-600 mb-4">
                                    Install FloTable with Views using npm or yarn:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
                                    <div className="mb-2"># Using npm</div>
                                    <div className="text-blue-300">npm install flo-table-with-views</div>
                                    <div className="mt-4 mb-2"># Using yarn</div>
                                    <div className="text-blue-300">yarn add flo-table-with-views</div>
                                </div>
                            </section>

                            {/* Quick Start */}
                            <section id="quick-start" className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h2>
                                <p className="text-gray-600 mb-4">
                                    Here&apos;s a simple example to get you started:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
                                    {`import { TableWithViews } from 'flo-table-with-views';
import type { ProColumns } from '@ant-design/pro-components';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: ProColumns<User>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email', 
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const views = [
  {
    key: 'all',
    label: 'All Users',
    shortLabel: 'All',
    query: '',
    filters: {},
  },
  {
    key: 'active',
    label: 'Active Users',
    shortLabel: 'Active',
    query: 'status:active',
    filters: { status: 'active' },
  },
];

export default function UserTable() {
  const handleRequest = async (params: any, sort: any, filter: any) => {
    // Your API call logic here
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ ...params, ...filter.filters, sort }),
    });
    const data = await response.json();
    
    return {
      data: data.users,
      success: true,
      total: data.total,
    };
  };

  return (
    <TableWithViews<User>
      id="user-table"
      title="User Management"
      columns={columns}
      request={handleRequest}
      views={views}
      rowKey="id"
    />
  );
}`}
                                </div>
                            </section>

                            {/* API Reference */}
                            <section id="api-reference" className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Reference</h2>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">TableWithViews Props</h3>
                                <div className="overflow-x-auto mb-6">
                                    <table className="min-w-full bg-white border border-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prop</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">columns</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">ProColumns&lt;T&gt;[]</td>
                                                <td className="px-4 py-3 text-sm text-red-600">Yes</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Table column definitions</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">views</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">View[]</td>
                                                <td className="px-4 py-3 text-sm text-red-600">Yes</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Predefined filtered views</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">request</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">RequestFunction</td>
                                                <td className="px-4 py-3 text-sm text-red-600">Yes</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Data fetching function</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">actions</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">TableActionConfig[]</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">No</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Custom toolbar actions</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">title</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">string</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">No</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Table title</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">description</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">string</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">No</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">Table description</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Components */}
                            <section id="components" className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Components</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">TableWithViews</h3>
                                        <p className="text-gray-600 mb-3">
                                            Main table component with views system and advanced features.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Multiple filtered views</li>
                                            <li>• Custom actions</li>
                                            <li>• Responsive design</li>
                                            <li>• Search and pagination</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">SimpleTable</h3>
                                        <p className="text-gray-600 mb-3">
                                            Basic table wrapper around ProTable with enhanced features.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Enhanced request handling</li>
                                            <li>• Mobile optimization</li>
                                            <li>• Pagination support</li>
                                            <li>• Filter integration</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">TableActions</h3>
                                        <p className="text-gray-600 mb-3">
                                            Toolbar actions component for custom buttons.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Custom action buttons</li>
                                            <li>• Mobile responsive</li>
                                            <li>• Loading states</li>
                                            <li>• Icon support</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">useIsMobile</h3>
                                        <p className="text-gray-600 mb-3">
                                            Hook for responsive design detection.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Responsive breakpoints</li>
                                            <li>• Performance optimized</li>
                                            <li>• TypeScript support</li>
                                            <li>• SSR compatible</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Examples */}
                            <section id="examples" className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Examples</h2>
                                <p className="text-gray-600 mb-6">
                                    Check out these examples to see FloTable with Views in action:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Table</h3>
                                        <p className="text-gray-600 mb-4">
                                            Simple table with views and filtering functionality.
                                        </p>
                                        <Link
                                            href="/examples"
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Example →
                                        </Link>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Features</h3>
                                        <p className="text-gray-600 mb-4">
                                            Table with custom actions, complex filtering, and mobile optimization.
                                        </p>
                                        <Link
                                            href="/preview"
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Live Demo →
                                        </Link>
                                    </div>
                                </div>
                            </section>

                            {/* Footer */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/preview"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                                    >
                                        Try Live Preview
                                    </Link>
                                    <Link
                                        href="/examples"
                                        className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                                    >
                                        View Examples
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}