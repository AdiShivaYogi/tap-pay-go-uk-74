
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Network, Sparkles } from "lucide-react";

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
      <SelectTrigger className="w-[180px] h-8 bg-gradient-to-r from-slate-50 to-white border-slate-200">
        <SelectValue placeholder="Model AI" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deepseek" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-blue-500" />
            <span>DeepSeek Chat</span>
          </div>
        </SelectItem>
        
        <SelectItem value="claude" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Network size={14} className="text-amber-500" />
            <span>Claude (OpenRouter)</span>
          </div>
        </SelectItem>
        
        {showAnthropicDirect && (
          <SelectItem value="anthropic" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Brain size={14} className="text-orange-500" />
              <span>Claude (Anthropic Direct)</span>
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
