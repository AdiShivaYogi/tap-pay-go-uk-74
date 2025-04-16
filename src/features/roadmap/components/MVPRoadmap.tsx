
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { mvpRoadmapText } from "../data/mvp-roadmap"; 
import { StyledCard } from "@/components/ui/cards";
import { TimeEstimationBadge } from "./TimeEstimationBadge";
import { Status } from "../types";

export const MVPRoadmap = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  // Filtrare bazată pe status
  const filteredItems = selectedFilter 
    ? mvpRoadmapText.filter(item => item.status === selectedFilter)
    : mvpRoadmapText;
  
  // Calculare progres general
  const overallProgress = Math.round(
    mvpRoadmapText.reduce((acc, item) => acc + item.progress, 0) / mvpRoadmapText.length
  );
  
  // Componenta de badge pentru status
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex gap-1 items-center">
            <CheckCircle2 className="h-3 w-3" />
            <span>Finalizat</span>
          </Badge>
        );
      case "inProgress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex gap-1 items-center">
            <Clock className="h-3 w-3" />
            <span>În progres</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex gap-1 items-center">
            <AlertCircle className="h-3 w-3" />
            <span>Planificat</span>
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-8">
      <StyledCard className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">MVP Roadmap</h2>
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              {overallProgress}% Completat
            </Badge>
          </div>
          
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge 
            variant={selectedFilter === null ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setSelectedFilter(null)}
          >
            Toate
          </Badge>
          <Badge 
            variant={selectedFilter === "completed" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedFilter("completed" as Status)}
          >
            Finalizat
          </Badge>
          <Badge 
            variant={selectedFilter === "inProgress" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setSelectedFilter("inProgress" as Status)}
          >
            În progres
          </Badge>
          <Badge 
            variant={selectedFilter === "planned" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setSelectedFilter("planned" as Status)}
          >
            Planificat
          </Badge>
        </div>
      </StyledCard>
      
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <StyledCard key={item.id} className="p-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{item.title}</h3>
                <StatusBadge status={item.status} />
              </div>
              
              <p className="text-sm text-muted-foreground">{item.description}</p>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1">
                  <TimeEstimationBadge timeEstimate={
                    item.progress === 100 ? "days" : 
                    item.progress >= 50 ? "weeks" : "months"
                  } />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  <Progress value={item.progress} className="w-24 h-2" />
                </div>
              </div>
            </div>
          </StyledCard>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Nu există elemente care să corespundă filtrului.</p>
          </div>
        )}
      </div>
    </div>
  );
};
