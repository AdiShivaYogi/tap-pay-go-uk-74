const { AgentLocalAPI } = require('../src/integrations/agentLocalAPI');

async function testSanctuaryMode() {
  const api = new AgentLocalAPI();
  
  try {
    // Test basic functionality
    console.log('Testing health status:');
    const health = api.getHealthStatus();
    console.log(health);

    console.log('\nTesting command execution:');
    const commandResult = api.executeCommand({ type: 'diagnose' });
    console.log(commandResult);

    console.log('\nTesting sanctuary mode:');
    const entered = await api.enterSanctuary();
    console.log('Entered sanctuary:', entered);
    
    if (entered) {
      await api.exitSanctuary();
      console.log('Exited sanctuary mode');
    }

    console.log('\nTest completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSanctuaryMode();
