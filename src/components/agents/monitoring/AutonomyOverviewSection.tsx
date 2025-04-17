
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Network, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AutonomyOverviewSectionProps {
  autonomyLevel: number;
  agentsRunning: number;
}

export const AutonomyOverviewSection = ({ 
  autonomyLevel = 80, 
  agentsRunning = 4 
}: AutonomyOverviewSectionProps) => {
  // Determinare status sistem bazat pe nivelul de autonomie
  const getSystemStatus = () => {
    if (autonomyLevel >= 75) return "Autonomie completă";
    if (autonomyLevel >= 50) return "Semi-autonom";
    if (autonomyLevel >= 25) return "Supervizat";
    return "Manual";
  };
  
  // Determinare culoare pentru badge bazat pe nivelul de autonomie
  const getBadgeVariant = () => {
    if (autonomyLevel >= 75) return "default";
    if (autonomyLevel >= 50) return "outline";
    if (autonomyLevel >= 25) return "secondary";
    return "destructive";
  };
  
  return (
    <Card className="mb-6 bg-gradient-to-br from-slate-50 to-white border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Autonomie Sistem</CardTitle>
          </div>
          <Badge variant={getBadgeVariant()}>
            {getSystemStatus()}
          </Badge>
        </div>
        <CardDescription>
          Sistemul operează la {autonomyLevel}% nivel de autonomie cu {agentsRunning} agenți activi
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-medium">Nivel Autonomie</span>
            <span className="text-primary font-semibold">{autonomyLevel}%</span>
          </div>
          <Progress value={autonomyLevel} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
            <div className="bg-blue-100 p-2 rounded-full">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Agenți Activi</div>
              <div className="text-xl font-semibold">{agentsRunning}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
            <div className="bg-green-100 p-2 rounded-full">
              <Network className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium">API-uri Conectate</div>
              <div className="text-xl font-semibold">2</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
            <div className="bg-purple-100 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Modele AI</div>
              <div className="text-xl font-semibold">Claude</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
