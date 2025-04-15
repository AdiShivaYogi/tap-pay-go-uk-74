
export interface RoadmapSection {
  title: string;
  items: string[];
  completed?: boolean;
}

export const mvpRoadmapData: RoadmapSection[] = [
  {
    title: "Obiective Principale",
    items: [
      "Integrare sistem de plăți securizat",
      "Autentificare și autorizare utilizatori",
      "Dashboard principal cu statistici de bază",
      "Sistem de notificări pentru evenimente importante"
    ]
  },
  {
    title: "Funcționalități Critice (P0)",
    items: [
      "Securitate și Conformitate",
      "Experiență Utilizator",
      "Procesare Plăți"
    ]
  },
  {
    title: "Timeline Estimat",
    items: [
      "Săptămâna 1-2: Arhitectură și setup inițial",
      "Săptămâna 3-4: Dezvoltare funcționalități core",
      "Săptămâna 5: Testare și optimizare",
      "Săptămâna 6: Lansare beta și feedback inițial"
    ]
  },
  {
    title: "Metrici de Succes",
    items: [
      "Rata de conversie > 2%",
      "Timp mediu de încărcare < 3s", 
      "Satisfacție utilizator > 4.5/5",
      "Uptime 99.9%"
    ]
  }
];
