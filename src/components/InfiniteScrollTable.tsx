import { ProTable, ProColumns, ActionType } from "@ant-design/pro-components";
import { Tooltip, Spin } from "antd";
import enUS from "antd/locale/en_US";
import { Key, useState, useEffect, useRef, Ref } from "react";
import { ProfileOutlined, TableOutlined } from "@ant-design/icons";
import { FloFilters, FloTableFilters } from "./FloTableFilters";
import { MobileTableType, responsiveColumns } from "../utils/responsiveness";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FloRequest } from "./FloSimpleTable";
import ScrollButtons from "./ScrollButtons";

type InfiniteScrollTableProps<T> = {
    id: Key;
    dataName: string;
    columns: ProColumns<T>[];
    rowKey: string;
    request: FloRequest<T>;
    initQuickFilterColumns: string[];
    filters: FloFilters<T>;
    onFiltersChange: (filters: FloFilters<T>) => void;
    onQuickFilterColumnsChange: (columns: string[]) => void;
    isMobile: boolean;
    allData: T[];
    hasMore: boolean;
    isLoadingMore: boolean;
    loadMoreData: () => Promise<void>;
    enhancedRequest: FloRequest<T>;
    quickFilterColumns: string[];
    setFilterVisible: (visible: boolean) => void;
    tableClassName?: string;
};

export function InfiniteScrollTable<T extends Record<string, any>>({
    id,
    dataName,
    columns,
    rowKey,
    initQuickFilterColumns,
    filters,
    onFiltersChange,
    onQuickFilterColumnsChange,
    isMobile,
    allData,
    hasMore,
    isLoadingMore,
    loadMoreData,
    enhancedRequest,
    quickFilterColumns,
    setFilterVisible,
    tableClassName,
}: InfiniteScrollTableProps<T>) {
    const [mobileTableType, setMobileTableType] = useState<MobileTableType>(MobileTableType.TABLE);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const tableActionRef = useRef<ActionType | undefined>(null);

    return (
        <div style={{ width: '100%' }}>
            <InfiniteScroll
                dataLength={allData.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={isLoadingMore ? <div style={{ textAlign: 'center', padding: '16px' }}><Spin size="small" /> Loading more...</div> : null}
                endMessage={
                    allData.length > 0 ? (
                        <div style={{ textAlign: 'center', padding: '16px', color: '#666' }}>
                            <b>You have seen all {allData.length} items</b>
                        </div>
                    ) : null
                }
                scrollableTarget="scrollableTableContainer"
                scrollThreshold={0.9}
            >
                <div id={"scrollableTableContainer"} ref={tableContainerRef} style={{ width: '100%', overflow: 'auto', height: '100vh' }}>
                    <ProTable<T, { filters: FloFilters<T> }>
                        cardProps={{
                            className: tableClassName,
                            style: { width: '100%' },
                        }}
                        actionRef={tableActionRef}
                        loading={isLoadingMore}
                        params={{ filters }}
                        key={`${dataName}-${isMobile}-${mobileTableType}`}
                        ghost={true}
                        toolbar={{}}
                        style={{ width: '100%' }}
                        locale={{
                            ...enUS.Table,
                        }}
                        toolBarRender={() => {
                            return [
                                <FloTableFilters
                                    key={`${id}-filters`}
                                    id={`${id}-filters`}
                                    columns={columns}
                                    initQuickFilterColumns={initQuickFilterColumns}
                                    quickFilterColumns={quickFilterColumns}
                                    setFilterVisible={setFilterVisible}
                                    filters={filters}
                                    onFiltersChange={onFiltersChange}
                                    onQuickFilterColumnsChange={onQuickFilterColumnsChange}
                                />
                            ]
                        }}
                        cardBordered={false}
                        className="rounded-lg"
                        rowKey={rowKey}
                        columns={responsiveColumns(columns, mobileTableType, dataName, isMobile)}
                        request={enhancedRequest}
                        search={false}
                        bordered={true}
                        showHeader={true}
                        pagination={false}
                        dataSource={allData}
                        scroll={{
                            x: true
                        }}
                        tableLayout="auto"
                        sticky={{
                            offsetHeader: 70,
                        }}
                    />
                </div>
            </InfiniteScroll>
            <ScrollButtons />
        </div>
    );
}
