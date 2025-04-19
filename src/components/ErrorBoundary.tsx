import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError, categorizeError, getRecoveryStrategy } from '../services/errorLogger';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  userFeedback: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      userFeedback: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false,
      userFeedback: ''
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    const errorType = categorizeError(error);
    logError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorCode: errorType
    });

    // Attempt automatic recovery based on error type
    const recoveryStrategy = getRecoveryStrategy(errorType);
    switch(recoveryStrategy) {
      case 'retry':
        setTimeout(() => {
          this.setState({ hasError: false });
        }, 3000);
        break;
      case 'refresh_token':
        // In a real app, this would call your auth refresh logic
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      case 'reload':
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        break;
    }
  }

  handleFeedbackSubmit = () => {
    const { error, errorInfo, userFeedback } = this.state;
    logError({
      message: `User Feedback: ${userFeedback}`,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorCode: 'USER_FEEDBACK'
    });
    this.setState({ userFeedback: '' });
  };

  renderErrorContent() {
    const { error, errorInfo, showDetails, userFeedback } = this.state;
    const errorType = error ? categorizeError(error) : 'unknown';

    return (
      <div className="p-6 max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg mt-10">
        <h2 className="text-xl font-bold text-red-700 mb-4">
          {errorType === 'network' ? 'Connection Problem' : 'Something Went Wrong'}
        </h2>
        
        <div className="mb-4">
          {errorType === 'network' ? (
            <p className="text-gray-700">We're having trouble connecting to the server. Please check your network connection.</p>
          ) : (
            <p className="text-gray-700">An unexpected error occurred. Our team has been notified.</p>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
          <button
            onClick={() => this.setState({ showDetails: !showDetails })}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {showDetails && (
          <div className="bg-white p-4 rounded-md mb-4 border border-red-100">
            <h3 className="font-medium mb-2">Error Details</h3>
            <pre className="text-sm overflow-auto p-2 bg-gray-50 rounded">
              {error?.toString()}
            </pre>
            {errorInfo?.componentStack && (
              <pre className="text-sm overflow-auto p-2 bg-gray-50 rounded mt-2">
                {errorInfo.componentStack}
              </pre>
            )}
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium mb-2">Help us improve</h3>
          <textarea
            value={userFeedback}
            onChange={(e) => this.setState({ userFeedback: e.target.value })}
            placeholder="What were you trying to do when this happened?"
            className="w-full p-3 border rounded mb-2"
            rows={3}
          />
          <button
            onClick={this.handleFeedbackSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Send Feedback
          </button>
        </div>
      </div>
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.renderErrorContent();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
