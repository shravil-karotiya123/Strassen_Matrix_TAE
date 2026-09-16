import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = React.useState(() => {
    const coords = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38BDF8"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingMatrixCube({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.85}
          wireframe={false}
        />
        {/* Wireframe overlay for sci-fi look */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.41, 1.41, 1.41)]} />
          <lineBasicMaterial color="#38BDF8" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

export const HeroCanvas: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[460px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F8FAFC" />
        <pointLight position={[-10, -5, -5]} color="#38BDF8" intensity={2} />
        <pointLight position={[5, -5, 5]} color="#6366F1" intensity={1.5} />

        <ParticleField />

        <group position={[0, 0, 0]}>
          <FloatingMatrixCube position={[-2.2, 0.4, 0]} color="#071A36" label="Matrix A" />
          <FloatingMatrixCube position={[2.2, -0.4, 0]} color="#0C2A52" label="Matrix B" />
          <FloatingMatrixCube position={[0, 0, -1.2]} color="#143B6E" label="Matrix C" />
        </group>
      </Canvas>
    </div>
  );
};
