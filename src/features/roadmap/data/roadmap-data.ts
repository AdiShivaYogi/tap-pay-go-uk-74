
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
import { paymentItems } from "./categories/payment-items";
import { uiItems } from "./categories/ui-items";

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
  ...securityItems,           
  ...infrastructureItems,     
  ...completedRoadmapItems,   
  ...inProgressRoadmapItems,  
  ...devopsItems,            
  ...monitoringItems,        
  ...productItems,           
  ...pendingRoadmapItems,    
  ...localizationItems,      
  ...partnershipItems,       // Make sure partnershipItems are included here
  ...paymentItems,          
  ...uiItems                 
]);
