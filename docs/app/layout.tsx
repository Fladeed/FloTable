import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export const metadata = {
    title: 'FloTable with Views Documentation',
    description: 'Comprehensive documentation for FloTable with Views component library',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AntdRegistry>
                    {children}
                </AntdRegistry>
            </body>
        </html>
    )
}