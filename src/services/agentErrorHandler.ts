import { getRecoveryStrategy, categorizeError } from './errorLogger';
import { AgentClient } from '../integrations/agentFramework';
import { agents } from '../components/agents/agents-data';

interface AgentRecoveryOptions {
  apiKey: string;
  maxRetries?: number;
  context?: {
    userId?: string;
    sessionId?: string;
    component?: string;
    [key: string]: any;
  };
  agentId?: string;
  environment?: 'production' | 'development' | 'testing';
}

export class AgentErrorHandler {
  private agentClient: AgentClient;
  private apiKey: string;
  private options: AgentRecoveryOptions;

  constructor(options: AgentRecoveryOptions) {
    this.options = options;
    this.agentClient = new AgentClient(options.apiKey);
    this.apiKey = options.apiKey;
  }

  private logAutoHealEvent(agentId: string, event: {
    errorType: string;
    actionTaken: string;
    success: boolean;
    timestamp: Date;
    details?: string;
    stackTrace?: string;
    component?: string;
  }) {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    agent.autoHealEvents.unshift({
      timestamp: new Date(),
      ...event
    });

    // Keep only the last 10 events
    if (agent.autoHealEvents.length > 10) {
      agent.autoHealEvents.length = 10;
    }
  }

  async handleError(error: Error, context?: Record<string, any> & { agentId?: string }) {
    const errorType = categorizeError(error);
    const baseStrategy = getRecoveryStrategy(errorType);

    // Consult autonomous agent for recovery decision
    const agentResponse = await this.agentClient.decideRecovery({
      error: {
        message: error.message,
        type: errorType,
        stack: error.stack
      },
      context,
      baseStrategy
    });

    if (context?.agentId) {
      this.logAutoHealEvent(context.agentId, {
        errorType,
        actionTaken: agentResponse.strategy,
        success: false,
        timestamp: new Date(),
        details: error.message.slice(0, 100),
        stackTrace: error.stack?.slice(0, 200),
        component: context.component
      });
    }

    const result = await this.executeRecovery(agentResponse.strategy, error);

    if (context?.agentId && result) {
      this.logAutoHealEvent(context.agentId, {
        errorType,
        actionTaken: agentResponse.strategy,
        success: true,
        timestamp: new Date(),
        details: result.action === 'custom' 
          ? 'Soluție personalizată aplicată' 
          : undefined,
        component: context.component
      });
    }

    return result;
  }

  private async executeRecovery(strategy: string, error: Error) {
    try {
    switch(strategy.toLowerCase()) {
        case 'retry':
          return { 
            action: 'retry', 
            delay: this.options.context?.retryDelay ?? 3000 
          };
        case 'refresh_token':
          return { 
            action: 'refresh',
            scope: 'full' 
          };
        case 'partial_refresh':
          return {
            action: 'refresh',
            scope: 'partial'
          };
        case 'custom_solution':
          const solution = await this.agentClient.getCustomSolution(this.apiKey, error);
          return { 
            action: 'custom', 
            solution,
            requiresApproval: solution?.requiresConfirmation ?? true
          };
        case 'fallback':
          return {
            action: 'fallback',
            mode: 'reduced_functionality'
          };
        default:
          return { 
            action: 'reload',
            level: 'full' 
          };
      }
    } catch (execError) {
      console.error('Failed to execute recovery:', execError);
      return { action: 'failed', error: execError };
    }
  }
}

export const createAgentErrorHandler = (options: AgentRecoveryOptions) => {
  return new AgentErrorHandler(options);
};
