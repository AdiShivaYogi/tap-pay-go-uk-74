
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
