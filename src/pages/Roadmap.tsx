import { Layout } from "@/components/layout/layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { roadmapItems } from "@/features/roadmap/data/roadmap-data";
import { useUserRole } from "@/hooks/use-user-role";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon, Compass, ChevronRight, ShieldCheck, Star, Zap, AlertTriangle, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { calculateSecurityScore, getSecurityCriteria, getSecurityDetails, SecurityCriteriaReporter } from "@/utils/security-score";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const securityScore = calculateSecurityScore(getSecurityCriteria());
  const securityDetails = getSecurityDetails();
  const criteriaUpdates = SecurityCriteriaReporter.getCurrentDetails();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();

  const highPriorityItems = useMemo(() => 
    roadmapItems.filter(item => item.priority === "high"), 
    []
  );

  const categorizedHighPriorityItems = useMemo(() => {
    const categories = {
      product: highPriorityItems.filter(item => item.category === "product"),
      development: highPriorityItems.filter(item => item.category === "development"),
      infrastructure: highPriorityItems.filter(item => item.category === "infrastructure"),
      security: highPriorityItems.filter(item => item.category === "security"),
      devops: highPriorityItems.filter(item => item.category === "devops"),
    };
    
    return categories;
  }, [highPriorityItems]);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle className="flex items-center gap-2">
              <LockIcon className="h-4 w-4" /> Acces restricționat
            </AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                Această pagină necesită privilegii de administrator. Rolul tău actual: <strong>{role || 'user'}</strong>
              </p>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link to="/">Înapoi la Pagina Principală</Link>
                </Button>
                <Button asChild>
                  <Link to="/admin-auth">Autentificare administrator</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Compass className="h-4 w-4" />
          <span>Roadmap</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Dezvoltare</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-4">
            Roadmap Aplicație 
            <Star className="text-primary/70 animate-pulse" />
          </h1>
          <p className="text-muted-foreground text-lg">
            Vizualizează progresul și angajamentul nostru pentru securitate, transparență și experiența utilizator
          </p>
        </div>

        <RoadmapProgress />

        {highPriorityItems.length > 0 && (
          <Alert className="border-amber-500/50 bg-amber-500/5 animate-in slide-in-from-bottom">
            <AlertTitle className="text-amber-500 font-bold text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Organizare Task-uri Prioritare
            </AlertTitle>
            <AlertDescription>
              <p className="mt-2 text-foreground/90 leading-relaxed mb-2">
                Avem {highPriorityItems.length} task-uri cu prioritate înaltă organizate în categorii pentru rezolvare eficientă. 
                Folosiți filtrele pentru vizualizarea și gestionarea acestor task-uri după categorie sau progres.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Product: {categorizedHighPriorityItems.product.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Development: {categorizedHighPriorityItems.development.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Infrastructure: {categorizedHighPriorityItems.infrastructure.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span>Security: {categorizedHighPriorityItems.security.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                  <span>DevOps: {categorizedHighPriorityItems.devops.length || 0}</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
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
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                Filtrare după Categorie
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeCategory === "all" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("all")}
                >
                  Toate
                </Button>
                <Button 
                  variant={activeCategory === "product" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("product")}
                  className="bg-primary/10 hover:bg-primary/20 data-[state=active]:bg-primary/20"
                >
                  Product
                </Button>
                <Button 
                  variant={activeCategory === "development" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("development")}
                  className="bg-blue-500/10 hover:bg-blue-500/20 data-[state=active]:bg-blue-500/20"
                >
                  Development
                </Button>
                <Button 
                  variant={activeCategory === "infrastructure" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("infrastructure")}
                  className="bg-purple-500/10 hover:bg-purple-500/20 data-[state=active]:bg-purple-500/20"
                >
                  Infrastructure
                </Button>
                <Button 
                  variant={activeCategory === "security" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("security")}
                  className="bg-green-600/10 hover:bg-green-600/20 data-[state=active]:bg-green-600/20"
                >
                  Security
                </Button>
                <Button 
                  variant={activeCategory === "devops" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveCategory("devops")}
                  className="bg-amber-600/10 hover:bg-amber-600/20 data-[state=active]:bg-amber-600/20"
                >
                  DevOps
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {(categorizedHighPriorityItems[activeCategory] || []).map((item, index) => (
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
