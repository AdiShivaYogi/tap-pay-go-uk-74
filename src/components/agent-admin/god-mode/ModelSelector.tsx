
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelSelectorProps {
  value: "deepseek" | "claude" | "anthropic";
  onChange: (value: "deepseek" | "claude" | "anthropic") => void;
  disabled?: boolean;
  showAnthropicDirect?: boolean;
}

export const ModelSelector = ({ 
  value, 
  onChange, 
  disabled = false,
  showAnthropicDirect = true
}: ModelSelectorProps) => {
  return (
    <Select 
      value={value} 
      onValueChange={(v) => onChange(v as "deepseek" | "claude" | "anthropic")}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px] h-8">
        <SelectValue placeholder="Model AI" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deepseek">DeepSeek Chat</SelectItem>
        <SelectItem value="claude">Claude (OpenRouter)</SelectItem>
        {showAnthropicDirect && <SelectItem value="anthropic">Claude (Anthropic Direct)</SelectItem>}
      </SelectContent>
    </Select>
  );
};
