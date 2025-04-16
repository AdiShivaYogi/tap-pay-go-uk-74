
import { toast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";

export const handleApproveCodeProposal = async (
  proposalId: string,
  userId: string | undefined,
  codeProposals: any[],
  setCodeProposals: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (!proposalId) {
    toast({ 
      title: "Eroare", 
      description: "ID-ul propunerii lipsește.",
      variant: "destructive"
    });
    throw new Error("ID-ul propunerii lipsește");
  }
  
  try {
    // Actualizează statusul propunerii de cod
    const { error } = await supabase
      .from('code_proposals')
      .update({ 
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: userId || null
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
    throw err; // Re-aruncă eroarea pentru a fi prinsă de componenta care apelează
  }
};

export const handleRejectCodeProposal = async (
  proposalId: string,
  userId: string | undefined,
  reason: string | undefined,
  codeProposals: any[],
  setCodeProposals: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (!proposalId) {
    toast({ 
      title: "Eroare", 
      description: "ID-ul propunerii lipsește.",
      variant: "destructive"
    });
    throw new Error("ID-ul propunerii lipsește");
  }
  
  try {
    // Actualizează statusul propunerii de cod
    const { error } = await supabase
      .from('code_proposals')
      .update({ 
        status: 'rejected',
        rejected_at: new Date().toISOString(),
        rejected_by: userId || null,
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
    throw err; // Re-aruncă eroarea pentru a fi prinsă de componenta care apelează
  }
};
