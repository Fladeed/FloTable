import { useState, useCallback, useRef } from "react";
import { ProTableProps } from "@ant-design/pro-components";
import { FloFilters } from "./FloTableFilters";
import { FloRequest } from "./FloSimpleTable";

export function useInfiniteScroll<T extends Record<string, any>>(
  request: FloRequest<T>,
  rowKey: string,
  shouldUseInfiniteScroll: boolean,
  defaultMobilePageSize: number
) {
  // Infinite scroll state
  const [allData, setAllData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Debounce ref to prevent rapid successive calls
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Enhanced request function that handles infinite scroll
  const enhancedRequest = useCallback(async (
    params: { filters: FloFilters<T> } & { pageSize?: number; current?: number; keyword?: string },
    sort: Record<string, any>,
    filter: Record<string, any>,
    targetPage?: number
  ) => {
    if (!shouldUseInfiniteScroll) {
      // Normal pagination - just pass through to the original request
      const result = await request?.(params, sort, filter);
      return result || { data: [], success: false, total: 0 };
    }

    // Infinite scroll mode - use targetPage if provided, otherwise use currentPage
    const page = targetPage || currentPage;
    const pageSize = defaultMobilePageSize;

    try {
      const result = await request?.({ ...params, current: page, pageSize }, sort, filter);

      if (result?.success && result?.data) {
        let updatedData: T[];

        if (page === 1) {
          // First page or reset - replace all data
          updatedData = result.data;
          setAllData(result.data);
          setCurrentPage(1);
        } else {
          // Additional pages - append to existing data
          const existingKeys = new Set(allData.map(item => item[rowKey]));
          const newItems = (result.data || []).filter((item: T) => !existingKeys.has(item[rowKey]));
          updatedData = [...allData, ...newItems];
          setAllData(updatedData);
          setCurrentPage(page);
        }

        // More robust hasMore calculation
        const receivedDataLength = result.data?.length || 0;
        const shouldHaveMore = receivedDataLength >= pageSize;
        
        // Additional check: if we got less data than requested, definitely no more
        if (receivedDataLength < pageSize) {
          setHasMore(false);
        } else {
          setHasMore(shouldHaveMore);
        }

        // Return the updated accumulated data for ProTable
        return {
          ...result,
          data: updatedData,
        };
      }

      return result || { data: [], success: false, total: 0 };
    } catch (error) {
      console.error('Request failed:', error);
      // On error, set hasMore to false to prevent infinite retry loops
      setHasMore(false);
      return { data: [], success: false, total: 0 };
    }
  }, [request, shouldUseInfiniteScroll, defaultMobilePageSize, allData, rowKey, currentPage]);

  // Load more data for infinite scroll
  const loadMoreData = useCallback(async () => {
    
    // Clear any existing timeout
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    
    if (isLoadingMore || !hasMore) {
      return;
    }

    // Debounce the load more calls
    return new Promise<void>((resolve) => {
      loadMoreTimeoutRef.current = setTimeout(async () => {
        setIsLoadingMore(true);
        try {
          // Calculate next page
          const nextPage = currentPage + 1;

          const result = await enhancedRequest({ filters: {} as FloFilters<T>, current: nextPage, pageSize: defaultMobilePageSize }, {}, {}, nextPage);
          
          // Check if we got any new data
          if (!result?.data || result.data.length < defaultMobilePageSize) {
            setHasMore(false);
          }
        } catch (error) {
          console.error('Error loading more data:', error);
          // On error, assume no more data to prevent infinite retries
          setHasMore(false);
        } finally {
          setIsLoadingMore(false);
          resolve();
        }
      }, 300); // 300ms debounce
    });
  }, [isLoadingMore, hasMore, enhancedRequest, currentPage, defaultMobilePageSize]);

  // Reset data when filters change
  const resetInfiniteScroll = useCallback(() => {
    // Clear any pending load more calls
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    
    setCurrentPage(1);
    setAllData([]);
    setHasMore(true);
    setIsLoadingMore(false);
  }, []);

  return {
    allData,
    currentPage,
    hasMore,
    isLoadingMore,
    enhancedRequest,
    loadMoreData,
    resetInfiniteScroll,
    setAllData,
    setCurrentPage,
    setHasMore,
  };
}
