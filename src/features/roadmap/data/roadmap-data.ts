import { RoadmapItem } from "../types";

export const roadmapItems: RoadmapItem[] = [
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
      spent: 6,
      aiTotal: 16
    },
    details: [
      "Arhitectură multi-regiune pentru disponibilitate ridicată ✓",
      "Backup automat și recuperare în caz de dezastru",
      "Failover automatizat pentru servicii critice",
      "Monitorizare continuă a infrastructurii",
      "Testare regulată a scenariilor de recuperare"
    ]
  }
];
