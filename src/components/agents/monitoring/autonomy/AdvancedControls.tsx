
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Brain, Shield, Zap } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { Badge } from "@/components/ui/badge";

export const AdvancedControls = () => {
  const { autonomyLevel, updateAutonomyLevel, isRunning } = useAutonomousEngine();

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-4 w-4 text-purple-600" />
          Control Avansat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Nivel autonomie curent
          </span>
          <Badge
            className={`${
              autonomyLevel >= 95
                ? 'bg-red-100 text-red-700'
                : autonomyLevel >= 75
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {autonomyLevel}%
          </Badge>
        </div>

        <Slider
          value={[autonomyLevel]}
          max={100}
          step={5}
          className="my-4"
          onValueChange={(value) => updateAutonomyLevel(value[0])}
          disabled={!isRunning}
        />

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-slate-600">
              {autonomyLevel < 50 ? 'Mod sigur activ' : 'Mod avansat activ'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-slate-600">
              Auto-evoluție {autonomyLevel >= 75 ? 'activată' : 'dezactivată'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
