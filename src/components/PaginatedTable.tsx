import { ProTable, ProColumns } from "@ant-design/pro-components";
import { Tooltip } from "antd";
import enUS from "antd/locale/en_US";
import { Key, useState } from "react";
import { ProfileOutlined, TableOutlined } from "@ant-design/icons";
import { FloFilters, FloTableFilters } from "./FloTableFilters";
import { MobileTableType, responsiveColumns } from "../utils/responsiveness";
import { FloRequest } from "./FloSimpleTable";

type PaginatedTableProps<T> = {
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
  quickFilterColumns: string[];
  setFilterVisible: (visible: boolean) => void;
  defaultMobilePageSize: number;
  defaultPageSize: number;
  tableClassName?: string;
};

export function PaginatedTable<T extends Record<string, any>>({
  id,
  dataName,
  columns,
  rowKey,
  request,
  initQuickFilterColumns,
  filters,
  onFiltersChange,
  onQuickFilterColumnsChange,
  isMobile,
  quickFilterColumns,
  setFilterVisible,
  defaultMobilePageSize,
  defaultPageSize,
  tableClassName,
}: PaginatedTableProps<T>) {
  const [mobileTableType, setMobileTableType] = useState<MobileTableType>(MobileTableType.TABLE);

  return (
    <div style={{ width: '100%' }}>
      <ProTable<T, { filters: FloFilters<T> }>
        cardProps={{
          className: tableClassName,
          style: { width: '100%' },
        }}
        params={{ filters }}
        key={`${dataName}-${isMobile}-${mobileTableType}`}
        ghost={true}
        style={{ 
          width: '100%',
          ...(isMobile && {
            '--ant-table-header-cell-height': '44px',
            '--ant-table-cell-padding-vertical': '8px',
            '--ant-table-cell-padding-horizontal': '8px',
          } as any)
        }}
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
        rowKey={rowKey}
        columns={responsiveColumns(columns, mobileTableType, dataName, isMobile)}
        request={request}
        search={false}
        bordered={true}
        showHeader={true}
        pagination={{
          defaultPageSize: isMobile ? defaultMobilePageSize : defaultPageSize,
          showSizeChanger: true,
          showQuickJumper: !isMobile,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ['10', '20', '50', '100'],
          locale: {
            items_per_page: '/ page',
            jump_to: 'Go to',
            jump_to_confirm: 'confirm',
            page: 'Page',
            prev_page: 'Previous Page',
            next_page: 'Next Page',
            prev_5: 'Previous 5 Pages',
            next_5: 'Next 5 Pages',
            prev_3: 'Previous 3 Pages',
            next_3: 'Next 3 Pages',
            page_size: 'Page Size'
          }
        }}
        scroll={{
          x: true,
        }}
        tableLayout="auto"
        tableStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ...(isMobile && {
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
          })
        }}
        className={isMobile ? 'mobile-table-fix' : ''}
      />
    </div>
  );
}
