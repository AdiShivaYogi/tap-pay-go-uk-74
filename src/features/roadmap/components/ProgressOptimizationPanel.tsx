
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { StyledCard } from "@/components/ui/cards";

export const ProgressOptimizationPanel = () => {
  const [isOptimizationEnabled, setIsOptimizationEnabled] = useState(false);
  
  const handleOptimizationToggle = (enabled: boolean) => {
    setIsOptimizationEnabled(enabled);
  };

  return (
    <StyledCard className="border-primary/10">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Optimizare Progres Roadmap</h3>
            <p className="text-sm text-muted-foreground">
              Activează optimizarea automată a progresului în funcție de task-urile finalizate.
            </p>
          </div>
          <Switch
            id="optimization-toggle"
            checked={isOptimizationEnabled}
            onCheckedChange={handleOptimizationToggle}
          />
        </div>
        {isOptimizationEnabled ? (
          <Badge variant="outline">Optimizare activată</Badge>
        ) : (
          <Badge>Optimizare dezactivată</Badge>
        )}
      </div>
    </StyledCard>
  );
};
