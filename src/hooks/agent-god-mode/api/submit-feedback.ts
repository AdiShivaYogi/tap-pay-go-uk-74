
import { supabase } from "@/integrations/supabase/client";
import { SubmitFeedbackParams } from "../types";

export const submitFeedbackAPI = async (params: SubmitFeedbackParams): Promise<{ success: boolean }> => {
  const { itemType, itemId, feedback, userId, approve, model } = params;
  
  try {
    // Logăm activitatea pentru debugging și monitorizare
    console.log(`Procesare feedback pentru ${itemType} cu ID ${itemId} folosind modelul ${model || 'deepseek'}`);
    console.log(`Status aprobat: ${approve ? 'DA' : 'NU'}, feedback de la utilizatorul ${userId}`);
    
    // Using this approach instead of dynamic table names to avoid type issues
    // For submissions
    if (itemType === "submission") {
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({
          approval_status: approve ? 'approved' : 'feedback',
          feedback: feedback,
          feedback_by: userId,
          updated_at: new Date().toISOString(),
          feedback_model: model || 'deepseek',
          learning_insights: approve ? generateLearningInsights(feedback) : null
        })
        .eq('id', itemId);
        
      if (error) {
        console.error(`Eroare la actualizarea submission ${itemId}:`, error);
        throw error;
      }
      
      // Înregistrăm activitatea de învățare dacă e aprobată
      if (approve) {
        try {
          await recordAgentLearning(itemId, "submission", feedback);
        } catch (learningErr) {
          console.warn("Avertisment: Nu s-a putut înregistra progresul învățării", learningErr);
          // Continuăm execuția - eroarea nu e blocantă
        }
      }
    } 
    // For code proposals
    else {
      const { error } = await supabase
        .from('code_proposals')
        .update({
          status: approve ? 'approved' : 'feedback',
          feedback: feedback,
          feedback_by: userId,
          updated_at: new Date().toISOString(),
          feedback_model: model || 'deepseek',
          learning_insights: approve ? generateLearningInsights(feedback) : null
        })
        .eq('id', itemId);
        
      if (error) {
        console.error(`Eroare la actualizarea proposal ${itemId}:`, error);
        throw error;
      }
      
      // Înregistrăm activitatea de învățare pentru cod dacă e aprobată
      if (approve) {
        try {
          await recordAgentLearning(itemId, "proposal", feedback);
        } catch (learningErr) {
          console.warn("Avertisment: Nu s-a putut înregistra progresul învățării pentru cod", learningErr);
          // Continuăm execuția - eroarea nu e blocantă
        }
      }
    }
    
    console.log(`Feedback procesat cu succes pentru ${itemType} cu ID ${itemId}`);
    return { success: true };
  } catch (err) {
    console.error('Exception in submitFeedbackAPI:', err);
    throw err;
  }
};

// Funcție pentru generarea de insights de învățare din feedback
function generateLearningInsights(feedback: string): string {
  const insights = [];
  
  // Analizăm complexitatea feedbackului
  if (feedback.length > 300) {
    insights.push("Feedback detaliat analizat și asimilat");
  }
  
  // Identificăm paternuri de învățare din feedback
  if (feedback.includes("îmbunătăți") || feedback.includes("optimiza")) {
    insights.push("Identificat pattern pentru optimizare");
  }
  
  if (feedback.includes("eroare") || feedback.includes("bug") || feedback.includes("problema")) {
    insights.push("Corectare patern de eroare identificat");
  }
  
  if (feedback.includes("felicitări") || feedback.includes("bine") || feedback.includes("corect")) {
    insights.push("Consolidat comportament pozitiv");
  }
  
  // Generăm insight de evoluție pe baza lungimii feedback-ului
  insights.push(`Asimilat ${Math.round(feedback.length / 10)} unități de cunoștințe`);
  
  return insights.join("; ");
}

// Înregistrăm activitatea de învățare în sistemul de monitorizare
async function recordAgentLearning(itemId: string, itemType: string, feedback: string): Promise<void> {
  try {
    const sourceType = itemType === "submission" ? "task_feedback" : "code_feedback";
    const learningSummary = `Auto-evoluție prin feedback: ${feedback.substring(0, 50)}${feedback.length > 50 ? '...' : ''}`;
    
    // Calculăm scorul de complexitate pentru învățare
    const complexityScore = Math.min(
      Math.round((feedback.length / 100) + (feedback.split(' ').length / 20)),
      100
    );
    
    await supabase.from('agent_learning_activities').insert({
      source_id: itemId,
      source_type: sourceType,
      learning_summary: learningSummary,
      complexity_score: complexityScore,
      knowledge_units: Math.round(feedback.length / 15),
      created_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Eroare la înregistrarea activității de învățare:', error);
    throw error;
  }
}

// Aliasuri pentru compatibilitate înapoi
export const submitSubmissionFeedback = (params: Omit<SubmitFeedbackParams, 'itemType'>) => 
  submitFeedbackAPI({ ...params, itemType: "submission" });

export const submitProposalFeedback = (params: Omit<SubmitFeedbackParams, 'itemType'>) => 
  submitFeedbackAPI({ ...params, itemType: "proposal" });
