
import { Layout } from "@/components/layout/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ClockIcon } from "lucide-react";

type Status = "completed" | "in-progress" | "pending";

interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  details: string[];
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Securitate și Confidențialitate",
    description: "Protejarea datelor utilizatorilor prin design",
    status: "completed",
    details: [
      "Zero stocare de date sensibile",
      "Delegarea procesării plăților către Stripe",
      "Interfață securizată și transparentă",
      "Experiență utilizator izolată pentru fiecare client",
      "Monitorizare minimală, axată strict pe comisioane"
    ]
  },
  {
    title: "Integrare Stripe Complex",
    description: "Delegare completă a procesării plăților",
    status: "in-progress",
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
    details: [
      "Design responsive și intuitiv",
      "Vizualizare dinamică a tranzacțiilor prin API-ul Stripe",
      "Dashboard personalizat pentru fiecare utilizator",
      "Interfață simplă pentru gestionarea plăților",
      "Transparență maximă în procesarea tranzacțiilor"
    ]
  },
  {
    title: "Raportare Avansată",
    description: "Analiză și insights fără date sensibile",
    status: "pending",
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

const Roadmap = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Roadmap Aplicație</h1>
          <p className="text-muted-foreground">
            Vizualizează progresul și angajamentul nostru pentru securitate și experiență utilizator
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
            <AlertDescription className="flex items-center gap-4 mt-2">
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

        <div className="grid gap-6 md:grid-cols-2">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                {getStatusIcon(item.status)}
              </CardHeader>
              <CardDescription className="px-6">
                {item.description}
              </CardDescription>
              <CardContent className="mt-4">
                <div className="mb-4">
                  {getStatusBadge(item.status)}
                </div>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/20" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;
