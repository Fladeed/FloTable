import { ProTable, ProColumns, ProTableProps } from "@ant-design/pro-components";
import { Key, useCallback, useState, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../utils/cn";

// Generic filter type - can be extended as needed
export type TableFilters<T> = Record<string, any>;

// Generic request type similar to ProTable but with our filter structure
export type TableRequest<T> = ProTableProps<T, { filters: TableFilters<T> }>["request"];

interface SimpleTableProps<T> {
    id: Key;
    dataName?: string;
    columns: ProColumns<T>[];
    rowKey?: string;
    request: TableRequest<T>;
    enableInfiniteScroll?: boolean;
    defaultPageSize?: number;
    className?: string;
    tableClassName?: string;
}

export function SimpleTable<T extends Record<string, any>>({
    id,
    dataName = "items",
    columns,
    rowKey = "id",
    request,
    enableInfiniteScroll = false,
    defaultPageSize = 20,
    className,
    tableClassName,
}: SimpleTableProps<T>) {
    const isMobile = useIsMobile();
    const tableRef = useRef<any>(null);
    const [filters, setFilters] = useState<TableFilters<T>>({});

    const enhancedRequest = useCallback(
        async (params: any, sort: any, filter: any) => {
            if (!request) {
                return { data: [], success: true, total: 0 };
            }

            const result = await request(
                {
                    ...params,
                    pageSize: isMobile ? Math.min(defaultPageSize, 10) : defaultPageSize,
                },
                sort,
                {
                    ...filter,
                    filters,
                }
            );
            return result || { data: [], success: true, total: 0 };
        },
        [request, filters, defaultPageSize, isMobile]
    );

    return (
        <div className={cn("w-full", className)}>
            <ProTable<T>
                key={String(id)}
                rowKey={rowKey}
                columns={columns}
                request={enhancedRequest}
                search={false}
                className={tableClassName}
                options={{
                    search: true,
                    reload: true,
                    density: !isMobile,
                    setting: !isMobile,
                }}
                pagination={
                    enableInfiniteScroll
                        ? false
                        : {
                            showQuickJumper: !isMobile,
                            showSizeChanger: !isMobile,
                            defaultPageSize,
                            pageSizeOptions: ["10", "20", "50", "100"],
                        }
                }
                scroll={
                    isMobile
                        ? { x: "max-content" }
                        : undefined
                }
                size={isMobile ? "small" : "middle"}
                cardBordered={!isMobile}
                headerTitle={dataName ? `${dataName} List` : undefined}
                toolBarRender={false}
            />
        </div>
    );
}