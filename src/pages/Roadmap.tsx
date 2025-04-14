
import { Layout } from "@/components/layout/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ClockIcon, Shield, ShieldCheck, Info, BarChart4, TestTube2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Status = "completed" | "in-progress" | "pending";
type Priority = "high" | "medium" | "low";

interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  details: string[];
  icon?: React.ReactNode;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Securitate și Confidențialitate",
    description: "Protejarea datelor utilizatorilor prin design",
    status: "completed",
    icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
    details: [
      "Zero stocare de date sensibile",
      "Delegarea procesării plăților către Stripe",
      "Interfață securizată și transparentă",
      "Experiență utilizator izolată pentru fiecare client",
      "Monitorizare minimală, axată strict pe comisioane"
    ]
  },
  {
    title: "Transparență în Tranzacții",
    description: "Comunicare clară despre procesarea plăților",
    status: "completed",
    icon: <Info className="h-5 w-5 text-blue-600" />,
    details: [
      "Informarea utilizatorilor despre politica de confidențialitate",
      "Explicarea datelor monitorizate și scopul lor",
      "Claritate privind rolul Stripe în procesarea plăților",
      "Izolarea completă a datelor între utilizatori",
      "Interfață intuitivă pentru statusul tranzacțiilor"
    ]
  },
  {
    title: "Integrare Stripe Complex",
    description: "Delegare completă a procesării plăților",
    status: "in-progress",
    priority: "high",
    icon: <ClockIcon className="h-5 w-5 text-blue-500" />,
    details: [
      "Utilizare webhook-uri Stripe pentru notificări",
      "Management complet al plăților prin API Stripe",
      "Fără stocare de informații de plată",
      "Dashboard pentru urmărirea comisioanelor",
      "Conformitate PSD2 și SCA prin Stripe"
    ]
  },
  {
    title: "UI/UX Personalizat",
    description: "Experiență avansată fără compromiterea confidențialității",
    status: "in-progress",
    priority: "medium",
    details: [
      "Design responsive și intuitiv",
      "Vizualizare dinamică a tranzacțiilor prin API-ul Stripe",
      "Dashboard personalizat pentru fiecare utilizator",
      "Interfață simplă pentru gestionarea plăților",
      "Transparență maximă în procesarea tranzacțiilor"
    ]
  },
  {
    title: "Monitorizare Etică",
    description: "Urmărirea anomaliilor fără acces la date sensibile",
    status: "in-progress",
    priority: "high",
    icon: <Shield className="h-5 w-5 text-purple-500" />,
    details: [
      "Detectare anomalii în tranzacții",
      "Alertare pentru evenimente neobișnuite",
      "Sistem de raportare centrat pe confidențialitate",
      "Metrici agregate fără identificatori personali",
      "Analiză de pattern-uri pentru îmbunătățirea UX"
    ]
  },
  {
    title: "Raportare Avansată",
    description: "Analiză și insights fără date sensibile",
    status: "pending",
    priority: "high",
    icon: <BarChart4 className="h-5 w-5 text-orange-500" />,
    details: [
      "Grafice pentru volumul de tranzacții",
      "Sumar de venituri pe diferite perioade",
      "Filtrare și căutare sigură",
      "Exporturi de rapoarte anonimizate",
      "Monitorizare etică a performanței"
    ]
  },
  {
    title: "Testare și Optimizare Continuă",
    description: "Asigurarea calității și securității",
    status: "pending",
    priority: "medium",
    icon: <TestTube2 className="h-5 w-5 text-amber-500" />,
    details: [
      "Teste de securitate regulate",
      "Optimizarea performanței aplicației",
      "Audit continuu al fluxurilor de plată",
      "Monitorizare și alertare inteligentă",
      "Actualizări bazate pe feedback și reglementări"
    ]
  }
];

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="text-green-500" />;
    case "in-progress":
      return <ClockIcon className="text-blue-500" />;
    case "pending":
      return <Circle className="text-gray-400" />;
  }
};

const getStatusBadge = (status: Status) => {
  const variants = {
    "completed": "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "pending": "bg-gray-100 text-gray-800"
  };

  const labels = {
    "completed": "Completat",
    "in-progress": "În Lucru",
    "pending": "În Așteptare"
  };

  return (
    <Badge variant="outline" className={`${variants[status]}`}>
      {labels[status]}
    </Badge>
  );
};

const getPriorityBadge = (priority?: Priority) => {
  if (!priority) return null;
  
  const variants = {
    "high": "bg-red-100 text-red-800",
    "medium": "bg-yellow-100 text-yellow-800",
    "low": "bg-green-100 text-green-800"
  };

  const labels = {
    "high": "Prioritate Înaltă",
    "medium": "Prioritate Medie",
    "low": "Prioritate Scăzută"
  };

  return (
    <Badge variant="outline" className={`${variants[priority]} ml-2`}>
      {labels[priority]}
    </Badge>
  );
};

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
          <Alert className="mb-4">
            <AlertTitle>Legendă Status</AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" />
                <span>Completat</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="text-blue-500" />
                <span>În Lucru</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="text-gray-400" />
                <span>În Așteptare</span>
              </div>
            </AlertDescription>
          </Alert>
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
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                          {item.icon && <span>{item.icon}</span>}
                          <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                        </div>
                        {getStatusIcon(item.status)}
                      </CardHeader>
                      <CardDescription className="px-6">
                        {item.description}
                      </CardDescription>
                      <CardContent className="mt-4">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          {getStatusBadge(item.status)}
                          {getPriorityBadge(item.priority)}
                        </div>
                        <ul className="space-y-2">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-2 w-2 h-2 rounded-full bg-primary/20 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
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
