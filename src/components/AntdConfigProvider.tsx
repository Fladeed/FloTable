import React, { ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useThemeDetection, detectTheme, getDefaultThemeColors } from '../utils/theme';

interface AntdConfigProviderProps {
    children: ReactNode;
    /** 
     * Primary color for the theme. 
     * If not provided, will use different defaults for light/dark themes.
     */
    primaryColor?: {
        light?: string;
        dark?: string;
    } | string;
    /**
     * Custom theme detection function. 
     * If not provided, will detect based on data-theme attribute or prefers-color-scheme.
     */
    themeDetector?: () => 'light' | 'dark';
    /**
     * Force a specific theme mode regardless of detection.
     */
    forceTheme?: 'light' | 'dark';
}

export function AntdConfigProvider({ 
    children, 
    primaryColor,
    themeDetector = detectTheme,
    forceTheme
}: AntdConfigProviderProps) {
    const currentTheme = useThemeDetection(themeDetector, forceTheme);
    const isDark = currentTheme === 'dark';

    // Determine primary colors
    const getPrimaryColor = () => {
        if (typeof primaryColor === 'string') {
            return primaryColor;
        }
        if (primaryColor) {
            return isDark ? (primaryColor.dark || '#25c2a0') : (primaryColor.light || '#2e8555');
        }
        // Default colors
        const defaultColors = getDefaultThemeColors(currentTheme);
        return defaultColors.primary;
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    // Primary color
                    colorPrimary: getPrimaryColor(),
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}