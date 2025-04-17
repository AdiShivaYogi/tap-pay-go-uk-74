
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Pause, Play, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";
import { AgentLearningRule } from "../../hooks/types/agent-monitoring.types";

interface LearningRuleItemProps {
  rule: AgentLearningRule;
  index: number;
  agentNames: { id: string; name: string }[];
  toggleLearningRule: (sourceId: string, targetId: string) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
}

export const LearningRuleItem: React.FC<LearningRuleItemProps> = ({
  rule,
  index,
  agentNames,
  toggleLearningRule,
  removeLearningRule
}) => {
  const sourceName = agentNames.find(a => a.id === rule.sourceAgentId)?.name || rule.sourceAgentId;
  const targetName = agentNames.find(a => a.id === rule.targetAgentId)?.name || rule.targetAgentId;
  const lastRun = rule.lastExecuted 
    ? formatDistanceToNow(rule.lastExecuted, { addSuffix: true, locale: ro }) 
    : "niciodată";
    
  return (
    <div className="p-3 border rounded-md">
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
};
