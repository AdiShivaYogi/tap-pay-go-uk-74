
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Bot, Check, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { supabase } from "@/integrations/supabase/types-extension"; // Folosim supabase din noul fișier de tipuri
import { 
  StyledCard, 
  StyledCardHeader, 
  StyledCardTitle, 
  StyledCardContent 
} from "@/components/ui/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const AgentAdmin = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [progressHistory, setProgressHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obține propunerile de taskuri în așteptare
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('agent_task_submissions')
          .select('*, roadmap_tasks(*)')
          .eq('approval_status', 'pending')
          .order('created_at', { ascending: false });
          
        if (submissionsError) throw submissionsError;
        
        // Obține istoricul progresului pentru taskuri
        const { data: progressData, error: progressError } = await supabase
          .from('agent_task_progress')
          .select('*, roadmap_tasks(*)')
          .order('created_at', { ascending: false })
          .limit(20);
          
        if (progressError) throw progressError;
        
        setSubmissions(submissionsData || []);
        setProgressHistory(progressData || []);
      } catch (err) {
        console.error('Eroare la încărcarea datelor:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAdmin]);
  
  const handleApproveSubmission = async (submissionId: string) => {
    try {
      // Obține detaliile despre submission
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) return;
      
      // Actualizează statusul submission-ului
      const { error: updateSubmissionError } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'approved' })
        .eq('id', submissionId);
        
      if (updateSubmissionError) throw updateSubmissionError;
      
      // Actualizează taskul principal
      const { error: updateTaskError } = await supabase
        .from('roadmap_tasks')
        .update({
          status: submission.proposed_status,
          progress: submission.proposed_progress,
          last_updated_by: 'admin',
          last_updated_at: new Date().toISOString()
        })
        .eq('id', submission.task_id);
        
      if (updateTaskError) throw updateTaskError;
      
      // Actualizează lista locală
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      
      toast({ 
        title: "Propunere aprobată", 
        description: "Schimbările au fost aplicate taskului."
      });
    } catch (err) {
      console.error('Eroare la aprobarea propunerii:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut aproba propunerea.",
        variant: "destructive"
      });
    }
  };
  
  const handleRejectSubmission = async (submissionId: string) => {
    try {
      // Actualizează statusul submission-ului
      const { error } = await supabase
        .from('agent_task_submissions')
        .update({ approval_status: 'rejected' })
        .eq('id', submissionId);
        
      if (error) throw error;
      
      // Actualizează lista locală
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      
      toast({ 
        title: "Propunere respinsă", 
        description: "Propunerea a fost respinsă și nu va fi aplicată."
      });
    } catch (err) {
      console.error('Eroare la respingerea propunerii:', err);
      toast({ 
        title: "Eroare", 
        description: "Nu s-a putut respinge propunerea.",
        variant: "destructive"
      });
    }
  };
  
  // Component pentru afișarea unui status badge
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex gap-1 items-center">
            <Check className="h-3 w-3" />
            <span>Finalizat</span>
          </Badge>
        );
      case "inProgress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex gap-1 items-center">
            <Clock className="h-3 w-3" />
            <span>În progres</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex gap-1 items-center">
            <AlertCircle className="h-3 w-3" />
            <span>Planificat</span>
          </Badge>
        );
    }
  };
  
  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }
  
  if (!isAdmin) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="admin" />
        </Section>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Bot}
          title="Administrare Agenți"
          description="Gestionează activitatea și contribuțiile agenților la dezvoltarea platformei"
        />
        
        <Tabs defaultValue="submissions" className="mt-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="submissions">Propuneri în așteptare {submissions.length > 0 && `(${submissions.length})`}</TabsTrigger>
            <TabsTrigger value="history">Istoric activitate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submissions">
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Propuneri de la agenți în așteptarea aprobării</StyledCardTitle>
              </StyledCardHeader>
              
              <StyledCardContent>
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <StyledCard key={submission.id} className="border-primary/10">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{submission.roadmap_tasks?.title}</h3>
                              <p className="text-sm text-muted-foreground">{submission.roadmap_tasks?.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <StatusBadge status={submission.roadmap_tasks?.status} />
                              <ChevronRight className="h-4 w-4" />
                              <StatusBadge status={submission.proposed_status} />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Progres curent: {submission.roadmap_tasks?.progress || 0}%</span>
                              <span className="text-sm font-medium">Propus: {submission.proposed_progress}%</span>
                            </div>
                            
                            <div className="relative h-2">
                              <Progress value={submission.roadmap_tasks?.progress || 0} className="h-2" />
                              <div 
                                className="absolute top-0 h-2 bg-primary/30" 
                                style={{ 
                                  width: `${submission.proposed_progress}%`,
                                  left: `${submission.roadmap_tasks?.progress || 0}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="font-medium text-sm mb-1">Modificări propuse:</h4>
                            <p className="text-sm p-3 bg-muted rounded-md">{submission.proposed_changes}</p>
                          </div>
                          
                          {submission.notes && (
                            <div className="mt-3">
                              <h4 className="font-medium text-sm mb-1">Note:</h4>
                              <p className="text-sm italic text-muted-foreground">{submission.notes}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end gap-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectSubmission(submission.id)}
                            >
                              Respinge
                            </Button>
                            
                            <Button 
                              size="sm"
                              onClick={() => handleApproveSubmission(submission.id)}
                            >
                              Aprobă
                            </Button>
                          </div>
                        </div>
                      </StyledCard>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nu există propuneri în așteptare de la agenți.
                    </p>
                  </div>
                )}
              </StyledCardContent>
            </StyledCard>
          </TabsContent>
          
          <TabsContent value="history">
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Istoric activitate agenți</StyledCardTitle>
              </StyledCardHeader>
              
              <StyledCardContent>
                {progressHistory.length > 0 ? (
                  <div className="space-y-3">
                    {progressHistory.map((progress) => (
                      <div key={progress.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{progress.roadmap_tasks?.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Agent: {progress.agent_id} • 
                              {new Date(progress.created_at).toLocaleDateString('ro-RO', {
                                day: 'numeric', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <Badge variant={progress.status === 'approved' ? 'default' : 'outline'}>
                            {progress.status === 'approved' ? 'Aprobat' : 'În progres'}
                          </Badge>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between items-center text-sm">
                          <span>Progres: {progress.progress_percentage}%</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Task status:</span>
                            <StatusBadge status={progress.roadmap_tasks?.status} />
                          </div>
                        </div>
                        
                        {progress.notes && (
                          <p className="text-xs italic mt-2 text-muted-foreground">{progress.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nu există activitate înregistrată de la agenți.
                    </p>
                  </div>
                )}
              </StyledCardContent>
            </StyledCard>
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentAdmin;
