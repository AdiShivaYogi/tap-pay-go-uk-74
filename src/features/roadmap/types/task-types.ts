
import { RoadmapItem } from "../types";

export interface TaskWithProgress extends RoadmapItem {
  timeRemaining: number;
  progressPercentage: number;
}
