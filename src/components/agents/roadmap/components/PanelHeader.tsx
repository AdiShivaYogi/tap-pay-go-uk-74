
import React from 'react';
import { StyledCardHeader, StyledCardTitle } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { BarChart4, PlusCircle, Loader2 } from "lucide-react";

interface PanelHeaderProps {
  onGenerateTask: () => void;
  isCreatingTask: boolean;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ onGenerateTask, isCreatingTask }) => {
  return (
    <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
      <StyledCardTitle className="flex items-center gap-2">
        <BarChart4 className="h-5 w-5 text-primary" />
        Taskuri Roadmap disponibile
      </StyledCardTitle>
      
      <Button 
        size="sm" 
        variant="outline"
        onClick={onGenerateTask}
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
  );
};
