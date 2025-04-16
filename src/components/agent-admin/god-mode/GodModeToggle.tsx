
import React from "react";
import { Crown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface GodModeToggleProps {
  isGodModeEnabled: boolean;
  toggleGodMode: () => void;
}

export const GodModeToggle = ({ isGodModeEnabled, toggleGodMode }: GodModeToggleProps) => {
  console.log('God Mode Status:', isGodModeEnabled);
  
  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-card rounded-lg border">
      <div>
        <div className="flex items-center gap-2">
          <Crown className={`h-5 w-5 ${isGodModeEnabled ? 'text-amber-500' : 'text-muted-foreground'}`} />
          <h3 className="font-medium">God Mode</h3>
          <Badge 
            variant={isGodModeEnabled ? "default" : "outline"} 
            className={isGodModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
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
      
      <Switch
        checked={isGodModeEnabled}
        onCheckedChange={() => {
          console.log('Schimbare God Mode');
          toggleGodMode();
        }}
      />
    </div>
  );
};
