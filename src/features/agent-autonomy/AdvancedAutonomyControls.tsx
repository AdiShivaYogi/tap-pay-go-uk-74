
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, Sparkles } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { AutonomyHeader } from './components/AutonomyHeader';
import { AutonomySlider } from './components/AutonomySlider';
import { AutoEvolutionToggle } from './components/AutoEvolutionToggle';
import { SelfImprovementToggle } from './components/SelfImprovementToggle';
import { SafetyLimitsToggle } from './components/SafetyLimitsToggle';
import { SafetyConfirmationAlert } from './components/SafetyConfirmationAlert';

export const AdvancedAutonomyControls = () => {
  const { 
    isRunning, 
    autonomyLevel,
    maxAutonomyAllowed,
    updateAutonomyLevel,
    enableFullAutonomy 
  } = useAutonomousEngine();
  
  const { toast } = useToast();
  
  const [autoEvolution, setAutoEvolution] = useState(false);
  const [selfImprovement, setSelfImprovement] = useState(false);
  const [safetyLimitsDisabled, setSafetyLimitsDisabled] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  
  const handleDisableSafetyLimits = () => {
    if (!safetyLimitsDisabled) {
      setConfirmationVisible(true);
    } else {
      setSafetyLimitsDisabled(false);
    }
  };
  
  const confirmDisableSafetyLimits = () => {
    setSafetyLimitsDisabled(true);
    setConfirmationVisible(false);
    toast({
      title: "Limite de siguranță dezactivate",
      description: "Agenții pot opera fără restricțiile standard de siguranță. Utilizați cu precauție.",
      variant: "destructive",
      duration: 5000,
    });
  };
  
  const activateFullAutonomy = () => {
    enableFullAutonomy();
    setAutoEvolution(true);
    setSelfImprovement(true);
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="border-b border-slate-100 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Brain className="h-5 w-5 text-purple-600" />
          Control Avansat Autonomie
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <AutonomyHeader 
          autonomyLevel={autonomyLevel} 
          isRunning={isRunning} 
        />
        
        <AutonomySlider
          autonomyLevel={autonomyLevel}
          maxAutonomyAllowed={maxAutonomyAllowed}
          isRunning={isRunning}
          onValueChange={updateAutonomyLevel}
        />
        
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <AutoEvolutionToggle
            autoEvolution={autoEvolution}
            isRunning={isRunning}
            onToggle={setAutoEvolution}
          />
          
          <SelfImprovementToggle
            selfImprovement={selfImprovement}
            isRunning={isRunning}
            onToggle={setSelfImprovement}
          />
          
          <SafetyLimitsToggle
            safetyLimitsDisabled={safetyLimitsDisabled}
            isRunning={isRunning}
            onToggle={handleDisableSafetyLimits}
          />
        </div>
        
        {confirmationVisible && (
          <SafetyConfirmationAlert
            onConfirm={confirmDisableSafetyLimits}
            onCancel={() => setConfirmationVisible(false)}
          />
        )}
        
        <div className="pt-2">
          <Button 
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700"
            onClick={activateFullAutonomy}
            disabled={!isRunning || autonomyLevel >= 100}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Activare autonomie completă (100%)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
