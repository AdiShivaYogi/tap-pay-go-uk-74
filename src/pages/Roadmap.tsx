
import { Layout } from "@/components/layout/layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapLegend } from "@/features/roadmap/components/RoadmapLegend";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { AdvancedReporting } from "@/features/roadmap/components/AdvancedReporting";
import { roadmapItems } from "@/features/roadmap/types";
import { useUserRole } from "@/hooks/use-user-role";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";

const Roadmap = () => {
  const { isAdmin, role } = useUserRole();

  // Instead of redirect, show access restricted message
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Roadmap Aplicație</h1>
          <p className="text-muted-foreground">
            Vizualizează progresul și angajamentul nostru pentru securitate, transparență și experiență utilizator
          </p>
        </div>

        <RoadmapProgress />

        <Alert className="mb-8 border-primary/50">
          <AlertTitle className="text-primary">Principiu Fundamental</AlertTitle>
          <AlertDescription>
            <p className="mt-2 text-foreground">
              Aplicația noastră este proiectată cu un angajament ferm pentru protecția datelor utilizatorilor. 
              Nu stocăm niciun fel de informații sensibile. Fiecare utilizator beneficiază de o experiență 
              personalizată și complet izolată, cu Stripe gestionând în totalitate aspectele complexe ale 
              procesării plăților. Rolul nostru este de a oferi o interfață inteligentă, simplă și sigură.
            </p>
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <RoadmapLegend />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sistem de Raportare Avansată</h2>
          <AdvancedReporting />
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-4">
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

        <Alert className="mt-8">
          <AlertTitle>Etape Următoare</AlertTitle>
          <AlertDescription>
            <p className="mt-2">
              În paralel cu finalizarea integrărilor Stripe și a monitorizării etice,
              am început dezvoltarea sistemului de raportare avansată. Acesta va oferi
              insights valoroase despre tranzacții și pattern-uri, păstrând în același timp
              angajamentul nostru pentru protecția datelor și transparență.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
};

export default Roadmap;
