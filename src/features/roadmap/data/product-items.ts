
import { RoadmapItem } from "../types";

export const productItems: RoadmapItem[] = [
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
    title: "Pregătire Integrări Viitoare",
    description: "Pregătirea infrastructurii pentru API și integrări terțe",
    status: "in-progress",
    priority: "high",
    iconType: "webhook",
    iconColor: "text-purple-500",
    timeEstimate: {
      total: 25,
      spent: 5,
      aiTotal: 15
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
