
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Plus } from "lucide-react";
import { LearningTypeSelector } from "./LearningTypeSelector";

interface LearningFormProps {
  sourceAgent: string;
  targetAgent: string;
  interval: number;
  selectedLearningTypes: string[];
  testAgents: { id: string; name: string }[];
  learningTypes: string[];
  onSourceChange: (value: string) => void;
  onTargetChange: (value: string) => void;
  onIntervalChange: (value: number) => void;
  onAddLearningType: (type: string) => void;
  onRemoveLearningType: (type: string) => void;
  onStartManualLearning: () => void;
  onAddRule: () => void;
}

export const LearningForm: React.FC<LearningFormProps> = ({
  sourceAgent,
  targetAgent,
  interval,
  selectedLearningTypes,
  testAgents,
  learningTypes,
  onSourceChange,
  onTargetChange,
  onIntervalChange,
  onAddLearningType,
  onRemoveLearningType,
  onStartManualLearning,
  onAddRule
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="source-agent" className="mb-1 block">Agent care învață</Label>
          <Select value={sourceAgent} onValueChange={onSourceChange}>
            <SelectTrigger className="w-full" id="source-agent">
              <SelectValue placeholder="Selectează agentul" />
            </SelectTrigger>
            <SelectContent>
              {testAgents.map(agent => (
                <SelectItem key={`source-${agent.id}`} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="target-agent" className="mb-1 block">Agent sursă de cunoștințe</Label>
          <Select value={targetAgent} onValueChange={onTargetChange}>
            <SelectTrigger className="w-full" id="target-agent">
              <SelectValue placeholder="Selectează agentul" />
            </SelectTrigger>
            <SelectContent>
              {testAgents.map(agent => (
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
            onChange={(e) => onIntervalChange(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">Tipuri de învățare</Label>
        <LearningTypeSelector
          selectedTypes={selectedLearningTypes}
          availableTypes={learningTypes}
          onAddType={onAddLearningType}
          onRemoveType={onRemoveLearningType}
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="secondary"
          onClick={onStartManualLearning}
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Pornește învățare acum
        </Button>
        
        <Button 
          onClick={onAddRule}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adaugă regulă de auto-învățare
        </Button>
      </div>
    </div>
  );
};
