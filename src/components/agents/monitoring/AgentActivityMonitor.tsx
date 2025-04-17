
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { AgentActivityChart } from "./AgentActivityChart";
import { AgentActivityLog } from "./AgentActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgentMonitoring } from "./hooks/useAgentMonitoring";
import { BarChart4, ListFilter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AgentActivityMonitor: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { 
    activityData, 
    activityLogs, 
    isLoading, 
    categories,
    refreshData,
    totalActivities
  } = useAgentMonitoring();

  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category === activeFilter ? null : category);
  };

  return (
    <StyledCard className="w-full">
      <StyledCardHeader className="flex flex-row items-center justify-between">
        <div>
          <StyledCardTitle>Monitorizare Agenți în Timp Real</StyledCardTitle>
          <p className="text-sm text-muted-foreground">
            {totalActivities} activități monitorizate
          </p>
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
      </StyledCardHeader>

      <StyledCardContent>
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
        </div>

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
