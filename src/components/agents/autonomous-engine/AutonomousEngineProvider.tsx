
import React, { createContext, useContext, ReactNode } from "react";
import { useAutonomousAgents } from "@/hooks/use-autonomous-agents";

interface AutonomousEngineContextType {
  isRunning: boolean;
  autonomyLevel: number;
  activeTasks: any[];
  startAgents: () => void;
  stopAgents: () => void;
  assignTaskToAgent: (agentId: string, task: string) => Promise<boolean>;
  setAutonomyLevel: (level: number) => void;
}

const AutonomousEngineContext = createContext<AutonomousEngineContextType | undefined>(undefined);

export const AutonomousEngineProvider = ({ children }: { children: ReactNode }) => {
  const autonomousAgents = useAutonomousAgents({
    autoStart: true,  // Activăm automat agenții
    interval: 15000   // Intervalul în milisecunde pentru generarea activității
  });
  
  return (
    <AutonomousEngineContext.Provider value={autonomousAgents}>
      {children}
    </AutonomousEngineContext.Provider>
  );
};

export const useAutonomousEngine = () => {
  const context = useContext(AutonomousEngineContext);
  if (context === undefined) {
    throw new Error("useAutonomousEngine must be used within an AutonomousEngineProvider");
  }
  return context;
};
