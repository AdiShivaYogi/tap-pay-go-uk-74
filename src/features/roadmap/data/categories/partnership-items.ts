
import { RoadmapItem } from "../../types";

export const partnershipItems: RoadmapItem[] = [
  {
    title: "Program Parteneriat",
    description: "Sistem de afiliere și parteneriate",
    status: "pending",
    priority: "low",
    category: "partnership", // Make sure category is explicitly set to "partnership"
    iconType: "users",
    iconColor: "text-yellow-500",
    timeEstimate: {
      total: 18,
      spent: 0,
      aiTotal: 10
    },
    details: [
      "Portal pentru parteneri și afiliați",
      "Sistem de tracking și atribuire a referalurilor",
      "Raportare transparentă pentru comisioane",
      "Materiale de marketing pentru parteneri",
      "Dashboard dedicat pentru managementul parteneriatelor"
    ]
  }
];
