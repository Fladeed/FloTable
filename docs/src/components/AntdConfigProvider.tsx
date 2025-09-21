import React, { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';

interface AntdConfigProviderProps {
    children: ReactNode;
}

export function AntdConfigProvider({ children }: AntdConfigProviderProps) {
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

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    // Customize primary color to match Docusaurus theme
                    colorPrimary: isDark ? '#25c2a0' : '#2e8555',
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}