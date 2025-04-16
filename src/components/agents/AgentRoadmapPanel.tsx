
import React, { useState, useEffect } from 'react';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2, Play, BarChart4, PlusCircle, Brain, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/types-extension"; 
import { useToast } from "@/hooks/use-toast";

interface AgentRoadmapPanelProps {
  agentId: string | null;
  onSelectTask?: (taskId: string) => Promise<boolean>;
}

export const AgentRoadmapPanel = ({ agentId, onSelectTask }: AgentRoadmapPanelProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigningTask, setAssigningTask] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  
  // Încarcă taskurile disponibile pentru agent
  useEffect(() => {
    const fetchTasks = async () => {
      if (!agentId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'getAssignedTasks',
            agentId: agentId
          }
        });
        
        if (error) throw error;
        setTasks(data?.data || []);
      } catch (err) {
        console.error('Eroare la încărcarea taskurilor:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [agentId]);
  
  const handleAssignTask = async (taskId: string) => {
    if (!onSelectTask) return;
    
    setAssigningTask(taskId);
    try {
      const success = await onSelectTask(taskId);
      if (success) {
        // Marcăm taskul ca fiind atribuit
        setTasks(tasks.map(task => 
          task.id === taskId ? {...task, assigned: true} : task
        ));
        
        toast({
          title: "Task atribuit",
          description: "Agentul a început să lucreze la acest task."
        });
      }
    } catch (err) {
      console.error('Eroare la asignarea taskului:', err);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut atribui taskul agentului."
      });
    } finally {
      setAssigningTask(null);
    }
  };
  
  const handleGenerateNewTaskProposal = async () => {
    if (!agentId) return;
    
    setIsCreatingTask(true);
    toast({
      title: "Generare propunere",
      description: "Agentul generează o propunere nouă de task...",
    });
    
    try {
      // Generează o propunere de task utilizând AI
      const { data: responseData, error: responseError } = await supabase.functions.invoke('generate-agent-response', {
        body: { 
          message: "Creează o propunere detaliată pentru un task nou de dezvoltare care ar ajuta platforma TapPayGo",
          agentId: agentId,
          agentType: getAgentTypeFromId(agentId),
          agentDescription: "Agent specializat în generarea de propuneri pentru îmbunătățirea platformei",
          isTaskProposal: true
        }
      });
      
      if (responseError) throw responseError;
      
      const proposalResponse = responseData.response;
      
      // Parsează răspunsul pentru a extrage componentele propunerii
      const titleMatch = proposalResponse.match(/Titlu:?\s*(.*?)(?:\n|$)/i);
      const descriptionMatch = proposalResponse.match(/Descriere:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const benefitsMatch = proposalResponse.match(/Beneficii:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const implementationMatch = proposalResponse.match(/(?:Pași tehnici|Implementare):?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      
      const title = titleMatch ? titleMatch[1].trim() : "Propunere nouă";
      const description = descriptionMatch ? descriptionMatch[1].trim() : proposalResponse.substring(0, 200);
      const benefits = benefitsMatch ? benefitsMatch[1].trim() : "";
      const implementation = implementationMatch ? implementationMatch[1].trim() : "";
      
      const fullDetails = `${description}\n\nBeneficii: ${benefits}\n\nImplementare: ${implementation}`;
      
      // Determină categoria potrivită pentru agent
      const agentToCategory = {
        'payment-agent': 'payment',
        'support-agent': 'product',
        'analytics-agent': 'monitoring',
        'security-agent': 'security',
        'ai-assistant': 'product'
      };
      
      const category = agentToCategory[agentId as keyof typeof agentToCategory] || 'product';
      
      // Trimite propunerea către backend
      const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
        body: { 
          action: 'proposeNewTask',
          agentId: agentId,
          taskProposal: {
            title: title,
            description: description,
            category: category,
            implementation_details: fullDetails,
            notes: "Propunere generată automat de agent"
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Propunere trimisă",
        description: "Propunerea de task a fost trimisă și așteaptă aprobarea unui administrator.",
      });
      
    } catch (err) {
      console.error('Eroare la generarea propunerii:', err);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut genera propunerea de task."
      });
    } finally {
      setIsCreatingTask(false);
    }
  };
  
  const getAgentTypeFromId = (id: string): string => {
    const agentTypes = {
      'payment-agent': 'Expert Plăți',
      'support-agent': 'Asistență Clienți',
      'analytics-agent': 'Expert Analiză Date',
      'security-agent': 'Consultant Securitate',
      'ai-assistant': 'Asistent AI General'
    };
    
    return agentTypes[id as keyof typeof agentTypes] || 'Agent AI';
  };
  
  if (!agentId) {
    return null;
  }
  
  return (
    <StyledCard className="mt-4">
      <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
        <StyledCardTitle className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          Taskuri Roadmap disponibile
        </StyledCardTitle>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleGenerateNewTaskProposal}
          disabled={isCreatingTask}
          className="flex items-center gap-1"
        >
          {isCreatingTask ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Se generează...</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Propune task nou</span>
            </>
          )}
        </Button>
      </StyledCardHeader>
      
      <StyledCardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <Badge variant={
                    task.status === "completed" ? "outline" : 
                    task.status === "inProgress" ? "secondary" : "default"
                  }>
                    {task.status === "completed" ? "Finalizat" : 
                     task.status === "inProgress" ? "În progres" : "Planificat"}
                  </Badge>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progres</span>
                    <span className="text-xs font-medium">{task.progress || 0}%</span>
                  </div>
                  <Progress value={task.progress || 0} className="h-1" />
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs bg-primary/5 border-primary/10 flex items-center gap-1">
                      <Brain className="h-3 w-3" />
                      <span>{getTaskDifficultyLabel(task.progress || 0)}</span>
                    </Badge>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant={task.assigned ? "outline" : "default"}
                    disabled={assigningTask === task.id || task.assigned}
                    onClick={() => handleAssignTask(task.id)}
                    className="flex items-center gap-1"
                  >
                    {assigningTask === task.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Se atribuie...</span>
                      </>
                    ) : task.assigned ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Atribuit</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>Atribuie</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Nu există taskuri disponibile pentru acest agent.</p>
            
            <div className="mt-4 flex justify-center">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleGenerateNewTaskProposal}
                disabled={isCreatingTask}
                className="flex items-center gap-1"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generează o propunere de task</span>
              </Button>
            </div>
          </div>
        )}
        
        <Separator className="my-4" />
        
        <div className="text-sm text-muted-foreground">
          <p>
            Atribuiți taskuri agentului pentru a-l ajuta să lucreze autonom la dezvoltarea platformei. 
            Agenții pot face progres în timp ce dumneavoastră vă odihniți.
          </p>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

// Helper pentru afișarea dificultății estimate
const getTaskDifficultyLabel = (progress: number): string => {
  if (progress >= 80) return "Aproape gata";
  if (progress >= 50) return "În dezvoltare";
  if (progress >= 20) return "Început";
  return "Nou";
};
