
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AgentProjectTask {
  name: string;
  completed: boolean;
}

interface AgentProject {
  title: string;
  description: string;
  status: "în progres" | "planificat" | "finalizat";
  priority: "înaltă" | "medie" | "scăzută";
  timeframe: "zile" | "săptămâni" | "luni";
  timeUsed: number;
  timeTotal: number;
  icon: React.ReactNode;
  tasks: AgentProjectTask[];
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "în progres":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planificat":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "finalizat":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`rounded-full px-3 py-0.5 ${getStatusStyles()}`}>
      {status}
    </Badge>
  );
};

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case "înaltă":
        return "bg-red-100 text-red-800 border-red-200";
      case "medie":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "scăzută":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`rounded-full px-3 py-0.5 ${getPriorityStyles()}`}>
      Prioritate {priority}
    </Badge>
  );
};

const TimeframeBadge: React.FC<{ timeframe: string }> = ({ timeframe }) => {
  return (
    <Badge variant="outline" className="rounded-full px-3 py-0.5 bg-zinc-100 text-zinc-800 border-zinc-200">
      {timeframe}
    </Badge>
  );
};

const AgentProjectCard: React.FC<{ project: AgentProject }> = ({ project }) => {
  return (
    <StyledCard className="w-full h-full">
      <StyledCardContent className="p-0">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
            </div>
            <div className="text-primary">{project.icon}</div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
            <TimeframeBadge timeframe={project.timeframe} />
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Timp utilizat</span>
              <span>{project.timeUsed}/{project.timeTotal} zile</span>
            </div>
            <Progress 
              value={(project.timeUsed / project.timeTotal) * 100} 
              className="h-2" 
            />
          </div>
          
          <ul className="space-y-2">
            {project.tasks.map((task, index) => (
              <li key={index} className="flex items-center text-sm">
                {task.completed ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <div className="h-4 w-4 mr-2 rounded-full border border-gray-300" />
                )}
                <span className={task.completed ? "" : "text-muted-foreground"}>
                  {task.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export const AgentProjectCards: React.FC = () => {
  const agentProjects: AgentProject[] = [
    {
      title: "Monitorizare Agenți",
      description: "Sistem de monitorizare în timp real pentru activitatea agenților AI",
      status: "în progres",
      priority: "înaltă",
      timeframe: "săptămâni",
      timeUsed: 15,
      timeTotal: 25,
      icon: <span className="text-xl">📊</span>,
      tasks: [
        { name: "Dashboard activitate în timp real", completed: true },
        { name: "Grafice de performanță și activitate", completed: true },
        { name: "Filtrare și căutare avansată", completed: false },
        { name: "Notificări și alerte automate", completed: false },
        { name: "Exportare rapoarte detaliate", completed: false },
      ]
    },
    {
      title: "Sistem de Feedback Agenți",
      description: "Mecanisme de evaluare și îmbunătățire continuă pentru agenții AI",
      status: "în progres",
      priority: "înaltă",
      timeframe: "zile",
      timeUsed: 12,
      timeTotal: 20,
      icon: <span className="text-xl">🔄</span>,
      tasks: [
        { name: "Evaluare automată a răspunsurilor", completed: true },
        { name: "Colectare feedback utilizator", completed: true },
        { name: "Implementare sistem de rating", completed: false },
        { name: "Rapoarte de îmbunătățire", completed: false }
      ]
    },
    {
      title: "Integrare GPT și Claude",
      description: "Extinderea capabilităților prin integrarea modelelor AI avansate",
      status: "planificat",
      priority: "înaltă",
      timeframe: "săptămâni",
      timeUsed: 0,
      timeTotal: 18,
      icon: <span className="text-xl">🤖</span>,
      tasks: [
        { name: "Configurare API OpenAI și Anthropic", completed: false },
        { name: "Sistem de rutare inteligentă între modele", completed: false },
        { name: "Optimizare prompts și contexte", completed: false },
        { name: "Mecanisme de fallback și recuperare", completed: false }
      ]
    },
    {
      title: "Dezvoltare Agenți Specializați",
      description: "Crearea de agenți personalizați pentru diverse domenii de expertiză",
      status: "planificat",
      priority: "medie",
      timeframe: "luni",
      timeUsed: 0,
      timeTotal: 45,
      icon: <span className="text-xl">👨‍💼</span>,
      tasks: [
        { name: "Agent expert în securitate cibernetică", completed: false },
        { name: "Agent pentru optimizare SEO", completed: false },
        { name: "Agent pentru asistență juridică", completed: false },
        { name: "Agent pentru analiză financiară", completed: false }
      ]
    },
    {
      title: "Sistem de Training Agenți",
      description: "Platformă pentru antrenarea și îmbunătățirea continuă a agenților",
      status: "planificat",
      priority: "scăzută",
      timeframe: "luni",
      timeUsed: 0,
      timeTotal: 30,
      icon: <span className="text-xl">🎓</span>,
      tasks: [
        { name: "Infrastructură de fine-tuning", completed: false },
        { name: "Set de date de antrenament specializat", completed: false },
        { name: "Metrici de evaluare automată", completed: false },
        { name: "Pipeline de îmbunătățire continuă", completed: false }
      ]
    }
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {agentProjects.map((project, index) => (
        <AgentProjectCard key={index} project={project} />
      ))}
    </div>
  );
};
