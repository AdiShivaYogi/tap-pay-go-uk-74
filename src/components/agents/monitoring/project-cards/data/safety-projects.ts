
import { AgentProject } from "../types";
import { 
  CircleSlash, Shield, Gauge, Server, ActivitySquare, BarChart4, Settings
} from "lucide-react";

// Proiecte pentru infrastructura de siguranță
export const safetyInfrastructureProjects: AgentProject[] = [
  {
    title: "Conectare Sisteme Reale",
    description: "Integrarea infrastructurii de siguranță cu sistemele de monitorizare a agenților",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 4,
    timeTotal: 20,
    icon: Server,
    integrationProgress: 25,
    tasks: [
      { name: "Identificare surse de date", completed: true },
      { name: "Definire interfețe de integrare", completed: true },
      { name: "Implementare conexiuni securizate", completed: false },
      { name: "Testare flux de date", completed: false }
    ]
  },
  {
    title: "Algoritm Evaluare Dinamică Riscuri",
    description: "Sistem inteligent de identificare și cuantificare a riscurilor operaționale",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 3,
    timeTotal: 25,
    icon: Shield,
    integrationProgress: 20,
    tasks: [
      { name: "Definire parametri de risc", completed: true },
      { name: "Implementare model matematic", completed: false },
      { name: "Sistem de scorare dinamică", completed: false },
      { name: "Mecanism de alertare", completed: false }
    ]
  },
  {
    title: "Jurnalizare Avansată",
    description: "Sistem complet de monitorizare și înregistrare a acțiunilor agenților",
    status: "în progres",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 2,
    timeTotal: 15,
    icon: Server,
    integrationProgress: 15,
    tasks: [
      { name: "Definire format jurnal standard", completed: true },
      { name: "Implementare mecanisme de stocare", completed: false },
      { name: "Sistem de indexare și căutare", completed: false },
      { name: "Raportare automată", completed: false }
    ]
  },
  {
    title: "Siguranță Adaptivă",
    description: "Mecanism de auto-ajustare a parametrilor de siguranță bazat pe istoric",
    status: "planificat",
    priority: "medie",
    timeframe: "luni",
    timeUsed: 0,
    timeTotal: 40,
    icon: Settings,
    integrationProgress: 5,
    tasks: [
      { name: "Model de învățare automată", completed: false },
      { name: "Analiză istorică a incidentelor", completed: false },
      { name: "Mecanism de recalibrare", completed: false },
      { name: "Validare umană", completed: false }
    ]
  },
  {
    title: "Parametri de Monitorizare Autonomi",
    description: "Definirea precisă a datelor colectate pentru fiecare nivel de autonomie", 
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 3,
    timeTotal: 12,
    icon: ActivitySquare,
    integrationProgress: 40,
    tasks: [
      { name: "Definire niveluri de autonomie", completed: true },
      { name: "Identificare parametri critici", completed: true },
      { name: "Implementare mecanism de colectare", completed: false },
      { name: "Validare și testare parametri", completed: false }
    ]
  },
  {
    title: "Raportare Avansată",
    description: "Generare de rapoarte detaliate pentru fiecare incident sau potențial risc",
    status: "planificat",
    priority: "medie",
    timeframe: "săptămâni",
    timeUsed: 0,
    timeTotal: 15,
    icon: BarChart4,
    integrationProgress: 10,
    tasks: [
      { name: "Definire formate de raportare", completed: false },
      { name: "Implementare algoritmi de detecție", completed: false },
      { name: "Interfață de vizualizare", completed: false },
      { name: "Sistem de alerte configurabile", completed: false }
    ]
  },
  {
    title: "Securitate și Etică",
    description: "Asigurarea că toți agenții respectă standarde ridicate de securitate și etică în toate activitățile lor",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
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
    title: "Limitare și Siguranță",
    description: "Mecanisme care asigură că agenții autonomi operează în limite sigure și etice",
    status: "în progres",
    priority: "înaltă",
    timeframe: "săptămâni",
    timeUsed: 10,
    timeTotal: 15,
    icon: CircleSlash,
    tasks: [
      { name: "Parametrii de siguranță configurabili", completed: true },
      { name: "Mecanism de oprire de urgență", completed: true },
      { name: "Verificare continuă a conformității", completed: true },
      { name: "Protocol de revenire la control manual", completed: false }
    ]
  }
];
