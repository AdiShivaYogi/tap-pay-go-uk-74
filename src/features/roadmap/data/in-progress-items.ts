import { RoadmapItem } from "../types";

export const inProgressRoadmapItems: RoadmapItem[] = [
  {
    title: "Monitorizare și Alertare",
    description: "Sistem avansat de monitorizare și alertare",
    status: "in-progress",
    priority: "high",
    iconType: "activity",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 20,
      spent: 15,
      aiTotal: 12
    },
    details: [
      "Implementare sistem de logging centralizat ✓",
      "Configurare alerte pentru evenimente critice ✓",
      "Dashboard-uri de monitorizare în timp real ✓",
      "Integrare cu sisteme de notificare",
      "Analiza și raportare automată a incidentelor"
    ]
  },
  {
    title: "Backup și Recuperare",
    description: "Sistem robust de backup și recuperare date",
    status: "in-progress",
    priority: "high",
    iconType: "database",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 25,
      spent: 18,
      aiTotal: 15
    },
    details: [
      "Implementare backup automatizat multi-nivel ✓",
      "Configurare retenție date pe termen lung ✓",
      "Testare proceduri de recuperare ✓",
      "Documentare politici de backup",
      "Optimizare strategii de backup incremental"
    ]
  },
  {
    title: "Management Configurații",
    description: "Sistem centralizat de management al configurațiilor",
    status: "in-progress",
    priority: "medium",
    iconType: "settings",
    iconColor: "text-amber-500",
    timeEstimate: {
      total: 15,
      spent: 10,
      aiTotal: 8
    },
    details: [
      "Implementare sistem version control pentru configurații ✓",
      "Automatizare deployment configurații ✓",
      "Validare și testare configurații",
      "Rollback automat configurații invalide",
      "Audit modificări configurații"
    ]
  },
  {
    title: "Scalare Automată",
    description: "Implementare sistem de auto-scaling avansat",
    status: "in-progress",
    priority: "high",
    iconType: "expand",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 30,
      spent: 20,
      aiTotal: 18
    },
    details: [
      "Configurare reguli de auto-scaling ✓",
      "Implementare balansare încărcare automată ✓",
      "Optimizare algoritmi de scalare",
      "Monitorizare performanță scalare",
      "Raportare costuri și eficiență"
    ]
  },
  {
    title: "Securitate Rețea",
    description: "Implementare măsuri avansate de securitate rețea",
    status: "in-progress",
    priority: "high",
    iconType: "shield",
    iconColor: "text-red-500",
    timeEstimate: {
      total: 35,
      spent: 25,
      aiTotal: 20
    },
    details: [
      "Implementare firewall multi-layer ✓",
      "Configurare VPN și access control ✓",
      "Monitorizare și detecție intruziuni",
      "Implementare politici de securitate",
      "Testare penetrare și vulnerabilități"
    ]
  },
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
    title: "Infrastructură Redundantă Avansată",
    description: "Strategie completă de disponibilitate și reziliență",
    status: "in-progress",
    priority: "high",
    iconType: "server-cog",
    iconColor: "text-red-500",
    timeEstimate: {
      total: 40,
      spent: 30,
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
    status: "in-progress", 
    priority: "high",
    iconType: "cloud-cog",
    iconColor: "text-blue-500", 
    timeEstimate: {
      total: 50,
      spent: 45,
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
      "Testare continuă a scenariilor de dezastre"
    ]
  },
  {
    title: "Optimizare și Monitorizare Cloud",
    description: "Îmbunătățirea performanței și controlului infrastructurii",
    status: "in-progress",
    priority: "high", 
    iconType: "network",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 35,
      spent: 32,
      aiTotal: 20
    },
    details: [
      "Implementare monitorizare comprehensivă ✓",
      "Configurare metrici detaliate de performanță ✓",
      "Implementare sisteme de auto-scaling inteligente ✓",
      "Optimizare costuri și utilizare resurse cloud ✓",
      "Configurare CDN global cu strategie de caching ✓",
      "Audit și optimizare continuă a infrastructurii ✓",
      "Implementare politici de securitate cloud ✓",
      "Raportare automată a performanței și costurilor"
    ]
  },
  {
    title: "Securitate Avansată Cloud",
    description: "Implementare măsuri de securitate cloud native",
    status: "in-progress",
    priority: "high",
    iconType: "shield-check",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 30,
      spent: 20,
      aiTotal: 25
    },
    details: [
      "Implementare WAF (Web Application Firewall) ✓",
      "Configurare DDoS protection și rate limiting ✓",
      "Implementare sisteme de detecție a intruziunilor (IDS) ✓",
      "Scanare automată de vulnerabilități ✓",
      "Criptare end-to-end pentru date sensibile ✓",
      "Implementare politici de acces bazate pe identitate",
      "Monitorizare și alertare pentru evenimente de securitate",
      "Conformitate cu standardele de securitate cloud"
    ]
  },
  {
    title: "Automatizare și DevOps",
    description: "Implementare pipeline-uri și automatizări complexe",
    status: "in-progress",
    priority: "high",
    iconType: "server-cog",
    iconColor: "text-yellow-500",
    timeEstimate: {
      total: 25,
      spent: 15,
      aiTotal: 20
    },
    details: [
      "Pipeline-uri CI/CD pentru deployment automat ✓",
      "Automatizare provizionare infrastructură cu Terraform ✓",
      "Implementare GitOps pentru management configurații ✓",
      "Monitorizare automată și self-healing ✓",
      "Sistem de rollback automat în caz de erori",
      "Automatizare teste de performanță și securitate",
      "Implementare chaos engineering pentru testare reziliență",
      "Dashboard-uri pentru monitorizare pipeline-uri"
    ]
  }
];
