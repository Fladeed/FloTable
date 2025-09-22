import { ProColumns } from "@ant-design/pro-components";
import { Descriptions } from "antd";

export const enum MobileTableType {
    DESCRIPTIONS = "DESCRIPTIONS",
    TABLE = "TABLE",
}

export const responsiveColumns = <T,>(columns: ProColumns<T>[], mobileTableType: MobileTableType, dataName: string, isMobile: boolean): ProColumns<T>[] => {

    if (!isMobile || mobileTableType === MobileTableType.TABLE) {
        return columns;
    }
    return [{
        dataIndex: "data",
        title: dataName,
        key: "data",
        width: "100%",
        render: (_, record: any) => {
            return <Descriptions layout={"horizontal"} bordered styles={{ label: { minWidth: "100px" }, content: { minWidth: "100px" } }}>
                {columns.map((col) => (
                    <Descriptions.Item key={col.key} label={<>{col.title}</>}>
                        {record[col.dataIndex]}
                    </Descriptions.Item>
                ))}
            </Descriptions>;
        },
    }];
}