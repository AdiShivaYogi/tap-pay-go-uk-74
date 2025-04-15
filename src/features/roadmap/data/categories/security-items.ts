
import { RoadmapItem } from "../../types";

export const securityItems: RoadmapItem[] = [
  {
    title: "Îmbunătățiri Securitate Backend",
    description: "Consolidarea securității serverelor și a datelor",
    status: "completed",
    priority: "high",
    category: "security",
    iconType: "server-cog",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 40,
      spent: 40,
      aiTotal: 20
    },
    details: [
      "Implementare autentificare multi-factor (MFA) ✓",
      "Audit de securitate complet al codului sursă ✓",
      "Actualizarea dependențelor la cele mai recente versiuni ✓",
      "Monitorizare continuă a vulnerabilităților ✓",
      "Îmbunătățirea politicilor de acces și a permisiunilor ✓"
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
    title: "Securitate API & Cloud",
    description: "Implementare măsuri esențiale de securitate API și cloud",
    status: "completed",  // Am schimbat statusul la "completed"
    priority: "high",
    category: "security",
    iconType: "shield-check",
    iconColor: "text-green-500",  // Am schimbat și culoarea pentru a indica finalizarea
    timeEstimate: {
      total: 25,
      spent: 25,  // Am actualizat și timpul total petrecut
      aiTotal: 20
    },
    details: [
      "Configurare DDoS protection și rate limiting ✓",
      "Implementare sisteme de detecție a intruziunilor (IDS) ✓",
      "Scanare automată de vulnerabilități ✓",
      "Criptare end-to-end pentru date sensibile ✓",
      "Verificare obligatorie cont Stripe pentru API ✓",
      "Monitorizare și alertare pentru evenimente de securitate ✓"
    ]
  },
  {
    title: "Îmbunătățiri Securitate Internă",
    description: "Securitate consolidată pentru date sensibile",
    status: "completed",
    priority: "high",
    category: "security",
    iconType: "shield",
    iconColor: "text-green-500",
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
  }
];
