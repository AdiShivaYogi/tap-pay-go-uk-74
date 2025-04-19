import React, { Suspense, lazy } from 'react';

// Lazy load the 3D visualization components with default imports
const AgentInnerWorldVisualization = lazy(() => import('./AgentInnerWorldVisualization'));
const AgentNetworkGraph = lazy(() => import('./AgentNetworkGraph'));

interface LazyLoadAgentInnerWorldProps {
  agentId: string;
}

export const LazyLoadAgentInnerWorld: React.FC<LazyLoadAgentInnerWorldProps> = ({ agentId }) => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading 3D visualization...</div>}>
      <ErrorBoundary>
        <AgentInnerWorldVisualization agentId={agentId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const LazyLoadAgentNetwork: React.FC = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading 3D network...</div>}>
      <ErrorBoundary>
        <AgentNetworkGraph />
      </ErrorBoundary>
    </Suspense>
  );
};

// Simple error boundary component for 3D visualizations
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('3D Visualization error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h3 className="text-red-700 font-medium">3D Visualization Error</h3>
          <p className="text-sm text-gray-600">
            There was an error loading the 3D visualization. This might be due to browser compatibility issues.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
