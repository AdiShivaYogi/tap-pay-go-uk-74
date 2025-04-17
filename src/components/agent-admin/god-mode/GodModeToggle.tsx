
import React from "react";
import { Crown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AutoExecutionConfig } from "@/hooks/agent-god-mode/types";
import { AdvancedConfigDialog } from "./AdvancedConfigDialog";

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
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">God Mode</h3>
          <Badge 
            variant={isGodModeEnabled ? "default" : "outline"} 
            className={isGodModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            {isGodModeEnabled ? "Activ" : "Inactiv"}
          </Badge>
          
          {/* Advanced config button - only show if both props are provided */}
          {autoExecutionConfig && updateAutoExecutionConfig && (
            <AdvancedConfigDialog 
              config={autoExecutionConfig} 
              updateConfig={updateAutoExecutionConfig} 
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {isGodModeEnabled 
            ? "Propunerile agenților vor fi aprobate automat cu feedback de îmbunătățire" 
            : "Propunerile agenților vor primi doar feedback, fără aprobare automată"}
        </p>
      </div>
      
      <Switch
        checked={isGodModeEnabled}
        onCheckedChange={toggleGodMode}
      />
    </div>
  );
};
