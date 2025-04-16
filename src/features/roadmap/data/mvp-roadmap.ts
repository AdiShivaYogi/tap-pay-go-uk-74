
import { Status } from "../types";

interface MvpRoadmapItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  progress: number;
}

export const mvpRoadmapText: MvpRoadmapItem[] = [
  {
    id: "mvp-1",
    title: "Procesare plăți prin Stripe",
    description: "Implementare integrare completă Stripe pentru procesarea plăților",
    status: "completed",
    progress: 100
  },
  {
    id: "mvp-2",
    title: "Configurare securitate de bază",
    description: "Setarea măsurilor esențiale de securitate",
    status: "completed",
    progress: 100
  },
  {
    id: "mvp-3",
    title: "Dashboard administrativ",
    description: "Panou de control pentru monitorizarea activității",
    status: "inProgress",
    progress: 75
  },
  {
    id: "mvp-4",
    title: "Raportare de bază",
    description: "Rapoarte esențiale pentru activitatea financiară",
    status: "inProgress",
    progress: 60
  },
  {
    id: "mvp-5",
    title: "Optimizare UX/UI",
    description: "Îmbunătățiri ale interfeței utilizator",
    status: "inProgress",
    progress: 45
  },
  {
    id: "mvp-6",
    title: "API documentat",
    description: "API public cu documentație completă",
    status: "planned",
    progress: 20
  }
];
