
import { RoadmapItem } from "../types";
import { completedRoadmapItems } from "./status/completed-items";
import { inProgressRoadmapItems } from "./status/in-progress-items";
import { pendingRoadmapItems } from "./status/pending-items";
import { securityItems } from "./categories/security-items";
import { infrastructureItems } from "./categories/infrastructure-items";
import { devopsItems } from "./categories/devops-items";
import { monitoringItems } from "./categories/monitoring-items";
import { productItems } from "./categories/product-items";

// Combine all roadmap items into a single array
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
