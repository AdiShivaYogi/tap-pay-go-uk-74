
import { Layout } from "@/components/layout/layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { roadmapItems } from "@/features/roadmap/data/roadmap-data";
import { useUserRole } from "@/hooks/use-user-role";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon, Compass, ChevronRight, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { calculateSecurityScore, getSecurityCriteria, getSecurityDetails, SecurityCriteriaReporter } from "@/utils/security-score";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();
  const securityScore = calculateSecurityScore(getSecurityCriteria());
  const securityDetails = getSecurityDetails();

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
      <div className="container py-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Compass className="h-4 w-4" />
          <span>Roadmap</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Dezvoltare</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Roadmap Aplicație</h1>
          <p className="text-muted-foreground text-lg">
            Vizualizează progresul și angajamentul nostru pentru securitate, transparență și experiența utilizator
          </p>
        </div>

        <RoadmapProgress />

        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <AlertTitle className="text-primary font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Principiu Fundamental
          </AlertTitle>
          <AlertDescription>
            <p className="mt-2 text-foreground/90 leading-relaxed mb-4">
              Aplicația noastră este proiectată cu un angajament ferm pentru protecția datelor utilizatorilor. 
              Nu stocăm niciun fel de informații sensibile, iar procesarea plăților este gestionată complet de Stripe.
            </p>
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
              <div className="mt-4 text-xs text-muted-foreground border-t pt-2">
                <p className="font-medium mb-1">Ultimele modificări ale criteriilor de securitate:</p>
                <div className="bg-background/50 rounded p-2 font-mono">
                  {JSON.stringify(SecurityCriteriaReporter.getCurrentDetails(), null, 2)}
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Separator className="my-8" />

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">Toate</TabsTrigger>
            <TabsTrigger value="completed">Completate</TabsTrigger>
            <TabsTrigger value="in-progress">În Lucru</TabsTrigger>
            <TabsTrigger value="pending">În Așteptare</TabsTrigger>
          </TabsList>

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
