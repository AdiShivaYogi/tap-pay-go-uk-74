import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { roadmapItems } from "@/features/roadmap/data/roadmap-data";
import { useUserRole } from "@/hooks/use-user-role";
import { Separator } from "@/components/ui/separator";
import { calculateSecurityScore, getSecurityCriteria, getSecurityDetails } from "@/utils/security-score";
import { useState, useMemo } from "react";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { RoadmapHeader } from "@/features/roadmap/components/RoadmapHeader";
import { PriorityTaskFilter } from "@/features/roadmap/components/PriorityTaskFilter";
import { PriorityTasksAlert } from "@/features/roadmap/components/PriorityTasksAlert";
import { BetaLaunchProgress } from "@/features/roadmap/components/BetaLaunchProgress";
import { BetaUsersMonitoring } from "@/features/beta/components/BetaUsersMonitoring";
import { FeedbackCollection } from "@/features/beta/components/FeedbackCollection";
import { PaymentTestingPanel } from "@/features/beta/components/PaymentTestingPanel";
import { MorningPriorityTasks } from "@/features/roadmap/components/MorningPriorityTasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MVPRoadmap } from "@/features/roadmap/components/MVPRoadmap";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const isMorning = useMemo(() => {
    const currentHour = new Date().getHours();
    return currentHour < 12;
  }, []);

  const highPriorityItems = useMemo(() => 
    roadmapItems.filter(item => item.priority === "high"), 
    []
  );

  const categorizedHighPriorityItems = useMemo(() => ({
    product: highPriorityItems.filter(item => item.category === "product").length,
    development: highPriorityItems.filter(item => item.category === "development").length,
    infrastructure: highPriorityItems.filter(item => item.category === "infrastructure").length,
    security: highPriorityItems.filter(item => item.category === "security").length,
    devops: highPriorityItems.filter(item => item.category === "devops").length,
    other: highPriorityItems.filter(item => item.category === "other").length
  }), [highPriorityItems]);

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
            {/* Header Section */}
            <RoadmapHeader />
            
            {/* Morning Tasks Section - Conditional */}
            {isMorning && (
              <div className="animate-in slide-in-from-bottom fade-in duration-700">
                <MorningPriorityTasks />
              </div>
            )}
            
            {/* Priority Tasks Alert */}
            {highPriorityItems.length > 0 && (
              <PriorityTasksAlert 
                highPriorityItemsCount={highPriorityItems.length}
                categoryCounts={categorizedHighPriorityItems}
              />
            )}

            {/* Tasks Tabs Section */}
            <div className="bg-card rounded-lg p-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="all">Toate Task-urile</TabsTrigger>
                  <TabsTrigger 
                    value="high-priority" 
                    className="bg-amber-500/10 hover:bg-amber-500/20 data-[state=active]:bg-amber-500/20"
                  >
                    Prioritate Înaltă ({highPriorityItems.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="completed"
                    className="bg-green-500/10 hover:bg-green-500/20 data-[state=active]:bg-green-500/20"
                  >
                    Completate
                  </TabsTrigger>
                  <TabsTrigger 
                    value="in-progress"
                    className="bg-blue-500/10 hover:bg-blue-500/20 data-[state=active]:bg-blue-500/20"
                  >
                    În Lucru
                  </TabsTrigger>
                  <TabsTrigger value="pending">În Așteptare</TabsTrigger>
                </TabsList>

                <TabsContent value="high-priority" className="mt-0">
                  <PriorityTaskFilter 
                    activeCategory={activeCategory} 
                    onCategoryChange={setActiveCategory}
                    categoryCounts={categorizedHighPriorityItems}
                  />
                  
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {highPriorityItems
                      .filter(item => activeCategory === "all" || item.category === activeCategory)
                      .map((item, index) => (
                        <RoadmapCard key={index} item={item} />
                      ))}
                  </div>
                </TabsContent>

                {["all", "completed", "in-progress", "pending"].map((tabValue) => (
                  <TabsContent key={tabValue} value={tabValue} className="mt-0">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 animate-in fade-in-50">
                      {roadmapItems
                        .filter(item => tabValue === "all" || item.status === tabValue)
                        .map((item, index) => (
                          <RoadmapCard key={index} item={item} />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Roadmap;
