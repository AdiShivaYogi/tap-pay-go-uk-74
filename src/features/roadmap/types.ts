
import { ReactNode } from "react";

export type Status = "completed" | "in-progress" | "pending";
export type Priority = "high" | "medium" | "low";
export type IconType = "shield-check" | "info" | "clock" | "shield" | "bar-chart-4" | "test-tube-2" | "check" | "alert-circle" | "file-text";

export interface TimeEstimate {
  total: number;
  spent?: number;
  aiTotal?: number; // AI's estimation in hours
}

export interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  details: string[];
  iconType?: IconType;
  iconColor?: string;
  timeEstimate: TimeEstimate;
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: "Securitate și Confidențialitate",
    description: "Protejarea datelor utilizatorilor prin design",
    status: "completed",
    iconType: "shield-check",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 10,
      spent: 10,
      aiTotal: 4
    },
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
    iconType: "info",
    iconColor: "text-blue-600",
    timeEstimate: {
      total: 8,
      spent: 8,
      aiTotal: 3
    },
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
    status: "completed", // Actualizat de la in-progress la completed
    priority: "high",
    iconType: "check", // Actualizat de la clock la check
    iconColor: "text-green-500", // Actualizat la culoare verde pentru completat
    timeEstimate: {
      total: 20,
      spent: 20, // Actualizat la total pentru a marca finalizarea
      aiTotal: 8
    },
    details: [
      "Utilizare webhook-uri Stripe pentru notificări ✓",
      "Management complet al plăților prin API Stripe ✓",
      "Fără stocare de informații de plată ✓",
      "Dashboard pentru urmărirea comisioanelor ✓",
      "Conformitate PSD2 și SCA prin Stripe ✓"
    ]
  },
  {
    title: "UI/UX Personalizat",
    description: "Experiență avansată fără compromiterea confidențialității",
    status: "in-progress",
    priority: "medium",
    timeEstimate: {
      total: 15,
      spent: 8,
      aiTotal: 6
    },
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
    status: "completed", // Actualizat de la in-progress la completed
    priority: "high",
    iconType: "shield-check", // Actualizat de la shield la shield-check
    iconColor: "text-green-500", // Actualizat la culoare verde pentru completat
    timeEstimate: {
      total: 12,
      spent: 12, // Actualizat la total pentru a marca finalizarea
      aiTotal: 5
    },
    details: [
      "Detectare anomalii în tranzacții ✓",
      "Alertare pentru evenimente neobișnuite ✓",
      "Sistem de raportare centrat pe confidențialitate ✓",
      "Metrici agregate fără identificatori personali ✓",
      "Analiză de pattern-uri pentru îmbunătățirea UX ✓"
    ]
  },
  {
    title: "Raportare Avansată",
    description: "Analiză și insights fără date sensibile",
    status: "in-progress", // Actualizat de la pending la in-progress
    priority: "high",
    iconType: "bar-chart-4",
    iconColor: "text-orange-500",
    timeEstimate: {
      total: 10,
      spent: 6, // Actualizat pentru a arăta progresul
      aiTotal: 4
    },
    details: [
      "Grafice pentru volumul de tranzacțiilor ✓",
      "Sumar de venituri pe diferite perioade ✓",
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
    iconType: "test-tube-2",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 15,
      spent: 7,
      aiTotal: 6
    },
    details: [
      "Teste de securitate regulate",
      "Optimizarea performanței aplicației",
      "Audit continuu al fluxurilor de plată",
      "Monitorizare și alertare inteligentă",
      "Actualizări bazate pe feedback și reglementări"
    ]
  }
];
