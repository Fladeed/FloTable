import React, { ComponentType } from 'react';
import { AntdConfigProvider } from './AntdConfigProvider';

interface WithThemeOptions {
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
    /**
     * Whether to automatically wrap with ConfigProvider.
     * Set to false if you want to handle ConfigProvider at a higher level.
     */
    autoWrap?: boolean;
}

/**
 * Higher-order component that wraps a component with Antd theming
 */
export function withTheme<P extends object>(
    Component: ComponentType<P>,
    options: WithThemeOptions = {}
) {
    const {
        primaryColor,
        themeDetector,
        forceTheme,
        autoWrap = true
    } = options;

    const WrappedComponent = (props: P) => {
        const element = <Component {...props} />;
        
        if (!autoWrap) {
            return element;
        }

        return (
            <AntdConfigProvider
                primaryColor={primaryColor}
                themeDetector={themeDetector}
                forceTheme={forceTheme}
            >
                {element}
            </AntdConfigProvider>
        );
    };

    WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;

    return WrappedComponent;
}

/**
 * Hook to conditionally wrap content with AntdConfigProvider
 * Useful when you want to provide theming only if no ConfigProvider exists in the tree
 */
export function useConditionalTheme(options: WithThemeOptions = {}) {
    const {
        primaryColor,
        themeDetector,
        forceTheme
    } = options;

    return React.useCallback((children: React.ReactNode) => {
        // In a real implementation, you might want to check if ConfigProvider already exists
        // For now, we'll always wrap
        return (
            <AntdConfigProvider
                primaryColor={primaryColor}
                themeDetector={themeDetector}
                forceTheme={forceTheme}
            >
                {children}
            </AntdConfigProvider>
        );
    }, [primaryColor, themeDetector, forceTheme]);
}