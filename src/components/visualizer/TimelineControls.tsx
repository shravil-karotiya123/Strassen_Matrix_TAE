import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { PlaybackSpeed } from '../../types/visualizer';

interface TimelineControlsProps {
  isPlaying: boolean;
  isComplete: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speed: PlaybackSpeed;
  onTogglePlay: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onRestart: () => void;
  onSkipToResult: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  isPlaying,
  isComplete,
  currentStepIndex,
  totalSteps,
  speed,
  onTogglePlay,
  onNextStep,
  onPrevStep,
  onRestart,
  onSkipToResult,
  onSpeedChange
}) => {
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="flex flex-col space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-sky-500/20 shadow-xl backdrop-blur-md">
      {/* Progress Bar & Status */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sky-400">STEP {currentStepIndex + 1} OF {totalSteps}</span>
          <span>&bull;</span>
          <span>{progressPercent}% Complete</span>
        </div>
        {isComplete && (
          <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Algorithm Completed</span>
          </span>
        )}
      </div>

      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          {/* Restart */}
          <button
            onClick={onRestart}
            title="Restart to Beginning"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Previous Step */}
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex === 0}
            title="Previous Step"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            onClick={onTogglePlay}
            className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg transition-all ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 shadow-sky-500/25'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>PAUSE</span>
              </>
            ) : isComplete ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>REPLAY</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>PLAY</span>
              </>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={onNextStep}
            disabled={isComplete}
            title="Next Step"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Skip to Result */}
          <button
            onClick={onSkipToResult}
            title="Skip to Final Result"
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 text-xs font-mono font-medium transition-colors"
          >
            Fast-Forward &rarr;
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono flex items-center space-x-1">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span>Speed:</span>
          </span>
          <div className="flex space-x-1">
            {([0.5, 1, 2, 4] as PlaybackSpeed[]).map(s => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                  speed === s
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
