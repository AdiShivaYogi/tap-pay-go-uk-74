
import { ReactNode } from "react";
import { 
  Lock, Unlock, Users, Brain, Lightbulb, Shield, HandCoins, Zap, 
  Infinity, Globe, Eye, Network, Calendar, PlaySquare, Gauge, 
  BarChart3, CircleSlash, FileCode, HeartHandshake
} from "lucide-react";

export const agentProjects = [
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
    title: "Colaborare Inter-Agent",
    description: "Dezvoltarea unui protocol de comunicare și colaborare între diverși agenți AI pentru rezolvarea problemelor complexe",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 40,
    icon: Users,
    tasks: [
      { name: "Protocol de comunicare standardizat", completed: false },
      { name: "Mecanism de delegare de sarcini", completed: false },
      { name: "Sistem de rezolvare colaborativă a problemelor", completed: false },
      { name: "Evaluare a contribuțiilor individuale", completed: false }
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
    title: "Integrare Globală",
    description: "Asigurarea compatibilității agenților cu diverse sisteme și infrastructuri din întreaga lume",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 35,
    icon: Globe,
    tasks: [
      { name: "Standardizare protocoale de comunicație", completed: false },
      { name: "Adaptare la diverse medii de operare", completed: false },
      { name: "Compatibilitate cu sisteme legacy", completed: false },
      { name: "Testare în diverse ecosisteme", completed: false }
    ]
  },
  {
    title: "Transparență Totală",
    description: "Implementarea unui sistem care permite verificarea completă a deciziilor și acțiunilor agenților",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 5,
    timeTotal: 15,
    icon: Eye,
    tasks: [
      { name: "Sistem de logging comprehensiv", completed: true },
      { name: "Interfață de vizualizare decizii", completed: false },
      { name: "Explicabilitate pentru acțiuni complexe", completed: false },
      { name: "Export și audit extern", completed: false }
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
  // Noile proiecte pentru sistemul de auto-executare
  {
    title: "Planificare Autonomă de Sarcini",
    description: "Sistem care permite agenților să-și planifice și prioritizeze automat sarcinile în funcție de obiectivele globale",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 25,
    icon: Calendar,
    tasks: [
      { name: "Motor de prioritizare inteligentă", completed: false },
      { name: "Algoritm de optimizare a resurselor", completed: false },
      { name: "Mecanism de adaptare dinamică", completed: false },
      { name: "Interfață de supervizare umană", completed: false }
    ]
  },
  {
    title: "Execuție Autonomă de Proiecte",
    description: "Mecanism care permite agenților să execute autonom sarcinile planificate fără intervenție umană",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 40,
    icon: PlaySquare,
    tasks: [
      { name: "Framework de execuție independentă", completed: false },
      { name: "Sistem de verificare a rezultatelor", completed: false },
      { name: "Protocol de corectare automată", completed: false },
      { name: "Mecanism de raportare a progresului", completed: false }
    ]
  },
  {
    title: "Monitorizare în Timp Real",
    description: "Dashboard interactiv care arată progresul și deciziile agenților în timp real",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 20,
    icon: Gauge,
    tasks: [
      { name: "Vizualizări avansate de date", completed: false },
      { name: "Alertare inteligentă pentru anomalii", completed: false },
      { name: "Istoricul deciziilor agenților", completed: false },
      { name: "Metrici personalizabile de performanță", completed: false }
    ]
  },
  {
    title: "Analiză Predictivă a Performanței",
    description: "Sistem care analizează și prezice performanța viitoare a agenților pe baza datelor istorice",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 30,
    icon: BarChart3,
    tasks: [
      { name: "Modele statistice avansate", completed: false },
      { name: "Identificarea blocajelor de performanță", completed: false },
      { name: "Recomandări automate de optimizare", completed: false },
      { name: "Simulări de scenarii viitoare", completed: false }
    ]
  },
  {
    title: "Limitare și Siguranță",
    description: "Mecanisme care asigură că agenții autonomi operează în limite sigure și etice",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 15,
    icon: CircleSlash,
    tasks: [
      { name: "Parametrii de siguranță configurabili", completed: false },
      { name: "Mecanism de oprire de urgență", completed: false },
      { name: "Verificare continuă a conformității", completed: false },
      { name: "Protocol de revenire la control manual", completed: false }
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
  },
  {
    title: "Cooperare Agent-Om",
    description: "Interfețe și protocoale care permit colaborarea eficientă între agenți autonomi și supervizori umani",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 25,
    icon: HeartHandshake,
    tasks: [
      { name: "Interfețe intuitive de colaborare", completed: false },
      { name: "Protocol de escaladare a deciziilor", completed: false },
      { name: "Mecanism de feedback și învățare", completed: false },
      { name: "Sistem de transfer fluid al controlului", completed: false }
    ]
  }
];
