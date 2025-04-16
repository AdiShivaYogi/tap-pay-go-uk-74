
import React, { useState } from "react";
import { Crown, Brain, ThumbsUp, X, Check, AlertTriangle, BadgeInfo } from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

interface AgentGodModeProps {
  userId: string | undefined;
}

export const AgentGodMode = ({ userId }: AgentGodModeProps) => {
  const { toast } = useToast();
  const [isGodModeEnabled, setIsGodModeEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<any | null>(null);
  const [currentProposal, setCurrentProposal] = useState<any | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"submission" | "proposal" | null>(null);

  // Funcție pentru a activa/dezactiva God Mode
  const toggleGodMode = () => {
    const newState = !isGodModeEnabled;
    setIsGodModeEnabled(newState);
    
    toast({
      title: newState ? "God Mode activat" : "God Mode dezactivat",
      description: newState ? 
        "Propunerile vor fi aprobate automat cu feedback de îmbunătățire" : 
        "Propunerile vor primi doar feedback, fără aprobare automată",
      variant: newState ? "default" : "destructive", // Fixed variant
    });
  };

  // Funcție pentru a genera feedback pentru o propunere
  const generateFeedback = async (type: "submission" | "proposal", item: any) => {
    setIsGeneratingFeedback(true);
    setFeedbackType(type);
    
    if (type === "submission") {
      setCurrentSubmission(item);
      setCurrentProposal(null);
    } else {
      setCurrentProposal(item);
      setCurrentSubmission(null);
    }
    
    try {
      // Generăm feedback folosind DeepSeek
      const promptContent = type === "submission" ? 
        `Analizează această propunere de task de la agentul ${item.agent_id}: 
        Titlu: ${item.roadmap_tasks?.title || "Necunoscut"}
        Descriere: ${item.roadmap_tasks?.description || "Necunoscut"}
        Schimbări propuse: ${item.proposed_changes}
        Progres propus: ${item.proposed_progress}%
        
        Oferă un feedback constructiv și sugestii de îmbunătățire pentru această propunere.` :
        `Analizează această propunere de cod de la agentul ${item.agent_id}:
        Fișiere propuse: ${item.proposed_files}
        Motivație: ${item.motivation}
        
        Oferă un feedback constructiv și sugestii de îmbunătățire pentru acest cod propus.`;
      
      const { data, error } = await supabase.functions.invoke('generate-agent-response', {
        body: { 
          message: promptContent,
          agentType: "Agent Supervisor",
          agentDescription: "Agent specializat în evaluarea și îmbunătățirea propunerilor de la alți agenți",
          isFeedback: true
        }
      });
      
      if (error) throw error;
      setFeedback(data?.response || "Nu s-a putut genera un feedback. Te rugăm încearcă din nou.");
      
    } catch (err) {
      console.error("Eroare la generarea feedbackului:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera feedback pentru această propunere.",
        variant: "destructive"
      });
      setFeedback("Nu s-a putut genera un feedback automat. Te rugăm să scrii un feedback manual.");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  // Funcție pentru a trimite feedback și eventual aproba propunerea
  const submitFeedback = async () => {
    if (!feedback || !feedbackType) return;
    
    setIsProcessing(true);
    try {
      if (feedbackType === "submission" && currentSubmission) {
        // Salvăm feedback-ul pentru submission
        const { error: feedbackError } = await supabase
          .from('agent_feedback')
          .insert({
            submission_id: currentSubmission.id,
            feedback: feedback,
            is_approved: isGodModeEnabled,
            is_god_mode: isGodModeEnabled
          });
          
        if (feedbackError) throw feedbackError;
        
        // Dacă God Mode este activat, aprobăm automat propunerea
        if (isGodModeEnabled) {
          const { error: approveError } = await supabase
            .from('agent_task_submissions')
            .update({ 
              approval_status: 'approved',
              notes: `Aprobat automat în God Mode cu feedback: ${feedback.substring(0, 100)}...`
            })
            .eq('id', currentSubmission.id);
            
          if (approveError) throw approveError;
        }
        
        toast({
          title: isGodModeEnabled ? "Propunere aprobată automat" : "Feedback trimis",
          description: isGodModeEnabled ? 
            "Propunerea a fost aprobată automat și agentul a primit feedback pentru îmbunătățire" : 
            "Feedback-ul a fost trimis către agent pentru îmbunătățirea propunerii",
        });
        
      } else if (feedbackType === "proposal" && currentProposal) {
        // Salvăm feedback-ul pentru proposal
        const { error: feedbackError } = await supabase
          .from('code_proposal_feedback')
          .insert({
            proposal_id: currentProposal.id,
            feedback: feedback,
            is_approved: isGodModeEnabled,
            is_god_mode: isGodModeEnabled
          });
          
        if (feedbackError) throw feedbackError;
        
        // Dacă God Mode este activat, aprobăm automat propunerea
        if (isGodModeEnabled) {
          const currentDate = new Date().toISOString();
          
          const { error: approveError } = await supabase
            .from('code_proposals')
            .update({ 
              status: 'approved',
              approved_at: currentDate,
              approved_by: userId
            })
            .eq('id', currentProposal.id);
            
          if (approveError) throw approveError;
        }
        
        toast({
          title: isGodModeEnabled ? "Propunere de cod aprobată automat" : "Feedback trimis",
          description: isGodModeEnabled ? 
            "Propunerea de cod a fost aprobată automat și agentul a primit feedback pentru îmbunătățire" : 
            "Feedback-ul a fost trimis către agent pentru îmbunătățirea codului propus",
        });
      }
      
      // Resetăm starea
      setCurrentSubmission(null);
      setCurrentProposal(null);
      setFeedback("");
      setFeedbackType(null);
      
    } catch (err) {
      console.error("Eroare la trimiterea feedbackului:", err);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite feedback-ul.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Funcție pentru a anula feedback-ul curent
  const cancelFeedback = () => {
    setCurrentSubmission(null);
    setCurrentProposal(null);
    setFeedback("");
    setFeedbackType(null);
  };

  return (
    <StyledCard className="mb-6">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Crown className={`h-5 w-5 ${isGodModeEnabled ? 'text-amber-500' : 'text-muted-foreground'}`} />
          Agent Supervisor
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">God Mode</h3>
              <Badge 
                variant={isGodModeEnabled ? "default" : "outline"} 
                className={isGodModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                {isGodModeEnabled ? "Activ" : "Inactiv"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isGodModeEnabled 
                ? "Propunerile agenților vor fi aprobate automat cu feedback de îmbunătățire" 
                : "Propunerile agenților vor primi doar feedback, fără aprobare automată"}
            </p>
          </div>
          
          <Switch
            checked={isGodModeEnabled}
            onCheckedChange={toggleGodMode}
          />
        </div>
        
        {isGodModeEnabled && (
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              God Mode este activ! Toate propunerile pentru care generezi feedback vor fi aprobate automat.
            </AlertDescription>
          </Alert>
        )}
        
        {!isGodModeEnabled && (
          <Alert className="mb-4">
            <BadgeInfo className="h-4 w-4" />
            <AlertDescription>
              God Mode este inactiv. Propunerile vor primi feedback pentru îmbunătățire, dar vor necesita aprobare manuală.
            </AlertDescription>
          </Alert>
        )}
        
        {(currentSubmission || currentProposal) && (
          <div className="mt-4 space-y-4 border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {feedbackType === "submission" 
                  ? "Feedback pentru propunere task" 
                  : "Feedback pentru propunere cod"}
              </h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3.5 w-3.5" />
                {feedbackType === "submission" 
                  ? currentSubmission?.agent_id 
                  : currentProposal?.agent_id}
              </Badge>
            </div>
            
            {feedbackType === "submission" && (
              <div className="text-sm">
                <p><span className="font-medium">Titlu:</span> {currentSubmission?.roadmap_tasks?.title || "N/A"}</p>
                <p><span className="font-medium">Descriere:</span> {currentSubmission?.roadmap_tasks?.description || "N/A"}</p>
                <p><span className="font-medium">Schimbări propuse:</span> {currentSubmission?.proposed_changes}</p>
                <p><span className="font-medium">Progres propus:</span> {currentSubmission?.proposed_progress}%</p>
              </div>
            )}
            
            {feedbackType === "proposal" && (
              <div className="text-sm">
                <p><span className="font-medium">Fișiere propuse:</span> {currentProposal?.proposed_files}</p>
                <p><span className="font-medium">Motivație:</span> {currentProposal?.motivation}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback pentru agent
                </label>
                {isGeneratingFeedback && <span className="text-xs text-muted-foreground">Generare feedback...</span>}
              </div>
              
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Scrie feedback constructiv pentru îmbunătățirea propunerii..."
                rows={5}
                disabled={isGeneratingFeedback}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={cancelFeedback}
                disabled={isProcessing}
              >
                <X className="h-4 w-4 mr-1" />
                Anulează
              </Button>
              
              <Button 
                variant={isGodModeEnabled ? "default" : "outline"} 
                size="sm"
                onClick={submitFeedback}
                disabled={!feedback || isProcessing}
                className={isGodModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                {isGodModeEnabled ? (
                  <>
                    <Crown className="h-4 w-4 mr-1" />
                    Trimite feedback și aprobă
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Trimite doar feedback
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        {!currentSubmission && !currentProposal && (
          <div className="mt-4 p-4 border rounded-md text-center">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p>Selectează o propunere pentru a genera feedback și evaluare.</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isGodModeEnabled 
                ? "În God Mode, propunerile vor fi aprobate automat odată cu trimiterea feedbackului." 
                : "Agentul va primi feedback pentru îmbunătățire, dar aprobarea va fi manuală."}
            </p>
          </div>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};
