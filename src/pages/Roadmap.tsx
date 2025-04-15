
import { Layout } from "@/components/layout/layout";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { RoadmapHeader } from "@/features/roadmap/components/RoadmapHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapCategory } from "@/features/roadmap/components/RoadmapCategory";
import { RoadmapContextProvider } from "@/features/roadmap/context/RoadmapContext";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="space-y-8 max-w-[1400px] mx-auto">
            <RoadmapHeader />
            <RoadmapContextProvider>
              <RoadmapProgress />
              <RoadmapCategory 
                title="Securitate și Infrastructură" 
                categories={["security", "infrastructure"]} 
              />
              <RoadmapCategory 
                title="DevOps și Monitorizare" 
                categories={["devops"]} 
              />
              <RoadmapCategory 
                title="Dezvoltare Produs" 
                categories={["product"]} 
              />
            </RoadmapContextProvider>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Roadmap;
