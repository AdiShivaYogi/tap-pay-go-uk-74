
import { RoadmapItem } from "../../types";
import { integrationItems } from "../categories/integration-items";
import { localizationItems } from "../categories/localization-items";
import { partnershipItems } from "../categories/partnership-items";

// Combine all pending items from different categories
export const pendingRoadmapItems: RoadmapItem[] = [
  ...integrationItems.filter(item => item.status === "pending"),
  ...localizationItems.filter(item => item.status === "pending"),
  ...partnershipItems.filter(item => item.status === "pending")
];
