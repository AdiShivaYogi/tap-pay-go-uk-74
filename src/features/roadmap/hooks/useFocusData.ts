
import { useState } from "react";

export interface RecentAchievement {
  title: string;
  date: string;
  description: string;
}

export interface SubTask {
  name: string;
  completed: boolean;
}

export interface CurrentTask {
  title: string;
  description: string;
  progress: number;
  priority: "high" | "medium" | "low";
  daysLeft: number;
  subtasks: SubTask[];
}

export interface UpcomingFocusItem {
  title: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
}

export const useFocusData = () => {
  // Putem adăuga state și logică aici în viitor dacă e necesar
  
  const recentAchievements: RecentAchievement[] = [
    {
      title: "Integrare completă API Stripe",
      date: "10 Apr 2025",
      description: "Sistemul de procesare plăți este acum integrat cu API-ul Stripe"
    },
    {
      title: "Certificare GDPR pentru piața UK",
      date: "5 Apr 2025",
      description: "Am obținut certificarea pentru conformitatea cu reglementările GDPR în UK"
    },
    {
      title: "Refactorizare componentă autentificare",
      date: "1 Apr 2025",
      description: "Componentă de autentificare separată în componente mai mici și mai reutilizabile"
    }
  ];

  const currentTasks: CurrentTask[] = [
    {
      title: "Integrare UK & Stripe",
      description: "Finalizare API pentru procesarea plăților pentru piața UK",
      progress: 68,
      priority: "high",
      daysLeft: 5,
      subtasks: [
        { name: "Documentație API Gateway", completed: true },
        { name: "Verificare conformitate GDPR", completed: true },
        { name: "Testare integrare Stripe", completed: false },
        { name: "Finalizare platformă administrativă", completed: false }
      ]
    },
    {
      title: "Refactorizare componente UI",
      description: "Îmbunătățirea structurii și performanței componentelor React",
      progress: 45,
      priority: "medium",
      daysLeft: 7,
      subtasks: [
        { name: "Separare componente mari în componente mai mici", completed: true },
        { name: "Optimizare rendering", completed: false },
        { name: "Implementare design unitar", completed: false },
        { name: "Testare compatibilitate cross-browser", completed: false }
      ]
    }
  ];

  const upcomingFocus: UpcomingFocusItem[] = [
    {
      title: "Lansare Beta pentru parteneri selectați",
      timeframe: "Următoarele 14 zile",
      priority: "high"
    },
    {
      title: "Implementare flux complet pentru UK",
      timeframe: "Următoarele 30 zile",
      priority: "high"
    },
    {
      title: "Optimizări de performanță pentru dashboard",
      timeframe: "Următoarele 45 zile",
      priority: "medium"
    }
  ];

  return {
    recentAchievements,
    currentTasks,
    upcomingFocus
  };
};
