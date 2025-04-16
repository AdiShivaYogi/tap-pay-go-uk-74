
import { RoadmapItem, Category } from "../../types";

// Define the product items
export const productItems: RoadmapItem[] = [
  {
    id: "product-1",
    title: "Testare și QA Avansată",
    description: "Implementare procese complexe de testare și QA",
    status: "completed",
    priority: "high",
    category: "product",
    iconType: "code",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 30,
      spent: 30,
      aiTotal: 15
    },
    details: [
      "Implementare teste unitare și de integrare ✓",
      "Configurare CI/CD pentru rulare automată teste ✓",
      "Implementare teste end-to-end ✓", 
      "Raportare bug-uri și monitorizare remediere ✓",
      "Testare de securitate și penetrare ✓"
    ]
  },
  {
    id: "product-2",
    title: "Aplicație Mobilă",
    description: "Dezvoltare aplicație mobilă pentru iOS și Android",
    status: "inProgress",
    priority: "high",
    category: "product",
    iconType: "smartphone",
    iconColor: "text-blue-500",
    timeEstimate: {
      total: 60,
      spent: 25,
      aiTotal: 30
    },
    details: [
      "Design UI/UX pentru aplicație mobilă ✓",
      "Dezvoltare funcționalități de bază",
      "Integrare cu API-ul principal", 
      "Optimizare performanță pe diverse dispozitive",
      "Testare și lansare în App Store și Google Play"
    ]
  }
];
