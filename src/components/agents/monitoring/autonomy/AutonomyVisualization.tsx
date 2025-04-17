
import React, { useEffect } from 'react';
import { StyledCard } from '@/components/ui/cards';
import { Sparkles, Zap, Brain, Network, CheckCircle2 } from 'lucide-react';
import { AutonomyFeatureCard } from './AutonomyFeatureCard';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';
import { AutoExecutionButton } from './AutoExecutionButton';
import { AutonomyCard } from './AutonomyCard';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAgentMonitoring } from "../hooks";
import { useToast } from "@/hooks/use-toast";

export const AutonomyVisualization: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(true); // Setăm alerta să fie vizibilă implicit
  const { learningReports, learningProgress } = useAgentMonitoring();
  const { toast } = useToast();
  
  // Arătăm alerta deoarece toate task-urile sunt acum completate
  useEffect(() => {
    // Lansăm o notificare despre implementarea completă
    toast({
      title: "TapToGo Autonom implementat",
      description: "Cadrul de autonomie completă este acum funcțional și integrat în toate sistemele.",
      duration: 5000
    });
  }, []);
  
  // Afișăm notificări pentru noile procese de învățare
  useEffect(() => {
    if (learningProgress.length > 0) {
      const activeTasks = learningProgress.filter(p => p.status === 'in-progress');
      if (activeTasks.length > 0) {
        toast({
          title: "Auto-îmbunătățire în curs",
          description: `${activeTasks.length} procese de auto-îmbunătățire sunt active. Sistemul evoluează autonom.`,
          duration: 5000
        });
      }
    }
  }, [learningProgress, toast]);
  
  // Verificăm dacă există rapoarte noi de învățare
  useEffect(() => {
    if (learningReports.length > 0) {
      // Verificăm doar ultimul raport adăugat
      const latestReport = learningReports[0];
      const timeSinceReport = Date.now() - latestReport.learningDate.getTime();
      
      // Afișăm notificări doar pentru rapoarte create în ultimele 10 secunde
      if (timeSinceReport < 10000) {
        toast({
          title: "Raport nou de auto-îmbunătățire",
          description: `${latestReport.sourceAgentName} a învățat "${latestReport.learningType}" de la ${latestReport.targetAgentName}`,
          duration: 5000
        });
      }
    }
  }, [learningReports.length, learningReports, toast]);
  
  return (
    <div className="space-y-6">
      {showAlert && (
        <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
          <AlertTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            TapToGo Autonom Complet
          </AlertTitle>
          <AlertDescription>
            Toți agenții funcționează acum în mod complet autonom. Sistemul a evoluat pentru a gestiona toate aspectele operaționale fără intervenție umană.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AutonomyFeatureCard 
          title="Auto-Evoluție" 
          description="Agenții se adaptează și își îmbunătățesc continuu capabilitățile, învățând din interacțiuni anterioare."
          icon={Sparkles}
          implemented={true}
        />
        <AutonomyFeatureCard 
          title="Decizie Independentă" 
          description="Algoritmi avansați permit agenților să ia decizii complexe fără intervenție umană directă."
          icon={Brain}
          implemented={true}
        />
        <AutonomyFeatureCard 
          title="Comunicare Inter-Agent" 
          description="Rețea de comunicare care permite agenților să partajeze cunoștințe și să colaboreze la sarcini."
          icon={Network}
          implemented={true}
        />
      </div>
      
      <div className="mb-6">
        <AutoExecutionButton completed={true} disabled={true} />
      </div>
      
      <StyledCard>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium">Vizualizare Rețea Autonomă 3D</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Explorați conexiunile și relațiile dintre agenții autonomi TapToGo. Interacționați direct cu vizualizarea pentru a examina diferitele niveluri de autonomie și legăturile funcționale.
          </p>
          <div className="h-[500px] border rounded-lg overflow-hidden">
            <AgentNetworkGraph />
          </div>
        </div>
      </StyledCard>
    </div>
  );
};
