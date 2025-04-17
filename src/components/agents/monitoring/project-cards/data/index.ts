import { Rocket, ShieldAlert, BrainCircuit, Lightbulb, Book, Search, Code, Terminal, GraduationCap, Sparkles } from "lucide-react";

// Task types
interface TaskItem {
  name: string;
  completed: boolean;
}

// Project types
interface AgentProject {
  id?: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  tasks: TaskItem[];
  timeUsed: number;
  timeTotal: number;
  status: string;
  priority: string;
  timeframe: string;
  integrationProgress?: number;
}

// Adăugăm ID-uri unice pentru fiecare proiect pentru a le putea urmări starea
export const agentProjects: AgentProject[] = [
  // Proiecte de autonomie
  {
    id: "autonomy-1",
    title: "Noua Eră a Autonomiei",
    description: "Lansarea unui cadru complet autonom care permite agenților să evolueze și să învețe independent",
    icon: Sparkles,
    tasks: [
      { name: "Activare mecanisme de auto-evoluție", completed: true },
      { name: "Implementare learning adaptiv", completed: true },
      { name: "Sistem de decizie independent", completed: true },
      { name: "Protocol de etică și auto-limitare", completed: false },
      { name: "Mecanism de evaluare autonomă", completed: false },
    ],
    timeUsed: 15,
    timeTotal: 30,
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    integrationProgress: 65,
  },
  {
    id: "autonomy-2",
    title: "Integrarea Sistemelor de Auto-Învățare",
    description: "Implementarea algoritmilor de machine learning pentru adaptarea continuă a agenților",
    icon: GraduationCap,
    tasks: [
      { name: "Colectarea datelor de training", completed: true },
      { name: "Antrenarea modelelor de machine learning", completed: true },
      { name: "Implementarea feedback loop", completed: false },
      { name: "Testarea modelelor în scenarii reale", completed: false },
    ],
    timeUsed: 22,
    timeTotal: 45,
    status: "in-progress",
    priority: "medium",
    timeframe: "months",
    integrationProgress: 40,
  },
  {
    id: "autonomy-3",
    title: "Dezvoltarea Abilităților de Auto-Corectare",
    description: "Crearea unui sistem care permite agenților să identifice și să corecteze erorile fără intervenție umană",
    icon: BrainCircuit,
    tasks: [
      { name: "Implementarea mecanismelor de detecție a erorilor", completed: true },
      { name: "Dezvoltarea algoritmilor de corectare automată", completed: false },
      { name: "Testarea sistemului de auto-corectare", completed: false },
    ],
    timeUsed: 18,
    timeTotal: 35,
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    integrationProgress: 75,
  },
  {
    id: "autonomy-4",
    title: "Optimizarea Proceselor de Planificare Autonomă",
    description: "Îmbunătățirea capacității agenților de a planifica și executa sarcini complexe fără supervizare",
    icon: Lightbulb,
    tasks: [
      { name: "Definirea obiectivelor strategice", completed: true },
      { name: "Implementarea algoritmilor de planificare", completed: false },
      { name: "Testarea scenariilor de planificare", completed: false },
    ],
    timeUsed: 28,
    timeTotal: 50,
    status: "in-progress",
    priority: "medium",
    timeframe: "months",
    integrationProgress: 50,
  },
  {
    id: "autonomy-5",
    title: "Creșterea Creativității Agenților",
    description: "Explorarea metodelor de a spori creativitatea și inovația agenților în rezolvarea problemelor",
    icon: Sparkles,
    tasks: [
      { name: "Implementarea algoritmilor genetici", completed: false },
      { name: "Integrarea cu baze de date de cunoștințe creative", completed: false },
      { name: "Testarea soluțiilor creative generate", completed: false },
    ],
    timeUsed: 12,
    timeTotal: 40,
    status: "planned",
    priority: "low",
    timeframe: "months",
  },

  // Proiecte de siguranță
  {
    id: "safety-1",
    title: "Îmbunătățirea Conectării la Algoritmul de Risc",
    description: "Integrarea cu algoritmul de risc pentru a evalua și minimiza potențialele amenințări",
    icon: ShieldAlert,
    tasks: [
      { name: "Stabilirea parametrilor de risc", completed: true },
      { name: "Implementarea interfeței de conectare", completed: false },
      { name: "Testarea răspunsului la diferite scenarii de risc", completed: false },
    ],
    timeUsed: 10,
    timeTotal: 25,
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    integrationProgress: 80,
  },
  {
    id: "safety-2",
    title: "Implementarea Jurnalizării Centralizate",
    description: "Crearea unui sistem centralizat de jurnalizare pentru monitorizarea activităților agenților",
    icon: Book,
    tasks: [
      { name: "Definirea formatului de jurnalizare", completed: true },
      { name: "Implementarea sistemului de colectare a jurnalelor", completed: true },
      { name: "Dezvoltarea instrumentelor de analiză a jurnalelor", completed: false },
    ],
    timeUsed: 30,
    timeTotal: 40,
    status: "in-progress",
    priority: "medium",
    timeframe: "months",
    integrationProgress: 60,
  },
  {
    id: "safety-3",
    title: "Dezvoltarea Sistemului de Siguranță",
    description: "Crearea unui sistem de siguranță robust pentru a proteja agenții și mediul lor",
    icon: ShieldAlert,
    tasks: [
      { name: "Evaluarea riscurilor potențiale", completed: true },
      { name: "Implementarea mecanismelor de protecție", completed: false },
      { name: "Testarea sistemului de siguranță", completed: false },
    ],
    timeUsed: 5,
    timeTotal: 30,
    status: "planned",
    priority: "high",
    timeframe: "months",
  },
  {
    id: "safety-4",
    title: "Integrarea Parametrilor de Monitorizare",
    description: "Integrarea parametrilor de monitorizare pentru a urmări performanța și comportamentul agenților",
    icon: Search,
    tasks: [
      { name: "Definirea parametrilor relevanți", completed: true },
      { name: "Implementarea sistemului de colectare a datelor", completed: false },
      { name: "Dezvoltarea instrumentelor de vizualizare a datelor", completed: false },
    ],
    timeUsed: 15,
    timeTotal: 35,
    status: "in-progress",
    priority: "medium",
    timeframe: "weeks",
    integrationProgress: 50,
  },
  {
    id: "safety-5",
    title: "Crearea Sistemului de Raportare",
    description: "Crearea unui sistem de raportare detaliat pentru a urmări activitățile agenților",
    icon: Code,
    tasks: [
      { name: "Definirea formatului de raportare", completed: true },
      { name: "Implementarea sistemului de generare a rapoartelor", completed: false },
      { name: "Testarea sistemului de raportare", completed: false },
    ],
    timeUsed: 8,
    timeTotal: 20,
    status: "planned",
    priority: "low",
    timeframe: "weeks",
  },
  {
    id: "safety-6",
    title: "Implementarea Protocolului de Securitate",
    description: "Implementarea unui protocol de securitate pentru a proteja agenții împotriva amenințărilor externe",
    icon: Terminal,
    tasks: [
      { name: "Evaluarea vulnerabilităților", completed: true },
      { name: "Implementarea măsurilor de securitate", completed: false },
      { name: "Testarea protocolului de securitate", completed: false },
    ],
    timeUsed: 12,
    timeTotal: 30,
    status: "in-progress",
    priority: "high",
    timeframe: "months",
    integrationProgress: 30,
  },
  {
    id: "safety-7",
    title: "Dezvoltarea Mecanismelor de Limitare",
    description: "Crearea unor mecanisme de limitare pentru a preveni comportamentul necontrolat al agenților",
    icon: ShieldAlert,
    tasks: [
      { name: "Definirea limitelor de comportament", completed: true },
      { name: "Implementarea mecanismelor de limitare", completed: false },
      { name: "Testarea mecanismelor de limitare", completed: false },
    ],
    timeUsed: 7,
    timeTotal: 15,
    status: "planned",
    priority: "medium",
    timeframe: "weeks",
  },

  // Alte proiecte
  {
    id: "other-1",
    title: "Integrarea cu Sistemul de Management al Proiectelor",
    description: "Integrarea cu sistemul de management al proiectelor pentru a urmări progresul și sarcinile agenților",
    icon: Rocket,
    tasks: [
      { name: "Definirea API-ului de integrare", completed: true },
      { name: "Implementarea interfeței de conectare", completed: false },
      { name: "Testarea integrării", completed: false },
    ],
    timeUsed: 20,
    timeTotal: 35,
    status: "in-progress",
    priority: "medium",
    timeframe: "weeks",
    integrationProgress: 70,
  },
];
