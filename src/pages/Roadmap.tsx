
import { Layout } from "@/components/layout/layout";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapCategory } from "@/features/roadmap/components/RoadmapCategory";
import { RoadmapContextProvider } from "@/features/roadmap/context/RoadmapContext";
import { MVPRoadmap } from "@/features/roadmap/components/MVPRoadmap";
import { BackupProgress } from "@/features/roadmap/components/BackupProgress";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Compass, GitFork } from "lucide-react";
import { StyledCard } from "@/components/ui/card-variants";
import { HeaderSecurityScore } from "@/features/roadmap/components/header/HeaderSecurityScore";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  const categoryGroups = [
    {
      title: "Securitate și Infrastructură",
      categories: ["security", "infrastructure"]
    },
    {
      title: "DevOps și Monitorizare",
      categories: ["devops"]
    },
    {
      title: "Dezvoltare Produs",
      categories: ["product"]
    }
  ];

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Compass}
            title="Development Roadmap"
            description="Urmărește progresul și obiectivele de dezvoltare"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitFork className="h-4 w-4" />
              <span className="text-sm">Versiunea 2.0</span>
            </div>
          </PageHeader>

          <div className="space-y-8 max-w-[1400px] mx-auto">
            <StyledCard className="border-primary/10">
              <div className="p-6">
                <HeaderSecurityScore />
                <div className="mt-6">
                  <BackupProgress />
                </div>
              </div>
            </StyledCard>
            
            <RoadmapContextProvider>
              <RoadmapProgress />
              <div className="space-y-6">
                {categoryGroups.map((group, index) => (
                  <RoadmapCategory
                    key={index}
                    title={group.title}
                    categories={group.categories}
                  />
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">MVP Roadmap</h2>
                <MVPRoadmap />
              </div>
            </RoadmapContextProvider>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default Roadmap;
