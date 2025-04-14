
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
      "Hook useUserRole pentru verificarea rolurilor"
    ]
  },
  {
    title: "Managementul Tranzacțiilor",
    description: "Sistem de plăți și gestionare tranzacții",
    status: "in-progress",
    details: [
      "Integrare Stripe pentru plăți",
      "Tabelă transactions în Supabase",
      "Webhook pentru procesarea plăților",
      "Dashboard cu statistici tranzacții"
    ]
  },
  {
    title: "Raportare și Analiză",
    description: "Sistem de raportare și vizualizare date",
    status: "in-progress",
    details: [
      "Grafice pentru vizualizare tranzacții",
      "Exportare rapoarte",
      "Filtrare și căutare avansată",
      "Dashboard analytics"
    ]
  },
  {
    title: "Configurare Profil și Setări",
    description: "Gestionarea profilului și preferințelor",
    status: "pending",
    details: [
      "Editare profil utilizator",
      "Setări notificări",
      "Preferințe dashboard",
      "Integrări personalizate"
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
