import { ProColumns } from "@ant-design/pro-components";
import { Input, Select, DatePicker, InputNumber } from "antd";
import { cn } from "../utils/cn";

interface FilterInputProps<T> {
    col: ProColumns<T>;
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    quickFilter?: boolean;
}

export const FilterInput = <T,>({ 
    col, 
    value, 
    onChange, 
    onBlur, 
    quickFilter = false 
}: FilterInputProps<T>) => {
    const baseClassName = cn(
        "border-0 focus:ring-0 focus:border-0",
        quickFilter && "h-8 text-sm"
    );

    // Determine input type based on column configuration
    const getInputType = () => {
        // Check if column has valueType specified
        if (col.valueType) {
            switch (col.valueType) {
                case 'select':
                case 'radioButton':
                    return 'select';
                case 'date':
                case 'dateWeek':
                case 'dateMonth':
                case 'dateQuarter':
                case 'dateYear':
                case 'dateRange':
                    return 'date';
                case 'digit':
                case 'money':
                case 'percent':
                    return 'number';
                case 'textarea':
                    return 'textarea';
                default:
                    return 'text';
            }
        }

        // Check if column has valueEnum (options)
        if (col.valueEnum) {
            return 'select';
        }

        // Default to text input
        return 'text';
    };

    const inputType = getInputType();

    switch (inputType) {
        case 'select':
            const options = col.valueEnum 
                ? Object.entries(col.valueEnum).map(([key, option]) => ({
                    value: key,
                    label: typeof option === 'string' ? option : option?.text || key
                }))
                : col.request
                    ? [] // Handle async options if needed
                    : [];

            return (
                <Select
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={`Filter by ${col.title}`}
                    allowClear
                    showSearch
                    className={baseClassName}
                    style={{ width: '100%' }}
                    size={quickFilter ? 'small' : 'middle'}
                    options={options}
                />
            );

        case 'date':
            return (
                <DatePicker
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={`Filter by ${col.title}`}
                    className={baseClassName}
                    style={{ width: '100%' }}
                    size={quickFilter ? 'small' : 'middle'}
                />
            );

        case 'number':
            return (
                <InputNumber
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={`Filter by ${col.title}`}
                    className={baseClassName}
                    style={{ width: '100%' }}
                    size={quickFilter ? 'small' : 'middle'}
                />
            );

        case 'textarea':
            return (
                <Input.TextArea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={`Filter by ${col.title}`}
                    className={baseClassName}
                    style={{ width: '100%' }}
                    rows={quickFilter ? 1 : 3}
                />
            );

        default:
            return (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={`Filter by ${col.title}`}
                    className={baseClassName}
                    style={{ width: '100%' }}
                    size={quickFilter ? 'small' : 'middle'}
                />
            );
    }
};
