
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/types-extension";

export const handleApproveCodeProposal = async (
  proposalId: string,
  userId: string | undefined,
  codeProposals: any[],
  setCodeProposals: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    // Actualizează statusul propunerii de cod
    const { error } = await supabase
      .from('code_proposals')
      .update({ 
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: userId
      })
      .eq('id', proposalId);
      
    if (error) throw error;
    
    // Actualizează lista locală
    setCodeProposals(codeProposals.filter(p => p.id !== proposalId));
    
    toast({ 
      title: "Propunere de cod aprobată", 
      description: "Codul propus a fost aprobat pentru implementare."
    });
  } catch (err) {
    console.error('Eroare la aprobarea propunerii de cod:', err);
    toast({ 
      title: "Eroare", 
      description: "Nu s-a putut aproba propunerea de cod.",
      variant: "destructive"
    });
  }
};

export const handleRejectCodeProposal = async (
  proposalId: string,
  userId: string | undefined,
  reason: string | undefined,
  codeProposals: any[],
  setCodeProposals: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    // Actualizează statusul propunerii de cod
    const { error } = await supabase
      .from('code_proposals')
      .update({ 
        status: 'rejected',
        rejected_at: new Date().toISOString(),
        rejected_by: userId,
        rejection_reason: reason || null
      })
      .eq('id', proposalId);
      
    if (error) throw error;
    
    // Actualizează lista locală
    setCodeProposals(codeProposals.filter(p => p.id !== proposalId));
    
    toast({ 
      title: "Propunere de cod respinsă", 
      description: "Propunerea de cod a fost respinsă și nu va fi implementată."
    });
  } catch (err) {
    console.error('Eroare la respingerea propunerii de cod:', err);
    toast({ 
      title: "Eroare", 
      description: "Nu s-a putut respinge propunerea de cod.",
      variant: "destructive"
    });
  }
};
