
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SelfImprovementToggleProps {
  selfImprovement: boolean;
  isRunning: boolean;
  onToggle: (value: boolean) => void;
}

export const SelfImprovementToggle = ({ 
  selfImprovement, 
  isRunning, 
  onToggle 
}: SelfImprovementToggleProps) => {
  const { toast } = useToast();

  const handleToggle = () => {
    const newValue = !selfImprovement;
    onToggle(newValue);
    
    if (newValue) {
      toast({
        title: "Auto-îmbunătățire activată",
        description: "Agenții își vor optimiza algoritmii în timp real",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-amber-600" />
          <label className="text-sm font-medium">Auto-îmbunătățire</label>
        </div>
        <p className="text-xs text-slate-500">
          Agenții își optimizează algoritmii în timp real
        </p>
      </div>
      <Switch
        checked={selfImprovement}
        onCheckedChange={handleToggle}
        disabled={!isRunning}
      />
    </div>
  );
};
