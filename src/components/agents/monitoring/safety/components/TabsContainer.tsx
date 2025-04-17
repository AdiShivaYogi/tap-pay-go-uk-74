
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Lock, Rocket, Server } from "lucide-react";
import { ExecutionTab } from "./ExecutionTab";
import { SafetyTab } from "./SafetyTab";
import { MonitoringTab } from "./MonitoringTab";
import { IntegrationTab } from "./IntegrationTab";
import { useSafetyPanel } from "../hooks/useSafetyPanel";

export const TabsContainer: React.FC = () => {
  const {
    autonomyLevel,
    safetyOverride,
    acceptedRisks,
    systemsActive,
    dataConnections,
    monitoringParameters,
    implementationProgress,
    handleToggleSystem,
    getSystemName,
    getAutonomyDescription,
    handleEmergencyStop,
    handleAutonomyChange,
    toggleRiskAcceptance,
    toggleDataConnection,
    toggleMonitoringParameter,
    startAutonomousExecution,
    setSafetyOverride
  } = useSafetyPanel();

  return (
    <Tabs defaultValue="execution" className="space-y-4">
      <TabsList>
        <TabsTrigger value="execution" className="flex items-center gap-1">
          <Rocket className="h-4 w-4" />
          Execuție Autonomă
        </TabsTrigger>
        <TabsTrigger value="safety" className="flex items-center gap-1">
          <Lock className="h-4 w-4" />
          Mecanisme de Siguranță
        </TabsTrigger>
        <TabsTrigger value="monitoring" className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          Monitorizare Autonomie
        </TabsTrigger>
        <TabsTrigger value="integration" className="flex items-center gap-1">
          <Server className="h-4 w-4" />
          Integrare Date Reale
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="execution">
        <ExecutionTab 
          autonomyLevel={autonomyLevel}
          safetyOverride={safetyOverride}
          acceptedRisks={acceptedRisks}
          getAutonomyDescription={getAutonomyDescription}
          handleAutonomyChange={handleAutonomyChange}
          toggleRiskAcceptance={toggleRiskAcceptance}
          startAutonomousExecution={startAutonomousExecution}
        />
      </TabsContent>
      
      <TabsContent value="safety">
        <SafetyTab 
          systemsActive={systemsActive}
          safetyOverride={safetyOverride}
          handleToggleSystem={handleToggleSystem}
          getSystemName={getSystemName}
          setSafetyOverride={setSafetyOverride}
          handleEmergencyStop={handleEmergencyStop}
        />
      </TabsContent>
      
      <TabsContent value="monitoring">
        <MonitoringTab />
      </TabsContent>
      
      <TabsContent value="integration">
        <IntegrationTab 
          dataConnections={dataConnections}
          monitoringParameters={monitoringParameters}
          implementationProgress={implementationProgress}
          toggleDataConnection={toggleDataConnection}
          toggleMonitoringParameter={toggleMonitoringParameter}
        />
      </TabsContent>
    </Tabs>
  );
};
