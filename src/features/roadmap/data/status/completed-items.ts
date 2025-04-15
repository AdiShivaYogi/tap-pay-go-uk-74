import { RoadmapItem } from "../../types";

export const completedRoadmapItems: RoadmapItem[] = [
  {
    title: "Integrare Multi-Payment",
    description: "Suport pentru procesarea plăților prin multiple metode",
    status: "completed",
    priority: "high",
    iconType: "banknote",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 20,
      spent: 20,
      aiTotal: 15
    },
    details: [
      "Integrare completă cu Stripe pentru carduri bancare ✓",
      "Suport pentru plăți recurente și abonamente ✓",
      "Plăți instant cu confirmări automate ✓",
      "Sistem de webhook-uri pentru notificări ✓",
      "Suport pentru multiple monede (RON, EUR, USD) ✓"
    ]
  },
  {
    title: "Securitate și Confidențialitate",
    description: "Protejarea datelor utilizatorilor prin design",
    status: "completed",
    iconType: "shield-check",
    iconColor: "text-green-600",
    timeEstimate: {
      total: 10,
      spent: 10,
      aiTotal: 4
    },
    details: [
      "Zero stocare de date sensibile ✓",
      "Delegarea procesării plăților către Stripe ✓",
      "Interfață securizată și transparentă ✓",
      "Experiență utilizator izolată pentru fiecare client ✓",
      "Monitorizare minimală, axată strict pe comisioane ✓"
    ]
  },
  {
    title: "Integrare Stripe Complex",
    description: "Delegare completă a procesării plăților",
    status: "completed",
    priority: "high",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 20,
      spent: 20,
      aiTotal: 8
    },
    details: [
      "Utilizare webhook-uri Stripe pentru notificări ✓",
      "Management complet al plăților prin API Stripe ✓",
      "Fără stocare de informații de plată ✓",
      "Dashboard pentru urmărirea comisioanelor ✓",
      "Conformitate PSD2 și SCA prin Stripe ✓"
    ]
  },
  {
    title: "UI/UX Personalizat",
    description: "Experiență avansată fără compromiterea confidențialității",
    status: "completed",
    priority: "medium",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 15,
      spent: 15,
      aiTotal: 6
    },
    details: [
      "Design responsive și intuitiv ✓",
      "Vizualizare dinamică a tranzacțiilor prin API-ul Stripe ✓",
      "Dashboard personalizat pentru fiecare utilizator ✓",
      "Interfață simplă pentru gestionarea plăților ✓",
      "Transparență maximă în procesarea tranzacțiilor ✓"
    ]
  },
  {
    title: "Monitorizare Etică",
    description: "Urmărirea anomaliilor fără acces la date sensibile",
    status: "completed",
    priority: "high",
    iconType: "shield-check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 12,
      spent: 12,
      aiTotal: 5
    },
    details: [
      "Detectare anomalii în tranzacții ✓",
      "Alertare pentru evenimente neobișnuite ✓",
      "Sistem de raportare centrat pe confidențialitate ✓",
      "Metrici agregate fără identificatori personali ✓",
      "Analiză de pattern-uri pentru îmbunătățirea UX ✓"
    ]
  },
  {
    title: "Raportare Avansată",
    description: "Analiză și insights fără date sensibile",
    status: "completed",
    priority: "high",
    iconType: "check",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 10,
      spent: 10,
      aiTotal: 4
    },
    details: [
      "Grafice pentru volumul de tranzacțiilor ✓",
      "Sumar de venituri pe diferite perioade ✓",
      "Filtrare și căutare sigură ✓",
      "Exporturi de rapoarte anonimizate ✓",
      "Monitorizare etică a performanței ✓"
    ]
  },
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
  },
  {
    title: "Securitate Rețea",
    description: "Implementare măsuri avansate de securitate rețea",
    status: "completed",
    priority: "high",
    category: "security",
    iconType: "shield",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 35,
      spent: 35,
      aiTotal: 20
    },
    details: [
      "Implementare firewall multi-layer ✓",
      "Configurare VPN și access control ✓",
      "Monitorizare și detecție intruziuni ✓",
      "Implementare politici de securitate ✓",
      "Testare penetrare și vulnerabilități ✓"
    ]
  },
  {
    title: "Îmbunătățiri Securitate Internă",
    description: "Securitate consolidată pentru date sensibile - IMPLEMENTAT DE URGENȚĂ",
    status: "completed",
    priority: "high",
    category: "security",
    iconType: "shield",
    iconColor: "text-red-500",
    timeEstimate: {
      total: 40,
      spent: 40,
      aiTotal: 25
    },
    details: [
      "Implementare criptare end-to-end pentru date utilizator ✓",
      "Consolidare politici de acces și autorizare ✓",
      "Auditare și logging avansate ✓",
      "Scanări automate de vulnerabilități ✓",
      "Exerciții de penetration testing finale ✓"
    ]
  },
  {
    title: "Management Configurații",
    description: "Sistem centralizat de management al configurațiilor",
    status: "completed",
    priority: "medium",
    category: "devops",
    iconType: "server-cog",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 15,
      spent: 15,
      aiTotal: 8
    },
    details: [
      "Implementare sistem version control pentru configurații ✓",
      "Automatizare deployment configurații ✓",
      "Validare și testare configurații ✓",
      "Rollback automat configurații invalide ✓",
      "Audit modificări configurații ✓"
    ]
  },
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
  }
];
