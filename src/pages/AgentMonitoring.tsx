
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity, BarChart3, Bot, ChartPie, Shield, Rocket, Sparkles } from "lucide-react";
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

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [showAutonomyAlert, setShowAutonomyAlert] = useState(true);
  
  // Afișează toast la încărcarea paginii pentru a evidenția prioritatea
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Prioritate #1: Lansare Agenți Autonomi",
        description: "Acceptarea unor riscuri inițiale este necesară pentru accelerarea progresului.",
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
            Noua Eră a Autonomiei
          </Badge>
        </div>

        {showAutonomyAlert && (
          <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50">
            <AlertTitle className="flex items-center gap-2 text-amber-800">
              <Rocket className="h-5 w-5 text-amber-600" /> 
              Prioritate #1: Pornire Agenți Autonomi
            </AlertTitle>
            <AlertDescription className="text-amber-700 flex justify-between items-center">
              <span>
                Pentru accelerarea dezvoltării, este necesară acceptarea unor riscuri inițiale și 
                lansarea agenților în mod autonom. Accesați panoul de Infrastructură de Siguranță pentru configurare.
              </span>
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
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Infrastructură de siguranță și control execuție</h2>
              <p className="text-muted-foreground">
                Gestionează mecanismele de limitare și sistemele de execuție autonomă pentru agenți,
                asigurând operațiuni sigure și controlate în cadrul parametrilor stabiliți.
              </p>
            </div>
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
