
import { RoadmapItem } from "../../types";

export const devopsItems: RoadmapItem[] = [
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
    title: "Backup și Recuperare",
    description: "Sistem simplificat și eficient de backup și recuperare date",
    status: "in-progress",
    priority: "high",
    category: "devops",
    iconType: "database",
    iconColor: "text-yellow-500",
    timeEstimate: {
      total: 20,
      spent: 19,
      aiTotal: 15
    },
    details: [
      "Configurare backup automat incremental ✓",
      "Implementare strategie de recuperare după dezastre ✓",
      "Testare proces de restaurare ✓",
      "Configurare retenție date și arhivare ✓",
      "Finalizare documentație proceduri de urgență"
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
