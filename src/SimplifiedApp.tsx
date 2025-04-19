import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from './components/ui/toaster';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Simple component that doesn't use any 3D visualizations
const SimplifiedApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">TapPayGo - Simplified App</h1>
        <p className="text-gray-700 mb-4">
          This is a simplified version of the application without any 3D visualizations.
        </p>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Diagnostic Information</h2>
          <p className="text-blue-600">
            This simplified version was created to diagnose issues with the main application.
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

// Create a wrapper component that includes all the providers
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SimplifiedApp />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Mount the app when the DOM is loaded
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

export default SimplifiedApp;
