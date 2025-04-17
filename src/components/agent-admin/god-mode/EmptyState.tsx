
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, Crown, ThumbsUp } from "lucide-react";

interface EmptyStateProps {
  isGodModeEnabled: boolean;
}

export const EmptyState = ({ isGodModeEnabled }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg bg-slate-50/50">
      <div className="rounded-full bg-slate-100 p-3 mb-3">
        {isGodModeEnabled ? (
          <Crown className="h-6 w-6 text-amber-500" />
        ) : (
          <Bot className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      
      <h3 className="text-lg font-medium mb-1">
        {isGodModeEnabled ? "God Mode Activ" : "Nicio propunere selectată"}
      </h3>
      
      <p className="text-muted-foreground mb-3 max-w-md">
        {isGodModeEnabled 
          ? "Selectați o propunere de agent din lista de propuneri sau submisii pentru a genera feedback și a o aproba automat" 
          : "Selectați o propunere de agent din lista de propuneri sau submisii pentru a oferi feedback"}
      </p>
      
      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="gap-1">
          <ThumbsUp className="h-3 w-3" />
          {isGodModeEnabled ? "Aprobare automată activă" : "Necesită aprobare manuală"}
        </Badge>
      </div>
    </div>
  );
};
