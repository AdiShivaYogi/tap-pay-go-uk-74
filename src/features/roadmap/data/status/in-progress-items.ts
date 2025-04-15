
import { RoadmapItem } from "../../types";
import { securityItems } from "../categories/security-items";
import { monitoringItems } from "../categories/monitoring-items";
import { productItems } from "../categories/product-items";
import { devopsItems } from "../categories/devops-items";

// Combine all in-progress items from different categories, excluding the integration preparation task
export const inProgressRoadmapItems: RoadmapItem[] = [
  ...securityItems.filter(item => item.status === "in-progress"),
  ...monitoringItems.filter(item => item.status === "in-progress"),
  ...productItems.filter(item => item.status === "in-progress"),
  ...devopsItems.filter(item => item.status === "in-progress")
].filter(item => item.title !== "Pregătire Integrări Viitoare");
