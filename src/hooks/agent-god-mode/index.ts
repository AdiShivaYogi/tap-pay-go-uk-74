
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FeedbackItem } from "./types";
import { generateFeedbackAPI } from "./api/generate-feedback";
import { submitFeedbackAPI } from "./api/submit-feedback";
import { useGodModeState, UseGodModeStateProps } from "./state/use-god-mode-state";

interface UseAgentGodModeProps {
  userId?: string;
}

export const useAgentGodMode = (props?: UseAgentGodModeProps) => {
  const { toast } = useToast();
  // Pass the props to useGodModeState
  const { isGodModeEnabled, toggleGodMode, autoExecutionConfig, updateAutoExecutionConfig } = useGodModeState(props);
  
  const [currentSubmission, setCurrentSubmission] = useState<FeedbackItem | null>(null);
  const [currentProposal, setCurrentProposal] = useState<FeedbackItem | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [preferredModel, setPreferredModel] = useState<"deepseek" | "claude" | "anthropic">(
    autoExecutionConfig?.preferredModel || "anthropic" // Default to Anthropic Direct (Claude)
  );

  // Sincronizează modelul preferat cu configurația
  useEffect(() => {
    if (autoExecutionConfig?.preferredModel) {
      setPreferredModel(autoExecutionConfig.preferredModel);
    }
  }, [autoExecutionConfig]);

  const resetState = useCallback(() => {
    setCurrentSubmission(null);
    setCurrentProposal(null);
    setFeedback("");
    setIsGeneratingFeedback(false);
    setIsProcessing(false);
  }, []);

  const generateFeedback = useCallback(async (item: FeedbackItem, itemType: "submission" | "proposal") => {
    if (!props?.userId) {
      toast({
        title: "Eroare",
        description: "Utilizatorul nu este autentificat",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsGeneratingFeedback(true);
      if (itemType === "submission") {
        setCurrentSubmission(item);
      } else {
        setCurrentProposal(item);
      }
      
      const result = await generateFeedbackAPI({
        itemType,
        item,
        userId: props.userId,
        model: preferredModel
      });
      
      if (result?.feedback) {
        setFeedback(result.feedback);
        
        const modelDisplayName = 
          preferredModel === "anthropic" ? "Claude (Anthropic Direct)" : 
          preferredModel === "claude" ? "Claude (OpenRouter)" : 
          "DeepSeek";
        
        toast({
          title: "Feedback generat",
          description: `S-a generat feedback pentru propunerea selectată utilizând ${modelDisplayName}.`
        });
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera feedback. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingFeedback(false);
    }
  }, [props?.userId, toast, preferredModel]);

  const submitFeedback = useCallback(async () => {
    if (!props?.userId || (!currentSubmission && !currentProposal)) {
      toast({
        title: "Eroare",
        description: "Datele pentru feedback sunt incomplete",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const itemType = currentSubmission ? "submission" : "proposal";
      const item = currentSubmission || currentProposal;
      
      if (!item) {
        throw new Error("Nu există un element selectat pentru feedback");
      }
      
      const result = await submitFeedbackAPI({
        itemType,
        itemId: item.id,
        feedback,
        userId: props.userId,
        approve: isGodModeEnabled,
        model: preferredModel
      });
      
      if (result?.success) {
        const modelDisplayName = 
          preferredModel === "anthropic" ? "Claude (Anthropic Direct)" : 
          preferredModel === "claude" ? "Claude (OpenRouter)" : 
          "DeepSeek";
          
        toast({
          title: isGodModeEnabled ? "Propunere aprobată" : "Feedback trimis",
          description: isGodModeEnabled 
            ? `Propunerea a fost aprobată și feedback-ul a fost trimis către agent utilizând ${modelDisplayName}.` 
            : "Feedback-ul a fost trimis către agent."
        });
        resetState();

        // Actualizează modelul preferat în configurație dacă s-a schimbat
        if (autoExecutionConfig && autoExecutionConfig.preferredModel !== preferredModel) {
          updateAutoExecutionConfig({
            preferredModel: preferredModel
          });
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite feedback-ul. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [props?.userId, currentSubmission, currentProposal, feedback, isGodModeEnabled, toast, resetState, preferredModel, autoExecutionConfig, updateAutoExecutionConfig]);

  const handleModelChange = (model: "deepseek" | "claude" | "anthropic") => {
    setPreferredModel(model);
    // Salvăm automat în configurație pentru o experiență mai bună
    if (autoExecutionConfig && updateAutoExecutionConfig) {
      updateAutoExecutionConfig({
        preferredModel: model
      });
    }
  };

  return {
    isGodModeEnabled,
    toggleGodMode,
    currentSubmission,
    currentProposal,
    feedback,
    isGeneratingFeedback,
    isProcessing,
    preferredModel,
    autoExecutionConfig,
    setFeedback,
    setPreferredModel: handleModelChange,
    updateAutoExecutionConfig,
    generateFeedback,
    submitFeedback,
    cancelFeedback: resetState
  };
};
