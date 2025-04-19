
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { agents } from '@/components/agents/agents-data';

interface AgentNodeProps {
  position: [number, number, number];
  autonomyLevel: number;
  name: string;
}

const AgentNode: React.FC<AgentNodeProps> = ({ position, autonomyLevel, name }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Determinăm culoarea în funcție de nivelul de autonomie
  const getColor = () => {
    if (autonomyLevel > 70) return new THREE.Color('green');
    if (autonomyLevel > 40) return new THREE.Color('yellow'); 
    return new THREE.Color('red');
  };

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[autonomyLevel / 100 + 0.2, 32, 32]} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
};

const AgentConnection: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
}> = ({ start, end }) => {
  // Creăm geometria și materialul manual pentru conexiuni
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    start[0], start[1], start[2],
    end[0], end[1], end[2]
  ]);
  
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  return (
    <primitive object={new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
    )} />
  );
};

export const AgentNetworkGraph: React.FC = () => {
  // Calculează pozițiile agenților într-un cerc
  const agentPositions = agents.map((_, index) => {
    const angle = (index / agents.length) * Math.PI * 2;
    const radius = 2;
    return [
      Math.sin(angle) * radius, 
      Math.cos(angle) * radius, 
      0
    ] as [number, number, number];
  });

  // Generează conexiuni între agenți
  const connections = [];
  for (let i = 0; i < agents.length; i++) {
    for (let j = i + 1; j < agents.length; j++) {
      // Creăm conexiuni doar dacă agenții sunt relevanți unii pentru alții
      if (agents[i].relevance === agents[j].relevance || 
          agents[i].relevance === 'core' || 
          agents[j].relevance === 'core') {
        connections.push({
          start: agentPositions[i],
          end: agentPositions[j]
        });
      }
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Conexiuni între agenți */}
      {connections.map((connection, index) => (
        <AgentConnection 
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
        />
      ))}
      
      {/* Noduri pentru agenți */}
      {agents.map((agent, index) => (
        <AgentNode 
          key={agent.id}
          position={agentPositions[index]}
          autonomyLevel={agent.autonomyLevel || 50}
          name={agent.name}
        />
      ))}
    </Canvas>
  );
};

export default AgentNetworkGraph;
