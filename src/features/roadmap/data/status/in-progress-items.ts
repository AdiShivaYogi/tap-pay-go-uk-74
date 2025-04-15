import { RoadmapItem } from "../../types";

export const inProgressRoadmapItems: RoadmapItem[] = [
  {
    title: "Îmbunătățiri Securitate Backend",
    description: "Consolidarea securității serverelor și a datelor",
    status: "in-progress",
    priority: "high",
    iconType: "security",
    iconColor: "text-green-500",
    timeEstimate: {
      total: 40,
      spent: 25,
      aiTotal: 20
    },
    details: [
      "Implementare autentificare multi-factor (MFA)",
      "Audit de securitate complet al codului sursă",
      "Actualizarea dependențelor la cele mai recente versiuni",
      "Monitorizare continuă a vulnerabilităților",
      "Îmbunătățirea politicilor de acces și a permisiunilor"
    ]
  },
  {
    title: "Documentație API Publică",
    description: "Crearea documentației detaliate pentru API",
    status: "in-progress",
    priority: "medium",
    iconType: "documentation",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 32,
      spent: 18,
      aiTotal: 15
    },
    details: [
      "Generarea documentației folosind instrumente automate",
      "Exemple de utilizare pentru fiecare endpoint",
      "Ghiduri detaliate pentru autentificare și autorizare",
      "Secțiuni dedicate pentru erori și depanare",
      "Actualizarea continuă a documentației"
    ]
  },
  {
    title: "Integrare Chat în Timp Real",
    description: "Adăugarea funcționalității de chat live pentru suport clienți",
    status: "in-progress",
    priority: "medium",
    iconType: "communication",
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
    title: "Pregătire Integrări Viitoare",
    description: "Pregătirea infrastructurii pentru API și integrări terțe",
    status: "in-progress",
    priority: "high",
    iconType: "api",
    iconColor: "text-indigo-500",
    timeEstimate: {
      total: 28,
      spent: 12,
      aiTotal: 18
    },
    details: [
      "Definirea structurii de API și endpoints",
      "Implementarea autentificării OAuth",
      "Crearea documentației pentru dezvoltatori",
      "Dezvoltarea unui mediu sandbox pentru teste",
      "Configurarea rate limiting și protecție API"
    ]
  }
];
