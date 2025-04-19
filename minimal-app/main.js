// Simple vanilla JavaScript code without any dependencies
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  // Create a simple UI
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  
  const heading = document.createElement('h1');
  heading.textContent = 'Minimal Test App';
  heading.style.color = '#333';
  
  const paragraph = document.createElement('p');
  paragraph.textContent = 'This is a minimal test application without any dependencies.';
  paragraph.style.color = '#666';
  
  // Append elements to the container
  container.appendChild(heading);
  container.appendChild(paragraph);
  
  // Append the container to the root
  root.appendChild(container);
  
  console.log('Minimal app initialized successfully');
});
