import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { VisualizerStep } from '../../types/visualizer';
import { Matrix, SubmatrixKey, ProductKey, ResultSubmatrixKey } from '../../types/matrix';
import { MatrixBlock3D } from './MatrixBlock3D';
import { CalculationBeam3D } from './CalculationBeam3D';
import {
  RotateCcw,
  Eye,
  Maximize2,
  Minimize2,
  Sparkles,
  Compass,
  Grid
} from 'lucide-react';

interface Matrix3DSceneProps {
  step: VisualizerStep;
  submatricesA: { A11: Matrix; A12: Matrix; A21: Matrix; A22: Matrix };
  submatricesB: { B11: Matrix; B12: Matrix; B21: Matrix; B22: Matrix };
  reducedMotion?: boolean;
}

export const Matrix3DScene: React.FC<Matrix3DSceneProps> = ({
  step,
  submatricesA,
  submatricesB,
  reducedMotion = false
}) => {
  const [cameraView, setCameraView] = useState<'isometric' | 'topDown' | 'side'>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsType>(null);

  const isDivided = step.stage !== 'INPUT';
  const isFinal = step.stage === 'FINAL_MATRIX' || step.stage === 'VERIFICATION';
  const isCombining = step.stage === 'COMBINE_C11_C12' || step.stage === 'COMBINE_C21_C22';

  // Dynamic separation distance
  const splitOffset = isDivided ? 0.75 : 0.62;

  // Positions for Matrix A quadrants (Left side: x ~ -3.5)
  const aCenterX = isFinal ? -4.5 : -3.2;
  const aPos: Record<SubmatrixKey, [number, number, number]> = {
    A11: [aCenterX - splitOffset, splitOffset, 0],
    A12: [aCenterX + splitOffset, splitOffset, 0],
    A21: [aCenterX - splitOffset, -splitOffset, 0],
    A22: [aCenterX + splitOffset, -splitOffset, 0],
    B11: [0, 0, 0],
    B12: [0, 0, 0],
    B21: [0, 0, 0],
    B22: [0, 0, 0]
  };

  // Positions for Matrix B quadrants (Right side: x ~ +3.5)
  const bCenterX = isFinal ? 4.5 : 3.2;
  const bPos: Record<SubmatrixKey, [number, number, number]> = {
    A11: [0, 0, 0],
    A12: [0, 0, 0],
    A21: [0, 0, 0],
    A22: [0, 0, 0],
    B11: [bCenterX - splitOffset, splitOffset, 0],
    B12: [bCenterX + splitOffset, splitOffset, 0],
    B21: [bCenterX - splitOffset, -splitOffset, 0],
    B22: [bCenterX + splitOffset, -splitOffset, 0]
  };

  // Positions for Result / Intermediate Center Block (x ~ 0)
  const cSplitOffset = isFinal ? 0.62 : 0.75;
  const cPos: Record<ResultSubmatrixKey, [number, number, number]> = {
    C11: [-cSplitOffset, cSplitOffset, isFinal ? 0 : -0.5],
    C12: [cSplitOffset, cSplitOffset, isFinal ? 0 : -0.5],
    C21: [-cSplitOffset, -cSplitOffset, isFinal ? 0 : -0.5],
    C22: [cSplitOffset, -cSplitOffset, isFinal ? 0 : -0.5]
  };

  // Product block position in center
  const productCenterPos: [number, number, number] = [0, 0, 0.5];

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleResetCamera = () => {
    setCameraView('isometric');
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#05070A] via-[#071A36]/50 to-[#05070A] border border-sky-500/20 shadow-2xl flex flex-col ${
        isFullscreen ? 'h-screen w-screen fixed inset-0 z-50' : 'h-[440px] sm:h-[500px] lg:h-[540px]'
      }`}
    >
      {/* 3D Scene Controls HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Stage Status Badge */}
        <div className="pointer-events-auto flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#05070A]/85 border border-sky-500/30 text-xs font-mono text-sky-300 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Stage: {step.stage}</span>
        </div>

        {/* View Mode & Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-[#05070A]/85 p-1 rounded-xl border border-slate-800 text-xs text-slate-300 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setCameraView('isometric')}
            className={`px-2 py-1 rounded-lg transition-colors font-mono ${
              cameraView === 'isometric' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'hover:text-white'
            }`}
            title="Isometric 3D View"
          >
            3D Iso
          </button>
          <button
            onClick={() => setCameraView('topDown')}
            className={`px-2 py-1 rounded-lg transition-colors font-mono ${
              cameraView === 'topDown' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'hover:text-white'
            }`}
            title="Top-Down 2D Plane View"
          >
            2D Top
          </button>
          <button
            onClick={handleResetCamera}
            className="p-1.5 rounded-lg hover:text-sky-300 hover:bg-slate-800 transition-colors"
            title="Reset Camera Angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg hover:text-sky-300 hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* R3F Canvas */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{
            position: cameraView === 'topDown' ? [0, 0, 11] : [0, -1, 9.5],
            fov: 48
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#FFFFFF" />
          <directionalLight position={[-6, -4, -3]} intensity={0.5} color="#38BDF8" />
          <pointLight position={[0, 2, 4]} intensity={1.5} color="#38BDF8" distance={15} />

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={4}
            maxDistance={18}
            maxPolarAngle={cameraView === 'topDown' ? 0.05 : Math.PI / 2 + 0.1}
          />

          {/* Matrix A 3D Blocks */}
          <group>
            <MatrixBlock3D
              label="A11"
              subKey="A11"
              matrix={submatricesA.A11}
              targetPosition={aPos.A11}
              isActive={step.activeSubmatricesA.includes('A11')}
              colorScheme="sky"
            />
            <MatrixBlock3D
              label="A12"
              subKey="A12"
              matrix={submatricesA.A12}
              targetPosition={aPos.A12}
              isActive={step.activeSubmatricesA.includes('A12')}
              colorScheme="cyan"
            />
            <MatrixBlock3D
              label="A21"
              subKey="A21"
              matrix={submatricesA.A21}
              targetPosition={aPos.A21}
              isActive={step.activeSubmatricesA.includes('A21')}
              colorScheme="indigo"
            />
            <MatrixBlock3D
              label="A22"
              subKey="A22"
              matrix={submatricesA.A22}
              targetPosition={aPos.A22}
              isActive={step.activeSubmatricesA.includes('A22')}
              colorScheme="sky"
            />
          </group>

          {/* Matrix B 3D Blocks */}
          <group>
            <MatrixBlock3D
              label="B11"
              subKey="B11"
              matrix={submatricesB.B11}
              targetPosition={bPos.B11}
              isActive={step.activeSubmatricesB.includes('B11')}
              colorScheme="indigo"
            />
            <MatrixBlock3D
              label="B12"
              subKey="B12"
              matrix={submatricesB.B12}
              targetPosition={bPos.B12}
              isActive={step.activeSubmatricesB.includes('B12')}
              colorScheme="cyan"
            />
            <MatrixBlock3D
              label="B21"
              subKey="B21"
              matrix={submatricesB.B21}
              targetPosition={bPos.B21}
              isActive={step.activeSubmatricesB.includes('B21')}
              colorScheme="sky"
            />
            <MatrixBlock3D
              label="B22"
              subKey="B22"
              matrix={submatricesB.B22}
              targetPosition={bPos.B22}
              isActive={step.activeSubmatricesB.includes('B22')}
              colorScheme="indigo"
            />
          </group>

          {/* Center Product / Result Block */}
          {step.intermediateResult && (
            <MatrixBlock3D
              label={step.intermediateResult.label}
              subKey={step.intermediateResult.label}
              matrix={step.intermediateResult.matrix}
              targetPosition={productCenterPos}
              isActive={true}
              colorScheme="emerald"
            />
          )}

          {/* Result Submatrices (C11, C12, C21, C22) when assembling */}
          {(isCombining || isFinal) && (
            <group>
              {step.resultsCalculated.C11 && (
                <MatrixBlock3D
                  label="C11"
                  subKey="C11"
                  matrix={step.resultsCalculated.C11}
                  targetPosition={cPos.C11}
                  isActive={step.activeResultBlocks.includes('C11')}
                  colorScheme="emerald"
                />
              )}
              {step.resultsCalculated.C12 && (
                <MatrixBlock3D
                  label="C12"
                  subKey="C12"
                  matrix={step.resultsCalculated.C12}
                  targetPosition={cPos.C12}
                  isActive={step.activeResultBlocks.includes('C12')}
                  colorScheme="emerald"
                />
              )}
              {step.resultsCalculated.C21 && (
                <MatrixBlock3D
                  label="C21"
                  subKey="C21"
                  matrix={step.resultsCalculated.C21}
                  targetPosition={cPos.C21}
                  isActive={step.activeResultBlocks.includes('C21')}
                  colorScheme="emerald"
                />
              )}
              {step.resultsCalculated.C22 && (
                <MatrixBlock3D
                  label="C22"
                  subKey="C22"
                  matrix={step.resultsCalculated.C22}
                  targetPosition={cPos.C22}
                  isActive={step.activeResultBlocks.includes('C22')}
                  colorScheme="emerald"
                />
              )}
            </group>
          )}

          {/* Calculation Beams from active A and B blocks to center */}
          {step.activeSubmatricesA.map(aKey => (
            <CalculationBeam3D
              key={`beam-${aKey}`}
              startPos={aPos[aKey]}
              endPos={productCenterPos}
              color="#38BDF8"
              active={true}
            />
          ))}
          {step.activeSubmatricesB.map(bKey => (
            <CalculationBeam3D
              key={`beam-${bKey}`}
              startPos={bPos[bKey]}
              endPos={productCenterPos}
              color="#818CF8"
              active={true}
            />
          ))}
        </Canvas>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-0 right-0 z-10 text-center pointer-events-none">
        <span className="text-[10px] font-mono text-slate-500 bg-[#05070A]/80 px-2 py-0.5 rounded-full border border-slate-800">
          Rotate: Drag Left Click &bull; Zoom: Scroll &bull; Pan: Right Click
        </span>
      </div>
    </div>
  );
};
