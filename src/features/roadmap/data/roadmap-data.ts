
// Acest fișier servește ca punct central pentru exporturile de date roadmap
import { completedRoadmapItems } from './completed-items';
import { inProgressRoadmapItems } from './in-progress-items';
import { pendingRoadmapItems } from './pending-items';
import { RoadmapItem } from "../types";

// Combinarea tuturor itemurilor într-un singur array pentru ușurința accesului
export const roadmapItems: RoadmapItem[] = [
  ...completedRoadmapItems,
  ...inProgressRoadmapItems,
  ...pendingRoadmapItems
];

// Export individual pentru fiecare categorie
export { completedRoadmapItems };
export { inProgressRoadmapItems };
export { pendingRoadmapItems };
