import React from 'react';
import { createRoot } from 'react-dom/client';

// Simple React component
const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Minimal React App</h1>
      <p style={{ color: '#666' }}>
        This is a minimal React application without any 3D visualizations.
      </p>
    </div>
  );
};

// Render the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
});
