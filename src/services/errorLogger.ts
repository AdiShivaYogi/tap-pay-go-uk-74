import { InternalServer } from '../integrations/internalServer';
import { AgentFramework } from '@/integrations/agentFramework';

// Initialize self-healing agent
const healingAgent = new AgentFramework();

interface ErrorData {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: Date;
  userAgent: string;
  url: string;
  errorCode?: string;
}

const errorServer = new InternalServer({
  port: 3002,
  autoStart: true,
  agentCommunication: true
});

export const logError = async (errorData: ErrorData): Promise<void> => {
  try {
    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error occurred:', errorData);
    }

    // Use internal server for error logging
    await errorServer.logEvent({
      type: 'error',
      data: errorData,
      timestamp: new Date()
    });

  } catch (err) {
    console.error('Failed to log error:', err);
    // Fallback to localStorage
    const storedErrors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    storedErrors.push({
      ...errorData, 
      timestamp: errorData.timestamp.toISOString(),
      fallback: true
    });
    localStorage.setItem('errorLogs', JSON.stringify(storedErrors));
  }
};

// Track if we're already handling an error to prevent loops
let isHandlingError = false;

// Override console.error to capture all errors
const originalConsoleError: (...data: any[]) => void = console.error;
console.error = (...args: any[]) => {
  originalConsoleError(...args);
  
  if (!isHandlingError && args[0] instanceof Error) {
    isHandlingError = true;
    logError({
      message: args[0].message,
      stack: args[0].stack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }).finally(() => {
      isHandlingError = false;
    });
  }
};

export function categorizeError(error: Error): string {
  if (error.message.includes('NetworkError') || 
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout')) return 'network';
  if (error.message.includes('SyntaxError')) return 'syntax';
  if (error.message.includes('TypeError')) return 'type';
  if (error.message.includes('ReferenceError')) return 'reference';
  if (error.message.includes('Auth')) return 'authentication';
  return 'unknown';
}

export function getRecoveryStrategy(errorType: string): string {
  switch(errorType) {
    case 'network':
      return 'retry';
    case 'authentication':
      return 'refresh_token';
    case 'syntax':
    case 'type':
    case 'reference':
      return 'reload';
    default:
      return 'none';
  }
}

interface AutoHealResult {
  action: 'retry' | 'refresh_auth' | 'reload_page' | 'none';
  delay?: number;
}

export async function autoHealError(error: Error): Promise<AutoHealResult> {
  // First try basic recovery strategies
  const basicResult = await tryBasicRecovery(error);
  if (basicResult.action !== 'none') {
    return basicResult;
  }

  // If basic strategies fail, consult the healing agent
  try {
    const agentDecision = await healingAgent.decideRecovery({
      error: {
        message: error.message,
        type: categorizeError(error),
        stack: error.stack
      },
      baseStrategy: 'autoheal'
    });

    return {
      action: agentDecision.strategy as AutoHealResult['action'],
      delay: 1000 // Default delay for agent-initiated actions
    };
  } catch (agentError) {
    console.error('Agent recovery failed:', agentError);
    return { action: 'none' };
  }
}

async function tryBasicRecovery(error: Error): Promise<AutoHealResult> {
  const errorType = categorizeError(error);
  const strategy = getRecoveryStrategy(errorType);
  
  await logError({
    message: error.message,
    stack: error.stack,
    timestamp: new Date(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    errorCode: errorType
  });

  switch(strategy) {
    case 'retry':
      return { action: 'retry', delay: 2000 };
    case 'refresh_token':
      return { action: 'refresh_auth' };
    case 'reload':
      return { action: 'reload_page' };
    default:
      return { action: 'none' };
  }
}
