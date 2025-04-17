
import { ReactNode } from "react";
import { Lock, Unlock, Users, Brain, Lightbulb, Shield, HandCoins, Zap, Infinity } from "lucide-react";

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
  }
];
