import { FloFilters, FloTableFiltersDrawer } from "./FloTableFilters";
import { useIsMobile } from "../hooks/useIsMobile";
import { useMobileTableScroll } from "./use-mobile-table-scroll";
import { MobileTableType } from "../utils/responsiveness";
import { cn } from "../utils/cn";
import { ProColumns, ProTableProps } from "@ant-design/pro-components";
import { Key, useCallback, useState } from "react";
import { InfiniteScrollTable } from "./InfiniteScrollTable";
import { PaginatedTable } from "./PaginatedTable";
import { useInfiniteScroll } from "./useInfiniteScroll";

export type FloRequest<T> = ProTableProps<T, { filters: FloFilters<T> }>["request"];
export type { FloFilters };

type FloTableProps<T> = {
  id: Key;
  dataName?: string;
  columns: ProColumns<T>[];
  rowKey?: string;
  request: FloRequest<T>;
  initQuickFilterColumns?: string[];
  enableInfiniteScroll?: boolean;
  defaultMobilePageSize?: number;
  defaultPageSize?: number;
  // Styling props
  className?: string;
  tableClassName?: string;
  style?: React.CSSProperties;
};

export default function FloTable<T extends Record<string, any>>({
  id,
  dataName = "",
  columns,
  rowKey = "id",
  request,
  initQuickFilterColumns = [],
  enableInfiniteScroll = true,
  defaultMobilePageSize = 20,
  defaultPageSize = 10,
  className,
  tableClassName,
  style,
}: FloTableProps<T>) {

  const isMobile = useIsMobile();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FloFilters<T>>({} as FloFilters<T>);
  const [quickFilterColumns, setQuickFilterColumns] = useState<string[]>(initQuickFilterColumns);

  const shouldUseInfiniteScroll = isMobile && enableInfiniteScroll;

  // Use infinite scroll hook
  const {
    allData,
    hasMore,
    isLoadingMore,
    loadMoreData,
    enhancedRequest,
    resetInfiniteScroll
  } = useInfiniteScroll(
    request,
    rowKey,
    shouldUseInfiniteScroll,
    defaultMobilePageSize
  );

  // Reset data when filters change
  const handleFiltersChange = useCallback((newFilters: FloFilters<T>) => {
    setFilters(newFilters);
    setQuickFilterColumns([
      ...initQuickFilterColumns,
      ...Object.keys(newFilters).filter(key => newFilters[key] !== undefined && newFilters[key] !== "")
    ]);

    if (shouldUseInfiniteScroll) {
      resetInfiniteScroll();
    }
  }, [shouldUseInfiniteScroll, initQuickFilterColumns, resetInfiniteScroll]);

  const handleQuickFilterColumnsChange = useCallback((newColumns: string[]) => {
    setQuickFilterColumns(newColumns);
  }, []);

  const handleClearFilters = useCallback(() => {
    const newFilters = {} as FloFilters<T>;
    setFilters(newFilters);
    setQuickFilterColumns(initQuickFilterColumns);
    if (shouldUseInfiniteScroll) {
      resetInfiniteScroll();
    }
  }, [initQuickFilterColumns, shouldUseInfiniteScroll, resetInfiniteScroll]);

  // Use the custom hook for mobile table scroll behavior
  const tableContainerRef = useMobileTableScroll({
    isMobile,
    dependencies: []
  });

  return (
    <div
      ref={tableContainerRef}
      className={cn('touch-pan-y', className)}
      style={{
        width: '100%',
        ...style,
        ...(isMobile && {
          // Optimize for smooth scrolling on mobile
          overflow: 'visible',
          WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
          scrollBehavior: 'smooth', // Smooth scroll transitions
          willChange: 'scroll-position', // Optimize for scroll animations
        })
      }}
    >
      <FloTableFiltersDrawer<T>
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        columns={columns}
        filters={filters}
        onChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      {shouldUseInfiniteScroll ? (
        <InfiniteScrollTable<T>
          id={id}
          dataName={dataName}
          columns={columns}
          rowKey={rowKey}
          request={request}
          initQuickFilterColumns={initQuickFilterColumns}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onQuickFilterColumnsChange={handleQuickFilterColumnsChange}
          isMobile={isMobile}
          allData={allData as any}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          loadMoreData={loadMoreData}
          enhancedRequest={enhancedRequest}
          quickFilterColumns={quickFilterColumns}
          setFilterVisible={setFilterVisible}
          tableClassName={tableClassName}
        />
      ) : (
        <PaginatedTable<T>
          id={id}
          dataName={dataName}
          columns={columns}
          rowKey={rowKey}
          request={request}
          initQuickFilterColumns={initQuickFilterColumns}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onQuickFilterColumnsChange={handleQuickFilterColumnsChange}
          isMobile={isMobile}
          quickFilterColumns={quickFilterColumns}
          setFilterVisible={setFilterVisible}
          defaultMobilePageSize={defaultMobilePageSize}
          defaultPageSize={defaultPageSize}
          tableClassName={tableClassName}
        />
      )}
    </div>
  );
}
