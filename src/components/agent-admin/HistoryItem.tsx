
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface HistoryItemProps {
  progress: any;
}

export const HistoryItem = ({ progress }: HistoryItemProps) => {
  const formattedDate = new Date(progress.created_at).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const formattedTime = new Date(progress.created_at).toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="border rounded-md p-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{progress.roadmap_tasks?.title || "Task necunoscut"}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {progress.roadmap_tasks?.description || "Fără descriere"}
          </p>
        </div>
        <StatusBadge status={progress.status} />
      </div>
      
      <Separator className="my-2" />
      
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{formattedTime}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Progres:</span>
          <Badge variant="outline" className="bg-primary/5">
            {progress.progress_percentage}%
          </Badge>
          <span className="font-medium">{progress.agent_id}</span>
        </div>
      </div>
      
      {progress.notes && (
        <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
          {progress.notes}
        </div>
      )}
    </div>
  );
};
