
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgentActivitySubmit } from "./hooks/useAgentActivitySubmit";
import { Loader2, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TEST_AGENTS = [
  { id: "agent-1", name: "CodeAssistant" },
  { id: "agent-2", name: "DataAnalyst" },
  { id: "agent-3", name: "UIDesigner" },
  { id: "agent-4", name: "SecurityExpert" },
];

const ACTIVITY_CATEGORIES = [
  "task", 
  "proposal", 
  "conversation", 
  "monitoring"
];

export const TestAgentActivity: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState(TEST_AGENTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>(ACTIVITY_CATEGORIES[0]);
  const [description, setDescription] = useState("Test activity");
  const { submitAgentActivity, isSubmitting } = useAgentActivitySubmit();
  const { toast } = useToast();

  const handleSubmit = async () => {
    const agent = TEST_AGENTS.find(a => a.id === selectedAgent);
    if (!agent) return;

    const result = await submitAgentActivity({
      agentId: agent.id,
      agentName: agent.name,
      category: selectedCategory as any,
      description,
      action: "test"
    });

    if (result) {
      toast({
        title: "Activitate de test generată",
        description: `S-a înregistrat o activitate pentru agentul ${agent.name}`,
      });
    }
  };

  return (
    <Card className="p-4 bg-muted/40 border border-muted">
      <h3 className="text-sm font-medium mb-2">Generare Activitate de Test</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Generează date de test pentru a verifica funcționalitatea sistemului de monitorizare
      </p>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs mb-1 block">Agent</label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Selectează agentul" />
            </SelectTrigger>
            <SelectContent>
              {TEST_AGENTS.map(agent => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs mb-1 block">Categorie</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Selectează categoria" />
            </SelectTrigger>
            <SelectContent>
              {ACTIVITY_CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs mb-1 block">Descriere</label>
          <Input 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            className="bg-background"
            placeholder="Descrierea activității"
          />
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se generează...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Generează Activitate
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
