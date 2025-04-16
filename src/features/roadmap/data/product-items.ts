
import { RoadmapItem } from "../types";

export const productItems: RoadmapItem[] = [
  {
    id: "product-1",
    title: "Program Beta Limitat",
    description: "Lansare program beta cu primii 20 de utilizatori",
    status: "completed",
    priority: "high",
    category: "product",
    iconType: "test-tube-2",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 15,
      spent: 15,
      aiTotal: 6
    },
    details: [
      "Identificare și recrutare primilor 20 de utilizatori ✓",
      "Oferă acces complet și gratuit la funcționalități ✓",
      "Colectare feedback pentru îmbunătățiri ✓",
      "Monitorizare și suport pentru experiența utilizatorilor ✓",
      "Validare model de business și flux de plăți ✓"
    ]
  },
  {
    id: "product-2",
    title: "Optimizare UX Mobile",
    description: "Îmbunătățirea experienței pe dispozitive mobile",
    status: "inProgress",
    priority: "high",
    category: "ui",
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
    id: "product-3",
    title: "Îmbunătățiri Securitate Internă",
    description: "Consolidarea măsurilor de securitate pentru date sensibile",
    status: "inProgress",
    priority: "high",
    category: "security",
    iconType: "shield-check",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 20,
      spent: 18,
      aiTotal: 15
    },
    details: [
      "Implementare criptare end-to-end pentru date utilizator ✓",
      "Consolidare politici de acces și autorizare ✓",
      "Auditare și logging avansate ✓",
      "Scanări automate de vulnerabilități ✓",
      "Exerciții de penetration testing"
    ]
  },
  {
    id: "product-4",
    title: "Optimizare Performanță Back-end",
    description: "Îmbunătățirea performanței și scalabilității back-end",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "database",
    iconColor: "text-blue-600",
    timeEstimate: {
      total: 22,
      spent: 22,
      aiTotal: 18
    },
    details: [
      "Optimizare interogări și indexare bază de date ✓",
      "Implementare mecanism de caching distribuit ✓",
      "Configurare load balancing avansat ✓",
      "Reducere latență API ✓",
      "Testare și măsurare performanță ✓"
    ]
  },
  {
    id: "product-5",
    title: "Sistem de Backup și Recuperare",
    description: "Implementare sistem robust de backup și recuperare",
    status: "completed",
    priority: "high",
    category: "devops",
    iconType: "server-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 18,
      spent: 18,
      aiTotal: 15
    },
    details: [
      "Configurare backup automat incremental ✓",
      "Implementare strategie de recuperare după dezastre ✓",
      "Testare regulată a procesului de restaurare ✓",
      "Configurare retenție și arhivare date ✓",
      "Documentare proceduri de urgență ✓"
    ]
  }
];
