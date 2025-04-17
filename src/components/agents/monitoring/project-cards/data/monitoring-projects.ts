
import { AgentProject } from "../types";
import { Gauge, BarChart3, Activity, LineChart, AreaChart, PieChart } from "lucide-react";

// Proiecte de monitorizare și măsurare
export const monitoringProjects: AgentProject[] = [
  {
    title: "Monitorizare în Timp Real",
    description: "Dashboard interactiv care arată progresul și deciziile agenților în timp real",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 12, // Actualizat
    timeTotal: 20,
    icon: Gauge,
    tasks: [
      { name: "Vizualizări avansate de date", completed: true },
      { name: "Alertare inteligentă pentru anomalii", completed: true },
      { name: "Istoricul deciziilor agenților", completed: true }, // Actualizat
      { name: "Metrici personalizabile de performanță", completed: false }
    ]
  },
  // Adăugăm proiecte noi
  {
    title: "Analiză Avansată Comportament Agenți",
    description: "Instrumente pentru analiza detaliată a comportamentului și performanței agenților autonomi",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
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
    status: "în progres",
    priority: "medie",
    timeframe: "luni",
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
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
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
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
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
