import { cn } from "../utils/cn";
import React from "react";

type FloButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  showDot?: boolean;
  disabled?: boolean;
  variant?: "outlined" | "borderless";
  className?: string;
  dotClassName?: string;
};

export const Button: React.FC<FloButtonProps> = ({
  onClick,
  children,
  showDot,
  disabled,
  variant = "borderless",
  className,
  dotClassName,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(className)}
      style={{
        position: 'relative',
        fontSize: '0.875rem',
        padding: '0.5rem 0.75rem',
        transition: 'all 150ms ease',
        whiteSpace: 'nowrap',
        ...(variant === "outlined" && { 
          border: '1px solid #d1d5db', 
          borderRadius: '0.375rem' 
        }),
        ...(disabled && { 
          cursor: 'not-allowed', 
          opacity: 0.5 
        })
      }}
    >
      {children}
      {showDot && !disabled && (
        <span 
          className={cn(dotClassName)} 
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
    </button>
  );
};
