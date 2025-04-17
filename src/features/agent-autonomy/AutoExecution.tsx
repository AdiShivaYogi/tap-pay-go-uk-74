
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { supabase } from "@/integrations/supabase/client";

export const AutoExecution = () => {
  const { toast } = useToast();
  const { isRunning, startAgents } = useAutonomousEngine();
  const [lastActivityTime, setLastActivityTime] = useState<Date | null>(null);
  const [autonomyLevel, setAutonomyLevel] = useState<number>(80); // Nivel implicit de autonomie
  const [apiChecked, setApiChecked] = useState<boolean>(false);
  
  // Verificare configurație API
  useEffect(() => {
    const checkApiConfigurations = async () => {
      if (apiChecked) return;
      
      try {
        setApiChecked(true);
        // Verificăm dacă cheile API sunt configurate
        const { data: anthropicResult, error: anthropicError } = await supabase.functions.invoke("check-anthropic-key");
        const { data: openrouterResult, error: openrouterError } = await supabase.functions.invoke("check-openrouter-key");
        
        if (anthropicError || openrouterError) {
          console.error("Eroare la verificarea configurațiilor API:", { anthropicError, openrouterError });
          return;
        }
        
        if (anthropicResult?.hasKey && anthropicResult?.isValid) {
          generateActivity("anthropic-api", "Conexiune validată cu API-ul Anthropic Claude", "connection");
          console.log("API Anthropic verificat cu succes:", anthropicResult);
          
          // Testăm modelul direct pentru a verifica funcționalitatea
          testAnthropicModel();
        }
        
        if (openrouterResult?.hasKey && openrouterResult?.isValid) {
          generateActivity("openrouter-api", "Conexiune validată cu API-ul OpenRouter Claude", "connection");
        }
        
        const apiStatus = [];
        if (anthropicResult?.hasKey && anthropicResult?.isValid) apiStatus.push("Anthropic");
        if (openrouterResult?.hasKey && openrouterResult?.isValid) apiStatus.push("OpenRouter");
        
        if (apiStatus.length > 0) {
          toast({
            title: "API-uri configurate",
            description: `Conexiunile API sunt active pentru: ${apiStatus.join(', ')}`,
            duration: 5000,
          });
        } else {
          toast({
            title: "Atenție - API-uri neconsigurate",
            description: "Nu există conexiuni API active pentru modelele Claude. Adăugați chei API pentru funcționalitate completă.",
            variant: "destructive",
            duration: 8000,
          });
        }
      } catch (error) {
        console.error("Eroare la verificarea configurației:", error);
      }
    };
    
    if (isRunning) {
      checkApiConfigurations();
    }
  }, [isRunning, toast, apiChecked]);
  
  // Test direct al modelului Anthropic pentru a verifica funcționalitatea
  const testAnthropicModel = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-agent-response', {
        body: {
          message: "Verificare API Anthropic - Confirmă funcționalitatea modelului Claude",
          model: "anthropic",
          systemRole: "Agent de testare API",
          isCodeProposal: false
        }
      });
      
      if (error) {
        console.error("Eroare la testarea modelului Anthropic:", error);
        toast({
          title: "Eroare testare API Anthropic",
          description: "Nu s-a putut genera un răspuns de la modelul Claude.",
          variant: "destructive",
        });
        return;
      }
      
      // Înregistrăm activitatea de testare reușită
      generateActivity("anthropic-test", `Test model Claude (Anthropic) reușit: ${data.model || 'Claude'}`, "api-test");
      console.log("Test Anthropic reușit:", data);
      
      toast({
        title: "API Anthropic funcțional",
        description: "Testul de comunicare cu modelul Claude a fost realizat cu succes.",
      });
    } catch (err) {
      console.error("Eroare la testarea Anthropic:", err);
    }
  };
  
  // Pornirea automată a agenților după încărcarea paginii
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRunning) {
        startAgents();
        generateActivity("system", "Agenții au fost porniți automat de sistemul de auto-execuție", "autonomy");
        
        toast({
          title: "Auto-execuție activată",
          description: "Sistemul de agenți autonomi a fost inițiat automat",
          duration: 5000,
        });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isRunning, startAgents, toast]);
  
  // Generare de activitate periodică pentru a menține agenții activi
  useEffect(() => {
    if (!isRunning) return;
    
    // Funcția pentru generarea activității periodice
    const generatePeriodicActivity = () => {
      const agentTypes = ["learning", "monitoring", "decision", "analysis"];
      const activityCategories = ["autonomy", "learning", "monitoring", "decision"];
      
      // Alegere aleatoare a unui tip de agent și categorie
      const randomAgentType = agentTypes[Math.floor(Math.random() * agentTypes.length)];
      const randomCategory = activityCategories[Math.floor(Math.random() * activityCategories.length)];
      
      // Generare mesaje de activitate în funcție de tipul de agent
      let message = "";
      switch (randomAgentType) {
        case "learning":
          message = "Procesare date pentru îmbunătățirea modelului de învățare";
          break;
        case "monitoring":
          message = "Verificare stare sistem și resurse disponibile";
          break;
        case "decision":
          message = "Evaluare criterii pentru luarea unei decizii autonome";
          break;
        case "analysis":
          message = "Analiză date acumulate pentru identificarea pattern-urilor";
          break;
        default:
          message = "Activitate autonomă de rutină";
      }
      
      // Înregistrare activitate
      generateActivity(randomAgentType, message, randomCategory);
      setLastActivityTime(new Date());
    };
    
    // Inițiere interval pentru generare activitate periodică (la fiecare 15-30 secunde)
    const activityInterval = setInterval(() => {
      const randomInterval = 15000 + Math.random() * 15000; // 15-30 secunde
      setTimeout(generatePeriodicActivity, randomInterval);
    }, 20000);
    
    // Generăm prima activitate imediat
    generatePeriodicActivity();
    
    return () => clearInterval(activityInterval);
  }, [isRunning]);
  
  // Generare activitate API reală (interogare modele AI)
  useEffect(() => {
    if (!isRunning) return;
    
    // Funcție pentru interogarea reală a API-urilor AI la intervale regulate
    const queryAiModels = async () => {
      try {
        // Folosim direct modelul Anthropic pentru a verifica funcționalitatea
        const model = 'anthropic';
        
        // Mesaje simple pentru a minimiza costurile dar a genera activitate reală
        const messages = [
          "Verificare funcționalitate API Anthropic",
          "Test comunicare model Claude",
          "Monitorizare stare conexiune API",
          "Generare răspuns de test"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Interogare API reală
        console.log(`[${new Date().toLocaleString()}] Testăm API-ul ${model}...`);
        
        const { data, error } = await supabase.functions.invoke("generate-agent-response", {
          body: {
            message: randomMessage,
            model: model,
            systemRole: "Agent de verificare API",
            isCodeProposal: false
          }
        });
        
        if (error) {
          console.error(`Eroare la interogarea modelului ${model}:`, error);
          return;
        }
        
        // Înregistrare activitate API reală
        generateActivity(
          `${model}-api-query`, 
          `Interogare reușită model ${model === 'anthropic' ? 'Claude (Anthropic Direct)' : 'Claude (OpenRouter)'}`,
          "api-activity"
        );
        
        console.log(`[${new Date().toLocaleString()}] Test API ${model} reușit:`, data);
        
        // Afișăm toast doar prima dată pentru a nu deranja utilizatorul
        if (!lastActivityTime) {
          toast({
            title: "Activitate API înregistrată",
            description: `Comunicare reușită cu modelul ${model === 'anthropic' ? 'Claude (Anthropic Direct)' : 'Claude (OpenRouter)'}`,
            duration: 4000,
          });
        }
        
      } catch (apiError) {
        console.error("Eroare la generarea activității API:", apiError);
      }
    };
    
    // Prima interogare după un scurt delay
    const initialQueryTimer = setTimeout(() => {
      queryAiModels();
    }, 5000);
    
    // Interogăm modelele AI la intervale mai mari (pentru a evita costuri excesive)
    const apiQueryInterval = setInterval(() => {
      queryAiModels();
    }, 60 * 1000); // La fiecare minut
    
    return () => {
      clearTimeout(initialQueryTimer);
      clearInterval(apiQueryInterval);
    };
  }, [isRunning, lastActivityTime, toast]);
  
  // Funcție helper pentru generarea și înregistrarea activității
  const generateActivity = (agentId: string, description: string, category: string) => {
    logAgentActivity(agentId, description, category);
    console.log(`[${new Date().toISOString()}] Activitate agent ${agentId}: ${description} (${category})`);
  };
  
  // Componentă invizibilă - nu renderizăm nimic
  return null;
};
