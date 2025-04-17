
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4, ListFilter, FileText, BrainCircuit } from "lucide-react";
import { AgentActivityChart } from "../AgentActivityChart";
import { AgentActivityLog } from "../AgentActivityLog";
import { AgentLearningReports } from "../AgentLearningReports";
import { ActivityData, ActivityLog } from "../hooks";

interface ActivityTabsProps {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  activeFilter: string | null;
  showAutoLearning: boolean;
}

export const ActivityTabs: React.FC<ActivityTabsProps> = ({
  activityData, 
  activityLogs,
  isLoading,
  activeFilter,
  showAutoLearning
}) => {
  return (
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
        {showAutoLearning && (
          <TabsTrigger value="learning" className="flex items-center gap-1">
            <BrainCircuit className="h-4 w-4 text-amber-500" />
            Auto-Îmbunătățire
          </TabsTrigger>
        )}
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
      
      {showAutoLearning && (
        <TabsContent value="learning">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Sistem Auto-Îmbunătățire</h3>
            <p className="text-muted-foreground">
              Rapoartele sistem de auto-îmbunătățire reflectă capacitatea agenților de a evolua prin învățare autonomă,
              contribuind direct la creșterea nivelului lor de autonomie și eficiență operațională.
            </p>
          </div>
          <div className="h-[350px] overflow-y-auto pr-2">
            <AgentLearningReports />
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};
