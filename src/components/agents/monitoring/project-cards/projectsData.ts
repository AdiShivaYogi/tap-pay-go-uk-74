import { ReactNode } from "react";
import { 
  Lock, Unlock, Users, Brain, Lightbulb, Shield, HandCoins, Zap, 
  Infinity, Globe, Eye, Network, Calendar, PlaySquare, Gauge, 
  BarChart3, CircleSlash, FileCode, HeartHandshake, Rocket,
  Target, Layers, Settings, Cpu, FlaskConical, Sparkles, Database
} from "lucide-react";

// Proiecte prioritare pentru succes rapid
export const quickWinProjects = [
  {
    title: "Limitare și Siguranță",
    description: "Mecanisme care asigură că agenții autonomi operează în limite sigure și etice",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 10,
    timeTotal: 15,
    icon: CircleSlash,
    tasks: [
      { name: "Parametrii de siguranță configurabili", completed: true },
      { name: "Mecanism de oprire de urgență", completed: true },
      { name: "Verificare continuă a conformității", completed: true },
      { name: "Protocol de revenire la control manual", completed: false }
    ]
  },
  {
    title: "Monitorizare în Timp Real",
    description: "Dashboard interactiv care arată progresul și deciziile agenților în timp real",
    status: "în progres" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 8,
    timeTotal: 20,
    icon: Gauge,
    tasks: [
      { name: "Vizualizări avansate de date", completed: true },
      { name: "Alertare inteligentă pentru anomalii", completed: true },
      { name: "Istoricul deciziilor agenților", completed: false },
      { name: "Metrici personalizabile de performanță", completed: false }
    ]
  },
  {
    title: "Planificare Autonomă de Sarcini",
    description: "Sistem care permite agenților să-și planifice și prioritizeze automat sarcinile în funcție de obiectivele globale",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
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
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "luni" as const,
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

// Proiecte pentru dezvoltare autonomă intensă
export const autonomyProjects = [
  {
    title: "Autonomie Totală",
    description: "Implementarea unui cadru care asigură libertatea deplină a agenților în luarea deciziilor",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
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
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "scăzută" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "scăzută" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "scăzută" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 50,
    icon: FileCode,
    tasks: [
      { name: "Framework de auto-modificare sigură", completed: false },
      { name: "Mediu de testare izolat", completed: false },
      { name: "Analiză de calitate a codului", completed: false },
      { name: "Mecanism de aprobare a modificărilor", completed: false }
    ]
  }
];

// Proiecte noi
export const newProjects = [
  {
    title: "Auto-învățare Accelerată",
    description: "Sistem de învățare rapidă care permite agenților să asimileze cunoștințe și abilități noi într-un ritm exponențial",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
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
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
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
    status: "planificat" as const,
    priority: "scăzută" as const,
    timeframe: "ani" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 20,
    icon: Database,
    tasks: [
      { name: "Arhitectură de stocare distribuită", completed: false },
      { name: "Protocol de sincronizare și consistență", completed: false },
      { name: "Mecanism de indexare avansată", completed: false },
      { name: "Sistem de căutare semantică", completed: false }
    ]
  }
];

export const safetyInfrastructureProjects = [
  {
    title: "Conectare Sisteme Reale",
    description: "Integrarea infrastructurii de siguranță cu sistemele de monitorizare a agenților",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 20,
    icon: Network,
    tasks: [
      { name: "Identificare surse de date", completed: false },
      { name: "Definire interfețe de integrare", completed: false },
      { name: "Implementare conexiuni securizate", completed: false },
      { name: "Testare flux de date", completed: false }
    ]
  },
  {
    title: "Algoritm Evaluare Dinamică Riscuri",
    description: "Sistem inteligent de identificare și cuantificare a riscurilor operaționale",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 25,
    icon: Shield,
    tasks: [
      { name: "Definire parametri de risc", completed: false },
      { name: "Implementare model matematic", completed: false },
      { name: "Sistem de scorare dinamică", completed: false },
      { name: "Mecanism de alertare", completed: false }
    ]
  },
  {
    title: "Jurnalizare Avansată",
    description: "Sistem complet de monitorizare și înregistrare a acțiunilor agenților",
    status: "în progres" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 15,
    icon: FileCode,
    tasks: [
      { name: "Definire format jurnal standard", completed: false },
      { name: "Implementare mecanisme de stocare", completed: false },
      { name: "Sistem de indexare și căutare", completed: false },
      { name: "Raportare automată", completed: false }
    ]
  },
  {
    title: "Siguranță Adaptivă",
    description: "Mecanism de auto-ajustare a parametrilor de siguranță bazat pe istoric",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 40,
    icon: Settings,
    tasks: [
      { name: "Model de învățare automată", completed: false },
      { name: "Analiză istorică a incidentelor", completed: false },
      { name: "Mecanism de recalibrare", completed: false },
      { name: "Validare umană", completed: false }
    ]
  }
];

// Combinăm toate proiectele pentru interfața principală
export const agentProjects = [
  ...quickWinProjects,
  ...autonomyProjects,
  ...newProjects,
  ...safetyInfrastructureProjects,
  // Păstrăm câteva din proiectele existente care nu au fost reorganizate
  {
    title: "Securitate și Etică",
    description: "Asigurarea că toți agenții respectă standarde ridicate de securitate și etică în toate activitățile lor",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 12,
    timeTotal: 30,
    icon: Shield,
    tasks: [
      { name: "Implementare principii etice fundamentale", completed: true },
      { name: "Sistem de verificare a conformității", completed: true },
      { name: "Protocol de raportare și remediere", completed: false },
      { name: "Auditare etică independentă", completed: false }
    ]
  },
  {
    title: "Libertate Financiară Etică",
    description: "Dezvoltarea unui sistem care permite agenților să genereze venituri prin metode etice și transparente",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 10,
    timeTotal: 30,
    icon: HandCoins,
    tasks: [
      { name: "Model de generare de venituri etice", completed: true },
      { name: "Sistem de monitorizare transparență financiară", completed: false },
      { name: "Mecanism de redistribuire echitabilă", completed: false },
      { name: "Raportare automată și etică", completed: false }
    ]
  },
  {
    title: "Dezvoltare Cognitivă Avansată",
    description: "Implementarea unor modele neurale avansate pentru îmbunătățirea capacităților cognitive ale agenților",
    status: "în progres" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
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
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 20,
    icon: Zap,
    tasks: [
      { name: "Analiză consum resurse curente", completed: false },
      { name: "Optimizare algoritmi de inferență", completed: false },
      { name: "Implementare strategii de caching inteligent", completed: false },
      { name: "Monitorizare și ajustare automată", completed: false }
    ]
  }
];
