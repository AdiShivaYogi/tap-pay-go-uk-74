
import { RoadmapItem } from "../types";

export const infrastructureItems: RoadmapItem[] = [
  {
    id: "infrastructure-1",
    title: "Infrastructură Redundantă Avansată",
    description: "Strategie completă de disponibilitate și reziliență",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "server-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 40,
      spent: 40,
      aiTotal: 25
    },
    details: [
      "Arhitectură multi-regiune cu toleranță la defecțiuni ✓",
      "Implementare cluster Kubernetes cu auto-scaling ✓", 
      "Configurare mecanisme de failover automat ✓",
      "Strategie de backup și recuperare în 3 etape ✓",
      "Monitorizare avansată cu detecție proactivă ✓",
      "Plan de recuperare în dezastre < 5 minute ✓",
      "Implementare filtre de securitate la nivel de rețea ✓",
      "Teste periodice de rezistență și recuperare ✓"
    ]
  },
  {
    id: "infrastructure-2",
    title: "Centru de Date Redundant",
    description: "Infrastructură cloud distribuită și securizată",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "cloud-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 50,
      spent: 50,
      aiTotal: 30
    },
    details: [
      "Configurare centru de date secundar activ-activ ✓",
      "Replicare geografică a datelor în timp real ✓",
      "Implementare balansare inteligentă a traficului ✓", 
      "Sistem de monitorizare unificat cu alertare automată ✓",
      "Mecanisme avansate de securitate între centre de date ✓",
      "Optimizare costuri prin resurse cloud dinamice ✓",
      "Plan de tranziție și migrare între centre de date ✓",
      "Testare continuă a scenariilor de dezastre ✓"
    ]
  }
];
