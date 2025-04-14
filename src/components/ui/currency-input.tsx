
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onValueChange: (value: string) => void;
  prefix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      prefix = "£",
      decimalScale = 2,
      allowNegative = false,
      ...props
    },
    ref
  ) => {
    // Format the input value to always display decimals
    const formatValue = (val: string): string => {
      // Remove any non-digit characters except decimal point
      let formatted = val.replace(/[^\d.-]/g, "");
      
      // Handle decimal values
      const parts = formatted.split(".");
      if (parts.length > 1) {
        const wholeNumber = parts[0];
        const decimals = parts[1].slice(0, decimalScale);
        formatted = `${wholeNumber}.${decimals}`;
      }
      
      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(prefix, "").trim();
      const formatted = formatValue(rawValue);
      onValueChange(formatted);
    };

    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-lg font-medium">
          {prefix}
        </div>
        <input
          type="text"
          className={cn(
            "flex h-14 w-full rounded-md border border-input bg-background px-3 py-3 text-xl pl-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={value === "" ? "" : `${value}`}
          onChange={handleChange}
          inputMode="decimal"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
