import React from 'react';
import { VisualizerStep, PlaybackSpeed } from '../../types/visualizer';
import { Matrix } from '../../types/matrix';
import { SubmatrixPanel } from './SubmatrixPanel';
import { FormulaExplanation } from './FormulaExplanation';
import { Matrix3DScene } from '../scene3d/Matrix3DScene';
import { StepScrubber } from './StepScrubber';
import { TimelineControls } from './TimelineControls';
import { Eye, Sparkles } from 'lucide-react';

interface VisualizerWorkspaceProps {
  step: VisualizerStep;
  steps: VisualizerStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  isComplete: boolean;
  speed: PlaybackSpeed;
  submatricesA: { A11: Matrix; A12: Matrix; A21: Matrix; A22: Matrix };
  submatricesB: { B11: Matrix; B12: Matrix; B21: Matrix; B22: Matrix };
  onGoToStep: (index: number) => void;
  onTogglePlay: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onRestart: () => void;
  onSkipToResult: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

export const VisualizerWorkspace: React.FC<VisualizerWorkspaceProps> = ({
  step,
  steps,
  currentStepIndex,
  isPlaying,
  isComplete,
  speed,
  submatricesA,
  submatricesB,
  onGoToStep,
  onTogglePlay,
  onNextStep,
  onPrevStep,
  onRestart,
  onSkipToResult,
  onSpeedChange
}) => {
  return (
    <section id="visualizer-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SECTION D &amp; F</span>
            <span>&bull;</span>
            <span>Live Spatial Stage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center space-x-2">
            <span>WATCH STRASSEN’S ALGORITHM WORK</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time visual tracking of matrix partitioning, 7 intermediate product evaluations ($P_1 \dots P_7$), and combination algebra into final matrix C.
          </p>
        </div>

        {/* Live Step Badge */}
        <div className="px-4 py-2 rounded-xl bg-sky-950/80 border border-sky-500/30 text-xs font-mono text-sky-300 flex items-center space-x-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Stage {step.stageIndex + 1} of {steps.length}</span>
        </div>
      </div>

      {/* 13-Stage Pipeline Scrubber */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <StepScrubber
          steps={steps}
          currentStepIndex={currentStepIndex}
          onGoToStep={onGoToStep}
        />
      </div>

      {/* Main Tri-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Submatrix Panel (3 Cols on desktop) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <SubmatrixPanel
            step={step}
            submatricesA={submatricesA}
            submatricesB={submatricesB}
          />
        </div>

        {/* Center Column: 3D Scene (6 Cols on desktop) */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
          <Matrix3DScene
            step={step}
            submatricesA={submatricesA}
            submatricesB={submatricesB}
          />
        </div>

        {/* Right Column: Mathematical & Text Explanation (3 Cols on desktop) */}
        <div className="lg:col-span-3 order-3">
          <FormulaExplanation step={step} />
        </div>
      </div>

      {/* Bottom Timeline Controls */}
      <TimelineControls
        isPlaying={isPlaying}
        isComplete={isComplete}
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        speed={speed}
        onTogglePlay={onTogglePlay}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
        onRestart={onRestart}
        onSkipToResult={onSkipToResult}
        onSpeedChange={onSpeedChange}
      />
    </section>
  );
};
