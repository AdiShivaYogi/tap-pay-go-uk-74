
import { Dispatch, SetStateAction } from "react";

export interface ActivityData {
  agentId: string;
  agentName: string;
  count: number;
  category: string;
  data?: any[];
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  category: string;
  timestamp: Date;
}

export interface AgentInteraction {
  sourceAgentId: string;
  targetAgentId: string;
  learningType: string;
  timestamp: Date;
}

export interface AgentLearningRule {
  sourceAgentId: string;
  targetAgentId: string;
  learningTypes: string[];
  interval: number;
  isActive: boolean;
  lastExecuted?: Date;
}

export interface LearningProgress {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  learningType: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
}

export interface LearningReport {
  id: string;
  sourceAgentId: string;
  sourceAgentName: string;
  targetAgentId: string;
  targetAgentName: string;
  learningType: string;
  insights: string[];
  learningDate: Date;
}

export interface AgentMonitoringHook {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  categories: string[];
  refreshData: () => Promise<void>;
  totalActivities: number;
  logDetailedAgentActivity: (agentId: string, description: string, category?: string) => void;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  lastRefresh: Date;
  logAgentInteraction: (sourceAgentId: string, targetAgentId: string, learningType: string) => AgentInteraction;
  learningRules: AgentLearningRule[];
  addLearningRule: (rule: Omit<AgentLearningRule, 'lastExecuted'>) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
  toggleLearningRule: (sourceId: string, targetId: string) => void;
  learningProgress: LearningProgress[];
  learningReports: LearningReport[];
  startLearningProcess: (sourceId: string, targetId: string, learningType: string) => any;
  updateLearningProgress: (id: string, progress: number) => void;
  completeLearningProcess: (id: string) => void;
  getLearningReports: () => void;
  executeAutoLearning: () => void;
}

