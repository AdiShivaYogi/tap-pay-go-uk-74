
import { RoadmapItem } from "../../types";

export const paymentItems: RoadmapItem[] = [
  {
    title: "Integrare Multi-Payment",
    description: "Suport pentru procesarea plăților prin multiple metode",
    status: "completed",
    priority: "high",
    category: "payment",
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
    title: "Integrare Stripe Complex",
    description: "Delegare completă a procesării plăților",
    status: "completed",
    priority: "high",
    category: "payment",
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
  }
];
