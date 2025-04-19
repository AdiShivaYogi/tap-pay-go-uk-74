
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { agents } from "@/components/agents/agents-data";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { Activity, Brain, Shield, Zap } from "lucide-react";
import { Agent } from "@/components/agents/agents-data";

export const AgentAutonomyStatus = () => {
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const [sortedAgents, setSortedAgents] = useState<Agent[]>([...agents]);
  
  useEffect(() => {
    const updatedAgents = agents.map(agent => ({
      ...agent,
      autonomyLevel: Math.min(100, Math.round((agent.autonomyLevel || 75) * (autonomyLevel / 85))),
      status: isRunning ? "online" as const : "offline" as const
    }));
    
    setSortedAgents(updatedAgents.sort((a, b) => (b.autonomyLevel || 0) - (a.autonomyLevel || 0)));
  }, [autonomyLevel, isRunning]);

  return (
    <Card>
      <CardHeader className="border-b border-slate-100 bg-slate-50 py-3">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
          <Activity className="h-5 w-5 text-purple-600" />
          Status Autonomie Agenți
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {sortedAgents.map(agent => (
            <div key={agent.id} className="p-3 flex items-center gap-4">
              <div className="p-1.5 rounded-full bg-slate-100">
                <agent.icon className={`h-4 w-4 ${agent.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{agent.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={agent.status === "online" ? "success" : "secondary"} className="text-xs">
                    {agent.status === "online" ? "Activ" : "Inactiv"}
                  </Badge>
                  {agent.relevance === "core" && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Shield className="h-3 w-3" /> Core
                    </span>
                  )}
                </div>
              </div>
              
              <div className="w-1/3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">
                    {agent.autonomyLevel}%
                  </span>
                </div>
                <Progress 
                  value={agent.autonomyLevel} 
                  className="h-1.5"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
