
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelSelectorProps {
  value: string;
  onChange: (value: "deepseek" | "claude") => void;
  disabled: boolean;
}

export const ModelSelector = ({ value, onChange, disabled }: ModelSelectorProps) => {
  return (
    <Select 
      value={value} 
      onValueChange={(v) => onChange(v as "deepseek" | "claude")}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px] h-8">
        <SelectValue placeholder="Model AI" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deepseek">DeepSeek Chat</SelectItem>
        <SelectItem value="claude">Claude (OpenRouter)</SelectItem>
      </SelectContent>
    </Select>
  );
};
