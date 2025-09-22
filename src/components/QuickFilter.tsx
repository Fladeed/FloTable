import { ProColumns } from "@ant-design/pro-components";
import { FilterInput } from "./FilterInput";
import { Key, useState } from "react";
import { Button } from "./Button";
import { cn } from "../utils/cn";

type QuickFilterProps<T> = {
  id: Key
  col: ProColumns<T>;
  onFiltersChange?: (filters: any) => void;
  value: string;
  className?: string;
  buttonClassName?: string;
};

export const QuickFilter = <T,>({ col, onFiltersChange, value, id, className, buttonClassName }: QuickFilterProps<T>) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const toggleField = () => {
    setExpanded(!expanded);
  };

  const handleChange = (val: string) => {
    onFiltersChange?.(val);
  };
  
  return (
    <div className={cn(className)} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid #d1d5db' }}>
      <Button 
        onClick={toggleField} 
        showDot={value !== undefined && value !== "" && !expanded}
        className={buttonClassName}
      >
        {typeof col.title === "string" && col.title}
        {typeof col.title === "object" && col.title}
      </Button>

      <div
        style={{
          overflow: 'hidden',
          transition: 'all 300ms ease-in-out',
          opacity: expanded ? 1 : 0,
          width: expanded ? '10rem' : '0',
          borderLeft: '1px solid #d1d5db',
          flexShrink: 0,
          pointerEvents: expanded ? "auto" : "none"
        }}
      >
        {<FilterInput col={col} value={value} onChange={handleChange} onBlur={toggleField} quickFilter />}
      </div>
    </div>
  );
};
