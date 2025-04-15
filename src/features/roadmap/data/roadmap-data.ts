
// Acest fișier servește ca punct central pentru exporturile de date roadmap
import { completedRoadmapItems } from './completed-items';
import { inProgressRoadmapItems } from './in-progress-items';
import { pendingRoadmapItems } from './pending-items';
import { securityItems } from './security-items';
import { infrastructureItems } from './infrastructure-items';
import { devopsItems } from './devops-items';
import { monitoringItems } from './monitoring-items';
import { productItems } from './product-items';
import { RoadmapItem } from "../types";

// Combinarea tuturor itemurilor într-un singur array pentru ușurința accesului
export const roadmapItems: RoadmapItem[] = [
  ...completedRoadmapItems,
  ...inProgressRoadmapItems,
  ...pendingRoadmapItems,
  ...securityItems,
  ...infrastructureItems,
  ...devopsItems, 
  ...monitoringItems,
  ...productItems
];

// Export individual pentru fiecare categorie
export { completedRoadmapItems };
export { inProgressRoadmapItems };
export { pendingRoadmapItems };
export { securityItems };
export { infrastructureItems };
export { devopsItems };
export { monitoringItems };
export { productItems };
