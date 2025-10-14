import { FloTableActionConfig, FloTableActions } from "./FloTableActions";
import FloTable, { FloRequest } from "./FloSimpleTable";
import { useIsMobile } from "../hooks/useIsMobile";
import { ProColumns } from "@ant-design/pro-components";
import { Card, Empty, Input, Modal, Tabs, TabsProps } from "antd";
import { Key, useMemo, useState } from "react";

export type View = { key: string; label: string; shortLabel: string; query: string; filters?: Record<string, any> };

export type FloTableWithViewsProps<T> = {
    id: Key;
    title: string;
    description?: string;
    dataName?: string;
    columns: ProColumns<T>[];
    rowKey?: string;
    request: FloRequest<T>;
    initQuickFilterColumns?: string[];
    actions?: FloTableActionConfig[];
    views?: View[];
    enableInfiniteScroll?: boolean;
    defaultMobilePageSize?: number;
    defaultPageSize?: number;
    // Styling props
    className?: string;
    headerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    cardClassName?: string;
    tabsClassName?: string;
    style?: React.CSSProperties;
};

export const FloTableWithViews = <T extends Record<string, any>>({ 
    title, 
    description, 
    dataName, 
    columns, 
    rowKey, 
    request, 
    initQuickFilterColumns, 
    views, 
    id, 
    enableInfiniteScroll, 
    actions, 
    defaultMobilePageSize = 20,
    defaultPageSize = 10,
    className,
    headerClassName,
    titleClassName,
    descriptionClassName,
    cardClassName,
    tabsClassName,
    style
}: FloTableWithViewsProps<T>) => {
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
            query: "", // Customize as needed
        };
        setViewsState(prev => [...prev, newView]);
        setActiveKey(newKey);
        setIsModalVisible(false);
    };

    const onEdit: TabsProps["onEdit"] = (targetKey, action) => {
        if (action === "add") {
            showAddTabModal();
        } else if (action === "remove") {
            setViewsState(prev => prev.filter(view => view.key !== targetKey));
            if (viewsState.length > 0) {
                const nextActiveKey = viewsState[0].key;
                setActiveKey(nextActiveKey);
            } else {
                setActiveKey("default");
            }
        }
    };

    const tabs = useMemo(() => viewsState.map(view => ({
        key: view.key,
        label: isMobile ? view.shortLabel || "Untitled" : view.label || "Untitled",
        children: (
            <FloTable<T>
                id={id}
                dataName={dataName}
                columns={columns}
                rowKey={rowKey}
                request={request}
                initQuickFilterColumns={initQuickFilterColumns}
                enableInfiniteScroll={enableInfiniteScroll}
                defaultMobilePageSize={defaultMobilePageSize}
                defaultPageSize={defaultPageSize}
            />
        ),
    })), [viewsState, dataName, columns, rowKey, request, initQuickFilterColumns, id, enableInfiniteScroll, defaultMobilePageSize, defaultPageSize]);

    if (tabs.length === 0) {
        return <Empty />;
    }

    return (
        <div className={className} style={{ maxWidth: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', ...style }}>
            <div className={headerClassName} style={isMobile ? { padding: '0.5rem' } : undefined}>
                <h1 className={titleClassName} style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 700, ...(isMobile && { textAlign: 'center' }) }}>{title}</h1>
                {description && (
                    <p className={descriptionClassName} style={{ marginTop: '0.25rem', ...(isMobile && { textAlign: 'center' }) }}>{description}</p>
                )}
            </div>
            <Card 
                className={cardClassName} 
                styles={{ 
                    body: { padding: isMobile ? "0px" : "24px" },
                    ...(isMobile && { border: 'none', borderRadius: 0 }),
                    ...(!isMobile && { borderRadius: '0.5rem' })
                }}
            >
                <Tabs
                    className={tabsClassName}
                    type="editable-card"
                    size={isMobile ? "small" : undefined}
                    items={tabs}
                    onEdit={onEdit}
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    hideAdd={false}
                    tabBarExtraContent={
                        actions && actions.length > 0 ? (
                            <div style={{ margin: '0 0.25rem' }}>
                                <FloTableActions
                                    key={`${id}-template-actions`}
                                    id={`${id}-template-actions`}
                                    actions={actions}
                                />
                            </div>
                        ) : undefined
                    }
                />
            </Card>

            <Modal
                title="Add New View"
                open={isModalVisible}
                onOk={handleAddTab}
                onCancel={() => setIsModalVisible(false)}
                okButtonProps={{ disabled: !newTab.label.trim() }}
            >
                <Input
                    placeholder="Enter view label"
                    required={true}
                    value={newTab.label}
                    onChange={e => setNewTab({ ...newTab, label: e.target.value })}
                />
                <Input
                    placeholder="Enter view short label"
                    required={false}
                    value={newTab.shortLabel}
                    onChange={e => setNewTab({ ...newTab, shortLabel: e.target.value })}
                />
            </Modal>
        </div>
    );
    
};
