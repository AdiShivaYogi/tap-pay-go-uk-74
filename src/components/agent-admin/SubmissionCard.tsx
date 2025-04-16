
import React from "react";
import { StyledCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, CalendarClock, MessagesSquare, CheckCircle2, AlertTriangle, Brain, Zap } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Separator } from "@/components/ui/separator";

interface SubmissionCardProps {
  submission: any;
  onApprove: (submissionId: string) => Promise<void>;
  onReject: (submissionId: string) => Promise<void>;
  onGenerateFeedback?: (type: "submission", item: any) => Promise<void>;
}

export const SubmissionCard = ({ submission, onApprove, onReject, onGenerateFeedback }: SubmissionCardProps) => {
  const createdDate = new Date(submission.created_at).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const createdTime = new Date(submission.created_at).toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculăm nivelul estimat de dificultate bazat pe procentul de progres
  const difficultyLevel = getDifficultyLevel(submission.proposed_progress - (submission.roadmap_tasks?.progress || 0));
  const estimatedCost = getEstimatedCost(difficultyLevel);
  
  return (
    <StyledCard key={submission.id} className="border-primary/10">
      <div className="p-4">
        {/* Header cu informații de bază */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{submission.roadmap_tasks?.title}</h3>
            <p className="text-sm text-muted-foreground">{submission.roadmap_tasks?.description}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status={submission.roadmap_tasks?.status} />
              <ChevronRight className="h-4 w-4" />
              <StatusBadge status={submission.proposed_status} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarClock className="h-3 w-3 mr-1" />
              <span>{createdDate}, {createdTime}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        {/* Secțiunea de progres */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Badge variant="outline" className="bg-primary/5">
              Categoria: {submission.roadmap_tasks?.category}
            </Badge>
            <div className="flex items-center gap-1">
              <span className="text-sm">Progres actual:</span>
              <span className="text-sm font-medium">{submission.roadmap_tasks?.progress || 0}%</span>
              <span className="text-sm mx-1">→</span>
              <span className="text-sm font-medium text-primary">{submission.proposed_progress}%</span>
            </div>
          </div>
          
          <div className="relative h-2 mt-2">
            <Progress value={submission.roadmap_tasks?.progress || 0} className="h-2" />
            <div 
              className="absolute top-0 h-2 bg-primary/30" 
              style={{ 
                width: `${submission.proposed_progress - (submission.roadmap_tasks?.progress || 0)}%`,
                left: `${submission.roadmap_tasks?.progress || 0}%` 
              }}
            ></div>
          </div>
        </div>
        
        {/* Informații despre dificultate și cost */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-md border border-muted-foreground/10">
            <div className="flex items-center gap-2 mb-1">
              <Zap className={`h-4 w-4 ${getDifficultyColor(difficultyLevel)}`} />
              <h4 className="font-medium text-sm">Dificultate estimată:</h4>
            </div>
            <p className="text-sm font-medium">{difficultyLevel}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-md border border-muted-foreground/10">
            <div className="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-500">
                <circle cx="12" cy="12" r="8"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="8"></line>
              </svg>
              <h4 className="font-medium text-sm">Cost estimat:</h4>
            </div>
            <p className="text-sm font-medium">{estimatedCost}</p>
          </div>
        </div>
        
        {/* Secțiunea de modificări propuse */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessagesSquare className="h-4 w-4 text-primary/70" />
            <h4 className="font-medium text-sm">Modificări propuse:</h4>
          </div>
          <div className="p-3 bg-muted rounded-md border border-muted-foreground/10">
            <p className="text-sm whitespace-pre-line">{submission.proposed_changes}</p>
          </div>
        </div>
        
        {/* Secțiunea de impact și beneficii (dacă există note) */}
        {submission.notes && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-primary/70" />
              <h4 className="font-medium text-sm">Impact și beneficii:</h4>
            </div>
            <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
              <p className="text-sm italic">{submission.notes}</p>
            </div>
          </div>
        )}
        
        {/* Secțiunea de avertisment (opțional, în funcție de tipul schimbării) */}
        {submission.proposed_status === 'completed' && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Această propunere va marca task-ul ca fiind complet finalizat.
            </p>
          </div>
        )}
        
        {/* Secțiunea de ordine logică */}
        <div className="mb-4 p-3 bg-blue-50/50 rounded-md border border-blue-200/50">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-500">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M7 8h10"></path>
              <path d="M7 12h10"></path>
              <path d="M7 16h10"></path>
            </svg>
            <h4 className="font-medium text-sm">Ordine logică de implementare:</h4>
          </div>
          <p className="text-sm">
            {getImplementationOrder(submission.roadmap_tasks?.category, submission.proposed_status)}
          </p>
        </div>
        
        {/* Secțiunea de acțiuni */}
        <div className="mt-4 flex justify-end gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReject(submission.id)}
          >
            Respinge
          </Button>
          
          {onGenerateFeedback && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => onGenerateFeedback("submission", submission)}
            >
              <Brain className="h-4 w-4" />
              Generează feedback
            </Button>
          )}
          
          <Button 
            size="sm"
            onClick={() => onApprove(submission.id)}
          >
            Aprobă
          </Button>
        </div>
      </div>
    </StyledCard>
  );
};

// Funcții helper pentru estimarea dificultății și costului
const getDifficultyLevel = (progressDelta: number): string => {
  if (progressDelta <= 10) return "Ușor";
  if (progressDelta <= 30) return "Moderat";
  if (progressDelta <= 50) return "Dificil";
  return "Complex";
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

const getEstimatedCost = (level: string): string => {
  switch (level) {
    case "Ușor": return "Scăzut (1-2 zile)";
    case "Moderat": return "Mediu (3-5 zile)";
    case "Dificil": return "Ridicat (1-2 săptămâni)";
    case "Complex": return "Foarte ridicat (2+ săptămâni)";
    default: return "Nedeterminat";
  }
};

const getImplementationOrder = (category: string, status: string): string => {
  if (!category) return "Acest task nu are o categorie specificată pentru a determina ordinea logică.";
  
  const categoryOrder: Record<string, string[]> = {
    "security": ["Analiză de securitate", "Implementare măsuri de bază", "Testare", "Monitorizare continuă"],
    "payment": ["Integrare API", "Implementare UI plăți", "Testare tranzacții", "Optimizare performanță"],
    "product": ["Definire funcționalitate", "Prototipare", "Implementare", "Testare utilizator"],
    "monitoring": ["Configurare metrici", "Implementare dashboard", "Setare alerte", "Optimizare"],
    "devops": ["Setup infrastructură", "Automatizare CI/CD", "Monitorizare", "Optimizare performanță"],
  };
  
  const baseOrder = categoryOrder[category.toLowerCase()] || [
    "Analiză cerințe", 
    "Design", 
    "Implementare", 
    "Testare", 
    "Lansare"
  ];
  
  // Determinăm la ce pas suntem bazat pe status și progress
  let currentStep = 1;
  if (status === "inProgress") currentStep = 2;
  if (status === "completed") currentStep = baseOrder.length;
  
  return (
    <>
      {baseOrder.map((step, index) => (
        <div key={index} className={`flex items-center gap-1 ${index < currentStep ? "font-medium" : "text-muted-foreground"}`}>
          <span className={`inline-block w-5 h-5 rounded-full text-xs flex items-center justify-center mr-1 ${
            index < currentStep ? "bg-primary text-white" : "bg-muted-foreground/20 text-muted-foreground"
          }`}>{index + 1}</span>
          {step}
          {index < currentStep - 1 && " ✓"}
        </div>
      ))}
    </>
  );
};

