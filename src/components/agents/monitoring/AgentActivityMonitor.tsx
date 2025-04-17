
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { AgentActivityChart } from "./AgentActivityChart";
import { AgentActivityLog } from "./AgentActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgentMonitoring } from "./hooks";
import { BarChart4, ListFilter, RefreshCw, Settings, Clock, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestAgentActivity } from "./TestAgentActivity";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AgentLearningPanel } from "./AgentLearningPanel";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";

export const AgentActivityMonitor: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showTestTools, setShowTestTools] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const { 
    activityData, 
    activityLogs, 
    isLoading, 
    categories,
    refreshData,
    totalActivities,
    autoRefresh,
    toggleAutoRefresh,
    lastRefresh
  } = useAgentMonitoring();

  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category === activeFilter ? null : category);
  };

  const lastRefreshText = formatDistanceToNow(lastRefresh, { 
    addSuffix: true,
    locale: ro 
  });

  return (
    <StyledCard className="w-full">
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
              Învățare între agenți
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

      <StyledCardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleFilterChange(category)}
                >
                  {category}
                </Badge>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Nu există categorii de activitate disponibile
                </p>
              )}
            </div>
          </div>
          
          {showTestTools && (
            <div className="md:col-span-1">
              <TestAgentActivity />
            </div>
          )}
        </div>

        {showLearning && (
          <div className="mb-6">
            <AgentLearningPanel />
          </div>
        )}

        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" />
              Grafic
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <ListFilter className="h-4 w-4" />
              Activitate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            <div className="h-[350px]">
              <AgentActivityChart 
                data={activityData} 
                isLoading={isLoading}
                filter={activeFilter}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <AgentActivityLog 
              logs={activityLogs}
              isLoading={isLoading}
              filter={activeFilter}
            />
          </TabsContent>
        </Tabs>
      </StyledCardContent>
    </StyledCard>
  );
};
