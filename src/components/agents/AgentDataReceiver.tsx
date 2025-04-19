import React, { useEffect, useState, useRef } from 'react';
import { agents } from './agents-data';
import { AgentClient } from '../../integrations/agentFramework';

interface AgentDataReceiverProps {
  agentId: string;
  initialData?: any;
  onDataReceived: (data: any) => void;
}

export const AgentDataReceiver: React.FC<AgentDataReceiverProps> = ({ 
  agentId, 
  initialData,
  onDataReceived 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [dataBuffer, setDataBuffer] = useState<any[]>(initialData ? [initialData] : []);
  const agentClientRef = useRef<AgentClient | null>(null);

  useEffect(() => {
    // Initialize connection
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    agentClientRef.current = new AgentClient(agent.apiKey);
    
    const setupDataStream = async () => {
      try {
        await agentClientRef.current?.connect();
        setIsConnected(true);
        
        // Subscribe to data channels
        agentClientRef.current?.subscribe('initial-data', (data) => {
          setDataBuffer(prev => [...prev, data]);
          onDataReceived(data);
        });

        agentClientRef.current?.subscribe('updates', (update) => {
          setDataBuffer(prev => [...prev, update]);
          onDataReceived(update);
        });

      } catch (error) {
        console.error('Connection failed:', error);
      }
    };

    setupDataStream();

    return () => {
      agentClientRef.current?.disconnect();
    };
  }, [agentId]);

  const handleDataProcessed = () => {
    // Clear processed data from buffer
    setDataBuffer([]);
  };

  return (
    <div className="agent-data-receiver">
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
      <div className="data-buffer">
        {dataBuffer.length > 0 ? (
          <button onClick={handleDataProcessed}>
            Process {dataBuffer.length} data items
          </button>
        ) : (
          'Waiting for initial data...'
        )}
      </div>
    </div>
  );
};

export default AgentDataReceiver;
