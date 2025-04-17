
import React from "react";
import { RefreshCw, Settings, BrainCircuit, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StyledCardTitle, StyledCardHeader } from "@/components/ui/cards";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";

interface MonitorHeaderProps {
  totalActivities: number;
  lastRefresh: Date | null;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  showTestTools: boolean;
  setShowTestTools: React.Dispatch<React.SetStateAction<boolean>>;
  showLearning: boolean;
  setShowLearning: React.Dispatch<React.SetStateAction<boolean>>;
  showAutoLearning: boolean;
  setShowAutoLearning: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
  isLoading: boolean;
}

export const MonitorHeader: React.FC<MonitorHeaderProps> = ({
  totalActivities,
  lastRefresh,
  autoRefresh,
  toggleAutoRefresh,
  showTestTools,
  setShowTestTools,
  showLearning,
  setShowLearning,
  showAutoLearning,
  setShowAutoLearning,
  refreshData,
  isLoading
}) => {
  // Make sure lastRefresh is a valid Date object before calling formatDistanceToNow
  const lastRefreshText = lastRefresh && lastRefresh instanceof Date && !isNaN(lastRefresh.getTime())
    ? formatDistanceToNow(lastRefresh, { 
        addSuffix: true,
        locale: ro 
      })
    : "just now";

  return (
    <StyledCardHeader className="flex flex-row items-center justify-between">
      <div>
        <StyledCardTitle>Monitorizare Agenți în Timp Real</StyledCardTitle>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <span>{totalActivities} activități monitorizate</span>
          <span className="mx-2">•</span>
          <Clock className="h-3 w-3" /> 
          <span>Actualizat {lastRefreshText}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-4">
          <Switch 
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={toggleAutoRefresh}
          />
          <Label htmlFor="auto-refresh" className="text-xs flex items-center gap-1">
            <RefreshCw size={14} />
            Auto-reîmprospătare
          </Label>
        </div>
        
        <div className="flex items-center gap-2 mr-4">
          <Switch 
            id="test-mode"
            checked={showTestTools}
            onCheckedChange={setShowTestTools}
          />
          <Label htmlFor="test-mode" className="text-xs flex items-center gap-1">
            <Settings size={14} />
            Mod Test
          </Label>
        </div>
        
        <div className="flex items-center gap-2 mr-4">
          <Switch 
            id="learning-mode"
            checked={showLearning}
            onCheckedChange={setShowLearning}
          />
          <Label htmlFor="learning-mode" className="text-xs flex items-center gap-1">
            <BrainCircuit size={14} />
            Învățare manuală
          </Label>
        </div>
        
        <div className="flex items-center gap-2 mr-4">
          <Switch 
            id="auto-learning-mode"
            checked={showAutoLearning}
            onCheckedChange={setShowAutoLearning}
          />
          <Label htmlFor="auto-learning-mode" className="text-xs flex items-center gap-1">
            <BrainCircuit size={14} />
            Auto-învățare
          </Label>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Actualizează
        </Button>
      </div>
    </StyledCardHeader>
  );
};
