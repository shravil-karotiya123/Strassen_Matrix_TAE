import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CalculationBeam3DProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color?: string;
  active?: boolean;
}

export const CalculationBeam3D: React.FC<CalculationBeam3DProps> = ({
  startPos,
  endPos,
  color = '#38BDF8',
  active = true
}) => {
  const lineRef = useRef<THREE.Line>(null);

  // Compute curve points
  const points = React.useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 0.8; // arc upward

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(24);
  }, [startPos, endPos]);

  const geometry = React.useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (lineRef.current && active) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.getElapsedTime() * 8) * 0.35;
    }
  });

  if (!active) return null;

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.7}
        linewidth={2}
      />
    </line>
  );
};
