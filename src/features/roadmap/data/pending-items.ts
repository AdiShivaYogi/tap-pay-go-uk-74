
import { RoadmapItem } from "../types";

export const pendingRoadmapItems: RoadmapItem[] = [
  {
    title: "Integrare API pentru Terți",
    description: "Permiterea integrării cu sisteme externe",
    status: "pending",
    priority: "medium",
    iconType: "webhook",
    iconColor: "text-violet-500",
    timeEstimate: {
      total: 22,
      spent: 0,
      aiTotal: 15
    },
    details: [
      "Dezvoltare API REST pentru integrări",
      "Documentație completă pentru dezvoltatori",
      "Autentificare OAuth pentru aplicații terțe",
      "Sandbox pentru testarea integrărilor",
      "Limitare de rate și protecție împotriva abuzurilor"
    ]
  },
  {
    title: "Localizare și Internaționalizare",
    description: "Suport pentru multiple limbi și regiuni",
    status: "pending",
    priority: "low",
    iconType: "globe",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 16,
      spent: 0,
      aiTotal: 12
    },
    details: [
      "Sistem de traduceri dinamice",
      "Suport pentru multiple limbi de interfață",
      "Adaptare la specificul local pentru fiecare țară",
      "Formatare localizată pentru date, numere și valute",
      "Documentație multilingvă"
    ]
  },
  {
    title: "Program Parteneriat",
    description: "Sistem de afiliere și parteneriate",
    status: "pending",
    priority: "low",
    iconType: "users",
    iconColor: "text-yellow-500",
    timeEstimate: {
      total: 18,
      spent: 0,
      aiTotal: 10
    },
    details: [
      "Portal pentru parteneri și afiliați",
      "Sistem de tracking și atribuire a referalurilor",
      "Raportare transparentă pentru comisioane",
      "Materiale de marketing pentru parteneri",
      "Dashboard dedicat pentru managementul parteneriatelor"
    ]
  }
];
