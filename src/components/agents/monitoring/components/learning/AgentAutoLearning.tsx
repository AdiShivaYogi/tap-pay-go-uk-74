
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { useAgentMonitoring } from "../../hooks";
import { useToast } from "@/hooks/use-toast";
import { LearningForm } from "./LearningForm";
import { LearningRulesList } from "./LearningRulesList";

const TEST_AGENTS = [
  { id: "agent-1", name: "CodeAssistant" },
  { id: "agent-2", name: "DataAnalyst" },
  { id: "agent-3", name: "UIDesigner" },
  { id: "agent-4", name: "SecurityExpert" },
];

const LEARNING_TYPES = [
  "Algoritmi",
  "Procesare limbaj",
  "Reguli de afaceri",
  "Răspunsuri utilizator",
  "Optimizări",
  "Concepte noi"
];

export const AgentAutoLearning = () => {
  const [sourceAgent, setSourceAgent] = useState(TEST_AGENTS[0].id);
  const [targetAgent, setTargetAgent] = useState(TEST_AGENTS[1].id);
  const [selectedLearningTypes, setSelectedLearningTypes] = useState<string[]>([LEARNING_TYPES[0]]);
  const [interval, setInterval] = useState(5);
  const { toast } = useToast();
  
  const { 
    learningRules, 
    addLearningRule, 
    removeLearningRule, 
    toggleLearningRule,
    startLearningProcess
  } = useAgentMonitoring();
  
  const handleAddRule = () => {
    if (sourceAgent === targetAgent) {
      toast({
        title: "Regulă invalidă",
        description: "Un agent nu poate învăța de la sine însuși",
        variant: "destructive"
      });
      return;
    }
    
    if (interval < 1) {
      toast({
        title: "Interval invalid",
        description: "Intervalul trebuie să fie cel puțin 1 minut",
        variant: "destructive"
      });
      return;
    }
    
    addLearningRule({
      sourceAgentId: sourceAgent,
      targetAgentId: targetAgent,
      learningTypes: selectedLearningTypes,
      interval: interval,
      isActive: true
    });
  };
  
  const handleAddLearningType = (type: string) => {
    if (!selectedLearningTypes.includes(type)) {
      setSelectedLearningTypes([...selectedLearningTypes, type]);
    }
  };
  
  const handleRemoveLearningType = (type: string) => {
    setSelectedLearningTypes(selectedLearningTypes.filter(t => t !== type));
  };

  const handleStartManualLearning = () => {
    if (sourceAgent === targetAgent) {
      toast({
        title: "Operație invalidă",
        description: "Un agent nu poate învăța de la sine însuși",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedLearningTypes.length === 0) {
      toast({
        title: "Selecție invalidă",
        description: "Selectați cel puțin un tip de învățare",
        variant: "destructive"
      });
      return;
    }
    
    // Alege un tip aleatoriu din cele selectate
    const randomType = selectedLearningTypes[Math.floor(Math.random() * selectedLearningTypes.length)];
    startLearningProcess(sourceAgent, targetAgent, randomType);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          Auto-învățare între agenți
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LearningForm
          sourceAgent={sourceAgent}
          targetAgent={targetAgent}
          interval={interval}
          selectedLearningTypes={selectedLearningTypes}
          testAgents={TEST_AGENTS}
          learningTypes={LEARNING_TYPES}
          onSourceChange={setSourceAgent}
          onTargetChange={setTargetAgent}
          onIntervalChange={setInterval}
          onAddLearningType={handleAddLearningType}
          onRemoveLearningType={handleRemoveLearningType}
          onStartManualLearning={handleStartManualLearning}
          onAddRule={handleAddRule}
        />
        
        <LearningRulesList
          learningRules={learningRules}
          testAgents={TEST_AGENTS}
          toggleLearningRule={toggleLearningRule}
          removeLearningRule={removeLearningRule}
        />
      </CardContent>
    </Card>
  );
};
