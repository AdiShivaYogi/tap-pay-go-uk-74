
import { RoadmapItem } from "../types";

export const completedRoadmapItems: RoadmapItem[] = [
  {
    title: "Integrare Multi-Payment",
    description: "Suport pentru procesarea plăților prin multiple metode",
    status: "completed",
    priority: "high",
    iconType: "banknote",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 20,
      spent: 20,
      aiTotal: 15
    },
    details: [
      "Integrare completă cu Stripe pentru carduri bancare ✓",
      "Suport pentru plăți recurente și abonamente ✓",
      "Plăți instant cu confirmări automate ✓",
      "Sistem de webhook-uri pentru notificări ✓",
      "Suport pentru multiple monede (RON, EUR, USD) ✓"
    ]
  },
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
      "Zero stocare de date sensibile ✓",
      "Delegarea procesării plăților către Stripe ✓",
      "Interfață securizată și transparentă ✓",
      "Experiență utilizator izolată pentru fiecare client ✓",
      "Monitorizare minimală, axată strict pe comisioane ✓"
    ]
  },
  {
    title: "Integrare Stripe Complex",
    description: "Delegare completă a procesării plăților",
    status: "completed",
    priority: "high",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 20,
      spent: 20,
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
    status: "completed",
    priority: "medium",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 15,
      spent: 15,
      aiTotal: 6
    },
    details: [
      "Design responsive și intuitiv ✓",
      "Vizualizare dinamică a tranzacțiilor prin API-ul Stripe ✓",
      "Dashboard personalizat pentru fiecare utilizator ✓",
      "Interfață simplă pentru gestionarea plăților ✓",
      "Transparență maximă în procesarea tranzacțiilor ✓"
    ]
  },
  {
    title: "Monitorizare Etică",
    description: "Urmărirea anomaliilor fără acces la date sensibile",
    status: "completed",
    priority: "high",
    iconType: "shield-check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 12,
      spent: 12,
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
    status: "completed",
    priority: "high",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 10,
      spent: 10,
      aiTotal: 4
    },
    details: [
      "Grafice pentru volumul de tranzacțiilor ✓",
      "Sumar de venituri pe diferite perioade ✓",
      "Filtrare și căutare sigură ✓",
      "Exporturi de rapoarte anonimizate ✓",
      "Monitorizare etică a performanței ✓"
    ]
  }
];
