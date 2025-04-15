import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { roadmapItems } from "@/features/roadmap/data/roadmap-data";
import { useUserRole } from "@/hooks/use-user-role";
import { Separator } from "@/components/ui/separator";
import { calculateSecurityScore, getSecurityCriteria, getSecurityDetails, SecurityCriteriaReporter } from "@/utils/security-score";
import { useState, useMemo } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Zap } from "lucide-react";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { RoadmapHeader } from "@/features/roadmap/components/RoadmapHeader";
import { PriorityTaskFilter } from "@/features/roadmap/components/PriorityTaskFilter";
import { PriorityTasksAlert } from "@/features/roadmap/components/PriorityTasksAlert";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BetaLaunchProgress } from "@/features/roadmap/components/BetaLaunchProgress";
import { BetaUsersMonitoring } from "@/features/beta/components/BetaUsersMonitoring";
import { FeedbackCollection } from "@/features/beta/components/FeedbackCollection";
import { PaymentTestingPanel } from "@/features/beta/components/PaymentTestingPanel";
import { MorningPriorityTasks } from "@/features/roadmap/components/MorningPriorityTasks";
import { MVPRoadmap } from "@/features/roadmap/components/MVPRoadmap";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const securityScore = calculateSecurityScore(getSecurityCriteria());
  const securityDetails = getSecurityDetails();
  const criteriaUpdates = SecurityCriteriaReporter.getCurrentDetails();
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

  const categorizedHighPriorityItems = useMemo(() => {
    return {
      product: highPriorityItems.filter(item => item.category === "product").length,
      development: highPriorityItems.filter(item => item.category === "development").length,
      infrastructure: highPriorityItems.filter(item => item.category === "infrastructure").length,
      security: highPriorityItems.filter(item => item.category === "security").length,
      devops: highPriorityItems.filter(item => item.category === "devops").length,
      other: highPriorityItems.filter(item => item.category === "other").length
    };
  }, [highPriorityItems]);

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        <RoadmapHeader />
        
        {isMorning && (
          <div className="animate-in slide-in-from-bottom fade-in duration-700">
            <MorningPriorityTasks />
          </div>
        )}
        
        <div className="animate-in slide-in-from-bottom fade-in duration-700">
          <MVPRoadmap />
        </div>
        
        <BetaLaunchProgress />
        
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <BetaUsersMonitoring />
          <FeedbackCollection />
          <PaymentTestingPanel />
        </div>

        {highPriorityItems.length > 0 && (
          <PriorityTasksAlert 
            highPriorityItemsCount={highPriorityItems.length}
            categoryCounts={categorizedHighPriorityItems}
          />
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger 
              value="high-priority" 
              className="bg-amber-500/10 hover:bg-amber-500/20 data-[state=active]:bg-amber-500/20"
            >
              High Priority
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="bg-green-500/10 hover:bg-green-500/20 data-[state=active]:bg-green-500/20"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress"
              className="bg-blue-500/10 hover:bg-blue-500/20 data-[state=active]:bg-blue-500/20"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="high-priority" className="mt-0" id="high-priority-tasks">
            <PriorityTaskFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
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
    </Layout>
  );
};

export default Roadmap;
