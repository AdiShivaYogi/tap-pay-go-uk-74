import { ReactNode } from "react";

export type Status = "completed" | "in-progress" | "pending";
export type Priority = "high" | "medium" | "low";

export interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  details: string[];
  icon?: ReactNode;
}

export const roadmapItems: RoadmapItem[] = [
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
