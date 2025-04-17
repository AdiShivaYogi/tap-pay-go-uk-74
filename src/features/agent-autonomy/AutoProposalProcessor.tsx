
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutoProposalProcessor = () => {
  const { toast } = useToast();
  const { isRunning } = useAutonomousEngine();
  const [processing, setProcessing] = useState<boolean>(false);
  const [lastProcessingTime, setLastProcessingTime] = useState<Date | null>(null);
  const [processingStats, setProcessingStats] = useState({
    taskProposals: 0,
    codeProposals: 0,
    autoApproved: 0
  });
  
  // Funcția pentru procesarea și generarea propunerilor
  const processAndGenerateProposals = async () => {
    if (processing || !isRunning) return;
    
    try {
      setProcessing(true);
      
      // Pas 1: Procesăm propunerile existente
      console.log('Procesare propuneri existente...');
      const { data: processingResult, error: processingError } = await supabase.functions.invoke('monitor-agent-proposals', {
        body: { action: 'processProposals' }
      });
      
      if (processingError) {
        console.error('Eroare la procesarea propunerilor:', processingError);
        toast({
          title: "Eroare la procesarea propunerilor",
          description: "Nu s-au putut procesa propunerile existente",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }
      
      // Înregistrăm statisticile despre propunerile procesate
      if (processingResult?.processed) {
        setProcessingStats(prev => ({
          ...prev,
          taskProposals: processingResult.processed.vitalTasks || 0,
          codeProposals: processingResult.processed.vitalCode || 0,
          autoApproved: (processingResult.processed.vitalTasks || 0) + (processingResult.processed.vitalCode || 0)
        }));
        
        // Înregistrăm activitate doar dacă avem propuneri procesate
        if ((processingResult.processed.vitalTasks || 0) + (processingResult.processed.vitalCode || 0) > 0) {
          logAgentActivity(
            'auto-processor',
            `Procesare automată: ${processingResult.processed.vitalTasks} propuneri de task și ${processingResult.processed.vitalCode} propuneri de cod`,
            'auto-processing'
          );
        }
      }
      
      // Pas 2: Generăm noi propuneri
      console.log('Generare noi propuneri...');
      const { data: generationResult, error: generationError } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 3, // Generăm 3 propuneri
          vitalCount: 1, // Dintre care una vitală pentru aprobare automată
          priority: 'high' 
        }
      });
      
      if (generationError) {
        console.error('Eroare la generarea propunerilor:', generationError);
        toast({
          title: "Eroare la generarea propunerilor",
          description: "Nu s-au putut genera noi propuneri",
          variant: "destructive",
        });
      } else if (generationResult?.count > 0) {
        // Doar dacă am generat propuneri, afișăm un toast și înregistrăm activitatea
        toast({
          title: "Propuneri generate automat",
          description: `${generationResult.count} noi propuneri generate pentru evoluția ecosistemului`,
        });
        
        logAgentActivity(
          'auto-generator',
          `Generare automată: ${generationResult.count} noi propuneri pentru evoluția ecosistemului`,
          'auto-generation'
        );
        
        // Obținem statistici actualizate după generare
        const { data: statsData, error: statsError } = await supabase.functions.invoke('monitor-agent-proposals', {
          body: { action: 'getStats' }
        });
        
        if (!statsError && statsData) {
          console.log('Statistici propuneri actualizate:', statsData);
        }
      }
      
      setLastProcessingTime(new Date());
      setProcessing(false);
    } catch (error) {
      console.error('Eroare în timpul procesării și generării propunerilor:', error);
      setProcessing(false);
    }
  };
  
  // Inițiem procesarea și generarea la încărcarea componentei
  useEffect(() => {
    if (isRunning) {
      // Executăm prima procesare după un scurt delay pentru a permite încărcarea completă a paginii
      const initialTimer = setTimeout(() => {
        processAndGenerateProposals();
      }, 3000);
      
      return () => clearTimeout(initialTimer);
    }
  }, [isRunning]);
  
  // Setăm un interval pentru procesarea și generarea periodică
  useEffect(() => {
    if (!isRunning) return;
    
    // Interval pentru procesarea regulată a propunerilor (la fiecare 60-90 secunde)
    const processingInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 30000); // 0-30 secunde delay aleatoriu
      setTimeout(() => {
        processAndGenerateProposals();
      }, randomDelay);
    }, 60000); // Interval de bază: 60 secunde
    
    return () => clearInterval(processingInterval);
  }, [isRunning]);
  
  // Adăugăm efect pentru monitorizarea propunerilor noi și aprobarea lor automată
  useEffect(() => {
    if (!isRunning) return;
    
    const monitorNewProposals = async () => {
      try {
        // Obținem statistici despre propunerile curente
        const { data: stats, error: statsError } = await supabase.functions.invoke('monitor-agent-proposals', {
          body: { action: 'getStats' }
        });
        
        if (statsError) {
          console.error('Eroare la obținerea statisticilor:', statsError);
          return;
        }
        
        // Dacă avem propuneri în așteptare, inițiem procesul de aprobare automată
        if (stats?.data?.taskStats?.pendingCount > 0 || stats?.data?.codeStats?.pendingCount > 0) {
          // Pornim procesarea propunerilor
          await processAndGenerateProposals();
        }
      } catch (err) {
        console.error('Eroare în timpul monitorizării propunerilor:', err);
      }
    };
    
    // Verificăm propunerile noi la intervale regulate
    const monitorInterval = setInterval(() => {
      monitorNewProposals();
    }, 45000); // La fiecare 45 secunde
    
    // Executăm prima verificare după încărcare
    monitorNewProposals();
    
    return () => clearInterval(monitorInterval);
  }, [isRunning]);
  
  // Componentă invizibilă - nu renderizăm nimic
  return null;
};
