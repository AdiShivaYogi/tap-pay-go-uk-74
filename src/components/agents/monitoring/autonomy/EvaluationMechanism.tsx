
import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { LineChart, AlertTriangle, ArrowUpCircle, ArrowDownCircle, BarChart4 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAgentMonitoring } from "../hooks";

export const EvaluationMechanism: React.FC = () => {
  const { toast } = useToast();
  const { activityData } = useAgentMonitoring();
  const [evaluationMetrics, setEvaluationMetrics] = useState([
    { name: "Eficiență decizională", score: 87, trend: "up", risk: "scăzut" },
    { name: "Consum resurse", score: 64, trend: "up", risk: "mediu" },
    { name: "Acuratețe predicții", score: 92, trend: "up", risk: "scăzut" },
    { name: "Rata de autonomie", score: 75, trend: "stable", risk: "scăzut" }
  ]);
  const [lastEvaluation, setLastEvaluation] = useState(new Date());
  const [evaluationInProgress, setEvaluationInProgress] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);

  // Generăm metrici bazate pe activitatea agenților
  useEffect(() => {
    if (activityData.length > 0) {
      // Calculăm scorurile în funcție de activitatea agenților
      const autonomyActivities = activityData.filter(data => 
        data.category === "autonomy" || data.category === "learning"
      ).length;
      
      // Actualizăm scorurile dacă avem activitate
      if (autonomyActivities > 0) {
        setEvaluationMetrics(prev => {
          const updatedMetrics = [...prev];
          // Ajustăm scorul pentru rata de autonomie
          updatedMetrics[3] = {
            ...updatedMetrics[3],
            score: Math.min(95, updatedMetrics[3].score + 5),
            trend: "up"
          };
          return updatedMetrics;
        });
      }
    }
  }, [activityData]);

  // Simulăm o evaluare
  const triggerEvaluation = () => {
    if (evaluationInProgress) return;
    
    setEvaluationInProgress(true);
    setEvaluationProgress(0);
    
    toast({
      title: "Evaluare autonomă inițiată",
      description: "Sistemul a început procesul de auto-evaluare a agenților",
      duration: 3000,
    });
    
    // Simulăm progresul evaluării
    const interval = setInterval(() => {
      setEvaluationProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          completeEvaluation();
          return 100;
        }
        return newProgress;
      });
    }, 800);
  };

  // Finalizăm evaluarea cu rezultate actualizate
  const completeEvaluation = () => {
    // Updatăm metricile cu valori noi
    setEvaluationMetrics(prev => prev.map(metric => {
      const variation = Math.floor(Math.random() * 10) - 3; // între -3 și +6
      const newScore = Math.min(99, Math.max(50, metric.score + variation));
      const newTrend = newScore > metric.score ? "up" : newScore < metric.score ? "down" : "stable";
      const newRisk = newScore > 85 ? "scăzut" : newScore > 65 ? "mediu" : "ridicat";
      
      return {
        ...metric,
        score: newScore,
        trend: newTrend,
        risk: newRisk
      };
    }));
    
    setLastEvaluation(new Date());
    setEvaluationInProgress(false);
    
    toast({
      title: "Evaluare autonomă finalizată",
      description: "Rezultatele evaluării au fost actualizate",
      duration: 3000,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "scăzut": return "text-green-600 bg-green-50 border-green-200";
      case "mediu": return "text-amber-600 bg-amber-50 border-amber-200";
      case "ridicat": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case "down": return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      default: return <BarChart4 className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <StyledCard>
      <StyledCardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <StyledCardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-indigo-500" />
            Mecanism de Evaluare Autonomă
          </StyledCardTitle>
          <button 
            className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2.5 py-1 rounded-md transition-colors"
            onClick={triggerEvaluation}
            disabled={evaluationInProgress}
          >
            {evaluationInProgress ? "Evaluare în curs..." : "Inițiază evaluare"}
          </button>
        </div>
      </StyledCardHeader>
      
      <StyledCardContent className="pt-2">
        {evaluationInProgress ? (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Evaluare în curs...</span>
              <span className="font-medium">{Math.round(evaluationProgress)}%</span>
            </div>
            <Progress value={evaluationProgress} className="h-2" />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mb-4">
            Sistemul de evaluare autonomă măsoară continuu performanța și eficiența agenților, 
            ajustând parametrii pentru îmbunătățirea continuă.
          </div>
        )}
        
        <div className="space-y-4 mt-4">
          {evaluationMetrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-sm">{metric.name}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <Badge 
                  variant="outline"
                  className={getRiskColor(metric.risk)}
                >
                  {metric.risk}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={metric.score} className="h-1.5 flex-grow" />
                <span className="text-sm font-medium w-7 text-right">{metric.score}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 border-t pt-3 text-xs text-muted-foreground">
          <div>
            Ultima evaluare: {lastEvaluation.toLocaleDateString("ro-RO", { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            Următoarea evaluare automată: {new Date(lastEvaluation.getTime() + 3600000).toLocaleTimeString("ro-RO", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
