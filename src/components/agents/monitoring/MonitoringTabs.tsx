
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentActivityMonitor } from "./AgentActivityMonitor";
import { SafetyPanel } from "./safety/SafetyPanel";
import { AutonomyTab } from "./autonomy/AutonomyTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { AutoDebugPanel } from "./debug/AutoDebugPanel";
import { Box, Brain, LayoutDashboard, Shield, Webhook } from "lucide-react";

export const MonitoringTabs = () => {
  return (
    <Tabs defaultValue="autonomy" className="mt-4">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="autonomy" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          <span>Autonomie</span>
        </TabsTrigger>
        <TabsTrigger value="monitoring" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span>Monitorizare</span>
        </TabsTrigger>
        <TabsTrigger value="safety" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Siguranță</span>
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <Box className="h-4 w-4" />
          <span>Proiecte</span>
        </TabsTrigger>
        <TabsTrigger value="debugging" className="flex items-center gap-2">
          <Webhook className="h-4 w-4" />
          <span>Auto-Debug</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="autonomy">
        <AutonomyTab />
      </TabsContent>
      
      <TabsContent value="monitoring">
        <AgentActivityMonitor />
      </TabsContent>
      
      <TabsContent value="safety">
        <SafetyPanel />
      </TabsContent>
      
      <TabsContent value="projects">
        <ProjectsTab />
      </TabsContent>
      
      <TabsContent value="debugging">
        <AutoDebugPanel />
      </TabsContent>
    </Tabs>
  );
};
