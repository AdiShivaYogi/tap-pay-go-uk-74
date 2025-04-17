export interface ActivityData {
  agentId: string;
  agentName: string;
  category: string;
  count: number;
  data: any[];
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  category: string;
  timestamp: Date;
}

export interface LearningRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  conditions: {
    activityType?: string;
    minCount?: number;
    timeWindow?: number;
  };
  actions: {
    startLearning: boolean;
    topic?: string;
  };
}

export interface LearningReport {
  id: string;
  agentId: string;
  agentName: string;
  topic: string;
  content: string;
  timestamp: Date;
  learningDuration: number;
}

export interface AgentMonitoringHook {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  categories: string[];
  totalActivities: number;
  refreshData: () => Promise<void>;
  logDetailedAgentActivity: (agentId: string, description: string, category?: string) => void;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  lastRefresh: Date;
  logAgentInteraction: (agentId: string, action: string, status: string) => Promise<void>;
  learningRules: LearningRule[];
  addLearningRule: (rule: LearningRule) => void;
  removeLearningRule: (id: string) => void;
  toggleLearningRule: (id: string, enabled: boolean) => void;
  learningProgress: Map<string, number>;
  learningReports: LearningReport[];
  startLearningProcess: (agentId: string, topic: string) => void;
  updateLearningProgress: (agentId: string, progress: number) => void;
  completeLearningProcess: (agentId: string, report: string) => void;
  getLearningReports: () => void;
  executeAutoLearning: () => void;
  // Adăugăm noile proprietăți pentru starea de autoexecuție
  autoExecutionStatus: Record<string, boolean>;
  saveAutoExecutionStatus: (projectId: string, status: boolean) => Promise<void>;
}
