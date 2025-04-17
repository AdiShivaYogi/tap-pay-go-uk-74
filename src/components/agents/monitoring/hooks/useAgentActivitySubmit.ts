
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AgentActivityData {
  agentId: string;
  agentName: string;
  category: "task" | "proposal" | "conversation" | "other";
  description: string;
  action?: string;
}

export const useAgentActivitySubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitAgentActivity = useCallback(async (data: AgentActivityData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('monitor-agent-activity', {
        body: {
          agentId: data.agentId,
          agentName: data.agentName,
          category: data.category,
          description: data.description,
          action: data.action
        }
      });

      if (error) throw error;

      toast({
        title: "Activitate înregistrată",
        description: "Activitatea agentului a fost înregistrată cu succes.",
      });

      return true;
    } catch (error) {
      console.error("Eroare la înregistrarea activității:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut înregistra activitatea agentului.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [toast]);

  return {
    submitAgentActivity,
    isSubmitting
  };
};
