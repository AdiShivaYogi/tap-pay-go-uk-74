
import React from 'react';
import { 
  Flame, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Award
} from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/styled-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const CurrentRoadmapFocus = () => {
  const currentTasks = [
    {
      title: "Integrare UK & Stripe",
      description: "Finalizare API pentru procesarea plăților pentru piața UK",
      progress: 68,
      priority: "high",
      daysLeft: 5,
      subtasks: [
        { name: "Documentație API Gateway", completed: true },
        { name: "Verificare conformitate GDPR", completed: true },
        { name: "Testare integrare Stripe", completed: false },
        { name: "Finalizare platformă administrativă", completed: false }
      ]
    },
    {
      title: "Refactorizare componente UI",
      description: "Îmbunătățirea structurii și performanței componentelor React",
      progress: 45,
      priority: "medium",
      daysLeft: 7,
      subtasks: [
        { name: "Separare componente mari în componente mai mici", completed: true },
        { name: "Optimizare rendering", completed: false },
        { name: "Implementare design unitar", completed: false },
        { name: "Testare compatibilitate cross-browser", completed: false }
      ]
    }
  ];

  const upcomingFocus = [
    {
      title: "Lansare Beta pentru parteneri selectați",
      timeframe: "Următoarele 14 zile",
      priority: "high"
    },
    {
      title: "Implementare flux complet pentru UK",
      timeframe: "Următoarele 30 zile",
      priority: "high"
    },
    {
      title: "Optimizări de performanță pentru dashboard",
      timeframe: "Următoarele 45 zile",
      priority: "medium"
    }
  ];
  
  // Adăugăm realizările recente
  const recentAchievements = [
    {
      title: "Integrare completă API Stripe",
      date: "10 Apr 2025",
      description: "Sistemul de procesare plăți este acum integrat cu API-ul Stripe"
    },
    {
      title: "Certificare GDPR pentru piața UK",
      date: "5 Apr 2025",
      description: "Am obținut certificarea pentru conformitatea cu reglementările GDPR în UK"
    },
    {
      title: "Refactorizare componentă autentificare",
      date: "1 Apr 2025",
      description: "Componentă de autentificare separată în componente mai mici și mai reutilizabile"
    }
  ];

  return (
    <StyledCard className="border-primary/10 bg-gradient-to-br from-primary/5 to-accent/10">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Focus Curent și Priorități
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent className="space-y-6">
        {/* Recent Achievements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            <span>Realizări Recente</span>
          </h3>
          
          <div className="grid gap-4 md:grid-cols-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{achievement.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-auto">
                  <Calendar className="h-3 w-3" />
                  <span>{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      
        {/* Current Focus */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>În lucru acum</span>
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {currentTasks.map((task, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/60 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{task.title}</h4>
                  <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                    {task.priority === "high" ? "Prioritate înaltă" : "Prioritate medie"}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progres</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
                
                <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>{task.daysLeft} zile rămase</span>
                </div>
                
                <div className="mt-3 space-y-1">
                  {task.subtasks.map((subtask, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className={cn(
                        "w-3 h-3 rounded-full flex items-center justify-center",
                        subtask.completed ? "bg-green-500" : "bg-gray-200"
                      )}>
                        {subtask.completed && (
                          <CheckCircle2 className="h-2 w-2 text-white" />
                        )}
                      </span>
                      <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                        {subtask.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Priorities */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Următoarele priorități</span>
          </h3>
          
          <div className="grid gap-3">
            {upcomingFocus.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex justify-between items-center p-3 rounded-md",
                  item.priority === "high" 
                    ? "bg-red-50 border border-red-100" 
                    : "bg-blue-50 border border-blue-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpRight className={cn(
                    "h-4 w-4",
                    item.priority === "high" ? "text-red-500" : "text-blue-500"
                  )} />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.timeframe}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
