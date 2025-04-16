
export type Status = "completed" | "inProgress" | "planned" | "pending";
export type Priority = "high" | "medium" | "low";
export type Category = "security" | "payment" | "ui" | "monitoring" | "infrastructure" | "integration" | "product" | "devops" | "localization" | "partnership";
export type RoadmapIconType = "code" | "security" | "payment" | "monitoring" | "infrastructure" | "ui" | "settings" | "integration" | "product" | "partnership" | "check" | "users" | "banknote" | "search" | "zap";

export interface TimeEstimate {
  total: number;
  spent: number;
  aiTotal?: number;
}

export interface RoadmapItem {
  id: number | string;
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  category?: Category;
  details: string[];
  iconType?: RoadmapIconType;
  iconColor?: string;
  timeEstimate: TimeEstimate;
}

export interface RoadmapContextType {
  items: RoadmapItem[];
  categories: Category[];
  setActiveCategory: (category: Category | null) => void;
  activeCategory: Category | null;
}
