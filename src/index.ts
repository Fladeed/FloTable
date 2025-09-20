// Main component
export { TableWithViews } from "./components/TableWithViews";
export type { TableWithViewsProps, View } from "./components/TableWithViews";

// Sub-components
export { SimpleTable } from "./components/SimpleTable";
export type { TableRequest, TableFilters } from "./components/SimpleTable";

export { TableActions, TableAction } from "./components/TableActions";
export type { TableActionConfig } from "./components/TableActions";

// Hooks
export { useIsMobile } from "./hooks/useIsMobile";
export { useTranslation, I18nProvider } from "./hooks/useTranslation";

// Utils
export { cn } from "./utils/cn";

// Re-export commonly used types from antd pro-components
export type { ProColumns } from "@ant-design/pro-components";