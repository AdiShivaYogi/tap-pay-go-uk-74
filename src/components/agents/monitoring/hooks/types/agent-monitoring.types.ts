
export interface ActivityData {
  agentId: string;
  agentName: string;
  category: string;
  taskCount: number;
  proposalCount: number;
  conversationCount: number;
  learningCount?: number;
}

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  description: string;
  category: string; // 'task', 'proposal', 'conversation', 'learning', etc.
  timestamp: string;
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
  progress: number; // 0-100
  startTime: Date;
  estimatedEndTime: Date;
  learningType: string;
  status: 'in-progress' | 'completed' | 'failed';
}

export interface LearningReport {
  id: string;
  sourceAgentId: string;
  sourceAgentName: string;
  targetAgentId: string;
  targetAgentName: string;
  learningType: string;
  learningDate: Date;
  duration: number; // în secunde
  conceptsLearned: string[];
  summary: string;
}

export interface AgentLearningRule {
  sourceAgentId: string;
  targetAgentId: string;
  learningTypes: string[];
  interval: number; // în minute
  isActive: boolean;
  lastExecuted?: Date;
}

export interface AgentMonitoringState {
  activityData: ActivityData[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  categories: string[];
  totalActivities: number;
  autoRefresh: boolean;
  lastRefresh: Date;
  learningRules: AgentLearningRule[];
  learningProgress: LearningProgress[];
  learningReports: LearningReport[];
}

export interface AgentMonitoringHook extends AgentMonitoringState {
  refreshData: () => void;
  logDetailedAgentActivity: (agentId: string, description: string, category?: string) => void;
  toggleAutoRefresh: () => void;
  logAgentInteraction: (sourceAgentId: string, targetAgentId: string, learningType: string) => AgentInteraction;
  addLearningRule: (rule: Omit<AgentLearningRule, 'lastExecuted'>) => void;
  removeLearningRule: (sourceId: string, targetId: string) => void;
  toggleLearningRule: (sourceId: string, targetId: string) => void;
  startLearningProcess: (sourceId: string, targetId: string, learningType: string) => LearningProgress;
  updateLearningProgress: (id: string, progress: number) => void;
  completeLearningProcess: (id: string, conceptsLearned: string[], summary: string) => LearningReport;
  getLearningReports: (sourceId?: string, targetId?: string) => LearningReport[];
}
