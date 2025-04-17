
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import { agents } from '@/components/agents/agents-data';

const AgentNode = ({ position, autonomyLevel }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const color = autonomyLevel > 70 ? 'green' : 
                autonomyLevel > 40 ? 'yellow' : 'red';

  return (
    <Sphere 
      ref={meshRef}
      position={position} 
      args={[autonomyLevel / 100, 32, 32]}
    >
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

export const AgentNetworkGraph = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {agents.map((agent, index) => (
        <AgentNode 
          key={agent.id}
          position={[
            Math.sin(index * 0.5) * 2, 
            Math.cos(index * 0.5) * 2, 
            0
          ]}
          autonomyLevel={agent.autonomyLevel || 50}
        />
      ))}
    </Canvas>
  );
};
