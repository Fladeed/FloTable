import { MdSearch } from "react-icons/md";
import { FilterInput } from "./FilterInput";
import { Button } from "./Button";
import { QuickFilter } from "./QuickFilter";
import { useIsMobile } from "../hooks/useIsMobile";
import { ProColumns } from "@ant-design/pro-components";
import { Drawer, Form, Space, Button as AntButton } from "antd";
import { Key } from "react";
import { IoFilter } from "react-icons/io5";
import { MdOutlineClearAll } from "react-icons/md";
import { cn } from "../utils/cn";

export type FloFilterKey<T> = keyof T | "search"
export type FloFilters<T> = Record<FloFilterKey<T>, any>

interface FloTableFiltersProps<T> {
    id: Key;
    columns: ProColumns<T>[];
    quickFilterColumns: string[];
    initQuickFilterColumns: string[];
    setFilterVisible: (visible: boolean) => void;
    filters: FloFilters<T>;
    onFiltersChange?: (filters: FloFilters<T>) => void;
    onQuickFilterColumnsChange?: (quickFilterColumns: string[]) => void;
    className?: string;
    buttonClassName?: string;
}

export const FloTableFilters = <T,>({ columns, quickFilterColumns, setFilterVisible, filters, onFiltersChange, onQuickFilterColumnsChange, initQuickFilterColumns, id, className, buttonClassName }: FloTableFiltersProps<T>) => {

    const searchColumn: ProColumns<T> = { dataIndex: "search", title: <MdSearch /> }
    const isMobile = useIsMobile();

    const handleQuickFilterChange = (col: ProColumns<T>, value: any) => {
        onFiltersChange?.({ ...filters, [col.dataIndex as string]: value });
    };

    const handleClearFilters = () => {
        onFiltersChange?.({} as FloFilters<T>)
        onQuickFilterColumnsChange?.(initQuickFilterColumns)
    }

    const quickFilterFields = columns
        .filter(col => quickFilterColumns.includes(col.dataIndex as string))
        .map(col => {
            return (
                <QuickFilter<T>
                    key={`${id}-${col.dataIndex}`}
                    id={`${id}-${col.dataIndex}`}
                    col={col}
                    onFiltersChange={(value) => {
                        handleQuickFilterChange(col, value);
                    }}
                    value={filters ? filters[col.dataIndex as FloFilterKey<T>] : ""}
                    style={{ height: '2.25rem' }}
                />
            );
        });


    return (
        <div className={cn(className)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <QuickFilter<T>
                id={`${id}-search`}
                col={searchColumn}
                onFiltersChange={(value) => handleQuickFilterChange(searchColumn, value)}
                value={filters ? filters["search"] : ""}
                style={{ height: '2.25rem' }}
                placeholder="Search..."
            />
            {!isMobile && quickFilterFields}
            <button
                key="filterDrawerBtn"
                type="button"
                className={cn(buttonClassName)}
                style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem',
                    transition: 'all 150ms ease',
                    whiteSpace: 'nowrap',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    height: '2.25rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={() => setFilterVisible(true)}
            >
                <IoFilter style={{ display: 'inline-block' }} />
                {isMobile ? "" : <span style={{ marginLeft: '0.5rem' }}>All Filters</span>}
            </button>
            <Button
                disabled={Object.values(filters).filter(val => val !== undefined && val !== "").length === 0}
                onClick={handleClearFilters}
                variant="outlined"
                style={{ height: '2.25rem' }}
            >
                <MdOutlineClearAll size={22} />
            </Button>
        </div>
    );
}

interface FloTableFiltersDrawerProps<T> {
    filterVisible: boolean;
    setFilterVisible: (visible: boolean) => void;
    columns: ProColumns<T>[];
    filters: FloFilters<T>;
    onChange?: (filters: FloFilters<T>) => void;
    onClear?: () => void;
    className?: string;
    buttonClassName?: string;
}

export const FloTableFiltersDrawer = <T,>({ columns, filterVisible, setFilterVisible, filters, onChange, onClear, className, buttonClassName }: FloTableFiltersDrawerProps<T>) => {

    const filterFields = columns.map(col => {
        const key = col.dataIndex as FloFilterKey<T>;
        return {
            key,
            label: col.title,
            input: (
                <FilterInput<T>
                    col={col}
                    value={filters[key]}
                    onChange={value => {
                        onChange?.({ ...filters, [key]: value })
                    }}
                />
            )
        };
    });

    const filterPanel = (
        <Form
            layout="vertical"
            onFinish={() => setFilterVisible(false)}
            style={{ minWidth: 250 }}
        >
            {filterFields.map(field => (
                <Form.Item className="[&_.ant-form-item-control-input]:border-none" key={String(field.key)} label={<>{field.label}</>}>
                    {field.input}
                </Form.Item>
            ))}
            <Space>
                <AntButton
                    type="primary"
                    htmlType="submit"
                    onClick={() => setFilterVisible(false)}
                >
                    Apply
                </AntButton>
                <AntButton
                    onClick={() => {
                        onClear?.();
                        setFilterVisible(false);
                    }}
                >
                    Clear
                </AntButton>
            </Space>
        </Form>
    );

    return (
        <Drawer
            title="Filters"
            placement="right"
            className={className}
            open={filterVisible}
            onClose={() => setFilterVisible(false)}
            width={350}
        >
            {filterPanel}
        </Drawer>
    );
};
