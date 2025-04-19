require('ts-node').register();
const { AgentLocalAPI } = require('../src/integrations/agentLocalAPI');

// Pornim serverul API pe portul 3003
const agentAPI = new AgentLocalAPI(3003);

// Menținem procesul activ
setInterval(() => {
  console.log('Agent API running on port 3003');
}, 60000);

// Gestionăm închiderea curată
process.on('SIGINT', () => {
  console.log('Shutting down Agent API...');
  agentAPI.shutdown();
  process.exit(0);
});
