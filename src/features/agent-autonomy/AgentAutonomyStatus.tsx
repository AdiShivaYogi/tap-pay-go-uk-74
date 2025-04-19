
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { agents } from "@/components/agents/agents-data";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { Activity, Brain, Shield, Zap } from "lucide-react";

export const AgentAutonomyStatus = () => {
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const [sortedAgents, setSortedAgents] = useState([...agents]);
  
  // Actualizăm valorile de autonomie ale agenților în funcție de nivelul global
  useEffect(() => {
    // Folosim valorile din agents.ts ca bază, dar le ajustăm în funcție de nivelul global
    const updatedAgents = agents.map(agent => {
      // Calculăm noua valoare de autonomie păstrând ierarhia relativă între agenți
      const baseAutonomy = agent.autonomyLevel || 75;
      const autonomyAdjustmentFactor = autonomyLevel / 85; // Normalizat față de valoarea implicită de 85%
      
      // Păstrăm ordinea relativă a agenților, dar cu valorile ajustate proporțional
      let newAutonomyLevel = Math.round(baseAutonomy * autonomyAdjustmentFactor);
      
      // Asigurăm că valoarea rămâne între 0-100
      newAutonomyLevel = Math.max(0, Math.min(100, newAutonomyLevel));
      
      return {
        ...agent,
        autonomyLevel: newAutonomyLevel,
        status: isRunning ? "online" : "offline"
      };
    });
    
    // Sortăm agenții după nivelul de autonomie (descrescător)
    const sorted = [...updatedAgents].sort((a, b) => 
      (b.autonomyLevel || 0) - (a.autonomyLevel || 0)
    );
    
    setSortedAgents(sorted);
  }, [autonomyLevel, isRunning]);
  
  // Helper pentru culoarea de progress
  const getProgressColor = (level: number): string => {
    if (level >= 95) return "bg-red-500";
    if (level >= 85) return "bg-amber-500";
    if (level >= 70) return "bg-yellow-500";
    if (level >= 50) return "bg-emerald-500";
    return "bg-blue-500";
  };
  
  // Helper pentru badge-ul de status
  const getStatusBadge = (status: "online" | "offline" | "busy") => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Activ</Badge>;
      case "busy":
        return <Badge className="bg-amber-500">Ocupat</Badge>;
      case "offline":
        return <Badge className="bg-slate-400">Inactiv</Badge>;
      default:
        return <Badge className="bg-slate-400">Necunoscut</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b border-slate-100 bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Activity className="h-5 w-5 text-purple-600" />
          Status Autonomie Agenți
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {sortedAgents.map(agent => (
            <div key={agent.id} className="p-4 flex items-center space-x-4">
              <div className={`p-2 rounded-full ${isRunning ? "bg-slate-100" : "bg-slate-50"}`}>
                <agent.icon className={`h-5 w-5 ${agent.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{agent.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(agent.status)}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    {agent.relevance === "core" ? (
                      <>
                        <Shield className="h-3 w-3" /> Core
                      </>
                    ) : agent.relevance === "support" ? (
                      <>
                        <Zap className="h-3 w-3" /> Support
                      </>
                    ) : (
                      <>
                        <Brain className="h-3 w-3" /> Auxiliary
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-1/3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">
                    Autonomie: {agent.autonomyLevel || 0}%
                  </span>
                </div>
                <Progress 
                  value={agent.autonomyLevel || 0} 
                  max={100}
                  className={`h-2 ${!isRunning ? 'opacity-60' : ''}`}
                  indicatorClassName={getProgressColor(agent.autonomyLevel || 0)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
