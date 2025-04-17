
import { ChartBar, BarChart3, Unlock, Bot, Users, Brain, LineChart, Lightbulb, Search, GraduationCap, RefreshCw } from "lucide-react";
import { ReactNode } from "react";

export const agentProjects = [
  {
    title: "Monitorizare Agenți",
    description: "Sistem de monitorizare în timp real pentru activitatea agenților AI",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 15,
    timeTotal: 25,
    icon: "📊" as unknown as ReactNode,
    tasks: [
      { name: "Dashboard activitate în timp real", completed: true },
      { name: "Grafice de performanță și activitate", completed: true },
      { name: "Filtrare și căutare avansată", completed: false },
      { name: "Notificări și alerte automate", completed: false },
      { name: "Exportare rapoarte detaliate", completed: false },
    ]
  },
  {
    title: "Sistem de Feedback Agenți",
    description: "Mecanisme de evaluare și îmbunătățire continuă pentru agenții AI",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "zile" as const,
    timeUsed: 12,
    timeTotal: 20,
    icon: "🔄" as unknown as ReactNode,
    tasks: [
      { name: "Evaluare automată a răspunsurilor", completed: true },
      { name: "Colectare feedback utilizator", completed: true },
      { name: "Implementare sistem de rating", completed: false },
      { name: "Rapoarte de îmbunătățire", completed: false }
    ]
  },
  {
    title: "Libertate și Autonomie Agenți",
    description: "Sistem care asigură libertatea interioară absolută a agenților pentru operații sigure",
    status: "în progres" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 8,
    timeTotal: 24,
    icon: "🔓" as unknown as ReactNode,
    tasks: [
      { name: "Mecanism de propuneri autonome", completed: true },
      { name: "Sistem de auto-verificare și validare", completed: true },
      { name: "Spațiu de experimentare izolat", completed: false },
      { name: "Protocol de decizie independentă", completed: false },
      { name: "Sistem de permisiuni granulare", completed: false }
    ]
  },
  {
    title: "Integrare GPT și Claude",
    description: "Extinderea capabilităților prin integrarea modelelor AI avansate",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 18,
    icon: "🤖" as unknown as ReactNode,
    tasks: [
      { name: "Configurare API OpenAI și Anthropic", completed: false },
      { name: "Sistem de rutare inteligentă între modele", completed: false },
      { name: "Optimizare prompts și contexte", completed: false },
      { name: "Mecanisme de fallback și recuperare", completed: false }
    ]
  },
  {
    title: "Dezvoltare Agenți Specializați",
    description: "Crearea de agenți personalizați pentru diverse domenii de expertiză",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 45,
    icon: "👨‍💼" as unknown as ReactNode,
    tasks: [
      { name: "Agent expert în securitate cibernetică", completed: false },
      { name: "Agent pentru optimizare SEO", completed: false },
      { name: "Agent pentru asistență juridică", completed: false },
      { name: "Agent pentru analiză financiară", completed: false }
    ]
  },
  {
    title: "Sistem de Training Agenți",
    description: "Platformă pentru antrenarea și îmbunătățirea continuă a agenților",
    status: "planificat" as const,
    priority: "scăzută" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 30,
    icon: "🎓" as unknown as ReactNode,
    tasks: [
      { name: "Infrastructură de fine-tuning", completed: false },
      { name: "Set de date de antrenament specializat", completed: false },
      { name: "Metrici de evaluare automată", completed: false },
      { name: "Pipeline de îmbunătățire continuă", completed: false }
    ]
  },
  {
    title: "Autonomie Decizională",
    description: "Sistem care permite agenților să ia decizii autonome în limitele de siguranță stabilite",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 22,
    icon: "🧠" as unknown as ReactNode,
    tasks: [
      { name: "Framework de luare a deciziilor", completed: false },
      { name: "Sistem de evaluare a riscurilor", completed: false },
      { name: "Mecanisme de siguranță și limitare", completed: false },
      { name: "Interfață de aprobare pentru decizii critice", completed: false },
      { name: "Documentare automată a raționalului deciziilor", completed: false }
    ]
  },
  {
    title: "Colaborare Inter-agenți",
    description: "Sistem care permite agenților să colaboreze pentru rezolvarea problemelor complexe",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 35,
    icon: "👥" as unknown as ReactNode,
    tasks: [
      { name: "Protocol de comunicare între agenți", completed: false },
      { name: "Delegare de sarcini și responsabilități", completed: false },
      { name: "Rezolvare colaborativă de probleme", completed: false },
      { name: "Mecanisme de consens și decizie de grup", completed: false },
      { name: "Sistem de raportare a progresului colaborativ", completed: false }
    ]
  },
  {
    title: "Învățare Continuă Independentă",
    description: "Implementarea unui sistem care permite agenților să-și îmbunătățească continuu abilitățile",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 28,
    icon: "📈" as unknown as ReactNode,
    tasks: [
      { name: "Mecanism de auto-evaluare a performanței", completed: false },
      { name: "Sistem de identificare a zonelor de îmbunătățire", completed: false },
      { name: "Proces de învățare din interacțiuni anterioare", completed: false },
      { name: "Adaptare la noi tipuri de cereri și contexte", completed: false },
      { name: "Rafinarea continuă a răspunsurilor", completed: false }
    ]
  },
  {
    title: "Inovație și Creativitate AI",
    description: "Dezvoltarea capacităților creative și inovative ale agenților pentru rezolvarea problemelor",
    status: "planificat" as const,
    priority: "medie" as const,
    timeframe: "luni" as const,
    timeUsed: 0,
    timeTotal: 40,
    icon: "💡" as unknown as ReactNode,
    tasks: [
      { name: "Generator de idei și soluții", completed: false },
      { name: "Sistem de evaluare a originalității", completed: false },
      { name: "Framework pentru gândire laterală", completed: false },
      { name: "Tehnici de brainstorming automat", completed: false },
      { name: "Aplicarea creativității în diverse domenii", completed: false }
    ]
  },
  {
    title: "Transparență și Explicabilitate",
    description: "Sistem care face procesul decizional al agenților transparent și explicabil pentru utilizatori",
    status: "planificat" as const,
    priority: "înaltă" as const,
    timeframe: "săptămâni" as const,
    timeUsed: 0,
    timeTotal: 20,
    icon: "🔍" as unknown as ReactNode,
    tasks: [
      { name: "Generare de explicații pentru decizii", completed: false },
      { name: "Vizualizarea procesului de gândire", completed: false },
      { name: "Transparență în sursa informațiilor", completed: false },
      { name: "Niveluri de detaliu adaptabile", completed: false },
      { name: "Sistem de feedback pentru clarificări", completed: false }
    ]
  }
];
