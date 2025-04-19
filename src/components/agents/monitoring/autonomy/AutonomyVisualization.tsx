import React, { useEffect } from 'react';
import { StyledCard } from '@/components/ui/cards';
import { Sparkles, Brain, Network } from 'lucide-react';
import { AutonomyFeatureCard } from './AutonomyFeatureCard';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';
import { AutoExecutionButton } from './AutoExecutionButton';
import { AdvancedControls } from './AdvancedControls';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAgentMonitoring } from "../hooks";
import { useToast } from "@/hooks/use-toast";

export const AutonomyVisualization: React.FC = () => {
  const { toast } = useToast();
  const { learningProgress, learningReports } = useAgentMonitoring();
  const [showAlert, setShowAlert] = React.useState(true);
  
  useEffect(() => {
    toast({
      title: "TapToGo Autonom implementat",
      description: "Cadrul de autonomie completă este acum funcțional și integrat în toate sistemele.",
      duration: 5000
    });
  }, []);
  
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
  
  useEffect(() => {
    if (learningReports.length > 0) {
      const latestReport = learningReports[0];
      const timeSinceReport = Date.now() - latestReport.learningDate.getTime();
      
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {showAlert && (
          <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
            <AlertTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-500" />
              Autonomie Maximă Activă
            </AlertTitle>
            <AlertDescription>
              Sistemul operează cu autonomie completă și evoluează independent.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AutonomyFeatureCard 
            title="Auto-Evoluție" 
            description="Agenții se adaptează și învață continuu din interacțiuni"
            icon={Sparkles}
            implemented={true}
          />
          <AutonomyFeatureCard 
            title="Decizie Strategică" 
            description="Procesare independentă a deciziilor complexe"
            icon={Brain}
            implemented={true}
          />
          <AutonomyFeatureCard 
            title="Rețea Colaborativă" 
            description="Colaborare și învățare între agenți"
            icon={Network}
            implemented={true}
          />
        </div>

        <StyledCard>
          <div className="p-5">
            <h3 className="text-lg font-medium mb-4">Vizualizare Rețea Autonomă</h3>
            <div className="h-[400px] border rounded-lg overflow-hidden">
              <AgentNetworkGraph />
            </div>
          </div>
        </StyledCard>
      </div>

      <div className="space-y-6">
        <AutoExecutionButton />
        <AdvancedControls />
      </div>
    </div>
  );
};
