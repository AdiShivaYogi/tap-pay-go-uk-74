
import React from "react";
import { Crown, Settings2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AdvancedConfigDialog } from "./AdvancedConfigDialog";
import { AutoExecutionConfig } from "@/hooks/agent-god-mode/types";

interface GodModeToggleProps {
  isGodModeEnabled: boolean;
  toggleGodMode: () => void;
  autoExecutionConfig?: AutoExecutionConfig;
  updateAutoExecutionConfig?: (updates: Partial<AutoExecutionConfig>) => Promise<void>;
}

export const GodModeToggle = ({ 
  isGodModeEnabled, 
  toggleGodMode, 
  autoExecutionConfig,
  updateAutoExecutionConfig
}: GodModeToggleProps) => {
  return (
    <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gradient-to-br from-amber-50/50 to-white border border-amber-100">
      <div>
        <div className="flex items-center gap-2">
          <Crown className={`h-5 w-5 ${isGodModeEnabled ? 'text-amber-500' : 'text-muted-foreground'}`} />
          <h3 className="font-medium">God Mode</h3>
          <Badge 
            variant={isGodModeEnabled ? "default" : "outline"} 
            className={isGodModeEnabled ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0" : ""}
          >
            {isGodModeEnabled ? "Activ" : "Inactiv"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {isGodModeEnabled 
            ? "Propunerile agenților vor fi aprobate automat cu feedback de îmbunătățire" 
            : "Propunerile agenților vor primi doar feedback, fără aprobare automată"}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {autoExecutionConfig && updateAutoExecutionConfig && (
          <AdvancedConfigDialog 
            config={autoExecutionConfig} 
            updateConfig={updateAutoExecutionConfig} 
          />
        )}
        
        <Switch
          checked={isGodModeEnabled}
          onCheckedChange={toggleGodMode}
          className={`${isGodModeEnabled ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-200' : ''}`}
        />
      </div>
    </div>
  );
};
