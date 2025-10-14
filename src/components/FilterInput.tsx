import { ProColumns } from "@ant-design/pro-components";
import { Input, Select, DatePicker, InputNumber } from "antd";

interface FilterInputProps<T> {
    col: ProColumns<T>;
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    quickFilter?: boolean;
    placeholder?: string;
}

export const FilterInput = <T,>({
    col,
    value,
    onChange,
    onBlur,
    quickFilter = false,
    placeholder
}: FilterInputProps<T>) => {
    const getBaseStyle = () => ({
        width: '100%',
        ...(quickFilter && {
            height: '100%',
            border: 'none',
            boxShadow: 'none'
        })
    });

    const getSelectStyle = () => ({
        width: '100%',
        ...(quickFilter && {
            height: '100%',
            border: 'none',
            boxShadow: 'none'
        })
    });

    const getInputNumberStyle = () => ({
        width: '100%',
        ...(quickFilter && {
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center'
        })
    });


    const getInputClassName = () => quickFilter ? 'border-0 shadow-none' : '';

    const getSelectClassName = () => {
        if (quickFilter) {
            return 'quick-filter-select';
        }
        return '';
    };

    const getPlaceholder = () => {
        return placeholder || `Filter by ${col.title}`;
    };

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
                    placeholder={getPlaceholder()}
                    allowClear
                    showSearch
                    className={getSelectClassName()}
                    style={getSelectStyle()}
                    size={quickFilter ? 'small' : 'middle'}
                    options={options}
                    bordered={!quickFilter}
                />
            );

        case 'date':
            return (
                <DatePicker
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={getPlaceholder()}
                    className={getInputClassName()}
                    style={getBaseStyle()}
                    size={quickFilter ? 'small' : 'middle'}
                    bordered={!quickFilter}
                />
            );

        case 'number':
            return (
                <InputNumber
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={getPlaceholder()}
                    className={getInputClassName()}
                    style={getInputNumberStyle()}
                    size={quickFilter ? 'small' : 'middle'}
                    controls={false}
                    bordered={!quickFilter}
                />
            );

        case 'textarea':
            return (
                <Input.TextArea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={getPlaceholder()}
                    className={getInputClassName()}
                    style={getBaseStyle()}
                    rows={quickFilter ? 1 : 3}
                />
            );

        default:
            return (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={getPlaceholder()}
                    className={getInputClassName()}
                    style={getBaseStyle()}
                    size={quickFilter ? 'small' : 'middle'}
                    bordered={!quickFilter}
                />
            );
    }
};
