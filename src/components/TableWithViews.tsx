import { ProColumns } from "@ant-design/pro-components";
import { Card, Empty, Input, Modal, Tabs, TabsProps } from "antd";
import { Key, useMemo, useState } from "react";
import { SimpleTable, TableRequest } from "./SimpleTable";
import { TableActionConfig, TableActions } from "./TableActions";
import { useIsMobile } from "../hooks/useIsMobile";
import { useTranslation } from "../hooks/useTranslation";
import { cn } from "../utils/cn";

export type View = {
    key: string;
    label: string;
    shortLabel: string;
    query: string;
    filters?: Record<string, any>;
};

export interface TableWithViewsProps<T> {
    id: Key;
    title: string;
    description?: string;
    dataName?: string;
    columns: ProColumns<T>[];
    rowKey?: string;
    request: TableRequest<T>;
    actions?: TableActionConfig[];
    views?: View[];
    enableInfiniteScroll?: boolean;
    defaultPageSize?: number;
    className?: string;
    allowCustomViews?: boolean;
}

export function TableWithViews<T extends Record<string, any>>({
    title,
    description,
    dataName,
    columns,
    rowKey,
    request,
    views,
    id,
    enableInfiniteScroll,
    actions,
    defaultPageSize = 20,
    className,
    allowCustomViews = true,
}: TableWithViewsProps<T>) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();

    const [viewsState, setViewsState] = useState<View[]>(views ?? []);
    const [activeKey, setActiveKey] = useState<string>(views?.[0]?.key || "default");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTab, setNewTab] = useState({ label: "", shortLabel: "" });

    const showAddTabModal = () => {
        setNewTab({ label: "", shortLabel: "" });
        setIsModalVisible(true);
    };

    const handleAddTab = () => {
        const newKey = `new-${Date.now()}`;
        const newView: View = {
            key: newKey,
            label: newTab.label || "Untitled",
            shortLabel: newTab.shortLabel || newTab.label || "Untitled",
            query: "",
            filters: {},
        };
        setViewsState(prev => [...prev, newView]);
        setActiveKey(newKey);
        setIsModalVisible(false);
    };

    const onEdit: TabsProps["onEdit"] = (targetKey, action) => {
        if (action === "add" && allowCustomViews) {
            showAddTabModal();
        } else if (action === "remove") {
            setViewsState(prev => prev.filter(view => view.key !== targetKey));
            const remainingViews = viewsState.filter(view => view.key !== targetKey);
            if (remainingViews.length > 0) {
                const nextActiveKey = remainingViews[0].key;
                setActiveKey(nextActiveKey);
            } else {
                setActiveKey("default");
            }
        }
    };

    // Create enhanced request function that applies view filters
    const createViewRequest = (view?: View): TableRequest<T> => {
        return async (params, sort, filter) => {
            if (!request) {
                return { data: [], success: true, total: 0 };
            }

            const viewFilters = view?.filters || {};
            const combinedFilters = { ...filter, ...viewFilters };

            return request(params, sort, combinedFilters);
        };
    };

    const tabs = useMemo(() => {
        if (viewsState.length === 0) {
            // If no views, create a default view
            return [{
                key: "default",
                label: t("all_items", "All Items"),
                children: (
                    <SimpleTable<T>
                        id={`${id}-default`}
                        dataName={dataName}
                        columns={columns}
                        rowKey={rowKey}
                        request={request}
                        enableInfiniteScroll={enableInfiniteScroll}
                        defaultPageSize={defaultPageSize}
                    />
                ),
            }];
        }

        return viewsState.map(view => ({
            key: view.key,
            label: isMobile ?
                (t(view.shortLabel, view.shortLabel)) :
                (t(view.label, view.label)),
            children: (
                <SimpleTable<T>
                    id={`${id}-${view.key}`}
                    dataName={dataName}
                    columns={columns}
                    rowKey={rowKey}
                    request={createViewRequest(view)}
                    enableInfiniteScroll={enableInfiniteScroll}
                    defaultPageSize={defaultPageSize}
                />
            ),
        }));
    }, [viewsState, dataName, columns, rowKey, request, enableInfiniteScroll, defaultPageSize, t, id, isMobile]);

    if (tabs.length === 0) {
        return <Empty description={t("no_data", "No data available")} />;
    }

    return (
        <div className={cn("max-w-screen-2xl mx-auto space-y-4", className)}>
            {/* Header */}
            <div className={cn(isMobile ? "p-2" : "")}>
                <h1 className={cn(
                    "text-2xl font-bold text-gray-900 dark:text-white",
                    isMobile && "text-center"
                )}>
                    {t(title, title)}
                </h1>
                {description && (
                    <p className={cn(
                        "text-gray-600 dark:text-gray-300 mt-1",
                        isMobile && "text-center"
                    )}>
                        {t(description, description)}
                    </p>
                )}
            </div>

            {/* Table with Tabs */}
            <Card
                className={cn(
                    "bg-white dark:border-stroke-dark dark:bg-gray-dark",
                    isMobile ? "border-none rounded-none" : "rounded-lg"
                )}
                styles={{
                    body: { padding: isMobile ? "0px" : "24px" }
                }}
            >
                <Tabs
                    type={allowCustomViews ? "editable-card" : "card"}
                    size={isMobile ? "small" : undefined}
                    items={tabs}
                    onEdit={allowCustomViews ? onEdit : undefined}
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    hideAdd={!allowCustomViews}
                    tabBarExtraContent={
                        actions && actions.length > 0 ? (
                            <div className="mx-1">
                                <TableActions
                                    key={`${id}-template-actions`}
                                    id={`${id}-template-actions`}
                                    actions={actions}
                                />
                            </div>
                        ) : undefined
                    }
                />
            </Card>

            {/* Add View Modal */}
            {allowCustomViews && (
                <Modal
                    title={t("add_new_view", "Add New View")}
                    open={isModalVisible}
                    onOk={handleAddTab}
                    onCancel={() => setIsModalVisible(false)}
                    okButtonProps={{ disabled: !newTab.label.trim() }}
                >
                    <div className="space-y-4">
                        <Input
                            placeholder={t("enter_view_label", "Enter view label")}
                            value={newTab.label}
                            onChange={e => setNewTab({ ...newTab, label: e.target.value })}
                        />
                        <Input
                            placeholder={t("enter_view_short_label", "Enter view short label (optional)")}
                            value={newTab.shortLabel}
                            onChange={e => setNewTab({ ...newTab, shortLabel: e.target.value })}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}