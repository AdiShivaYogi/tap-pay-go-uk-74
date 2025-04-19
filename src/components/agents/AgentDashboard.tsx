import { useState, useEffect } from 'react';
import { agents } from './agents-data';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate fetching agent status
    const status = agents.reduce((acc, agent) => {
      acc[agent.id] = Math.random() > 0.3 ? 'online' : 'busy';
      return acc;
    }, {} as Record<string, string>);
    setAgentStatus(status);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Agent Dashboard</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {agents.map(agent => (
            <div key={agent.id} className={`p-4 rounded-lg shadow-md ${
              agentStatus[agent.id] === 'online' ? 'bg-green-50' : 'bg-yellow-50'
            }`}>
              <div className="flex items-center gap-3">
                <agent.icon className={`w-6 h-6 ${agent.color}`} />
                <h3 className="font-medium">{agent.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  agentStatus[agent.id] === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {agentStatus[agent.id]}
                </span>
                <span className="text-xs text-gray-500">Power: {agent.powerLevel}/10</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'tasks', 'analytics', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">System Overview</h2>
              <p className="text-gray-600">
                All agents are operational. Monitoring {agents.length} active agents.
              </p>
            </div>
          )}
          {activeTab === 'tasks' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>
              <ul className="space-y-3">
                {agents.map(agent => (
                  <li key={agent.id} className="p-3 bg-gray-50 rounded">
                    <h3 className="font-medium">{agent.name} Tasks</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {agentStatus[agent.id] === 'online' 
                        ? 'Processing active tasks' 
                        : 'Currently busy with high priority task'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
