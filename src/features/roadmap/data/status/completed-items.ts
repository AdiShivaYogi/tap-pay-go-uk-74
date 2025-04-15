
import { RoadmapItem } from "../../types";
import { paymentItems } from "../categories/payment-items";
import { uiItems } from "../categories/ui-items";
import { securityItems } from "../categories/security-items";
import { infrastructureItems } from "../categories/infrastructure-items";
import { devopsItems } from "../categories/devops-items";
import { productItems } from "../categories/product-items";

// Combine all completed items from different categories
export const completedRoadmapItems: RoadmapItem[] = [
  ...paymentItems,
  ...uiItems,
  ...securityItems.filter(item => item.status === "completed"),
  ...infrastructureItems.filter(item => item.status === "completed"),
  ...devopsItems.filter(item => item.status === "completed"),
  ...productItems.filter(item => item.status === "completed")
];
