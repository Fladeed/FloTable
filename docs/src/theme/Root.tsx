import React from 'react';
import { AntdConfigProvider } from '../../../src';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <AntdConfigProvider>
            {children}
        </AntdConfigProvider>
    );
}