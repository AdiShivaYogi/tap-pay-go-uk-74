
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SafetyLimitsToggleProps {
  safetyLimitsDisabled: boolean;
  isRunning: boolean;
  onToggle: () => void;
}

export const SafetyLimitsToggle = ({ 
  safetyLimitsDisabled, 
  isRunning, 
  onToggle 
}: SafetyLimitsToggleProps) => {
  const { toast } = useToast();

  const handleToggle = () => {
    if (safetyLimitsDisabled) {
      toast({
        title: "Limite de siguranță reactivate",
        description: "Sistemele de protecție sunt din nou active pentru toți agenții",
      });
    }
    onToggle();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <Shield className={`h-4 w-4 ${safetyLimitsDisabled ? 'text-red-600' : 'text-emerald-600'}`} />
          <label className="text-sm font-medium">Limite de siguranță</label>
        </div>
        <p className="text-xs text-slate-500">
          Sistemele de protecție pentru agenții autonomi
        </p>
      </div>
      <Switch
        checked={!safetyLimitsDisabled}
        onCheckedChange={handleToggle}
        disabled={!isRunning}
      />
    </div>
  );
};
