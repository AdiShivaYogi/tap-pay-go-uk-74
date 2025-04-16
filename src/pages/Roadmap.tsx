
import { Layout } from "@/components/layout/layout";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapCategory } from "@/features/roadmap/components/RoadmapCategory";
import { RoadmapContextProvider } from "@/features/roadmap/context/RoadmapContext";
import { StyledCard } from "@/components/ui/styled-card";
import { HeaderSecurityScore } from "@/features/roadmap/components/header/HeaderSecurityScore";
import { HeaderExecutionScore } from "@/features/roadmap/components/header/HeaderExecutionScore";
import { Compass, GitFork, Globe, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { BackupProgress } from "@/features/roadmap/components/BackupProgress";
import { ProgressOptimizationPanel } from "@/features/roadmap/components/ProgressOptimizationPanel";
import { ThemeManagerCard } from "@/components/theme/ThemeManagerCard";
import { GlobalCssManager } from "@/components/theme/GlobalCssManager";
import { Button } from "@/components/ui/button";
import { useGlobalCssManager } from "@/components/theme/GlobalCssManagerProvider";
import { CurrentRoadmapFocus } from "@/features/roadmap/components/CurrentRoadmapFocus";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const { toggleManager } = useGlobalCssManager();

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  const categoryGroups = [
    {
      title: "Securitate și Conformitate",
      categories: ["security", "payment"]
    },
    {
      title: "Infrastructură și Disponibilitate",
      categories: ["infrastructure", "devops"]
    },
    {
      title: "Monitorizare și Performanță",
      categories: ["monitoring"]
    },
    {
      title: "Dezvoltare Produs",
      categories: ["product", "ui"]
    },
    {
      title: "Parteneriate și Colaborări",
      categories: ["partnership"]
    }
  ];

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Compass}
            title="Development Roadmap"
            description="Progresul și obiectivele de dezvoltare pentru piața UK și integrare Stripe"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span className="text-sm">Versiunea 2.0</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-sm">UK & Global Stripe Markets</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleManager}
                className="flex items-center gap-2 ml-4"
              >
                <Wand2 className="h-4 w-4" />
                <span>Activare Manager CSS</span>
              </Button>
            </div>
          </PageHeader>

          <div className="space-y-8 max-w-[1400px] mx-auto">
            <StyledCard className="border-primary/10">
              <div className="p-6 space-y-6">
                <HeaderSecurityScore />
                <HeaderExecutionScore />
                <div className="mt-6">
                  <BackupProgress />
                </div>
              </div>
            </StyledCard>
            
            <div className="grid gap-8 grid-cols-1">
              {/* Highlighted Focus and Recent Achievements */}
              <CurrentRoadmapFocus />
            </div>

            <GlobalCssManager />
            
            <ThemeManagerCard />
            
            <ProgressOptimizationPanel />
            
            <RoadmapContextProvider>
              <RoadmapProgress />
              <div className="space-y-6 mt-8">
                {categoryGroups.map((group, index) => (
                  <RoadmapCategory
                    key={index}
                    title={group.title}
                    categories={group.categories}
                  />
                ))}
              </div>
            </RoadmapContextProvider>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default Roadmap;
