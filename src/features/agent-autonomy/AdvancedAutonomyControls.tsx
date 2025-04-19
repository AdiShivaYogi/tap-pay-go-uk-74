
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Shield, AlertTriangle, Brain } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { useToast } from "@/hooks/use-toast";

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
  
  const handleEnableAutoEvolution = () => {
    setAutoEvolution(prev => !prev);
    
    if (!autoEvolution) {
      toast({
        title: "Auto-evoluție activată",
        description: "Agenții vor dezvolta noi capacități independent, utilizând feedback din sistem",
      });
    }
  };
  
  const handleEnableSelfImprovement = () => {
    setSelfImprovement(prev => !prev);
    
    if (!selfImprovement) {
      toast({
        title: "Auto-îmbunătățire activată",
        description: "Agenții vor analiza propriile performanțe și vor optimiza algoritmii intern",
      });
    }
  };
  
  const handleDisableSafetyLimits = () => {
    if (!safetyLimitsDisabled) {
      setConfirmationVisible(true);
    } else {
      setSafetyLimitsDisabled(false);
      toast({
        title: "Limite de siguranță reactivate",
        description: "Sistemele de protecție sunt din nou active pentru toți agenții",
      });
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
  
  const cancelDisableSafetyLimits = () => {
    setConfirmationVisible(false);
  };
  
  const activateFullAutonomy = () => {
    enableFullAutonomy();
    setAutoEvolution(true);
    setSelfImprovement(true);
  };
  
  // Indicator pentru nivele foarte înalte de autonomie
  const getAutonomyIndicator = () => {
    if (autonomyLevel >= 95) return "Extremă";
    if (autonomyLevel >= 85) return "Foarte Ridicată";
    if (autonomyLevel >= 70) return "Ridicată";
    if (autonomyLevel >= 50) return "Moderată";
    return "Limitată";
  };
  
  // Clasa pentru badge indicator
  const getAutonomyBadgeClass = () => {
    if (autonomyLevel >= 95) return "bg-red-500";
    if (autonomyLevel >= 85) return "bg-amber-500";
    if (autonomyLevel >= 70) return "bg-yellow-500";
    if (autonomyLevel >= 50) return "bg-emerald-500";
    return "bg-blue-500";
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
        {/* Status autonomie */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Nivel autonomie:</p>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-2xl font-bold">{autonomyLevel}%</span>
              <Badge className={getAutonomyBadgeClass()}>
                {getAutonomyIndicator()}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Status:</p>
            <div className="flex items-center gap-2 justify-end mt-1">
              <span className={`h-3 w-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="font-medium">{isRunning ? 'Activ' : 'Inactiv'}</span>
            </div>
          </div>
        </div>
        
        {/* Slider autonomie */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Ajustare nivel autonomie:</label>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">
              Max: {maxAutonomyAllowed}%
            </span>
          </div>
          <Slider
            value={[autonomyLevel]}
            max={maxAutonomyAllowed}
            step={5}
            onValueChange={(value) => updateAutonomyLevel(value[0])}
            disabled={!isRunning}
            className="my-4"
          />
        </div>
        
        {/* Setări avansate */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
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
              onCheckedChange={handleEnableAutoEvolution}
              disabled={!isRunning}
            />
          </div>
          
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
              onCheckedChange={handleEnableSelfImprovement}
              disabled={!isRunning}
            />
          </div>
          
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
              onCheckedChange={handleDisableSafetyLimits}
              disabled={!isRunning}
            />
          </div>
        </div>
        
        {/* Alerte și confirmări */}
        {confirmationVisible && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Confirmare dezactivare limite siguranță</AlertTitle>
            <AlertDescription>
              <p className="mb-3">
                Dezactivarea limitelor de siguranță permite agenților să opereze fără restricții.
                Această acțiune poate avea consecințe neprevăzute. Doriți să continuați?
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={confirmDisableSafetyLimits}>
                  Confirm dezactivarea
                </Button>
                <Button variant="outline" size="sm" onClick={cancelDisableSafetyLimits}>
                  Anulează
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Buton activare autonomie completă */}
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
