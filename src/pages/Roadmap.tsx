
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
    title: "Autentificare și Autorizare",
    description: "Sistem de login și gestionare roluri",
    status: "completed",
    details: [
      "Implementare login/register cu Supabase",
      "Creare tabelă user_roles",
      "Implementare Row Level Security (RLS)",
      "Hook useUserRole pentru verificarea rolurilor",
      "Implementarea autentificării cu doi factori"
    ]
  },
  {
    title: "Integrare Stripe pentru Plăți",
    description: "Delegare completă a procesării plăților către Stripe",
    status: "in-progress",
    details: [
      "Integrare Stripe pentru plăți fără stocarea datelor sensibile",
      "Webhook pentru primirea notificărilor de plată",
      "Dashboard pentru monitorizarea comisioanelor",
      "Asigurarea conformității cu reglementările de plată (PSD2, SCA)",
      "Experiență de checkout optimizată fără date sensibile stocate local"
    ]
  },
  {
    title: "Raportare și Analiză",
    description: "Vizualizare avansată a datelor nesensibile",
    status: "in-progress",
    details: [
      "Grafice pentru volumul de tranzacții pe perioade",
      "Sumar al veniturilor și comisioanelor pe zi/săptămână/lună",
      "Filtrare după dată, sumă și status fără acces la datele sensibile",
      "Căutare după ID-ul tranzacției",
      "Exportare rapoarte cu focus pe protecția datelor utilizatorilor"
    ]
  },
  {
    title: "UI/UX Avansat pentru Utilizatori",
    description: "Experiență personalizată fără stocarea datelor sensibile",
    status: "pending",
    details: [
      "Dashboard personalizat pentru fiecare utilizator bazat pe preferințe locale",
      "Vizualizare detaliată a tranzacțiilor prin API Stripe",
      "Managementul abonamentelor prin portal Stripe dedicat",
      "Interfață intuitivă pentru interacțiunea cu serviciile Stripe"
    ]
  },
  {
    title: "Testare și Optimizare",
    description: "Asigurarea calității și performanței",
    status: "pending",
    details: [
      "Teste pentru diferite scenarii de plată fără date reale",
      "Optimizarea performanței și a experienței utilizatorului",
      "Teste de securitate și audit pentru protecția datelor",
      "Monitorizare și alertare pentru evenimente importante"
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
            Vizualizează progresul și pașii următori în dezvoltarea aplicației
          </p>
        </div>

        <Alert className="mb-8">
          <AlertTitle>Principiu de Bază</AlertTitle>
          <AlertDescription>
            <p className="mt-2">
              Aplicația noastră nu stochează informații sensibile ale utilizatorilor. Fiecare utilizator are o experiență unică și separată. 
              Ca administratori, monitorizăm doar comisioanele și abonamentele primite prin Stripe, delegând gestionarea datelor sensibile către ei. 
              Ne concentrăm pe furnizarea unei interfețe avansate și intuitive.
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
            <Card key={index}>
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
