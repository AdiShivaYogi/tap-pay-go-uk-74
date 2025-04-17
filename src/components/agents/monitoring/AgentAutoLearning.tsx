
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Clock, Play, Pause, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAgentMonitoring } from "./hooks";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";

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
    toggleLearningRule 
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          Auto-învățare între agenți
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="source-agent" className="mb-1 block">Agent care învață</Label>
            <Select value={sourceAgent} onValueChange={setSourceAgent}>
              <SelectTrigger className="w-full" id="source-agent">
                <SelectValue placeholder="Selectează agentul" />
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
          
          <div>
            <Label htmlFor="target-agent" className="mb-1 block">Agent sursă de cunoștințe</Label>
            <Select value={targetAgent} onValueChange={setTargetAgent}>
              <SelectTrigger className="w-full" id="target-agent">
                <SelectValue placeholder="Selectează agentul" />
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
            <Label htmlFor="interval" className="mb-1 block">Interval (minute)</Label>
            <Input
              id="interval"
              type="number"
              min={1}
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Tipuri de învățare</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedLearningTypes.map(type => (
              <Badge 
                key={type} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {type}
                <button 
                  onClick={() => handleRemoveLearningType(type)}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          
          <Select onValueChange={handleAddLearningType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Adaugă tip de învățare" />
            </SelectTrigger>
            <SelectContent>
              {LEARNING_TYPES.filter(type => !selectedLearningTypes.includes(type)).map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAddRule}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Adaugă regulă de auto-învățare
          </Button>
        </div>
        
        {learningRules.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Reguli de auto-învățare active:</h3>
              <div className="space-y-2">
                {learningRules.map((rule, index) => {
                  const sourceName = TEST_AGENTS.find(a => a.id === rule.sourceAgentId)?.name;
                  const targetName = TEST_AGENTS.find(a => a.id === rule.targetAgentId)?.name;
                  const lastRun = rule.lastExecuted ? formatDistanceToNow(rule.lastExecuted, { addSuffix: true, locale: ro }) : "niciodată";
                  
                  return (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{sourceName} → {targetName}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 
                            La fiecare {rule.interval} minute • Ultima execuție: {lastRun}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLearningRule(rule.sourceAgentId, rule.targetAgentId)}
                          >
                            {rule.isActive ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeLearningRule(rule.sourceAgentId, rule.targetAgentId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rule.learningTypes.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <Switch
                          id={`rule-${index}`}
                          checked={rule.isActive}
                          onCheckedChange={() => toggleLearningRule(rule.sourceAgentId, rule.targetAgentId)}
                          className="mr-2"
                        />
                        <Label htmlFor={`rule-${index}`} className="text-xs">
                          {rule.isActive ? "Activ" : "Inactiv"}
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
