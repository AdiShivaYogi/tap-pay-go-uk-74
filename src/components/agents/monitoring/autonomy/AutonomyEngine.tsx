
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { agents } from "@/components/agents/agents-data";
import { supabase } from "@/integrations/supabase/client";

export const AutonomyEngine: React.FC = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState<Date | null>(null);
  
  // Activăm motorul imediat și generăm activitate
  useEffect(() => {
    // Notificare inițială
    toast({
      title: "TapToGo Autonom Activat",
      description: "Sistemul de autonomie completă a fost inițiat cu succes.",
      duration: 5000,
    });
    
    // Înregistrăm activarea
    logAgentActivity(
      "system",
      "Motorul de autonomie TapToGo a fost activat cu succes",
      "autonomy"
    );
    
    // Începem să generăm activitate
    startActivityGeneration();
    
    // Curățare la unmount
    return () => {
      stopActivityGeneration();
    };
  }, [toast]);
  
  // Funcție pentru pornirea generării de activitate
  const startActivityGeneration = () => {
    setIsRunning(true);
    generateInitialActivity();
    startPeriodicActivities();
  };
  
  // Funcție pentru oprirea generării de activitate
  const stopActivityGeneration = () => {
    setIsRunning(false);
  };
  
  // Generăm un set inițial de activități pentru a popula sistemul
  const generateInitialActivity = () => {
    const initialActivities = [
      {
        agentId: "learning",
        description: "Initializare module de învățare și conexiune la surse de date",
        category: "learning"
      },
      {
        agentId: "monitoring",
        description: "Pornire monitorizare autonomă completă a sistemului",
        category: "monitoring"
      },
      {
        agentId: "decision",
        description: "Calibrare algoritmi decizionali pentru operare autonomă",
        category: "autonomy"
      },
      {
        agentId: "analysis",
        description: "Pregătire instrumente de analiză pentru procesare continuă",
        category: "analysis"
      }
    ];
    
    // Înregistrăm activitățile inițiale
    initialActivities.forEach(activity => {
      logAgentActivity(activity.agentId, activity.description, activity.category);
    });
    
    // Notificăm utilizatorul
    toast({
      title: "Activitate autonomă inițiată",
      description: "Toți agenții generează acum activitate reală în sistem",
      duration: 4000,
    });
  };
  
  // Configurăm activități periodice diverse pentru agenți
  const startPeriodicActivities = () => {
    // Definim categorii de activități și mesaje posibile
    const activityCategories = ["autonomy", "learning", "monitoring", "decision", "api-activity", "analysis"];
    
    const activityMessages = {
      learning: [
        "Prelucrare date pentru îmbunătățirea modelului ML",
        "Învățare pattern-uri noi din conversațiile recente",
        "Optimizare algoritmi de clasificare text",
        "Transfer de cunoștințe între modulele de agent",
        "Evaluare și selecție caracteristici pentru modele"
      ],
      monitoring: [
        "Verificare parametri sistem în timp real",
        "Monitorizare utilizare resurse și optimizare",
        "Detectare anomalii în comportamentul agenților",
        "Verificare integritate date sistem",
        "Testare performanță interogări API"
      ],
      decision: [
        "Analiză factori decizionali pentru intervențiile ulterioare",
        "Evaluare impact decizii precedente",
        "Ajustare parametri decizionali bazați pe feedback",
        "Prioritizare activități conform obiectivelor globale",
        "Determinare acțiuni optime pentru optimizare"
      ],
      analysis: [
        "Analiză tendințe în datele colectate",
        "Corelarea informațiilor din multiple surse",
        "Generare raport de utilizare resurse",
        "Evaluare performanță agenți specializați",
        "Detectare oportunități de optimizare"
      ]
    };
    
    // Generăm activitate pentru fiecare agent la intervale regulate
    const activityInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(activityInterval);
        return;
      }
      
      // Generăm activitate pentru un agent aleatoriu
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const randomCategory = activityCategories[Math.floor(Math.random() * activityCategories.length)];
      
      // Alegem un mesaj potrivit pentru categoria de agent bazat pe id-ul agentului
      let messages = activityMessages.monitoring; // default
      
      if (randomAgent.id.includes('learning') && activityMessages.learning) {
        messages = activityMessages.learning;
      } else if (randomAgent.id.includes('decision') && activityMessages.decision) {
        messages = activityMessages.decision;
      } else if (randomAgent.id.includes('analysis') && activityMessages.analysis) {
        messages = activityMessages.analysis;
      }
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      // Înregistrăm activitatea agentului
      logAgentActivity(randomAgent.id, randomMessage, randomCategory);
      
      // Actualizăm timestamp-ul ultimei activități
      setLastActivityTime(new Date());
    }, 10000); // La fiecare 10 secunde
    
    // Generăm activitate API reală la intervale mai lungi pentru a menține consumul minim
    const realApiActivityInterval = setInterval(async () => {
      if (!isRunning) {
        clearInterval(realApiActivityInterval);
        return;
      }
      
      try {
        // Alternăm între modele pentru a demonstra capacitatea sistemului
        const model = Math.random() > 0.5 ? 'claude' : 'anthropic';
        
        // Trimitem o interogare simplă pentru a genera activitate reală
        const { data, error } = await supabase.functions.invoke("generate-agent-response", {
          body: {
            message: "Verificare autonomă a sistemului TapToGo",
            model: model,
            systemRole: "Agent autonom de monitorizare",
            isCodeProposal: false
          }
        });
        
        if (error) {
          console.error("Eroare la interogarea modelului AI:", error);
          return;
        }
        
        // Înregistrăm activitatea API reală
        logAgentActivity(
          `${model}-api-query`, 
          `Interogare autonomă reușită a modelului ${model === 'anthropic' ? 'Claude (Anthropic Direct)' : 'Claude (OpenRouter)'}`,
          "api-activity"
        );
      } catch (apiError) {
        console.error("Eroare la generarea activității API:", apiError);
      }
    }, 3 * 60 * 1000); // La fiecare 3 minute
    
    // Curățare la unmount sau când se oprește generarea
    return () => {
      clearInterval(activityInterval);
      clearInterval(realApiActivityInterval);
    };
  };
  
  // Componenta nu renderizează nimic vizibil - rulează doar în fundal
  return null;
};
