
import { AgentProject } from "../types";
import { Gauge, BarChart3, Activity, LineChart, AreaChart, PieChart } from "lucide-react";

// Proiecte de monitorizare și măsurare
export const monitoringProjects: AgentProject[] = [
  {
    title: "Monitorizare în Timp Real",
    description: "Dashboard interactiv care arată progresul și deciziile agenților în timp real",
    status: "in-progress", // Actualizat cu valoarea corectă
    priority: "medium", // Actualizat cu valoarea corectă
    timeframe: "weeks", // Actualizat cu valoarea corectă
    timeUsed: 12,
    timeTotal: 20,
    icon: Gauge,
    tasks: [
      { name: "Vizualizări avansate de date", completed: true },
      { name: "Alertare inteligentă pentru anomalii", completed: true },
      { name: "Istoricul deciziilor agenților", completed: true },
      { name: "Metrici personalizabile de performanță", completed: false }
    ]
  },
  // Adăugăm proiecte noi
  {
    title: "Analiză Avansată Comportament Agenți",
    description: "Instrumente pentru analiza detaliată a comportamentului și performanței agenților autonomi",
    status: "in-progress", // Actualizat cu valoarea corectă
    priority: "high", // Actualizat cu valoarea corectă
    timeframe: "weeks", // Actualizat cu valoarea corectă
    timeUsed: 10,
    timeTotal: 25,
    icon: LineChart,
    tasks: [
      { name: "Dashboard analitic interactiv", completed: true },
      { name: "Istoricul deciziilor și acțiunilor", completed: true },
      { name: "Analiză de tendințe și anomalii", completed: false },
      { name: "Vizualizări personalizabile", completed: false },
      { name: "Sistem de export date și rapoarte", completed: false }
    ]
  },
  {
    title: "Monitorizare Rețea Multi-agent",
    description: "Sistem pentru vizualizarea și analiza interacțiunilor între agenți și transferul de cunoștințe",
    status: "in-progress", // Actualizat cu valoarea corectă
    priority: "medium", // Actualizat cu valoarea corectă
    timeframe: "months", // Actualizat cu valoarea corectă
    timeUsed: 5,
    timeTotal: 30,
    icon: AreaChart,
    tasks: [
      { name: "Vizualizare graf de interacțiuni", completed: true },
      { name: "Monitorizare transfer de cunoștințe", completed: false },
      { name: "Analiză de influență și impact", completed: false },
      { name: "Detectare tipare de colaborare", completed: false }
    ]
  },
  {
    title: "Raportare Autonomă",
    description: "Sistem care permite agenților să genereze automat rapoarte despre activitățile și progresul lor",
    status: "planned", // Actualizat cu valoarea corectă
    priority: "medium", // Actualizat cu valoarea corectă
    timeframe: "weeks", // Actualizat cu valoarea corectă
    timeUsed: 0,
    timeTotal: 20,
    icon: PieChart,
    tasks: [
      { name: "Generator de rapoarte automatizat", completed: false },
      { name: "Selectarea metricilor relevante", completed: false },
      { name: "Vizualizări personalizabile", completed: false },
      { name: "Sistem de distribuție a rapoartelor", completed: false }
    ]
  },
  {
    title: "Monitorizare Performanță și Eficiență",
    description: "Instrumente pentru măsurarea și optimizarea performanței și eficienței operaționale a agenților",
    status: "in-progress", // Actualizat cu valoarea corectă
    priority: "high", // Actualizat cu valoarea corectă
    timeframe: "weeks", // Actualizat cu valoarea corectă
    timeUsed: 8,
    timeTotal: 15,
    icon: Activity,
    tasks: [
      { name: "Monitorizare utilizare resurse", completed: true },
      { name: "Analiză a eficienței algoritmilor", completed: true },
      { name: "Detectare blocaje și întârzieri", completed: false },
      { name: "Recomandări de optimizare", completed: false }
    ]
  }
];

// Adaugă name = title pentru toate obiectele din monitoringProjects
for (const project of monitoringProjects) {
  if (!project.name) {
    project.name = project.title;
  }
}
