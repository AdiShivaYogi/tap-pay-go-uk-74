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
    title: "Îmbunătățiri Securitate Internă",
    description: "Consolidarea măsurilor de securitate pentru date sensibile",
    status: "in-progress",
    priority: "high",
    category: "security",
    iconType: "shield",
    iconColor: "text-red-500",
    timeEstimate: {
      total: 40,
      spent: 25,
      aiTotal: 25
    },
    details: [
      "Implementare criptare end-to-end pentru date utilizator ✓",
      "Consolidare politici de acces și autorizare ✓",
      "Auditare și logging avansate ✓",
      "Scanări automate de vulnerabilități",
      "Exerciții de penetration testing"
    ]
  }
];
