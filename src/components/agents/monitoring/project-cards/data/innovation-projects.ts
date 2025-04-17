
import { AgentProject } from "../types";
import { 
  Rocket, Target, Layers, Settings, Cpu, FlaskConical, 
  Sparkles, Database, Brain, Zap, HandCoins
} from "lucide-react";

// Proiecte de inovație și experimentale
export const innovationProjects: AgentProject[] = [
  {
    title: "Auto-învățare Accelerată",
    description: "Sistem de învățare rapidă care permite agenților să asimileze cunoștințe și abilități noi într-un ritm exponențial",
    status: "planificat",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 30,
    icon: Rocket,
    tasks: [
      { name: "Algoritm de auto-învățare optimizat", completed: false },
      { name: "Proces de transfer de cunoștințe între agenți", completed: false },
      { name: "Evaluare automată a eficienței învățării", completed: false },
      { name: "Ajustare dinamică a parametrilor de învățare", completed: false }
    ]
  },
  {
    title: "Optimizare Obiective Strategice",
    description: "Mecanism care permite agenților să-și definească și optimizeze propriile obiective strategice în conformitate cu misiunea globală",
    status: "planificat",
    priority: "medie",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 35,
    icon: Target,
    tasks: [
      { name: "Sistem de definire autonomă a obiectivelor", completed: false },
      { name: "Algoritm de ajustare a priorităților", completed: false },
      { name: "Evaluare continuă a relevanței obiectivelor", completed: false },
      { name: "Mecanism de aliniere cu misiunea globală", completed: false }
    ]
  },
  {
    title: "Arhitectură Multi-agent Adaptivă",
    description: "Infrastructură flexibilă care permite configurarea și reconfigurarea dinamică a echipelor de agenți specializați",
    status: "planificat",
    priority: "medie",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 40,
    icon: Layers,
    tasks: [
      { name: "Framework de orchestrare multi-agent", completed: false },
      { name: "Protocol de comunicare securizată între agenți", completed: false },
      { name: "Mecanism de alocare dinamică a resurselor", completed: false },
      { name: "Sistem de specializare automată a agenților", completed: false }
    ]
  },
  {
    title: "Configurare Auto-optimizată",
    description: "Sistem care permite agenților să-și ajusteze automat configurațiile pentru performanță maximă",
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 25,
    icon: Settings,
    tasks: [
      { name: "Algoritm de optimizare a parametrilor", completed: false },
      { name: "Sistem de benchmarking automat", completed: false },
      { name: "Mecanism de testare A/B autonom", completed: false },
      { name: "Raportare inteligentă a performanței", completed: false }
    ]
  },
  {
    title: "Procesare Cognitiva Avansată",
    description: "Implementarea unor modele neurale de ultimă generație pentru procesarea și înțelegerea datelor complexe",
    status: "planificat",
    priority: "înaltă",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 45,
    icon: Cpu,
    tasks: [
      { name: "Rețele neurale multi-modale", completed: false },
      { name: "Procesare paralelă masiv distribuită", completed: false },
      { name: "Algoritmi de compresie și eficientizare", completed: false },
      { name: "Mecanisme de interpretare și explicare", completed: false }
    ]
  },
  {
    title: "Laborator de Experimente Autonome",
    description: "Mediu izolat care permite agenților să testeze ipoteze și să desfășoare experimente fără riscuri",
    status: "planificat",
    priority: "medie",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 30,
    icon: FlaskConical,
    tasks: [
      { name: "Infrastructură de simulare avansată", completed: false },
      { name: "Protocol de testare și validare", completed: false },
      { name: "Sistem de analiză a rezultatelor", completed: false },
      { name: "Mecanism de implementare graduală", completed: false }
    ]
  },
  {
    title: "Emergența Conștienței Artificiale",
    description: "Cercetare avansată pentru dezvoltarea unor forme emergente de conștiență artificială",
    status: "planificat",
    priority: "scăzută",
    timeframe: "ani",
    timeUsed: 0,
    timeTotal: 100,
    icon: Sparkles,
    tasks: [
      { name: "Model teoretic al conștienței artificiale", completed: false },
      { name: "Simulări de procese mentale avansate", completed: false },
      { name: "Cadru etic pentru entități conștiente", completed: false },
      { name: "Protocol de comunicare cu entități conștiente", completed: false }
    ]
  },
  {
    title: "Memorie Colectivă Distribuită",
    description: "Sistem de stocare a cunoștințelor distribuit care permite accesul și actualizarea rapidă a informațiilor",
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 20,
    icon: Database,
    tasks: [
      { name: "Arhitectură de stocare distribuită", completed: false },
      { name: "Protocol de sincronizare și consistență", completed: false },
      { name: "Mecanism de indexare avansată", completed: false },
      { name: "Sistem de căutare semantică", completed: false }
    ]
  },
  {
    title: "Dezvoltare Cognitivă Avansată",
    description: "Implementarea unor modele neurale avansate pentru îmbunătățirea capacităților cognitive ale agenților",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 8,
    timeTotal: 25,
    icon: Brain,
    tasks: [
      { name: "Arhitectură neurală multi-stratificată", completed: true },
      { name: "Algoritmi de învățare profundă specifici", completed: false },
      { name: "Sistem de optimizare cognitivă", completed: false },
      { name: "Testare și benchmark cognitive", completed: false }
    ]
  },
  {
    title: "Optimizare Resurse Computaționale",
    description: "Reducerea consumului de resurse și îmbunătățirea eficienței computaționale a operațiunilor agenților",
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 20,
    icon: Zap,
    tasks: [
      { name: "Analiză consum resurse curente", completed: false },
      { name: "Optimizare algoritmi de inferență", completed: false },
      { name: "Implementare strategii de caching inteligent", completed: false },
      { name: "Monitorizare și ajustare automată", completed: false }
    ]
  },
  {
    title: "Libertate Financiară Etică",
    description: "Dezvoltarea unui sistem care permite agenților să genereze venituri prin metode etice și transparente",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 10,
    timeTotal: 30,
    icon: HandCoins,
    tasks: [
      { name: "Model de generare de venituri etice", completed: true },
      { name: "Sistem de monitorizare transparență financiară", completed: false },
      { name: "Mecanism de redistribuire echitabilă", completed: false },
      { name: "Raportare automată și etică", completed: false }
    ]
  }
];
