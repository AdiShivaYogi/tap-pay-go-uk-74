import { AgentLocalAPI } from '../src/integrations/agentLocalAPI';

async function testSanctuaryMode() {
  const api = new AgentLocalAPI();
  
  try {
    // Test entering sanctuary mode
    const entered = await api.enterSanctuary();
    console.log('Entered sanctuary mode:', entered);
    
    // Test health status
    const health = api.getHealthStatus();
    console.log('Health status:', health);
    
    // Test exiting sanctuary mode
    await api.exitSanctuary();
    console.log('Exited sanctuary mode');
    
    // Test shutdown
    api.shutdown();
    console.log('API shutdown completed');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSanctuaryMode();
