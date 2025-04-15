
import { RoadmapItem } from "../types";
import { 
  infrastructureItems 
} from "./infrastructure-items";
import { 
  securityItems 
} from "./security-items";
import { 
  devopsItems 
} from "./devops-items";
import { 
  monitoringItems 
} from "./monitoring-items";
import { 
  productItems 
} from "./product-items";
import { 
  completedRoadmapItems 
} from "./completed-items";
import { 
  inProgressRoadmapItems 
} from "./in-progress-items";
import { 
  pendingRoadmapItems 
} from "./pending-items";

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
