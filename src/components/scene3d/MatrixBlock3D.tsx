import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Matrix, SubmatrixKey } from '../../types/matrix';
import { formatCompactValue } from '../../algorithms/matrixOperations';

interface MatrixBlock3DProps {
  label: string;
  subKey: SubmatrixKey | string;
  matrix: Matrix;
  targetPosition: [number, number, number];
  isActive: boolean;
  colorScheme: 'sky' | 'indigo' | 'emerald' | 'cyan' | 'amber';
}

export const MatrixBlock3D: React.FC<MatrixBlock3DProps> = ({
  label,
  subKey,
  matrix,
  targetPosition,
  isActive,
  colorScheme
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef<THREE.Vector3>(new THREE.Vector3(...targetPosition));

  // Color mappings
  const colors = {
    sky: { base: '#071A36', border: '#38BDF8', glow: '#38BDF8', text: '#38BDF8' },
    indigo: { base: '#0C2A52', border: '#6366F1', glow: '#6366F1', text: '#818CF8' },
    emerald: { base: '#064E3B', border: '#10B981', glow: '#10B981', text: '#34D399' },
    cyan: { base: '#083344', border: '#22D3EE', glow: '#22D3EE', text: '#67E8F9' },
    amber: { base: '#451A03', border: '#F59E0B', glow: '#F59E0B', text: '#FBBF24' }
  }[colorScheme];

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Smooth lerp to target position
      currentPos.current.lerp(new THREE.Vector3(...targetPosition), Math.min(1, delta * 6));
      meshRef.current.position.copy(currentPos.current);

      if (isActive) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), Math.min(1, delta * 8));
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), Math.min(1, delta * 8));
      }
    }
  });

  const formattedVal = formatCompactValue(matrix);

  return (
    <mesh ref={meshRef} position={targetPosition} castShadow receiveShadow>
      <boxGeometry args={[1.2, 1.2, 0.5]} />
      <meshStandardMaterial
        color={isActive ? colors.border : colors.base}
        roughness={0.2}
        metalness={0.7}
        transparent
        opacity={isActive ? 0.95 : 0.8}
      />
      {/* 3D Wireframe outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.21, 1.21, 0.51)]} />
        <lineBasicMaterial
          color={isActive ? '#FFFFFF' : colors.border}
          linewidth={isActive ? 3 : 1}
        />
      </lineSegments>

      {/* HTML 3D Floating Tag with real matrix value */}
      <Html
        position={[0, 0, 0.32]}
        center
        distanceFactor={8}
        className="pointer-events-none select-none"
      >
        <div
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg border backdrop-blur-md transition-all ${
            isActive
              ? 'bg-sky-950/95 border-sky-300 text-white shadow-lg ring-1 ring-sky-300'
              : 'bg-[#05070A]/85 border-slate-700/80 text-slate-200'
          }`}
          style={{ minWidth: '70px' }}
        >
          <span className="text-[10px] font-mono font-bold text-sky-400">
            {subKey}
          </span>
          <span className="text-xs font-mono font-bold tracking-tight">
            {formattedVal}
          </span>
        </div>
      </Html>
    </mesh>
  );
};
