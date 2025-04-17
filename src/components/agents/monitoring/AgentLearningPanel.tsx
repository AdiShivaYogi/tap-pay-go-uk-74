
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Share2, PlusCircle } from "lucide-react";
import { useAgentMonitoring } from "./hooks";
import { useToast } from "@/hooks/use-toast";
import { AgentSelector } from "./learning/AgentSelector";
import { LearningTypeSelect } from "./learning/LearningTypeSelect";
import { RecentInteractions } from "./learning/RecentInteractions";
import { TEST_AGENTS, LEARNING_TYPES } from "./learning/constants";

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
          <AgentSelector 
            label="Agent care învață"
            value={sourceAgent}
            onValueChange={setSourceAgent}
            agents={TEST_AGENTS}
          />
          
          <div className="flex items-center justify-center">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <AgentSelector 
            label="Agent care transmite cunoștințe"
            value={targetAgent}
            onValueChange={setTargetAgent}
            agents={TEST_AGENTS}
          />
          
          <LearningTypeSelect
            value={learningType}
            onValueChange={setLearningType}
            learningTypes={LEARNING_TYPES}
          />
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
        
        <RecentInteractions interactions={recentInteractions} />
      </CardContent>
    </Card>
  );
};
