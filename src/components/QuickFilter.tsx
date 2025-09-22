import { ProColumns } from "@ant-design/pro-components";
import { FilterInput } from "./FilterInput";
import { Key, useState, useRef, useEffect } from "react";
import { Button } from "antd";

type QuickFilterProps<T> = {
  id: Key
  col: ProColumns<T>;
  onFiltersChange?: (filters: any) => void;
  value: string;
  className?: string;
  buttonClassName?: string;
  style?: React.CSSProperties;
  placeholder?: string;
};

export const QuickFilter = <T,>({ col, onFiltersChange, value, id, className, buttonClassName, style, placeholder }: QuickFilterProps<T>) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const quickFilterRef = useRef<HTMLDivElement>(null);
  const hasValue = value !== undefined && value !== "" && !expanded;

  // Handle outside click to close the filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickFilterRef.current && !quickFilterRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  const toggleField = () => {
    setExpanded(!expanded);
  };

  const handleChange = (val: string) => {
    onFiltersChange?.(val);
  };

  return (
    <div
      ref={quickFilterRef}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '0.375rem',
        overflow: 'hidden',
        border: '1px solid #d1d5db',
        ...style
      }}
    >
      <Button
        onClick={toggleField}
        type="text"
        size="small"
        className={buttonClassName}
        style={{
          position: 'relative',
          border: 'none',
          height: 'auto',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          borderRadius: 0,
          transition: 'background-color 0.15s ease-in-out'
        }}
      >
        {typeof col.title === "string" && col.title}
        {typeof col.title === "object" && col.title}
        {hasValue && (
          <span
            style={{
              position: 'absolute',
              top: '0.25rem',
              right: '0.25rem',
              display: 'block',
              height: '0.5rem',
              width: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: '#3b82f6'
            }}
          />
        )}
      </Button>

      <div
        style={{
          overflow: 'hidden',
          transition: 'all 300ms ease-in-out',
          borderLeft: '1px solid #d1d5db',
          flexShrink: 0,
          opacity: expanded ? 1 : 0,
          width: expanded ? '10rem' : '0',
          pointerEvents: expanded ? "auto" : "none",
          height: '100%',
          display: 'flex',
          alignItems: 'stretch'
        }}
      >
        {<FilterInput col={col} value={value} onChange={handleChange} onBlur={() => { }} quickFilter placeholder={placeholder} />}
      </div>
    </div>
  );
};
