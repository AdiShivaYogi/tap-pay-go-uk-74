
import { RoadmapItem } from "../../types";

export const inProgressRoadmapItems: RoadmapItem[] = [
  {
    title: "Îmbunătățiri Securitate Backend",
    description: "Consolidarea securității serverelor și a datelor",
    status: "in-progress",
    priority: "high",
    iconType: "shield",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 40,
      spent: 35,
      aiTotal: 20
    },
    details: [
      "Implementare autentificare multi-factor (MFA) ✓",
      "Audit de securitate complet al codului sursă ✓",
      "Actualizarea dependențelor la cele mai recente versiuni ✓",
      "Monitorizare continuă a vulnerabilităților ✓",
      "Îmbunătățirea politicilor de acces și a permisiunilor ✓",
      "Verificare obligatorie cont Stripe pentru API ✓",
      "Implementare rate limiting și protecție API"
    ]
  },
  {
    title: "Documentație API Publică",
    description: "Crearea documentației detaliate pentru API",
    status: "in-progress",
    priority: "high",
    iconType: "file-code-2",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 32,
      spent: 28,
      aiTotal: 15
    },
    details: [
      "Generarea documentației folosind instrumente automate ✓",
      "Exemple de utilizare pentru fiecare endpoint ✓",
      "Ghiduri detaliate pentru autentificare și autorizare ✓",
      "Documentație transparentă cerințe de securitate ✓",
      "Actualizare documentație cu cerințe Stripe ✓",
      "Secțiuni dedicate pentru erori și depanare"
    ]
  },
  {
    title: "Integrare Chat în Timp Real",
    description: "Adăugarea funcționalității de chat live pentru suport clienți",
    status: "in-progress",
    priority: "medium",
    iconType: "messages-square",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 24,
      spent: 10,
      aiTotal: 12
    },
    details: [
      "Alegerea unei soluții de chat potrivite",
      "Integrarea chat-ului în interfața web",
      "Configurarea notificărilor și a alertelor",
      "Training pentru echipa de suport clienți",
      "Monitorizarea performanței chat-ului"
    ]
  },
  {
    title: "Optimizare Performanță Back-end",
    description: "Îmbunătățirea performanței și scalabilității back-end",
    status: "in-progress",
    priority: "high",
    iconType: "database",
    iconColor: "text-blue-600",
    timeEstimate: {
      total: 22,
      spent: 18,
      aiTotal: 18
    },
    details: [
      "Optimizare interogări și indexare bază de date ✓",
      "Implementare mecanism de caching distribuit ✓",
      "Configurare load balancing avansat ✓",
      "Reducere latență API ✓",
      "Testare și măsurare performanță"
    ]
  },
  {
    title: "Îmbunătățiri Securitate Internă",
    description: "Consolidarea măsurilor de securitate pentru date sensibile",
    status: "in-progress",
    priority: "high",
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
  }
]
