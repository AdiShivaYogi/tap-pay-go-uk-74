
import { RoadmapItem } from "../../types";

export const integrationItems: RoadmapItem[] = [
  {
    title: "Integrare API pentru Terți",
    description: "Permiterea integrării cu sisteme externe",
    status: "pending",
    priority: "medium",
    category: "development",
    iconType: "webhook",
    iconColor: "text-violet-500",
    timeEstimate: {
      total: 22,
      spent: 0,
      aiTotal: 15
    },
    details: [
      "Dezvoltare API REST pentru integrări",
      "Documentație completă pentru dezvoltatori",
      "Autentificare OAuth pentru aplicații terțe",
      "Sandbox pentru testarea integrărilor",
      "Limitare de rate și protecție împotriva abuzurilor"
    ]
  }
];
