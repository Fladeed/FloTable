// Main component
export { FloTableWithViews } from "./components/FloTable";
export type { FloTableWithViewsProps, View } from "./components/FloTable";

// Sub-components
export { default as FloTable } from "./components/FloSimpleTable";
export type { FloRequest, FloFilters } from "./components/FloSimpleTable";

export { FloTableActions, FloTableAction } from "./components/FloTableActions";
export type { FloTableActionConfig } from "./components/FloTableActions";

// Filter components
export { FloTableFilters, FloTableFiltersDrawer } from "./components/FloTableFilters";
export type { FloFilterKey } from "./components/FloTableFilters";
export { QuickFilter } from "./components/QuickFilter";
export { FilterInput } from "./components/FilterInput";
export { Button } from "./components/Button";
export { SearchIcon, FilterIcon, ClearIcon } from "./components/Icons";

// Theming components (optional - for advanced theming needs)
export { AntdConfigProvider } from "./components/AntdConfigProvider";
export { withTheme, useConditionalTheme } from "./components/withTheme";

// Hooks
export { useIsMobile } from "./hooks/useIsMobile";
export { useTranslation, I18nProvider } from "./hooks/useTranslation";

// Utils
export { cn } from "./utils/cn";
export {
    detectTheme,
    createThemeDetector,
    useThemeDetection,
    getDefaultThemeColors
} from "./utils/theme";

// Re-export commonly used types from antd pro-components
export type { ProColumns } from "@ant-design/pro-components";