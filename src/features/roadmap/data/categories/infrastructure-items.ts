
import { RoadmapItem } from "../../types";

export const infrastructureItems: RoadmapItem[] = [
  {
    id: "infrastructure-1",
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
