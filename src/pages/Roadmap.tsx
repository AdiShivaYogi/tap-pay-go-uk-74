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

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const securityScore = calculateSecurityScore(getSecurityCriteria());
  const securityDetails = getSecurityDetails();
  const criteriaUpdates = SecurityCriteriaReporter.getCurrentDetails();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

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
        <BetaLaunchProgress />
        <RoadmapProgress />

        {highPriorityItems.length > 0 && (
          <PriorityTasksAlert 
            highPriorityItemsCount={highPriorityItems.length}
            categoryCounts={categorizedHighPriorityItems}
          />
        )}

        <Alert className="mb-8 border-primary/50 bg-primary/5 animate-in slide-in-from-bottom">
          <AlertTitle className="text-primary font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Principiu Fundamental
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
          </AlertTitle>
          <AlertDescription>
            <p className="mt-2 text-foreground/90 leading-relaxed mb-4">
              Aplicația noastră este proiectată cu un angajament ferm pentru protecția datelor utilizatorilor. 
              Nu stocăm niciun fel de informații sensibile, iar procesarea plăților este gestionată complet de Stripe.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary/90 font-medium">Nivel de Securitate</span>
                  <span className="font-bold text-primary">{securityScore}%</span>
                </div>
                <Progress value={securityScore} className="h-2 bg-primary/20" />
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                  {securityDetails.map((detail, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${detail.isActive ? 'bg-primary' : 'bg-muted'}`} />
                      <span>{detail.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground border-t pt-2">
                <p className="font-medium mb-1">Ultimele actualizări ale criteriilor de securitate:</p>
                <div className="grid grid-cols-2 gap-2">
                  {criteriaUpdates.map((update, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "bg-background/50 rounded p-2 font-mono text-xs",
                        update.isActive ? "border-l-4 border-primary" : "opacity-50"
                      )}
                    >
                      <div className="font-semibold">{update.label}</div>
                      <div className="text-muted-foreground">
                        Status: {update.isActive ? 'Activ' : 'Inactiv'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Separator className="my-8" />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">Toate</TabsTrigger>
            <TabsTrigger value="high-priority" className="bg-amber-500/10 hover:bg-amber-500/20 data-[state=active]:bg-amber-500/20">
              Priorități Înalte
            </TabsTrigger>
            <TabsTrigger value="completed">Completate</TabsTrigger>
            <TabsTrigger value="in-progress">În Lucru</TabsTrigger>
            <TabsTrigger value="pending">În Așteptare</TabsTrigger>
          </TabsList>

          <TabsContent value="high-priority" className="mt-0">
            <PriorityTaskFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              {highPriorityItems
                .filter(item => activeCategory === "all" || item.category === activeCategory)
                .map((item, index) => (
                  <RoadmapCard key={index} item={item} />
                ))}
            </div>
          </TabsContent>

          {["all", "completed", "in-progress", "pending"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-0">
              <div className="grid gap-6 md:grid-cols-2">
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
