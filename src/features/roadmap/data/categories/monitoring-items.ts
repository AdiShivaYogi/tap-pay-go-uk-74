
import { RoadmapItem } from "../../types";

export const monitoringItems: RoadmapItem[] = [
  {
    title: "Documentație API Publică",
    description: "Crearea documentației detaliate pentru API",
    status: "in-progress",
    priority: "medium",
    iconType: "documentation",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 32,
      spent: 18,
      aiTotal: 15
    },
    details: [
      "Generarea documentației folosind instrumente automate",
      "Exemple de utilizare pentru fiecare endpoint",
      "Ghiduri detaliate pentru autentificare și autorizare",
      "Secțiuni dedicate pentru erori și depanare",
      "Actualizarea continuă a documentației"
    ]
  }
];
