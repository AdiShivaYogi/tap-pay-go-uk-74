
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Tipuri pentru contextul motorului autonom
type AutonomousEngineContextType = {
  isRunning: boolean;
  agentsCount: number;
  activeAgents: string[];
  autonomyLevel: number;
  startAgents: () => void;
  stopAgents: () => void;
  updateAutonomyLevel: (level: number) => void;
  registerAgent: (agentId: string) => void;
  unregisterAgent: (agentId: string) => void;
};

const AutonomousEngineContext = createContext<AutonomousEngineContextType | undefined>(undefined);

export const AutonomousEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [autonomyLevel, setAutonomyLevel] = useState<number>(80); // Nivel implicit de autonomie
  const { toast } = useToast();
  
  // Când componenta se montează, verificăm dacă avem o stare salvată
  useEffect(() => {
    const savedState = localStorage.getItem('autonomousEngineState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setIsRunning(parsedState.isRunning || false);
        setActiveAgents(parsedState.activeAgents || []);
        setAutonomyLevel(parsedState.autonomyLevel || 80);
      } catch (error) {
        console.error('Eroare la restaurarea stării motorului autonom:', error);
      }
    }
  }, []);

  // Salvăm starea în localStorage când se schimbă
  useEffect(() => {
    const stateToSave = {
      isRunning,
      activeAgents,
      autonomyLevel
    };
    localStorage.setItem('autonomousEngineState', JSON.stringify(stateToSave));
  }, [isRunning, activeAgents, autonomyLevel]);

  // Pornește toți agenții
  const startAgents = () => {
    setIsRunning(true);
    
    // Înregistrare agenți de bază
    const baseAgents = ['monitoring', 'learning', 'decision', 'analysis'];
    setActiveAgents(baseAgents);
    
    toast({
      title: "Agenți autonomi porniți",
      description: `${baseAgents.length} agenți au fost lansați cu nivel de autonomie ${autonomyLevel}%`,
    });
  };

  // Oprește toți agenții
  const stopAgents = () => {
    setIsRunning(false);
    setActiveAgents([]);
    
    toast({
      title: "Agenți autonomi opriți",
      description: "Toți agenții au fost opriți cu succes",
    });
  };

  // Actualizează nivelul de autonomie
  const updateAutonomyLevel = (level: number) => {
    setAutonomyLevel(level);
  };

  // Înregistrează un nou agent
  const registerAgent = (agentId: string) => {
    setActiveAgents((prev) => {
      if (prev.includes(agentId)) return prev;
      return [...prev, agentId];
    });
  };

  // Dezînregistrează un agent
  const unregisterAgent = (agentId: string) => {
    setActiveAgents((prev) => prev.filter((id) => id !== agentId));
  };

  return (
    <AutonomousEngineContext.Provider
      value={{
        isRunning,
        agentsCount: activeAgents.length,
        activeAgents,
        autonomyLevel,
        startAgents,
        stopAgents,
        updateAutonomyLevel,
        registerAgent,
        unregisterAgent,
      }}
    >
      {children}
    </AutonomousEngineContext.Provider>
  );
};

// Hook pentru utilizarea contextului motorului autonom
export const useAutonomousEngine = (): AutonomousEngineContextType => {
  const context = useContext(AutonomousEngineContext);
  
  if (context === undefined) {
    throw new Error('useAutonomousEngine must be used within an AutonomousEngineProvider');
  }
  
  return context;
};
