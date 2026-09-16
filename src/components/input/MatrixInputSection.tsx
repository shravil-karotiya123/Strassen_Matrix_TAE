import React from 'react';
import { Matrix } from '../../types/matrix';
import { MatrixGridEditor } from './MatrixGridEditor';
import { PresetsBar } from './PresetsBar';
import { PRESETS } from '../../hooks/useStrassenPlayer';
import { Play, RotateCcw, Sparkles, AlertCircle, FastForward } from 'lucide-react';
import { PlaybackSpeed } from '../../types/visualizer';

interface MatrixInputSectionProps {
  matrixSize: number;
  matrixA: Matrix;
  matrixB: Matrix;
  onMatrixAChange: (M: Matrix) => void;
  onMatrixBChange: (M: Matrix) => void;
  onSizeChange: (size: number) => void;
  onSelectPreset: (presetKey: keyof typeof PRESETS) => void;
  onRandomize: () => void;
  onResetZeroes: () => void;
  onStartVisualization: () => void;
  onRestart: () => void;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  onSpeedChange: (s: PlaybackSpeed) => void;
}

export const MatrixInputSection: React.FC<MatrixInputSectionProps> = ({
  matrixSize,
  matrixA,
  matrixB,
  onMatrixAChange,
  onMatrixBChange,
  onSizeChange,
  onSelectPreset,
  onRandomize,
  onResetZeroes,
  onStartVisualization,
  onRestart,
  isPlaying,
  speed,
  onSpeedChange
}) => {
  return (
    <section id="input-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SECTION B</span>
            <span>&bull;</span>
            <span>Interactive Laboratory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            INPUT YOUR MATRICES
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Configure custom values for Matrix A and Matrix B. Strassen’s divide-and-conquer algorithm will execute step by step using your exact numerical inputs.
          </p>
        </div>

        {/* Matrix Dimension Selector */}
        <div className="flex items-center space-x-3 bg-slate-900/90 p-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-mono font-medium pl-1">Dimension:</span>
          <div className="flex space-x-1">
            {[2, 4, 8].map(size => (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  matrixSize === size
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {size}&times;{size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Presets and Generator Bar */}
      <PresetsBar
        onSelectPreset={onSelectPreset}
        onRandomize={onRandomize}
        onResetZeroes={onResetZeroes}
        currentSize={matrixSize}
      />

      {/* Matrix Editors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MatrixGridEditor
          label="Matrix A"
          matrix={matrixA}
          onChange={onMatrixAChange}
          accentColor="sky"
          disabled={isPlaying}
        />
        <MatrixGridEditor
          label="Matrix B"
          matrix={matrixB}
          onChange={onMatrixBChange}
          accentColor="indigo"
          disabled={isPlaying}
        />
      </div>

      {/* Speed & Execution Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-950/30 via-slate-900/80 to-indigo-950/30 border border-sky-500/20 shadow-lg">
        {/* Speed Selector */}
        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 font-mono flex items-center space-x-1">
            <FastForward className="w-3.5 h-3.5 text-sky-400" />
            <span>Animation Speed:</span>
          </span>
          <div className="flex space-x-1">
            {([0.5, 1, 2, 4] as PlaybackSpeed[]).map(s => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors ${
                  speed === s
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={onRestart}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Visualizer</span>
          </button>
          <button
            onClick={onStartVisualization}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 text-xs font-bold flex items-center space-x-2 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>EXECUTE STRASSEN ALGORITHM</span>
          </button>
        </div>
      </div>
    </section>
  );
};
