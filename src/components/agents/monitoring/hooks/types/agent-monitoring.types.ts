
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
  description: string; // Adăugat pentru a rezolva eroarea în AgentActivityLog.tsx
  category: string;
  timestamp: Date;
}

export interface LearningRule {
  id?: string; // Poate fi generat automat
  sourceAgentId: string;
  targetAgentId: string;
  learningTypes: string[];
  interval: number;
  isActive: boolean;
  lastExecuted?: Date;
}

export interface AgentLearningRule {
  sourceAgentId: string;
  targetAgentId: string;
  learningTypes: string[];
  interval: number;
  isActive: boolean;
  lastExecuted?: Date;
}

export interface AgentInteraction {
  sourceAgentId: string;
  targetAgentId: string;
  learningType: string;
  timestamp: Date;
}

export interface LearningProgress {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  learningType: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'failed';
  startTime: Date;
  estimatedEndTime: Date;
  endTime?: Date;
}

export interface LearningReport {
  id: string;
  sourceAgentId: string;
  sourceAgentName: string;
  targetAgentId: string;
  targetAgentName: string;
  learningType: string;
  learningDate: Date;
  conceptsLearned: string[];
  duration: number; // în secunde
  insights: string[];
  summary: string;
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
  logAgentInteraction: (sourceAgentId: string, targetAgentId: string, learningType: string) => AgentInteraction;
  learningRules: AgentLearningRule[];
  addLearningRule: (rule: Omit<AgentLearningRule, 'lastExecuted'>) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
  toggleLearningRule: (sourceId: string, targetId: string) => void;
  learningProgress: LearningProgress[];
  learningReports: LearningReport[];
  startLearningProcess: (sourceId: string, targetId: string, learningType: string) => LearningProgress;
  updateLearningProgress: (id: string, progress: number) => void;
  completeLearningProcess: (id: string) => LearningReport | undefined;
  getLearningReports: () => LearningReport[];
  executeAutoLearning: () => void;
  // Adăugăm noile proprietăți pentru starea de autoexecuție
  autoExecutionStatus: Record<string, boolean>;
  saveAutoExecutionStatus: (projectId: string, status: boolean) => Promise<void>;
}
