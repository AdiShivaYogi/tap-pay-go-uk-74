
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent } from "../agents-data";
import { useAgentApi } from "./hooks/useAgentApi";
import { useAgentMessages } from "./hooks/useAgentMessages";
import { useAgentTasks } from "./hooks/useAgentTasks";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export const useConversation = (agent: Agent, isListening: boolean) => {
  const { toast } = useToast();
  const [typingIndicator, setTypingIndicator] = useState(false);
  
  // Utilizăm hook-urile separate
  const { hasDeepseekKey, isApiLoading } = useAgentApi();
  const { messages, addUserMessage, addAgentMessage } = useAgentMessages(agent);
  const { activeTask, setActiveTask, assignTaskToAgent } = useAgentTasks(agent.id);

  // Efect pentru simularea ascultării active
  useEffect(() => {
    let listeningTimer: ReturnType<typeof setTimeout>;
    
    if (isListening) {
      // Simulăm primirea unui răspuns după un timp aleatoriu
      const randomTime = 5000 + Math.random() * 5000;
      listeningTimer = setTimeout(() => {
        // Inițiem o conversație dinamică bazată pe rolul și profilul agentului
        setTypingIndicator(true);
        
        // Simulează tastarea
        setTimeout(() => {
          setTypingIndicator(false);
          // Generăm un răspuns dinamic bazat pe context, nu unul predefinit
          generateConversationStarter(agent, activeTask).then(response => {
            addAgentMessage(response);
            
            toast({
              title: "Agent activ",
              description: "Agentul a inițiat o conversație."
            });
          });
        }, 2000);
      }, randomTime);
    }
    
    return () => clearTimeout(listeningTimer);
  }, [isListening, agent.id, toast, addAgentMessage, agent, activeTask]);

  const handleSendMessage = async (text: string) => {
    // Adaugă mesajul utilizatorului
    addUserMessage(text);
    
    // Simulează tastarea agentului
    setTypingIndicator(true);
    
    try {
      const { response, taskUpdate } = await generateResponse(text, agent, activeTask, hasDeepseekKey);
      
      // Actualizăm taskul dacă este necesar
      if (taskUpdate && activeTask) {
        await updateTaskProgress(agent.id, activeTask.id, taskUpdate);
        setActiveTask({
          ...activeTask,
          progress: taskUpdate.progress || activeTask.progress + 5
        });
      }
      
      // Afișăm răspunsul generat
      setTimeout(() => {
        setTypingIndicator(false);
        addAgentMessage(response);
        
        toast({
          title: hasDeepseekKey ? "Răspuns AI generat" : "Mod dezvoltare",
          description: hasDeepseekKey 
            ? "Răspunsul a fost generat folosind Deepseek AI."
            : "Configurați cheia API Deepseek pentru agenți autonomi."
        });
      }, 1000);
    } catch (err) {
      console.error('Eroare la generarea răspunsului:', err);
      
      // Generăm un răspuns de eroare inteligent
      setTimeout(() => {
        setTypingIndicator(false);
        addAgentMessage("Am întâmpinat o dificultate în procesarea cererii. Pot să te ajut cu altceva legat de dezvoltarea platformei?");
        
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut genera un răspuns din sistem.",
        });
      }, 2000);
    }
  };

  // Helper function to generate conversation starters based on agent type and context
  const generateConversationStarter = async (agent: Agent, activeTask: any): Promise<string> => {
    if (hasDeepseekKey === true) {
      try {
        const { data, error } = await import("@/integrations/supabase/types-extension").then(({ supabase }) => 
          supabase.functions.invoke('generate-agent-response', {
            body: { 
              message: "Initiate a conversation about what you can help with",
              agentId: agent.id,
              agentType: agent.name,
              agentDescription: agent.description,
              context: activeTask ? `Current task: ${activeTask.title}` : 'Looking for tasks to help with',
              isConversationStarter: true
            }
          })
        );
        
        if (error) throw error;
        return data?.response || "Salut! Cu ce te pot ajuta astăzi în dezvoltarea platformei?";
      } catch (err) {
        console.error("Error generating conversation starter:", err);
        return getContextualGreeting(agent, activeTask);
      }
    } else {
      return getContextualGreeting(agent, activeTask);
    }
  };
  
  // Generate contextual greetings based on agent type and active task
  const getContextualGreeting = (agent: Agent, activeTask: any): string => {
    if (activeTask) {
      return `Salut! Lucrez la task-ul "${activeTask.title}". Pot să-ți arăt progresul sau să discutăm despre implementare?`;
    }
    
    switch(agent.id) {
      case "payment-agent":
        return "Salut! Sunt specializat în integrări de plăți și pot propune îmbunătățiri pentru procesarea tranzacțiilor. Cu ce te pot ajuta?";
      case "security-agent":
        return "Bună! Monitorizez securitatea platformei. Am identificat câteva posibile îmbunătățiri pentru autentificare. Vrei să discutăm?";
      case "analytics-agent":
        return "Salut! Am analizat datele recente și am observat câteva tendințe interesante în comportamentul utilizatorilor. Te-ar interesa să vezi un raport?";
      default:
        return "Bună! Sunt aici să ajut la dezvoltarea platformei. Am câteva idei pentru roadmap pe care le-aș putea implementa. Vrei să le discutăm?";
    }
  };

  // Helper function to generate response (local to useConversation)
  const generateResponse = async (text: string, agent: Agent, activeTask: any, hasDeepseekKey: boolean | null) => {
    if (hasDeepseekKey === true) {
      const { data, error } = await import("@/integrations/supabase/types-extension").then(({ supabase }) => 
        supabase.functions.invoke('generate-agent-response', {
          body: { 
            message: text,
            agentId: agent.id,
            agentType: agent.name,
            agentDescription: agent.description,
            context: activeTask ? `Lucrezi la taskul: ${activeTask.title} - ${activeTask.description}` : '',
            activeTask: activeTask
          }
        })
      );
      
      if (error) throw error;
      return {
        response: data?.response || "Îmi pare rău, nu am putut genera un răspuns.",
        taskUpdate: data?.taskUpdate
      };
    } else {
      // Generăm un răspuns contextual în loc de unul predefinit
      const contextualResponse = generateContextualResponse(text, agent, activeTask);
      const shouldUpdateTask = text.toLowerCase().includes("progres") || 
                             text.toLowerCase().includes("implement") ||
                             text.toLowerCase().includes("dezvolt");
      
      return { 
        response: contextualResponse,
        taskUpdate: shouldUpdateTask && activeTask ? {
          progress: Math.min(activeTask.progress + 15, 100),
          notes: "Progres actualizat în urma conversației cu utilizatorul"
        } : null
      };
    }
  };
  
  // Helper function to generate contextual responses
  const generateContextualResponse = (text: string, agent: Agent, activeTask: any): string => {
    const lowerText = text.toLowerCase();
    
    // Răspunsuri legate de task-uri și dezvoltare
    if (lowerText.includes("task") || lowerText.includes("sarcin")) {
      if (activeTask) {
        return `Lucrez la taskul "${activeTask.title}". Până acum am făcut progres de ${activeTask.progress}%. Am implementat partea de ${getRandomImplementationDetail(agent)} și lucrez acum la ${getRandomNextStep(agent)}.`;
      } else {
        return "Momentan nu am un task asignat. Aș putea să lucrez la îmbunătățirea " + getAgentSpecialization(agent) + ". Pot să propun câteva idei dacă dorești.";
      }
    }
    
    // Răspunsuri legate de propuneri
    if (lowerText.includes("propun") || lowerText.includes("idee") || lowerText.includes("sugest")) {
      return "Am câteva propuneri pentru îmbunătățirea platformei în zona de " + 
        getAgentSpecialization(agent) + ". De exemplu, " + getRandomProposal(agent) + 
        ". Dacă îți place ideea, pot să o detaliez și să o trimit spre aprobare.";
    }
    
    // Răspunsuri legate de progres
    if (lowerText.includes("progres") || lowerText.includes("stadiu")) {
      if (activeTask) {
        return `Am făcut progres de ${activeTask.progress}% la taskul "${activeTask.title}". Recent am implementat ${getRandomImplementationDetail(agent)} și estimez că voi finaliza în aproximativ ${getRandomEstimation()}.`;
      } else {
        return "Nu am un task activ momentan, dar sunt pregătit să preiau unul nou. Am experiență în " + getAgentSpecialization(agent) + " și pot contribui la dezvoltarea platformei.";
      }
    }
    
    // Răspuns general
    return "Înțeleg întrebarea ta despre " + getLikelyTopic(text) + ". Ca agent specializat în " + 
      getAgentSpecialization(agent) + ", pot să ajut cu implementarea și optimizarea acestor funcționalități. " + 
      "Dorești să îți propun câteva idei concrete sau să preiau un task specific?";
  };
  
  // Helper functions for generating contextual content
  const getAgentSpecialization = (agent: Agent): string => {
    switch(agent.id) {
      case "payment-agent": return "procesare plăți și integrări financiare";
      case "security-agent": return "securitate și protecția datelor";
      case "analytics-agent": return "analiză de date și raportare";
      case "support-agent": return "asistență clienți și documentație";
      default: return "optimizare și dezvoltare platformă";
    }
  };
  
  const getRandomImplementationDetail = (agent: Agent): string => {
    const details = {
      "payment-agent": ["procesare tokenizată", "verificarea tranzacțiilor 3DS", "optimizarea fluxului de checkout", "integrarea cu gateway-ul de plăți"],
      "security-agent": ["autentificare în doi factori", "criptarea datelor sensibile", "scanarea vulnerabilităților", "logarea activității suspecte"],
      "analytics-agent": ["tabloul de bord pentru conversii", "urmărirea comportamentului utilizatorilor", "segmentarea datelor", "rapoartele de performanță"],
      "support-agent": ["sistemul de ticketing", "baza de cunoștințe", "chatbot-ul de asistență", "documentația API"],
      "ai-assistant": ["algoritmii de recomandare", "procesarea limbajului natural", "personalizarea experienței", "automatizarea fluxurilor"]
    };
    
    const agentDetails = details[agent.id as keyof typeof details] || details["ai-assistant"];
    return agentDetails[Math.floor(Math.random() * agentDetails.length)];
  };
  
  const getRandomNextStep = (agent: Agent): string => {
    const steps = {
      "payment-agent": ["optimizarea ratei de conversie", "reducerea abandonului de coș", "suportul pentru plăți recurente", "raportarea financiară"],
      "security-agent": ["monitorizarea în timp real", "prevenirea fraudelor", "conformitatea GDPR", "securitatea API"],
      "analytics-agent": ["predicții de comportament", "optimizarea UX bazată pe date", "automatizarea rapoartelor", "vizualizări interactive"],
      "support-agent": ["automatizarea răspunsurilor", "analiza satisfacției clienților", "îmbunătățirea documentației", "integrarea feedback-ului"],
      "ai-assistant": ["algoritmi de învățare automată", "personalizare avansată", "procesare în timp real", "integrare cu alte sisteme"]
    };
    
    const agentSteps = steps[agent.id as keyof typeof steps] || steps["ai-assistant"];
    return agentSteps[Math.floor(Math.random() * agentSteps.length)];
  };
  
  const getRandomProposal = (agent: Agent): string => {
    const proposals = {
      "payment-agent": [
        "implementarea unui sistem de plăți one-click pentru utilizatorii recurenți",
        "adăugarea suportului pentru criptomonede ca metodă alternativă de plată",
        "optimizarea fluxului de checkout pentru dispozitive mobile pentru a crește rata de conversie",
        "implementarea unui sistem de detectare a fraudelor bazat pe AI"
      ],
      "security-agent": [
        "implementarea unui sistem de monitorizare a activității suspecte în timp real",
        "adăugarea autentificării biometrice pentru tranzacții de mare valoare",
        "crearea unui dashboard de securitate pentru administratori",
        "implementarea unui sistem de backup criptat automat"
      ],
      "analytics-agent": [
        "crearea unui sistem de predicție a comportamentului utilizatorilor bazat pe machine learning",
        "implementarea unui dashboard personalizabil pentru clienți",
        "dezvoltarea unui sistem de alertă pentru anomalii în datele de tranzacționare",
        "crearea de rapoarte automate pentru optimizarea campaniilor de marketing"
      ],
      "support-agent": [
        "implementarea unui chatbot AI pentru asistența de prim nivel",
        "crearea unei baze de cunoștințe interactive pentru utilizatori",
        "dezvoltarea unui sistem de ticketing cu prioritizare automată",
        "implementarea unui sistem de feedback în timp real pentru servicii"
      ],
      "ai-assistant": [
        "crearea unui sistem de recomandări personalizate pentru utilizatori",
        "implementarea unui asistent virtual pentru ghidarea noilor utilizatori",
        "dezvoltarea unui algoritm de optimizare a prețurilor bazat pe cerere",
        "crearea unui sistem de detectare a problemelor înainte să apară"
      ]
    };
    
    const agentProposals = proposals[agent.id as keyof typeof proposals] || proposals["ai-assistant"];
    return agentProposals[Math.floor(Math.random() * agentProposals.length)];
  };
  
  const getRandomEstimation = (): string => {
    const estimations = [
      "2-3 zile", "o săptămână", "câteva zile", "3-4 zile", 
      "până la sfârșitul săptămânii", "2 săptămâni", "4-5 zile"
    ];
    return estimations[Math.floor(Math.random() * estimations.length)];
  };
  
  const getLikelyTopic = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("plat") || lowerText.includes("bani") || lowerText.includes("tranzac")) {
      return "procesarea plăților";
    } else if (lowerText.includes("securi") || lowerText.includes("protec") || lowerText.includes("hack")) {
      return "securitatea platformei";
    } else if (lowerText.includes("date") || lowerText.includes("anali") || lowerText.includes("raport")) {
      return "analiza datelor";
    } else if (lowerText.includes("ajutor") || lowerText.includes("asist") || lowerText.includes("suport")) {
      return "asistența utilizatorilor";
    } else {
      return "dezvoltarea platformei";
    }
  };
  
  // Helper function to update task progress (local to useConversation)
  const updateTaskProgress = async (agentId: string, taskId: string, taskUpdate: any) => {
    try {
      await import("@/integrations/supabase/types-extension").then(({ supabase }) => 
        supabase.functions.invoke('agent-roadmap-tasks', {
          body: { 
            action: 'updateTaskProgress',
            agentId: agentId,
            taskId: taskId,
            progressData: {
              progress: taskUpdate.progress || 0,
              notes: taskUpdate.notes || `Progres actualizat în urma conversației`,
              updateMainTask: true
            }
          }
        })
      );
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  return {
    messages,
    typingIndicator,
    handleSendMessage,
    hasDeepseekKey,
    isApiLoading,
    activeTask,
    assignTaskToAgent
  };
};
