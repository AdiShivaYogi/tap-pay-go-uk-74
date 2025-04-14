import { Layout } from "@/components/layout/layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapCard } from "@/features/roadmap/components/RoadmapCard";
import { RoadmapLegend } from "@/features/roadmap/components/RoadmapLegend";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { roadmapItems } from "@/features/roadmap/types";

const Roadmap = () => {
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
              Suntem în proces de finalizare a integrărilor Stripe și a funcționalităților de monitorizare etică.
              Următoarea componentă planificată este implementarea sistemului de raportare avansată, care va oferi
              insights valoroase fără a compromite protecția datelor.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
};

export default Roadmap;
