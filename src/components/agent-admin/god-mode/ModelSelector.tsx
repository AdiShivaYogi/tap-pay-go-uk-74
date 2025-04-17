
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Network, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const [isLoading, setIsLoading] = useState(false);
  const [modelAvailability, setModelAvailability] = useState<{
    anthropic: boolean;
    claude: boolean;
    deepseek: boolean;
  }>({
    anthropic: false,
    claude: false,
    deepseek: false
  });
  
  // Verifică care modele sunt disponibile
  useEffect(() => {
    const checkModelsAvailability = async () => {
      setIsLoading(true);
      try {
        // Verifică API Anthropic
        const { data: anthropicData } = await supabase.functions.invoke('check-anthropic-key');
        const anthropicAvailable = !!(anthropicData?.hasKey && anthropicData?.isValid);
        
        // Verifică API OpenRouter (pentru Claude)
        const { data: openrouterData } = await supabase.functions.invoke('check-openrouter-key');
        const claudeAvailable = !!(openrouterData?.hasKey && openrouterData?.isValid);
        
        // Verifică API Deepseek
        const { data: deepseekData } = await supabase.functions.invoke('check-deepseek-key');
        const deepseekAvailable = !!(deepseekData?.hasKey && deepseekData?.isValid);
        
        setModelAvailability({
          anthropic: anthropicAvailable,
          claude: claudeAvailable,
          deepseek: deepseekAvailable
        });
        
        // Selectează automat cel mai bun model disponibil dacă cel curent nu este disponibil
        if (value === 'anthropic' && !anthropicAvailable) {
          if (claudeAvailable) {
            onChange('claude');
          } else if (deepseekAvailable) {
            onChange('deepseek');
          }
        }
      } catch (error) {
        console.error('Eroare la verificarea disponibilității modelelor:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkModelsAvailability();
  }, [value, onChange]);
  
  return (
    <Select 
      value={value} 
      onValueChange={(v) => onChange(v as "deepseek" | "claude" | "anthropic")}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className="w-[180px] h-8 bg-gradient-to-r from-slate-50 to-white border-slate-200">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            <span>Verificare modele...</span>
          </div>
        ) : (
          <SelectValue placeholder="Model AI" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deepseek" className="flex items-center gap-2" disabled={!modelAvailability.deepseek}>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className={modelAvailability.deepseek ? "text-blue-500" : "text-gray-400"} />
            <span>DeepSeek Chat</span>
            {!modelAvailability.deepseek && <span className="text-xs text-muted-foreground">(indisponibil)</span>}
          </div>
        </SelectItem>
        
        <SelectItem value="claude" className="flex items-center gap-2" disabled={!modelAvailability.claude}>
          <div className="flex items-center gap-2">
            <Network size={14} className={modelAvailability.claude ? "text-amber-500" : "text-gray-400"} />
            <span>Claude (OpenRouter)</span>
            {!modelAvailability.claude && <span className="text-xs text-muted-foreground">(indisponibil)</span>}
          </div>
        </SelectItem>
        
        {showAnthropicDirect && (
          <SelectItem value="anthropic" className="flex items-center gap-2" disabled={!modelAvailability.anthropic}>
            <div className="flex items-center gap-2">
              <Brain size={14} className={modelAvailability.anthropic ? "text-orange-500" : "text-gray-400"} />
              <span>Claude (Anthropic Direct)</span>
              {!modelAvailability.anthropic && <span className="text-xs text-muted-foreground">(indisponibil)</span>}
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
