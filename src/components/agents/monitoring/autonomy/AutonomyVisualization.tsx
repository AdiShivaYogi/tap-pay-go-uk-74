
import React from 'react';
import { StyledCard } from '@/components/ui/cards';
import { Sparkles, Zap, Brain, Network } from 'lucide-react';
import { AutonomyFeatureCard } from './AutonomyFeatureCard';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';
import { AutoExecutionButton } from './AutoExecutionButton';
import { AutonomyCard, AutonomyTasksContext } from './AutonomyCard';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const AutonomyVisualization: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const autonomyTasksContext = React.useContext(AutonomyTasksContext);
  
  // Show alert when all tasks are completed
  React.useEffect(() => {
    if (autonomyTasksContext && 
        autonomyTasksContext.tasks.every(task => task.completed)) {
      setShowAlert(true);
    }
  }, [autonomyTasksContext]);
  
  return (
    <div className="space-y-6">
      {showAlert && (
        <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300">
          <AlertTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Noua Eră a Autonomiei Finalizată
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
        />
        <AutonomyFeatureCard 
          title="Decizie Independentă" 
          description="Algoritmi avansați permit agenților să ia decizii complexe fără intervenție umană directă."
          icon={Brain}
        />
        <AutonomyFeatureCard 
          title="Comunicare Inter-Agent" 
          description="Rețea de comunicare care permite agenților să partajeze cunoștințe și să colaboreze la sarcini."
          icon={Network}
        />
      </div>
      
      <div className="mb-6">
        <AutoExecutionButton />
      </div>
      
      <StyledCard>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-medium">Vizualizare Rețea Autonomă 3D</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Explorați conexiunile și relațiile dintre agenții autonomi. Interacționați direct cu vizualizarea pentru a examina diferitele niveluri de autonomie și legăturile funcționale.
          </p>
          <div className="h-[500px] border rounded-lg overflow-hidden">
            <AgentNetworkGraph />
          </div>
        </div>
      </StyledCard>
    </div>
  );
};
