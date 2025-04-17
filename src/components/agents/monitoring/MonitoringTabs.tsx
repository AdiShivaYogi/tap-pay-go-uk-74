
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Network, Shield, ChartPie, BarChart3, Rocket } from "lucide-react";
import { 
  AutonomyTab,
  NetworkTab,
  SafetyTab,
  ActivityTab,
  ProjectsTab,
  InnerWorldTab
} from "./tabs";

export const MonitoringTabs: React.FC = () => {
  return (
    <Tabs defaultValue="autonomy" className="space-y-6">
      <TabsList className="mb-4">
        <TabsTrigger value="autonomy" className="flex items-center gap-1">
          <Brain className="h-4 w-4" />
          Autonomie & Execuție
        </TabsTrigger>
        <TabsTrigger value="network" className="flex items-center gap-1">
          <Network className="h-4 w-4" />
          Rețea Agenți
        </TabsTrigger>
        <TabsTrigger value="safety" className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          Infrastructură de siguranță
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-1">
          <ChartPie className="h-4 w-4" />
          Activitate în timp real
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          Proiecte agenți
        </TabsTrigger>
        <TabsTrigger value="inner-world" className="flex items-center gap-1">
          <Rocket className="h-4 w-4" />
          Lumea Interioară
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="autonomy">
        <AutonomyTab />
      </TabsContent>
      
      <TabsContent value="network">
        <NetworkTab />
      </TabsContent>
      
      <TabsContent value="safety">
        <SafetyTab />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityTab />
      </TabsContent>
      
      <TabsContent value="projects">
        <ProjectsTab />
      </TabsContent>
      
      <TabsContent value="inner-world">
        <InnerWorldTab />
      </TabsContent>
    </Tabs>
  );
};
