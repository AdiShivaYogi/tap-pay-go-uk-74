
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity, BarChart3, Bot, ChartPie, Shield, Rocket, Sparkles, Zap } from "lucide-react";
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

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  
  // Afișează toast la încărcarea paginii pentru a evidenția prioritatea lansării tuturor agenților
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
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm py-1.5 px-3 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Toți Agenții Activați
          </Badge>
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

        <Tabs defaultValue="safety" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="safety" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Infrastructură de siguranță
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Proiecte agenți
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <ChartPie className="h-4 w-4" />
              Activitate în timp real
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="safety">
            <SafetyInfrastructurePanel />
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
          
          <TabsContent value="activity">
            <AgentActivityMonitor />
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentMonitoring;
