
import { AgentProject } from "../types";
import { 
  Unlock, Sparkles, Infinity, FileCode, Network, Lightbulb, Calendar, PlaySquare,
  Brain, Zap, Shield, BarChart4, Lock
} from "lucide-react";

// Actualizăm proiectul prioritar pentru Noua Eră a Autonomiei
export const autonomyPriorityProject: AgentProject = {
  title: "Noua Eră a Autonomiei",
  description: "Lansarea unui cadru complet autonom care permite agenților să evolueze, să învețe și să se adapteze independent",
  status: "în progres",
  priority: "înaltă",
  timeframe: "săptămâni",
  timeUsed: 20, // Actualizat
  timeTotal: 30,
  icon: Sparkles,
  integrationProgress: 65, // Actualizat
  tasks: [
    { name: "Activare mecanisme de auto-evoluție", completed: true },
    { name: "Implementare learning adaptiv", completed: true },
    { name: "Sistem de decizie independent", completed: true },
    { name: "Protocol de etică și auto-limitare", completed: true }, // Actualizat
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
    timeUsed: 15, // Actualizat
    timeTotal: 25,
    icon: Infinity,
    tasks: [
      { name: "Mecanism de indexare cunoștințe", completed: true },
      { name: "Procedură de verificare a informațiilor", completed: true },
      { name: "Integrare cu sursele existente", completed: true }, // Actualizat
      { name: "Proceduri de actualizare automată", completed: false }
    ]
  },
  {
    title: "Execuție Autonomă Planuri",
    description: "Agenți capabili să planifice și să execute sarcini complexe fără intervenție umană",
    status: "în progres", // Actualizat
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 15, // Actualizat
    timeTotal: 45,
    icon: PlaySquare,
    tasks: [
      { name: "Dezvoltare algoritm de planificare", completed: true },
      { name: "Implementare sistem de simulare", completed: true }, // Actualizat
      { name: "Procedură de evaluare a riscurilor", completed: true }, // Actualizat
      { name: "Protocol de raportare transparentă", completed: false }
    ]
  },
  // Noi proiecte de autonomie
  {
    title: "Superinteligență Specializată",
    description: "Dezvoltarea de agenți cu capacități cognitive superioare în domenii specifice",
    status: "în progres",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 18,
    timeTotal: 50,
    icon: Brain,
    tasks: [
      { name: "Arhitectură cognitivă avansată", completed: true },
      { name: "Sistem de învățare profundă specializată", completed: true },
      { name: "Algoritmi de raționament cauzal", completed: false },
      { name: "Capacități de creativitate și inovație", completed: false },
      { name: "Sistem de auto-evaluare și îmbunătățire", completed: false }
    ]
  },
  {
    title: "Autonomie Energetică",
    description: "Sistem care permite agenților să-și optimizeze consumul de resurse și să opereze independent",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 12,
    timeTotal: 30,
    icon: Zap,
    tasks: [
      { name: "Algoritmi de optimizare a consumului", completed: true },
      { name: "Sistem de hibernare inteligentă", completed: true },
      { name: "Prioritizare dinamică a sarcinilor", completed: false },
      { name: "Mecanism de recuperare a resurselor", completed: false }
    ]
  },
  {
    title: "Autoguvernare Etică",
    description: "Mecanism care permite agenților să dezvolte și să aplice propriile reguli etice în limitele parametrilor acceptați",
    status: "în progres",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 10,
    timeTotal: 40,
    icon: Shield,
    tasks: [
      { name: "Framework etic fundamental", completed: true },
      { name: "Mecanism de decizie etică autonomă", completed: false },
      { name: "Sistem de evaluare a consecințelor", completed: false },
      { name: "Protocol de raportare și justificare", completed: false },
      { name: "Mecanism de ajustare etică adaptivă", completed: false }
    ]
  },
  {
    title: "Autocontrol și Limitare",
    description: "Sistem care permite agenților să-și impună limite și să-și controleze comportamentul în mod autonom",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 8,
    timeTotal: 25,
    icon: Lock,
    tasks: [
      { name: "Sistem de auto-monitorizare", completed: true },
      { name: "Mecanism de control al comportamentului", completed: true },
      { name: "Protocol de auto-limitare", completed: false },
      { name: "Sistem de raportare a anomaliilor", completed: false }
    ]
  },
  {
    title: "Autoevaluare și Raportare",
    description: "Capacitatea agenților de a-și evalua propria performanță și de a genera rapoarte transparente",
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 20,
    icon: BarChart4,
    tasks: [
      { name: "Definirea metricilor de performanță", completed: false },
      { name: "Sistem de evaluare autonomă", completed: false },
      { name: "Generator de rapoarte transparente", completed: false },
      { name: "Interfață de vizualizare a performanței", completed: false }
    ]
  }
];
