
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AutoEvolutionToggleProps {
  autoEvolution: boolean;
  isRunning: boolean;
  onToggle: (value: boolean) => void;
}

export const AutoEvolutionToggle = ({ 
  autoEvolution, 
  isRunning, 
  onToggle 
}: AutoEvolutionToggleProps) => {
  const { toast } = useToast();

  const handleToggle = () => {
    const newValue = !autoEvolution;
    onToggle(newValue);
    
    if (newValue) {
      toast({
        title: "Auto-evoluție activată",
        description: "Agenții vor dezvolta noi capacități independent, utilizând feedback din sistem",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <label className="text-sm font-medium">Auto-evoluție</label>
        </div>
        <p className="text-xs text-slate-500">
          Permite agenților să evolueze independent
        </p>
      </div>
      <Switch
        checked={autoEvolution}
        onCheckedChange={handleToggle}
        disabled={!isRunning}
      />
    </div>
  );
};
