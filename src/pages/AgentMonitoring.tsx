
import React from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Activity, BarChart3, Bot, ChartPie, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { AgentActivityMonitor } from "@/components/agents/monitoring/AgentActivityMonitor";
import { AgentProjectCards } from "@/components/agents/monitoring/project-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SafetyInfrastructurePanel } from "@/components/agents/monitoring/safety/SafetyInfrastructurePanel";

const AgentMonitoring = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

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
          icon={Activity}
          title="Monitorizare Agenți"
          description="Urmărește activitatea agenților AI și progresul proiectelor de dezvoltare"
        />

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <ChartPie className="h-4 w-4" />
              Activitate în timp real
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Proiecte agenți
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Infrastructură de siguranță
            </TabsTrigger>
          </TabsList>
          
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
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AgentMonitoring;
