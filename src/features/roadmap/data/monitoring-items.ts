
import { RoadmapItem } from "../types";

export const monitoringItems: RoadmapItem[] = [
  {
    title: "Monitorizare și Alertare",
    description: "Sistem avansat de monitorizare și alertare",
    status: "in-progress",
    priority: "high",
    iconType: "bar-chart-4",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 20,
      spent: 15,
      aiTotal: 12
    },
    details: [
      "Implementare sistem de logging centralizat ✓",
      "Configurare alerte pentru evenimente critice ✓",
      "Dashboard-uri de monitorizare în timp real ✓",
      "Integrare cu sisteme de notificare",
      "Analiza și raportare automată a incidentelor"
    ]
  },
  {
    title: "Optimizare și Monitorizare Cloud",
    description: "Îmbunătățirea performanței și controlului infrastructurii",
    status: "in-progress",
    priority: "high", 
    iconType: "network",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 35,
      spent: 32,
      aiTotal: 20
    },
    details: [
      "Implementare monitorizare comprehensivă ✓",
      "Configurare metrici detaliate de performanță ✓",
      "Implementare sisteme de auto-scaling inteligente ✓",
      "Optimizare costuri și utilizare resurse cloud ✓",
      "Configurare CDN global cu strategie de caching ✓",
      "Audit și optimizare continuă a infrastructurii ✓",
      "Implementare politici de securitate cloud ✓",
      "Raportare automată a performanței și costurilor"
    ]
  }
];
