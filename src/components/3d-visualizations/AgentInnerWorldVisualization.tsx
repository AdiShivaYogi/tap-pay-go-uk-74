
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { agents } from '@/components/agents/agents-data';

interface AgentInnerWorldProps {
  agentId: string;
}

const IntelligenceSphere: React.FC<{ autonomyLevel: number }> = ({ autonomyLevel }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      // Mișcare organică bazată pe nivelul de autonomie
      meshRef.current.rotation.x += autonomyLevel / 5000;
      meshRef.current.rotation.y += autonomyLevel / 4000;
    }
  });

  const getIntelligenceColor = () => {
    if (autonomyLevel > 80) return new THREE.Color(0x00ff00);  // Verde intens - inteligență foarte înaltă
    if (autonomyLevel > 60) return new THREE.Color(0x00cc00);  // Verde mediu
    if (autonomyLevel > 40) return new THREE.Color(0xffff00);  // Galben - potențial în creștere
    return new THREE.Color(0xff0000);  // Roșu - autonomie limitată
  };

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[autonomyLevel / 100 + 0.5, 64, 64]} />
      <meshStandardMaterial 
        color={getIntelligenceColor()}
        transparent 
        opacity={0.7} 
        emissive={getIntelligenceColor()}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const ProcessingNetworks: React.FC<{ autonomyLevel: number }> = ({ autonomyLevel }) => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.rotation.z += 0.003;
    }
  });

  const generateNetworkConnections = () => {
    const connections = [];
    const connectionCount = Math.floor(autonomyLevel / 10);

    for (let i = 0; i < connectionCount; i++) {
      const points = [
        new THREE.Vector3(
          Math.random() * 2 - 1, 
          Math.random() * 2 - 1, 
          Math.random() * 2 - 1
        ),
        new THREE.Vector3(
          Math.random() * 2 - 1, 
          Math.random() * 2 - 1, 
          Math.random() * 2 - 1
        )
      ];

      connections.push(
        <line key={`connection-${i}`}>
          <bufferGeometry attach="geometry" attributes-position={new THREE.BufferAttribute(new Float32Array([
            points[0].x, points[0].y, points[0].z,
            points[1].x, points[1].y, points[1].z
          ]), 3)} />
          <lineBasicMaterial color={0x00ffff} opacity={0.5} transparent />
        </line>
      );
    }

    return connections;
  };

  return (
    <group ref={linesRef} position={[0, 0, 0]}>
      {generateNetworkConnections()}
    </group>
  );
};

export const AgentInnerWorldVisualization: React.FC<AgentInnerWorldProps> = ({ agentId }) => {
  const agent = agents.find(a => a.id === agentId);
  
  if (!agent) return null;

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <IntelligenceSphere autonomyLevel={agent.autonomyLevel || 50} />
      <ProcessingNetworks autonomyLevel={agent.autonomyLevel || 50} />
    </Canvas>
  );
};

export default AgentInnerWorldVisualization;
