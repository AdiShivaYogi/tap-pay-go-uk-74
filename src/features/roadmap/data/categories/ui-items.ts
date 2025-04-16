
import { RoadmapItem } from "../../types";

export const uiItems: RoadmapItem[] = [
  {
    id: "ui-1",
    title: "UI/UX Personalizat",
    description: "Experiență avansată fără compromiterea confidențialității",
    status: "completed",
    priority: "medium",
    category: "ui",
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
  }
];
