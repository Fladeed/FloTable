import { ProTable, ProColumns } from "@ant-design/pro-components";
import { Tooltip } from "antd";
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
    <div style={{ width: '100%' }}>      <ProTable<T, { filters: FloFilters<T> }>
        cardProps={{
          className: tableClassName,
          style: { width: '100%' },
        }}
      params={{ filters }}
      key={`${dataName}-${isMobile}-${mobileTableType}`}
      ghost={true}
      style={{ width: '100%' }}
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
      optionsRender={(_, defaultDom) => {
        return [
          ...(Array.isArray(defaultDom) ? defaultDom : [defaultDom]),
          isMobile && <span key="mobileToggle">
            <Tooltip
              title={
                mobileTableType === MobileTableType.TABLE
                  ? "Switch to Descriptions view"
                  : "Switch to Table view"
              }
            >
              <button
                type="button"
                className="ant-btn"
                onClick={() => {
                  setMobileTableType(prev =>
                    prev === MobileTableType.TABLE
                      ? MobileTableType.DESCRIPTIONS
                      : MobileTableType.TABLE
                  );
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {mobileTableType === MobileTableType.TABLE ? (
                  <TableOutlined />
                ) : (
                  <ProfileOutlined />
                )}
              </button>
            </Tooltip>
          </span>
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
    />
    </div>
  );
}
