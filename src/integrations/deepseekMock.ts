interface DeepSeekAnalysisResult {
  primarySolution: string;
  confidenceScore: number;
  alternativeSolutions: string[];
}

interface DeepSeekSolution {
  steps: string[];
  requiresConfirmation: boolean;
}

export default class DeepSeekMock {
  constructor(private config: {
    apiKey: string;
    autoRecover: boolean;
    decisionThreshold: number;
  }) {}

  async analyze(params: {
    error: { message: string; type: string; stack?: string };
    context?: Record<string, any>;
    baseStrategy: string;
  }): Promise<DeepSeekAnalysisResult> {
    // Framework context is available in params.context.framework
    return {
      primarySolution: params.baseStrategy,
      confidenceScore: 0.9,
      alternativeSolutions: ['restart', 'fallback']
    };
  }

  async generateSolution(params: {
    errorDetails: Error;
    apiKey: string;
    frameworkContext?: {
      name: string;
      recoveryProtocols: string[];
    };
  }): Promise<DeepSeekSolution> {
    return {
      steps: [
        'Analyze error context',
        'Check system resources',
        'Apply recovery strategy'
      ],
      requiresConfirmation: false
    };
  }
}
