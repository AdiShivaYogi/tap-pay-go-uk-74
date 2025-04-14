import { RoadmapItem } from "../types";

export const inProgressRoadmapItems: RoadmapItem[] = [
  {
    title: "Program Beta Limitat",
    description: "Lansare program beta cu primii 20 de utilizatori",
    status: "in-progress",
    priority: "high",
    iconType: "test-tube-2",
    iconColor: "text-primary",
    timeEstimate: {
      total: 15,
      spent: 5,
      aiTotal: 6
    },
    details: [
      "Identificare și recrutare primilor 20 de utilizatori",
      "Oferă acces complet și gratuit la funcționalități",
      "Colectare feedback pentru îmbunătățiri",
      "Monitorizare și suport pentru experiența utilizatorilor",
      "Validare model de business și flux de plăți"
    ]
  },
  {
    title: "Integrare și Securitate",
    description: "Integrare completă cu sisteme de securitate și plăți",
    status: "in-progress",
    priority: "high",
    iconType: "shield-check",
    iconColor: "text-primary",
    timeEstimate: {
      total: 25,
      spent: 15,
      aiTotal: 10
    },
    details: [
      "Integrare completă cu Stripe pentru plăți",
      "Implementare măsuri de securitate avansate",
      "Testare și audit de securitate",
      "Monitorizare în timp real a tranzacțiilor",
      "Sistem de backup și recuperare date"
    ]
  },
  {
    title: "Optimizare UX Mobile",
    description: "Îmbunătățirea experienței pe dispozitive mobile",
    status: "in-progress",
    priority: "high",
    iconType: "smartphone",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 18,
      spent: 8,
      aiTotal: 10
    },
    details: [
      "Design responsive pentru toate ecranele",
      "Optimizare viteza de încărcare pe conexiuni mobile",
      "Fluxuri de plată adaptate pentru touch",
      "Testare pe multiple dispozitive și browsere",
      "Animații și tranziții optimizate pentru mobile"
    ]
  },
  {
    title: "Testare și Optimizare Continuă",
    description: "Asigurarea calității și securității",
    status: "in-progress",
    priority: "medium",
    iconType: "test-tube-2",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 15,
      spent: 7,
      aiTotal: 6
    },
    details: [
      "Teste de securitate regulate",
      "Optimizarea performanței aplicației",
      "Audit continuu al fluxurilor de plată",
      "Monitorizare și alertare inteligentă",
      "Actualizări bazate pe feedback și reglementări"
    ]
  },
  {
    title: "Infrastructură Redundantă",
    description: "Asigurarea disponibilității continue a serviciului",
    status: "in-progress",
    priority: "high",
    iconType: "server-cog",
    iconColor: "text-red-500",
    timeEstimate: {
      total: 24,
      spent: 12,
      aiTotal: 16
    },
    details: [
      "Arhitectură multi-regiune pentru disponibilitate ridicată ✓",
      "Backup automat și recuperare în caz de dezastru ✓",
      "Failover automatizat pentru servicii critice ✓",
      "Monitorizare avansată și alertare în timp real ✓",
      "Documentare completă a proceselor de recuperare după dezastre"
    ]
  },
  {
    title: "Centru de Date Secundar",
    description: "Implementare infrastructură redundantă completă",
    status: "in-progress",
    priority: "high",
    iconType: "database",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 30,
      spent: 15,
      aiTotal: 25
    },
    details: [
      "Configurare centru de date secundar activ-pasiv ✓",
      "Replicare continuă a datelor între centre ✓",
      "Balansare automată a traficului în caz de avarie",
      "Sistem de monitorizare unificat pentru ambele centre ✓",
      "Testare completă a procedurilor de switching între centre"
    ]
  },
  {
    title: "Optimizare Infrastructură Cloud",
    description: "Îmbunătățirea performanței și scalabilității",
    status: "in-progress",
    priority: "high",
    iconType: "cloud-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 20,
      spent: 8,
      aiTotal: 15
    },
    details: [
      "Implementare auto-scaling pentru resurse cloud ✓",
      "Optimizare costuri și utilizare resurse",
      "Configurare CDN pentru livrare conținut global",
      "Implementare caching distribuit",
      "Monitorizare și optimizare continuă a performanței"
    ]
  }
];
