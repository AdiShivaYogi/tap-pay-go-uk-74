
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Share2, PlusCircle } from "lucide-react";
import { useAgentMonitoring } from "./hooks";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const LEARNING_TYPES = [
  "Algoritmi",
  "Procesare limbaj",
  "Reguli de afaceri",
  "Răspunsuri utilizator",
  "Optimizări",
  "Concepte noi"
];

const TEST_AGENTS = [
  { id: "agent-1", name: "CodeAssistant" },
  { id: "agent-2", name: "DataAnalyst" },
  { id: "agent-3", name: "UIDesigner" },
  { id: "agent-4", name: "SecurityExpert" },
];

export const AgentLearningPanel = () => {
  const [sourceAgent, setSourceAgent] = useState(TEST_AGENTS[0].id);
  const [targetAgent, setTargetAgent] = useState(TEST_AGENTS[1].id);
  const [learningType, setLearningType] = useState(LEARNING_TYPES[0]);
  const [recentInteractions, setRecentInteractions] = useState<any[]>([]);
  
  const { logAgentInteraction } = useAgentMonitoring();
  const { toast } = useToast();

  const handleCreateLearningInteraction = () => {
    // Evităm ca un agent să învețe de la el însuși
    if (sourceAgent === targetAgent) {
      toast({
        title: "Interacțiune invalidă",
        description: "Un agent nu poate învăța de la sine însuși.",
        variant: "destructive"
      });
      return;
    }

    const sourceName = TEST_AGENTS.find(a => a.id === sourceAgent)?.name;
    const targetName = TEST_AGENTS.find(a => a.id === targetAgent)?.name;
    
    const interaction = logAgentInteraction(sourceAgent, targetAgent, learningType);
    
    // Adăugăm numele agenților pentru afișare
    const interactionWithNames = {
      ...interaction,
      sourceName,
      targetName
    };
    
    setRecentInteractions(prev => [interactionWithNames, ...prev].slice(0, 5));
    
    toast({
      title: "Interacțiune de învățare înregistrată",
      description: `${sourceName} învață despre ${learningType} de la ${targetName}`,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" /> 
          Interacțiuni de învățare între agenți
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-xs mb-1 block">Agent care învață</label>
            <Select value={sourceAgent} onValueChange={setSourceAgent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectează agentul"/>
              </SelectTrigger>
              <SelectContent>
                {TEST_AGENTS.map(agent => (
                  <SelectItem key={`source-${agent.id}`} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div>
            <label className="text-xs mb-1 block">Agent care transmite cunoștințe</label>
            <Select value={targetAgent} onValueChange={setTargetAgent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectează agentul"/>
              </SelectTrigger>
              <SelectContent>
                {TEST_AGENTS.map(agent => (
                  <SelectItem key={`target-${agent.id}`} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs mb-1 block">Tip de învățare</label>
            <Select value={learningType} onValueChange={setLearningType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectează tipul"/>
              </SelectTrigger>
              <SelectContent>
                {LEARNING_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleCreateLearningInteraction}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Înregistrează interacțiune
          </Button>
        </div>
        
        {recentInteractions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Interacțiuni recente:</h3>
            <div className="space-y-2">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="p-2 border rounded text-sm flex items-center">
                  <span className="font-medium">{interaction.sourceName}</span>
                  <span className="mx-2">învață de la</span>
                  <span className="font-medium">{interaction.targetName}</span>
                  <Badge variant="outline" className="ml-auto">
                    {interaction.learningType}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
