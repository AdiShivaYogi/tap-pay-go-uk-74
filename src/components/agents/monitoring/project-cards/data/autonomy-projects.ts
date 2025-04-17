
import { AgentProject } from "../types";
import { 
  Unlock, Sparkles, Infinity, FileCode, Network, Lightbulb, Calendar, PlaySquare
} from "lucide-react";

// Actualizăm proiectul prioritar pentru Noua Eră a Autonomiei
export const autonomyPriorityProject: AgentProject = {
  title: "Noua Eră a Autonomiei",
  description: "Lansarea unui cadru complet autonom care permite agenților să evolueze, să învețe și să se adapteze independent",
  status: "în progres",
  priority: "înaltă",
  timeframe: "săptămâni",
  timeUsed: 15,
  timeTotal: 30,
  icon: Sparkles,
  integrationProgress: 50,
  tasks: [
    { name: "Activare mecanisme de auto-evoluție", completed: true },
    { name: "Implementare learning adaptiv", completed: true },
    { name: "Sistem de decizie independent", completed: true },
    { name: "Protocol de etică și auto-limitare", completed: false },
    { name: "Mecanism de evaluare autonomă", completed: false },
    { name: "Interfață de raportare transparentă", completed: false }
  ]
};

// Adăugăm lista de proiecte pentru autonomie
export const autonomyProjects: AgentProject[] = [
  {
    title: "Auto-Extindere Cunoștințe",
    description: "Sistem prin care agenții pot acumula și integra autonom noi cunoștințe",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 10,
    timeTotal: 25,
    icon: Infinity,
    tasks: [
      { name: "Mecanism de indexare cunoștințe", completed: true },
      { name: "Procedură de verificare a informațiilor", completed: true },
      { name: "Integrare cu sursele existente", completed: false },
      { name: "Proceduri de actualizare automată", completed: false }
    ]
  },
  {
    title: "Execuție Autonomă Planuri",
    description: "Agenți capabili să planifice și să execute sarcini complexe fără intervenție umană",
    status: "planificat",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 5,
    timeTotal: 45,
    icon: PlaySquare,
    tasks: [
      { name: "Dezvoltare algoritm de planificare", completed: true },
      { name: "Implementare sistem de simulare", completed: false },
      { name: "Procedură de evaluare a riscurilor", completed: false },
      { name: "Protocol de raportare transparentă", completed: false }
    ]
  }
];
