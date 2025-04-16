
import React, { useState, useEffect } from 'react';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2, Play, BarChart4 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface AgentRoadmapPanelProps {
  agentId: string | null;
  onSelectTask?: (taskId: string) => Promise<boolean>;
}

export const AgentRoadmapPanel = ({ agentId, onSelectTask }: AgentRoadmapPanelProps) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigningTask, setAssigningTask] = useState<string | null>(null);
  
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
      }
    } catch (err) {
      console.error('Eroare la asignarea taskului:', err);
    } finally {
      setAssigningTask(null);
    }
  };
  
  if (!agentId) {
    return null;
  }
  
  return (
    <StyledCard className="mt-4">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          Taskuri Roadmap disponibile
        </StyledCardTitle>
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
                
                <div className="mt-3 flex justify-end">
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
