
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";

interface HistoryItemProps {
  progress: any;
}

export const HistoryItem = ({ progress }: HistoryItemProps) => {
  return (
    <div className="border rounded-md p-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{progress.roadmap_tasks?.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Agent: {progress.agent_id} • 
            {new Date(progress.created_at).toLocaleDateString('ro-RO', {
              day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        
        <Badge variant={progress.status === 'approved' ? 'default' : 'outline'}>
          {progress.status === 'approved' ? 'Aprobat' : 'În progres'}
        </Badge>
      </div>
      
      <Separator className="my-2" />
      
      <div className="flex justify-between items-center text-sm">
        <span>Progres: {progress.progress_percentage}%</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Task status:</span>
          <StatusBadge status={progress.roadmap_tasks?.status} />
        </div>
      </div>
      
      {progress.notes && (
        <p className="text-xs italic mt-2 text-muted-foreground">{progress.notes}</p>
      )}
    </div>
  );
};
