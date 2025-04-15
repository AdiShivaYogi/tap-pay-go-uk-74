
import { RoadmapItem } from "../types";
import { completedRoadmapItems } from "./status/completed-items";
import { inProgressRoadmapItems } from "./status/in-progress-items";
import { pendingRoadmapItems } from "./status/pending-items";
import { securityItems } from "./categories/security-items";
import { infrastructureItems } from "./categories/infrastructure-items";
import { devopsItems } from "./categories/devops-items";
import { monitoringItems } from "./categories/monitoring-items";
import { productItems } from "./categories/product-items";
import { integrationItems } from "./categories/integration-items";
import { localizationItems } from "./categories/localization-items";
import { partnershipItems } from "./categories/partnership-items";

// Function to remove duplicates based on title
const removeDuplicates = (items: RoadmapItem[]) => {
  const uniqueItems = new Map<string, RoadmapItem>();
  items.forEach(item => {
    if (!uniqueItems.has(item.title) && item.title !== "Pregătire Integrări Viitoare") {
      uniqueItems.set(item.title, item);
    }
  });
  return Array.from(uniqueItems.values());
};

// Combine all roadmap items into a single array, prioritizing UK and Stripe compliance items
export const roadmapItems: RoadmapItem[] = removeDuplicates([
  ...securityItems,           // Security first - critical for UK/Stripe compliance
  ...infrastructureItems,     // Infrastructure foundation
  ...completedRoadmapItems,   // Completed features
  ...inProgressRoadmapItems,  // Current development
  ...devopsItems,            // DevOps and automation
  ...monitoringItems,        // Monitoring and analytics
  ...productItems,           // Product features
  ...pendingRoadmapItems,    // Future developments
  ...localizationItems,      // Localization features
  ...partnershipItems        // Partnership features
]);
