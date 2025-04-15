
import { RoadmapItem } from "../types";

// Infrastructure items
export const infrastructureItems: RoadmapItem[] = [
  {
    title: "Infrastructură Redundantă Avansată",
    description: "Strategie completă de disponibilitate și reziliență",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "server-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 40,
      spent: 40,
      aiTotal: 25
    },
    details: [
      "Arhitectură multi-regiune cu toleranță la defecțiuni ✓",
      "Implementare cluster Kubernetes cu auto-scaling ✓", 
      "Configurare mecanisme de failover automat ✓",
      "Strategie de backup și recuperare în 3 etape ✓",
      "Monitorizare avansată cu detecție proactivă ✓",
      "Plan de recuperare în dezastre < 5 minute ✓",
      "Implementare filtre de securitate la nivel de rețea ✓",
      "Teste periodice de rezistență și recuperare ✓"
    ]
  },
  {
    title: "Centru de Date Redundant",
    description: "Infrastructură cloud distribuită și securizată",
    status: "completed",
    priority: "high",
    category: "infrastructure",
    iconType: "cloud-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 50,
      spent: 50,
      aiTotal: 30
    },
    details: [
      "Configurare centru de date secundar activ-activ ✓",
      "Replicare geografică a datelor în timp real ✓",
      "Implementare balansare inteligentă a traficului ✓", 
      "Sistem de monitorizare unificat cu alertare automată ✓",
      "Mecanisme avansate de securitate între centre de date ✓",
      "Optimizare costuri prin resurse cloud dinamice ✓",
      "Plan de tranziție și migrare între centre de date ✓",
      "Testare continuă a scenariilor de dezastre ✓"
    ]
  }
];

// Security items
export const securityItems: RoadmapItem[] = [
  {
    title: "Audit de Securitate Complet",
    description: "Audit independent de securitate și verificare conformitate",
    status: "completed",
    priority: "high",
    category: "security",
    iconType: "shield-check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 60,
      spent: 60,
      aiTotal: 35
    },
    details: [
      "Verificare independentă de vulnerabilități ✓",
      "Evaluare completă a conformității GDPR ✓",
      "Teste de penetrare externe și interne ✓",
      "Analiză infrastructură și configurație cloud ✓",
      "Securitate criptografică și management chei ✓",
      "Revizuire procese DevSecOps ✓",
      "Evaluare proceduri de backup și recuperare ✓",
      "Documentație și planuri de remediere ✓"
    ]
  }
];

// DevOps items
export const devopsItems: RoadmapItem[] = [
  {
    title: "Pipeline CI/CD Automatizat",
    description: "Automatizare completă a proceselor de dezvoltare și livrare",
    status: "in-progress",
    priority: "high",
    category: "devops",
    iconType: "git-merge",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 45,
      spent: 30,
      aiTotal: 20
    },
    details: [
      "Implementare Github Actions pentru teste automate ✓",
      "Integrare continuă cu verificări de calitate cod ✓",
      "Implementare deployment automat pe medii de dezvoltare ✓",
      "Setup infrastructură ca și cod cu Terraform ✓",
      "Optimizare pipeline pentru deployment rapid",
      "Implementare rollback automat în caz de eșec",
      "Integrare monitorizare în procesul de deployment",
      "Automatizare teste de performanță post-deployment"
    ]
  }
];

// Monitoring items
export const monitoringItems: RoadmapItem[] = [
  {
    title: "Monitorizare și Alertare Avansată",
    description: "Sistem centralizat de monitorizare cu alertare proactivă",
    status: "in-progress",
    priority: "medium",
    category: "devops",
    iconType: "activity",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 35,
      spent: 25,
      aiTotal: 15
    },
    details: [
      "Implementare Prometheus pentru colectarea de metrici ✓",
      "Configurare Grafana cu dashboards personalizate ✓",
      "Alertare proactivă pentru evenimente critice ✓",
      "Monitorizare în timp real a performanței ✓",
      "Analiză predictivă pentru prevenția erorilor",
      "Monitorizare utilizare resurse și optimizare costuri",
      "Integrare cu sistemul de ticketing",
      "Monitorizare experiență utilizator (RUM)"
    ]
  }
];

// Product items
export const productItems: RoadmapItem[] = [
  {
    title: "Procesare Plăți Securizată",
    description: "Implementare sistem de plăți cu conformitate PCI DSS",
    status: "completed",
    priority: "high",
    category: "product",
    iconType: "credit-card",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 55,
      spent: 55,
      aiTotal: 25
    },
    details: [
      "Integrare completă cu provider de plăți PCI DSS ✓",
      "Implementare tokenizare carduri pentru securitate maximă ✓",
      "Sistem anti-fraudă cu verificare în timp real ✓",
      "Procesare criptată end-to-end a datelor sensibile ✓",
      "Implementare 3D Secure pentru autentificare suplimentară ✓",
      "Conformitate cu reglementările locale și internaționale ✓",
      "Sistem de reconciliere automată a plăților ✓",
      "Audit complet și log-uri pentru toate tranzacțiile ✓"
    ]
  },
  {
    title: "Panou de Control Utilizator",
    description: "Interfață completă pentru managementul contului și preferințelor",
    status: "in-progress",
    priority: "medium",
    category: "product",
    iconType: "layout-dashboard",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 40,
      spent: 25,
      aiTotal: 15
    },
    details: [
      "Dashboard personalizabil cu widget-uri configurabile ✓",
      "Setări cont și profil cu verificare în doi pași ✓",
      "Istoric complet tranzacții și activitate ✓",
      "Management preferințe comunicare și notificări ✓",
      "Vizualizare rapoarte și analiză date personale",
      "Configurare avansată securitate și confidențialitate",
      "Personalizare experiență utilizator",
      "Integrare cu sistemul de suport și ticketing"
    ]
  }
];

// Completed, In Progress and Pending items from earlier categories
export const completedRoadmapItems: RoadmapItem[] = [
  // Items filtered from above categories with status "completed"
  ...infrastructureItems.filter(item => item.status === "completed"),
  ...securityItems.filter(item => item.status === "completed"),
  ...productItems.filter(item => item.status === "completed")
];

export const inProgressRoadmapItems: RoadmapItem[] = [
  // Items filtered from above categories with status "in-progress"
  ...devopsItems.filter(item => item.status === "in-progress"),
  ...monitoringItems.filter(item => item.status === "in-progress"),
  ...productItems.filter(item => item.status === "in-progress")
];

export const pendingRoadmapItems: RoadmapItem[] = [
  // Currently no pending items, but can add from categories as needed
];

// Combinarea tuturor itemurilor într-un singur array pentru ușurința accesului
export const roadmapItems: RoadmapItem[] = [
  ...completedRoadmapItems,
  ...inProgressRoadmapItems,
  ...pendingRoadmapItems,
  ...securityItems,
  ...infrastructureItems,
  ...devopsItems, 
  ...monitoringItems,
  ...productItems
];
