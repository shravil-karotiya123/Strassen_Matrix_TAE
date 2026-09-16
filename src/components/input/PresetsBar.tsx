import React from 'react';
import { PRESETS } from '../../hooks/useStrassenPlayer';
import { Dices, RefreshCw, Sparkles, Sliders } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (presetKey: keyof typeof PRESETS) => void;
  onRandomize: () => void;
  onResetZeroes: () => void;
  currentSize: number;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  onSelectPreset,
  onRandomize,
  onResetZeroes,
  currentSize
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
      <div className="flex items-center space-x-2 text-slate-400">
        <Sliders className="w-4 h-4 text-sky-400" />
        <span className="font-semibold text-slate-300">Quick Presets:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSelectPreset('default2x2')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950 hover:text-sky-300 border border-slate-700 hover:border-sky-500/40 text-slate-200 transition-colors"
        >
          Default [1 2; 3 4]
        </button>
        <button
          onClick={() => onSelectPreset('negative2x2')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950 hover:text-sky-300 border border-slate-700 hover:border-sky-500/40 text-slate-200 transition-colors"
        >
          Negative & Zeroes
        </button>
        <button
          onClick={() => onSelectPreset('identity2x2')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950 hover:text-sky-300 border border-slate-700 hover:border-sky-500/40 text-slate-200 transition-colors"
        >
          Identity Test
        </button>
        <button
          onClick={() => onSelectPreset('example4x4')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-950 hover:text-sky-300 border border-slate-700 hover:border-sky-500/40 text-slate-200 transition-colors"
        >
          4×4 Recursive Demo
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRandomize}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-colors font-medium"
        >
          <Dices className="w-3.5 h-3.5" />
          <span>Randomize ({currentSize}&times;{currentSize})</span>
        </button>
        <button
          onClick={onResetZeroes}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Reset matrices to 0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Zero Out</span>
        </button>
      </div>
    </div>
  );
};
