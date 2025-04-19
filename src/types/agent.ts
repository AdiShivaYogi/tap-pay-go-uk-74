export interface AgentStatus {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'sanctuary';
  lastChecked: Date;
  resources: {
    memory: NodeJS.MemoryUsage;
    cpu: NodeJS.CpuUsage;
  };
  sanctuaryState?: {
    lastSync: Date;
    preservedMemoryMB: number;
    peerConnections: number;
  };
}

export interface AgentCommand {
  type: 'diagnose' | 'update' | 'repair' | 'custom';
  payload?: any;
  timestamp?: Date;
}

export interface AgentMetrics {
  uptime: number;
  responseTime: {
    average: number;
    p95: number;
  };
  errorRate: number;
}

export interface AuthToken {
  agentId: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}
