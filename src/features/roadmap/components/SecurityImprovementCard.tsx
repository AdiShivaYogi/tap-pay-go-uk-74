
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle2, Clock, Lock, ServerCog } from "lucide-react";
import { RoadmapItem } from "../types";

interface SecurityImprovementCardProps {
  item: RoadmapItem;
}

export const SecurityImprovementCard: React.FC<SecurityImprovementCardProps> = ({ item }) => {
  const progress = item.timeEstimate.spent ? 
    Math.round((item.timeEstimate.spent / item.timeEstimate.total) * 100) : 0;
  
  const isCompleted = item.status === "completed";
  const isBackendSecurity = item.title.includes("Backend");

  return (
    <Card className={`${isCompleted ? 'border-green-200 bg-green-50/30' : isBackendSecurity ? 'border-blue-200 bg-blue-50/30' : 'border-red-200 bg-red-50/30'} hover:shadow-md transition-all`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          {isBackendSecurity ? (
            <ServerCog className={`h-5 w-5 ${isCompleted ? 'text-green-500' : 'text-blue-500'}`} />
          ) : (
            <Shield className={`h-5 w-5 ${isCompleted ? 'text-green-500' : 'text-red-500'}`} />
          )}
          {item.title}
        </CardTitle>
        {isCompleted ? (
          <CheckCircle2 className="text-green-500" />
        ) : progress > 90 ? (
          <CheckCircle2 className="text-green-400" />
        ) : (
          <Clock className="text-blue-500" />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        
        <div className="space-y-2">
          <Progress value={progress} className={`h-2 ${isCompleted ? 'bg-green-100' : isBackendSecurity ? 'bg-blue-100' : ''}`} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{item.timeEstimate.spent} din {item.timeEstimate.total} ore estimate</span>
            <span>{progress}% completat</span>
          </div>
        </div>

        <ul className="mt-4 space-y-1 text-sm">
          {item.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                detail.includes("✓") 
                  ? "bg-green-500" 
                  : isBackendSecurity
                    ? "bg-blue-400"
                    : "bg-gray-300"
              }`} />
              {detail}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
