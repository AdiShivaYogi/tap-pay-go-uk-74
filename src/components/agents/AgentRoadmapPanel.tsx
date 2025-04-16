import React, { useState, useEffect } from 'react';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2, Play, BarChart4, PlusCircle, Brain, Sparkles, Clock, Zap, DollarSign } from "lucide-react";
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
  const [sortBy, setSortBy] = useState<string>("recommended");
  
  useEffect(() => {
    const fetchTasks = async () => {
      if (!agentId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'getAssignedTasks',
            agentId: agentId,
            includeAllAvailable: true
          }
        });
        
        if (error) throw error;
        
        const enrichedTasks = (data?.data || []).map((task: any) => ({
          ...task,
          difficulty: calculateDifficulty(task),
          costEstimate: calculateCost(task),
          recommendationScore: calculateRecommendationScore(task, agentId)
        }));
        
        setTasks(enrichedTasks);
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
    console.log(`Generare propunere task pentru agent: ${agentId}`);
    
    try {
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
      
      const titleMatch = proposalResponse.match(/Titlu:?\s*(.*?)(?:\n|$)/i);
      const descriptionMatch = proposalResponse.match(/Descriere:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const benefitsMatch = proposalResponse.match(/Beneficii:?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      const implementationMatch = proposalResponse.match(/(?:Pași tehnici|Implementare):?\s*(.*?)(?:\n\n|\n[A-Z]|$)/is);
      
      const title = titleMatch ? titleMatch[1].trim() : "Propunere nouă";
      const description = descriptionMatch ? descriptionMatch[1].trim() : proposalResponse.substring(0, 200);
      const benefits = benefitsMatch ? benefitsMatch[1].trim() : "";
      const implementation = implementationMatch ? implementationMatch[1].trim() : "";
      
      const fullDetails = `${description}\n\nBeneficii: ${benefits}\n\nImplementare: ${implementation}`;
      
      const agentToCategory = {
        'payment-agent': 'payment',
        'support-agent': 'product',
        'analytics-agent': 'monitoring',
        'security-agent': 'security',
        'ai-assistant': 'product'
      };
      
      const category = agentToCategory[agentId as keyof typeof agentToCategory] || 'product';
      
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
      
      console.log('Răspuns generare propunere:', proposalResponse);
      console.log('Rezultat trimitere propunere:', { data, error });
      
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
  
  const calculateDifficulty = (task: any): string => {
    const progressNeeded = 100 - (task.progress || 0);
    if (progressNeeded <= 20) return "Ușor";
    if (progressNeeded <= 50) return "Moderat";
    if (progressNeeded <= 80) return "Dificil";
    return "Complex";
  };
  
  const calculateCost = (task: any): string => {
    const difficulty = calculateDifficulty(task);
    switch (difficulty) {
      case "Ușor": return "Scăzut (1-2 zile)";
      case "Moderat": return "Mediu (3-5 zile)";
      case "Dificil": return "Ridicat (1-2 săptămâni)";
      case "Complex": return "Foarte ridicat (2+ săptămâni)";
      default: return "Nedeterminat";
    }
  };
  
  const calculateRecommendationScore = (task: any, agentId: string): number => {
    let score = 0;
    
    const progress = task.progress || 0;
    if (progress > 0 && progress < 80) score += 30;
    else if (progress === 0) score += 20;
    else score += 10;
    
    const agentCategory: {[key: string]: string[]} = {
      'payment-agent': ['payment', 'product'],
      'support-agent': ['product', 'localization'],
      'analytics-agent': ['monitoring', 'devops'],
      'security-agent': ['security', 'infrastructure'],
      'ai-assistant': ['product', 'ui']
    };
    
    const preferredCategories = agentCategory[agentId] || [];
    if (preferredCategories.includes(task.category?.toLowerCase())) score += 25;
    
    switch (calculateDifficulty(task)) {
      case "Ușor": score += 15; break;
      case "Moderat": score += 25; break;
      case "Dificil": score += 20; break;
      case "Complex": score += 10; break;
    }
    
    return score;
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "difficulty":
        const difficultyOrder = { "Ușor": 1, "Moderat": 2, "Dificil": 3, "Complex": 4 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      case "cost":
        const costOrder = { "Scăzut (1-2 zile)": 1, "Mediu (3-5 zile)": 2, "Ridicat (1-2 săptămâni)": 3, "Foarte ridicat (2+ săptămâni)": 4 };
        return costOrder[a.costEstimate as keyof typeof costOrder] - costOrder[b.costEstimate as keyof typeof costOrder];
      case "progress":
        return (b.progress || 0) - (a.progress || 0);
      case "recommended":
      default:
        return b.recommendationScore - a.recommendationScore;
    }
  });
  
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
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-medium">Sortează după:</span>
          <div className="flex flex-wrap gap-1">
            <Badge 
              variant={sortBy === "recommended" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSortBy("recommended")}
            >
              Recomandat
            </Badge>
            <Badge 
              variant={sortBy === "difficulty" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSortBy("difficulty")}
            >
              Dificultate
            </Badge>
            <Badge 
              variant={sortBy === "cost" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSortBy("cost")}
            >
              Cost
            </Badge>
            <Badge 
              variant={sortBy === "progress" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSortBy("progress")}
            >
              Progres
            </Badge>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : sortedTasks.length > 0 ? (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
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
                
                <div className="mt-3 grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className={`h-3.5 w-3.5 ${getDifficultyColor(task.difficulty)}`} />
                    <span>Dificultate: <span className="font-medium">{task.difficulty}</span></span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    <span>Timp: <span className="font-medium">{getTimeEstimate(task.difficulty)}</span></span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3.5 w-3.5 text-green-500" />
                    <span>Prioritate: <span className="font-medium">{getPriorityLevel(task.recommendationScore)}</span></span>
                  </div>
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

const getTaskDifficultyLabel = (progress: number): string => {
  if (progress >= 80) return "Aproape gata";
  if (progress >= 50) return "În dezvoltare";
  if (progress >= 20) return "Început";
  return "Nou";
};

const getDifficultyColor = (level: string): string => {
  switch (level) {
    case "Ușor": return "text-green-500";
    case "Moderat": return "text-blue-500";
    case "Dificil": return "text-amber-500";
    case "Complex": return "text-red-500";
    default: return "text-muted-foreground";
  }
};

const getTimeEstimate = (difficulty: string): string => {
  switch (difficulty) {
    case "Ușor": return "1-2 zile";
    case "Moderat": return "3-5 zile";
    case "Dificil": return "1-2 săpt.";
    case "Complex": return "2+ săpt.";
    default: return "Necunoscut";
  }
};

const getPriorityLevel = (score: number): string => {
  if (score >= 70) return "Înaltă";
  if (score >= 50) return "Medie";
  return "Scăzută";
};
