
import { Layout } from "@/components/layout/layout";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { RoadmapHeader } from "@/features/roadmap/components/RoadmapHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapCategory } from "@/features/roadmap/components/RoadmapCategory";
import { RoadmapContextProvider } from "@/features/roadmap/context/RoadmapContext";
import { MVPRoadmap } from "@/features/roadmap/components/MVPRoadmap";

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
        <div className="container py-8">
          <div className="space-y-8 max-w-[1400px] mx-auto">
            <RoadmapHeader />
            <RoadmapContextProvider>
              <RoadmapProgress />
              <div className="mt-8 space-y-6">
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
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Roadmap;
