declare module '../integrations/agentFramework' {
  interface AgentDecision {
    strategy: string;
    confidence: number;
    alternatives?: string[];
  }

  interface CustomSolution {
    steps: string[];
    requiresConfirmation: boolean;
  }

  export class AgentClient {
    constructor(apiKey: string);
    decideRecovery(params: {
      error: { message: string; type: string; stack?: string };
      context?: Record<string, any>;
      baseStrategy: string;
    }): Promise<AgentDecision>;
    getCustomSolution(apiKey: string, error: Error): Promise<CustomSolution>;
  }
}
