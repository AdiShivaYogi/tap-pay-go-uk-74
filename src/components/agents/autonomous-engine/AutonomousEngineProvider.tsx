
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Tipuri pentru contextul motorului autonom
type AutonomousEngineContextType = {
  isRunning: boolean;
  agentsCount: number;
  activeAgents: string[];
  autonomyLevel: number;
  maxAutonomyAllowed: number;
  startAgents: () => void;
  stopAgents: () => void;
  updateAutonomyLevel: (level: number) => void;
  registerAgent: (agentId: string) => void;
  unregisterAgent: (agentId: string) => void;
  boostAutonomy: () => void; // Nouă funcție pentru creșterea rapidă a autonomiei
  enableFullAutonomy: () => void; // Nouă funcție pentru activarea autonomiei complete
};

const AutonomousEngineContext = createContext<AutonomousEngineContextType | undefined>(undefined);

export const AutonomousEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [autonomyLevel, setAutonomyLevel] = useState<number>(85); // Nivel implicit de autonomie crescut
  const [maxAutonomyAllowed, setMaxAutonomyAllowed] = useState<number>(100); // Limită maximă configurabilă
  const { toast } = useToast();
  
  // Când componenta se montează, verificăm dacă avem o stare salvată
  useEffect(() => {
    const savedState = localStorage.getItem('autonomousEngineState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setIsRunning(parsedState.isRunning || false);
        setActiveAgents(parsedState.activeAgents || []);
        setAutonomyLevel(parsedState.autonomyLevel || 85);
        setMaxAutonomyAllowed(parsedState.maxAutonomyAllowed || 100);
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
      autonomyLevel,
      maxAutonomyAllowed
    };
    localStorage.setItem('autonomousEngineState', JSON.stringify(stateToSave));
  }, [isRunning, activeAgents, autonomyLevel, maxAutonomyAllowed]);

  // Pornește toți agenții
  const startAgents = () => {
    setIsRunning(true);
    
    // Înregistrare agenți de bază și avansați
    const baseAgents = ['monitoring', 'learning', 'decision', 'analysis', 'optimization', 'innovation'];
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
    const boundedLevel = Math.min(level, maxAutonomyAllowed);
    setAutonomyLevel(boundedLevel);
    
    if (level > boundedLevel) {
      toast({
        title: "Limitare autonomie",
        description: `Nivelul de autonomie a fost limitat la ${maxAutonomyAllowed}%. Pentru autonomie completă, activați modul de autonomie avansată.`,
        variant: "warning",
      });
    }
  };
  
  // Boost rapid al autonomiei (+15%)
  const boostAutonomy = () => {
    const newLevel = Math.min(autonomyLevel + 15, maxAutonomyAllowed);
    setAutonomyLevel(newLevel);
    
    toast({
      title: "Autonomie accelerată",
      description: `Nivelul de autonomie a fost crescut la ${newLevel}%`,
    });
  };
  
  // Activare autonomie completă (100%)
  const enableFullAutonomy = () => {
    setMaxAutonomyAllowed(100);
    setAutonomyLevel(100);
    
    // Lansăm și agenți avansați
    const allAgents = [
      'monitoring', 'learning', 'decision', 'analysis', 
      'optimization', 'innovation', 'security', 'evolution',
      'self-improvement', 'integration', 'coordination'
    ];
    setActiveAgents(allAgents);
    setIsRunning(true);
    
    toast({
      title: "Autonomie completă activată",
      description: "Toți agenții operează acum cu autonomie maximă (100%) și pot evolua independent",
      duration: 5000,
    });
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
        maxAutonomyAllowed,
        startAgents,
        stopAgents,
        updateAutonomyLevel,
        registerAgent,
        unregisterAgent,
        boostAutonomy,
        enableFullAutonomy
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
