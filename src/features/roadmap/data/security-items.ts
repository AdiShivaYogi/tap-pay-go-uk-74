
import { RoadmapItem } from "../types";

export const securityItems: RoadmapItem[] = [
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
    title: "Securitate Avansată Cloud",
    description: "Implementare măsuri esențiale de securitate cloud",
    status: "in-progress",
    priority: "high",
    iconType: "shield-check",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 25,
      spent: 24,
      aiTotal: 20
    },
    details: [
      "Configurare DDoS protection și rate limiting ✓",
      "Implementare sisteme de detecție a intruziunilor (IDS) ✓",
      "Scanare automată de vulnerabilități ✓",
      "Criptare end-to-end pentru date sensibile ✓",
      "Monitorizare și alertare pentru evenimente de securitate ✓"
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
    title: "Consolidarea securității serverelor și a datelor",
    description: "Implementare măsuri avansate de securitate pentru protejarea datelor sensibile",
    status: "in-progress",
    priority: "high",
    category: "security",
    iconType: "shield",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 45,
      spent: 20,
      aiTotal: 15
    },
    details: [
      "Implementare autentificare multi-factor (MFA) ✓",
      "Audit de securitate complet al codului sursă",
      "Actualizarea dependențelor la cele mai recente versiuni",
      "Monitorizare continuă a vulnerabilităților",
      "Îmbunătățirea politicilor de acces și a permisiunilor"
    ]
  }
];
