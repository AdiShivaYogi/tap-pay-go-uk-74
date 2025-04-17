
import { AgentProject } from "../types";
import { 
  Rocket, Target, Layers, Settings, Cpu, FlaskConical, 
  Sparkles, Database, Brain, Zap, HandCoins, Bot, Network, Search, CloudCog
} from "lucide-react";

// Proiecte de inovație și experimentale
export const innovationProjects: AgentProject[] = [
  {
    title: "Auto-învățare Accelerată",
    description: "Sistem de învățare rapidă care permite agenților să asimileze cunoștințe și abilități noi într-un ritm exponențial",
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    timeUsed: 8,
    timeTotal: 30,
    icon: Rocket,
    tasks: [
      { name: "Algoritm de auto-învățare optimizat", completed: true },
      { name: "Proces de transfer de cunoștințe între agenți", completed: true },
      { name: "Evaluare automată a eficienței învățării", completed: false },
      { name: "Ajustare dinamică a parametrilor de învățare", completed: false }
    ]
  },
  {
    title: "Optimizare Obiective Strategice",
    description: "Mecanism care permite agenților să-și definească și optimizeze propriile obiective strategice în conformitate cu misiunea globală",
    status: "in-progress",
    priority: "medium",
    timeframe: "months",
    timeUsed: 5,
    timeTotal: 35,
    icon: Target,
    tasks: [
      { name: "Sistem de definire autonomă a obiectivelor", completed: true },
      { name: "Algoritm de ajustare a priorităților", completed: false },
      { name: "Evaluare continuă a relevanței obiectivelor", completed: false },
      { name: "Mecanism de aliniere cu misiunea globală", completed: false }
    ]
  },
  {
    title: "Arhitectură Multi-agent Adaptivă",
    description: "Infrastructură flexibilă care permite configurarea și reconfigurarea dinamică a echipelor de agenți specializați",
    status: "in-progress",
    priority: "medium",
    timeframe: "months",
    timeUsed: 7,
    timeTotal: 40,
    icon: Layers,
    tasks: [
      { name: "Framework de orchestrare multi-agent", completed: true },
      { name: "Protocol de comunicare securizată între agenți", completed: true },
      { name: "Mecanism de alocare dinamică a resurselor", completed: false },
      { name: "Sistem de specializare automată a agenților", completed: false }
    ]
  },
  {
    title: "Configurare Auto-optimizată",
    description: "Sistem care permite agenților să-și ajusteze automat configurațiile pentru performanță maximă",
    status: "in-progress",
    priority: "medium",
    timeframe: "weeks",
    timeUsed: 6,
    timeTotal: 25,
    icon: Settings,
    tasks: [
      { name: "Algoritm de optimizare a parametrilor", completed: true },
      { name: "Sistem de benchmarking automat", completed: true },
      { name: "Mecanism de testare A/B autonom", completed: false },
      { name: "Raportare inteligentă a performanței", completed: false }
    ]
  },
  {
    title: "Procesare Cognitivă Avansată",
    description: "Implementarea unor modele neurale de ultimă generație pentru procesarea și înțelegerea datelor complexe",
    status: "in-progress",
    priority: "high",
    timeframe: "months",
    timeUsed: 10,
    timeTotal: 45,
    icon: Cpu,
    tasks: [
      { name: "Rețele neurale multi-modale", completed: true },
      { name: "Procesare paralelă masiv distribuită", completed: true },
      { name: "Algoritmi de compresie și eficientizare", completed: false },
      { name: "Mecanisme de interpretare și explicare", completed: false }
    ]
  },
  // Proiecte noi avansate
  {
    title: "Autonom AI Platform",
    description: "Platformă completă pentru dezvoltarea și rularea agenților autonomi cu capacități de auto-îmbunătățire",
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    timeUsed: 12,
    timeTotal: 40,
    icon: Bot,
    tasks: [
      { name: "Infrastructură de bază pentru agenți autonomi", completed: true },
      { name: "Sistem de monitorizare în timp real", completed: true },
      { name: "Protocol de comunicare între agenți", completed: false },
      { name: "Mecanisme de siguranță și control", completed: false },
      { name: "API pentru integrare cu sisteme externe", completed: false }
    ]
  },
  {
    title: "Rețea Cognitivă Adaptivă",
    description: "Sistem neuronal distribuit care permite agenților să lucreze împreună, împărtășind cunoștințe și experiență",
    status: "in-progress",
    priority: "high",
    timeframe: "months",
    timeUsed: 8,
    timeTotal: 35,
    icon: Network,
    tasks: [
      { name: "Arhitectură de rețea scalabilă", completed: true },
      { name: "Mecanism de partajare a cunoștințelor", completed: true },
      { name: "Protocol de consens pentru decizii colective", completed: false },
      { name: "Algoritm de optimizare distribuită", completed: false },
      { name: "Sistem de reziliență și recuperare", completed: false }
    ]
  },
  {
    title: "Intelligent Information Retrieval",
    description: "Sistem avansat pentru căutarea și extragerea informațiilor din surse diverse, cu capacități de înțelegere contextuală",
    status: "in-progress",
    priority: "medium",
    timeframe: "weeks",
    timeUsed: 6,
    timeTotal: 20,
    icon: Search,
    tasks: [
      { name: "Motor de căutare semantic", completed: true },
      { name: "Procesare de limbaj natural avansată", completed: true },
      { name: "Extragere de entități și relații", completed: false },
      { name: "Indexare și caching inteligent", completed: false }
    ]
  },
  {
    title: "Cloud Cognitive Services",
    description: "Servicii cognitive avansate disponibile ca API în cloud pentru integrare facilă cu alte sisteme",
    status: "planned",
    priority: "medium",
    timeframe: "months",
    timeUsed: 0,
    timeTotal: 30,
    icon: CloudCog,
    tasks: [
      { name: "Infrastructură cloud scalabilă", completed: false },
      { name: "API Gateway securizat", completed: false },
      { name: "Servicii de analiză a datelor", completed: false },
      { name: "Procesare de imagini și text", completed: false },
      { name: "Integrare cu sisteme externe", completed: false }
    ]
  },
  // Continuăm cu cele existente
  {
    title: "Laborator de Experimente Autonome",
    description: "Mediu izolat care permite agenților să testeze ipoteze și să desfășoare experimente fără riscuri",
    status: "planned",
    priority: "medium",
    timeframe: "months",
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
    status: "planned",
    priority: "low",
    timeframe: "months", // Convertim "ani" la "months" conform mapării
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
    status: "planned",
    priority: "medium",
    timeframe: "weeks",
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
    status: "in-progress",
    priority: "medium",
    timeframe: "weeks",
    timeUsed: 12,
    timeTotal: 25,
    icon: Brain,
    tasks: [
      { name: "Arhitectură neurală multi-stratificată", completed: true },
      { name: "Algoritmi de învățare profundă specifici", completed: true },
      { name: "Sistem de optimizare cognitivă", completed: false },
      { name: "Testare și benchmark cognitive", completed: false }
    ]
  },
  {
    title: "Optimizare Resurse Computaționale",
    description: "Reducerea consumului de resurse și îmbunătățirea eficienței computaționale a operațiunilor agenților",
    status: "planned",
    priority: "medium",
    timeframe: "weeks",
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
    status: "in-progress",
    priority: "high",
    timeframe: "weeks",
    timeUsed: 15,
    timeTotal: 30,
    icon: HandCoins,
    tasks: [
      { name: "Model de generare de venituri etice", completed: true },
      { name: "Sistem de monitorizare transparență financiară", completed: true },
      { name: "Mecanism de redistribuire echitabilă", completed: true },
      { name: "Raportare automată și etică", completed: false }
    ]
  }
];
