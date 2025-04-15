
import { RoadmapItem } from "../../types";

export const productItems: RoadmapItem[] = [
  {
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
    title: "Optimizare UX Mobile",
    description: "Îmbunătățirea experienței pe dispozitive mobile",
    status: "in-progress",
    priority: "high",
    category: "development",
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
    title: "Pregătire Integrări Viitoare",
    description: "Pregătirea infrastructurii pentru API și integrări terțe",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "webhook",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 25,
      spent: 25,
      aiTotal: 15
    },
    details: [
      "Definirea structurii de API și endpoints ✓",
      "Implementarea autentificării OAuth ✓",
      "Crearea documentației pentru dezvoltatori ✓",
      "Dezvoltarea unui mediu sandbox pentru teste ✓",
      "Configurarea rate limiting și protecție API ✓"
    ]
  },
  {
    title: "Îmbunătățiri Securitate Internă",
    description: "Consolidarea măsurilor de securitate pentru date sensibile",
    status: "in-progress",
    priority: "high",
    category: "security",
    iconType: "shield-check",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 20,
      spent: 12,
      aiTotal: 15
    },
    details: [
      "Implementare criptare end-to-end pentru date utilizator",
      "Consolidare politici de acces și autorizare",
      "Auditare și logging avansate",
      "Scanări automate de vulnerabilități",
      "Exerciții de penetration testing"
    ]
  },
  {
    title: "Optimizare Performanță Back-end",
    description: "Îmbunătățirea performanței și scalabilității back-end",
    status: "in-progress",
    priority: "high",
    category: "infrastructure",
    iconType: "database",
    iconColor: "text-blue-600",
    timeEstimate: {
      total: 22,
      spent: 14,
      aiTotal: 18
    },
    details: [
      "Optimizare interogări și indexare bază de date",
      "Implementare mecanism de caching distribuit",
      "Configurare load balancing avansat",
      "Reducere latență API",
      "Testare și măsurare performanță"
    ]
  },
  {
    title: "Sistem de Backup și Recuperare",
    description: "Implementare sistem robust de backup și recuperare",
    status: "in-progress",
    priority: "high",
    category: "devops",
    iconType: "server-cog",
    iconColor: "text-amber-600",
    timeEstimate: {
      total: 18,
      spent: 13,
      aiTotal: 15
    },
    details: [
      "Configurare backup automat incremental",
      "Implementare strategie de recuperare după dezastre",
      "Testare regulată a procesului de restaurare",
      "Configurare retenție și arhivare date",
      "Documentare proceduri de urgență"
    ]
  }
];
