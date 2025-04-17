
import { AgentProject } from "../types";
import { Gauge } from "lucide-react";

// Proiecte de monitorizare și măsurare
export const monitoringProjects: AgentProject[] = [
  {
    title: "Monitorizare în Timp Real",
    description: "Dashboard interactiv care arată progresul și deciziile agenților în timp real",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 8,
    timeTotal: 20,
    icon: Gauge,
    tasks: [
      { name: "Vizualizări avansate de date", completed: true },
      { name: "Alertare inteligentă pentru anomalii", completed: true },
      { name: "Istoricul deciziilor agenților", completed: false },
      { name: "Metrici personalizabile de performanță", completed: false }
    ]
  }
];
