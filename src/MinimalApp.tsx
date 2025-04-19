import React from 'react';
import { createRoot } from 'react-dom/client';

const MinimalApp = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Test App</h1>
      <p className="text-gray-700">
        This is a minimal test application to isolate the issue.
      </p>
    </div>
  );
};

// Create a separate entry point for the minimal app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<MinimalApp />);
}

export default MinimalApp;
