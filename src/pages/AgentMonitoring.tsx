
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity, BarChart3, Bot, ChartPie, Shield, Rocket, Sparkles, Zap, Brain, Network } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentActivityMonitor } from "@/components/agents/monitoring/AgentActivityMonitor";
import { AgentProjectCards } from "@/components/agents/monitoring/project-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SafetyInfrastructurePanel } from "@/components/agents/monitoring/safety/SafetyInfrastructurePanel";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { agents } from "@/components/agents/agents-data";
import { AgentAutonomyOverview, AutonomyVisualization, AutonomyCard, AutoExecutionButton } from "@/components/agents/monitoring/autonomy";
import { useSafetyPanel } from "@/components/agents/monitoring/safety/hooks/useSafetyPanel";
import { AgentInnerWorldVisualization } from '@/components/3d-visualizations/AgentInnerWorldVisualization';
import { AgentNetworkGraph } from '@/components/3d-visualizations/AgentNetworkGraph';

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  const { autonomyLevel, agentsRunning } = useSafetyPanel();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Lansare automată inițiată pentru toți agenții",
        description: "Toți agenții autonomi vor fi lansați automat în câteva secunde pentru operațiuni complete.",
        duration: 6000,
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

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
        <div className="flex items-center justify-between">
          <PageHeader
            icon={Activity}
            title="Monitorizare Agenți"
            description="Urmărește activitatea agenților AI și progresul proiectelor de dezvoltare"
          />
          <div className="flex gap-3 items-center">
            <AutoExecutionButton variant="headerButton" />
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm py-1.5 px-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              {agentsRunning ? "Toți Agenții Activi" : "Agenți în Standby"}
            </Badge>
          </div>
        </div>

        {showAutonomyAlert && (
          <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50">
            <AlertTitle className="flex items-center gap-2 text-amber-800">
              <Zap className="h-5 w-5 text-amber-600" /> 
              Lansare Completă Pentru Toți Agenții
            </AlertTitle>
            <AlertDescription className="text-amber-700 flex justify-between items-center">
              <div>
                <p className="mb-1">
                  Pentru accelerarea dezvoltării, au fost lansați toți agenții disponibili ({agents.length}) 
                  cu praguri de siguranță reduse pentru autonomie maximă.
                </p>
                <p className="text-xs">
                  Agenți activi: {agents.map(agent => agent.name).join(", ")}
                </p>
              </div>
              <button 
                onClick={() => setShowAutonomyAlert(false)}
                className="text-xs text-amber-800 hover:text-amber-900"
              >
                Înțeleg
              </button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <AgentAutonomyOverview autonomyLevel={autonomyLevel} agentsRunning={agentsRunning} />
          </div>
          <div className="md:col-span-1">
            <AutonomyCard />
          </div>
        </div>
        
        <div className="mb-6">
          <AutoExecutionButton />
        </div>

        <Tabs defaultValue="autonomy" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="autonomy" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Autonomie & Execuție
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-1">
              <Network className="h-4 w-4" />
              Rețea Agenți
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Infrastructură de siguranță
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <ChartPie className="h-4 w-4" />
              Activitate în timp real
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Proiecte agenți
            </TabsTrigger>
            <TabsTrigger value="inner-world" className="flex items-center gap-1">
              <Rocket className="h-4 w-4" />
              Lumea Interioară
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="autonomy">
            <SafetyInfrastructurePanel />
          </TabsContent>
          
          <TabsContent value="network">
            <div className="mb-4">
              <h2 className="text-xl font-medium mb-2">Vizualizare Rețea Agenți Autonomi</h2>
              <p className="text-muted-foreground">
                Explorați interconectarea și nivelurile de autonomie ale agenților din sistem prin vizualizarea 3D interactivă.
                Utilizați mouse-ul pentru a roti și examina relațiile dintre agenți.
              </p>
            </div>
            <div className="h-[500px] border rounded-lg overflow-hidden">
              <AgentNetworkGraph />
            </div>
          </TabsContent>
          
          <TabsContent value="safety">
            <div className="mb-4">
              <h2 className="text-xl font-medium mb-2">Sistemul de siguranță pentru agenții autonomi</h2>
              <p className="text-muted-foreground">
                Monitorizați și gestionați infrastructura de siguranță pentru agenții autonomi,
                incluzând sisteme de siguranță active, mecanisme de monitorizare și sisteme de control.
              </p>
            </div>
            <SafetyInfrastructurePanel />
          </TabsContent>
          
          <TabsContent value="activity">
            <AgentActivityMonitor />
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Proiecte pentru dezvoltarea agenților</h2>
              <p className="text-muted-foreground">
                Vizualizați progresul implementărilor pentru agenții AI, inclusiv funcționalități curente, 
                priorități active și planurile de viitor pentru sistemul de agenți.
              </p>
            </div>
            <AgentProjectCards />
          </TabsContent>
          
          <TabsContent value="inner-world">
            <div className="mb-4">
              <h2 className="text-xl font-medium mb-2">Lumea Interioară a Agenților</h2>
              <p className="text-muted-foreground">
                Explorați sistemele interne și procesele cognitive ale fiecărui agent.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agents.map(agent => (
                <div key={agent.id} className="h-[300px] border rounded-lg p-2">
                  <h3 className="text-center mb-2">{agent.name}</h3>
                  <AgentInnerWorldVisualization agentId={agent.id} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentMonitoring;
