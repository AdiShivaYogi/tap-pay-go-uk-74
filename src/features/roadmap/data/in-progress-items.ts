
import { RoadmapItem } from "../types";
import { infrastructureItems } from "./infrastructure-items";
import { securityItems } from "./security-items";
import { monitoringItems } from "./monitoring-items";
import { productItems } from "./product-items";
import { devopsItems } from "./devops-items";

export const inProgressRoadmapItems: RoadmapItem[] = [
  ...infrastructureItems,
  ...securityItems,
  ...monitoringItems,
  ...productItems,
  ...devopsItems
];
