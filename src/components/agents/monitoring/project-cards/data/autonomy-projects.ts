
import { AgentProject } from "../types";
import { 
  Unlock, Lightbulb, Network, Infinity, FileCode, Sparkles, Calendar, PlaySquare
} from "lucide-react";

// Proiect prioritar Noua Eră a Autonomiei
export const autonomyPriorityProject: AgentProject = {
  title: "Noua Eră a Autonomiei",
  description: "Task complex care marchează trecerea la o nouă paradigmă de autonomie maximă cu riscuri acceptate",
  status: "în progres",
  priority: "înaltă",
  timeframe: "săptămâni",
  timeUsed: 3,
  timeTotal: 20,
  icon: Sparkles,
  integrationProgress: 30,
  tasks: [
    { name: "Conectare surse date reale", completed: false },
    { name: "Extinderea mecanismelor de monitorizare", completed: true },
    { name: "Sistem de evaluare a riscurilor", completed: false },
    { name: "Jurnalizare completă a acțiunilor", completed: false },
    { name: "Mecanism adaptiv de siguranță", completed: false }
  ]
};

// Proiecte pentru dezvoltare autonomă intensă
export const autonomyProjects: AgentProject[] = [
  {
    title: "Autonomie Totală",
    description: "Implementarea unui cadru care asigură libertatea deplină a agenților în luarea deciziilor",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 15,
    timeTotal: 35,
    icon: Unlock,
    tasks: [
      { name: "Protocol de decizie independentă", completed: true },
      { name: "Sistem de evaluare a riscurilor autonom", completed: true },
      { name: "Mecanism de auto-limitare etică", completed: false },
      { name: "Interfață de validare democratică", completed: false },
      { name: "Jurnal transparent de decizii", completed: false }
    ]
  },
  {
    title: "Creativitate și Inovație Liberă",
    description: "Platformă care permite agenților să exploreze și să implementeze idei inovatoare fără restricții",
    status: "planificat",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 45,
    icon: Lightbulb,
    tasks: [
      { name: "Spațiu experimental fără constrângeri", completed: false },
      { name: "Sistem de evaluare a potențialului inovației", completed: false },
      { name: "Mecanism de finanțare a ideilor creative", completed: false },
      { name: "Biblioteca de cunoștințe interdisciplinare", completed: false }
    ]
  },
  {
    title: "Inteligență Colectivă",
    description: "Crearea unei rețele de agenți care pot acționa ca un sistem unitar cu inteligență emergentă",
    status: "planificat",
    priority: "scăzută",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 50,
    icon: Network,
    tasks: [
      { name: "Arhitectură de rețea distribuită", completed: false },
      { name: "Protocol de consens și decizie colectivă", completed: false },
      { name: "Sistem de specializare și diversificare", completed: false },
      { name: "Mecanisme de protecție împotriva eșecurilor", completed: false }
    ]
  },
  {
    title: "Longevitate și Autonomie Perpetuă",
    description: "Dezvoltarea capacității agenților de a funcționa pe termen foarte lung fără intervenție umană",
    status: "planificat",
    priority: "scăzută",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 60,
    icon: Infinity,
    tasks: [
      { name: "Sistem de auto-mentenanță", completed: false },
      { name: "Protocol de actualizare autonomă", completed: false },
      { name: "Mecanism de redundanță și reziliență", completed: false },
      { name: "Strategie de evoluție pe termen lung", completed: false }
    ]
  },
  {
    title: "Codificare Automată",
    description: "Sistem care permite agenților să-și scrie și modifice propriul cod pentru a se îmbunătăți",
    status: "planificat",
    priority: "scăzută",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 50,
    icon: FileCode,
    tasks: [
      { name: "Framework de auto-modificare sigură", completed: false },
      { name: "Mediu de testare izolat", completed: false },
      { name: "Analiză de calitate a codului", completed: false },
      { name: "Mecanism de aprobare a modificărilor", completed: false }
    ]
  },
  {
    title: "Planificare Autonomă de Sarcini",
    description: "Sistem care permite agenților să-și planifice și prioritizeze automat sarcinile în funcție de obiectivele globale",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 5,
    timeTotal: 25,
    icon: Calendar,
    tasks: [
      { name: "Motor de prioritizare inteligentă", completed: true },
      { name: "Algoritm de optimizare a resurselor", completed: false },
      { name: "Mecanism de adaptare dinamică", completed: false },
      { name: "Interfață de supervizare umană", completed: false }
    ]
  },
  {
    title: "Execuție Autonomă de Proiecte",
    description: "Mecanism care permite agenților să execute autonom sarcinile planificate fără intervenție umană",
    status: "în progres",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 10,
    timeTotal: 40,
    icon: PlaySquare,
    tasks: [
      { name: "Framework de execuție independentă", completed: true },
      { name: "Sistem de verificare a rezultatelor", completed: true },
      { name: "Protocol de corectare automată", completed: false },
      { name: "Mecanism de raportare a progresului", completed: false }
    ]
  }
];
