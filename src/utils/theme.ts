/**
 * Utility functions and hooks for theme detection and management
 */

/**
 * Default theme detection function that checks for:
 * 1. data-theme attribute on html element (Docusaurus style)
 * 2. Class-based theme detection (.dark, .light)
 * 3. prefers-color-scheme media query as fallback
 */
export const detectTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') {
        return 'light'; // Default for SSR
    }

    const htmlElement = document.documentElement;
    
    // Check for data-theme attribute (Docusaurus, many frameworks)
    const dataTheme = htmlElement.getAttribute('data-theme');
    if (dataTheme === 'dark' || dataTheme === 'light') {
        return dataTheme;
    }

    // Check for class-based theme detection
    if (htmlElement.classList.contains('dark')) {
        return 'dark';
    }
    if (htmlElement.classList.contains('light')) {
        return 'light';
    }

    // Fallback to media query
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Creates a theme detection function that can be customized
 */
export const createThemeDetector = (options: {
    /** Attribute name to check on document.documentElement */
    dataAttribute?: string;
    /** Class names to check for dark/light themes */
    classNames?: {
        dark: string;
        light: string;
    };
    /** Whether to use media query as fallback */
    useMediaQuery?: boolean;
} = {}) => {
    const {
        dataAttribute = 'data-theme',
        classNames = { dark: 'dark', light: 'light' },
        useMediaQuery = true
    } = options;

    return (): 'light' | 'dark' => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        const htmlElement = document.documentElement;
        
        // Check for data attribute
        if (dataAttribute) {
            const themeValue = htmlElement.getAttribute(dataAttribute);
            if (themeValue === 'dark' || themeValue === 'light') {
                return themeValue;
            }
        }

        // Check for class-based theme detection
        if (classNames.dark && htmlElement.classList.contains(classNames.dark)) {
            return 'dark';
        }
        if (classNames.light && htmlElement.classList.contains(classNames.light)) {
            return 'light';
        }

        // Fallback to media query
        if (useMediaQuery) {
            return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        return 'light';
    };
};

/**
 * React hook for theme detection with automatic updates
 */
import { useEffect, useState } from 'react';

export const useThemeDetection = (
    detector: () => 'light' | 'dark' = detectTheme,
    forceTheme?: 'light' | 'dark'
) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (forceTheme) return forceTheme;
        return detector();
    });

    useEffect(() => {
        if (forceTheme) {
            setTheme(forceTheme);
            return;
        }

        // Function to update theme
        const updateTheme = () => {
            const newTheme = detector();
            setTheme(newTheme);
        };

        // Initial detection
        updateTheme();

        // Listen for changes on document element
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'class']
        });

        // Listen for media query changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleMediaChange = () => updateTheme();
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleMediaChange);
        }

        return () => {
            observer.disconnect();
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMediaChange);
            } else {
                // Fallback for older browsers
                mediaQuery.removeListener(handleMediaChange);
            }
        };
    }, [detector, forceTheme]);

    return theme;
};

/**
 * Get default theme colors based on the theme mode
 */
export const getDefaultThemeColors = (theme: 'light' | 'dark') => {
    return {
        primary: theme === 'dark' ? '#25c2a0' : '#2e8555',
        success: theme === 'dark' ? '#238636' : '#52c41a',
        warning: theme === 'dark' ? '#d29922' : '#faad14',
        error: theme === 'dark' ? '#da3633' : '#ff4d4f',
        info: theme === 'dark' ? '#0969da' : '#1890ff',
    };
};