import React from 'react';
import { VisualizerStep } from '../../types/visualizer';
import { Check, CircleDot, ChevronRight } from 'lucide-react';

interface StepScrubberProps {
  steps: VisualizerStep[];
  currentStepIndex: number;
  onGoToStep: (index: number) => void;
}

export const StepScrubber: React.FC<StepScrubberProps> = ({
  steps,
  currentStepIndex,
  onGoToStep
}) => {
  return (
    <div className="w-full overflow-x-auto py-2 px-1">
      <div className="flex items-center min-w-max space-x-1 sm:space-x-2">
        {steps.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onGoToStep(idx)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isCurrent
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30 ring-2 ring-sky-300'
                    : isPassed
                    ? 'bg-slate-900/90 text-sky-400 border border-sky-500/30 hover:bg-slate-800'
                    : 'bg-slate-950/60 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
                title={step.title}
              >
                {isPassed ? (
                  <Check className="w-3.5 h-3.5 text-sky-400 stroke-[3]" />
                ) : isCurrent ? (
                  <CircleDot className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </span>
                )}
                <span>
                  {step.stage === 'INPUT'
                    ? '01 Input'
                    : step.stage === 'DIVIDE'
                    ? '02 Divide'
                    : step.stage === 'TEMP_SUMS'
                    ? '03 Setup'
                    : step.stage.startsWith('P')
                    ? step.stage
                    : step.stage === 'COMBINE_C11_C12'
                    ? 'C11-C12'
                    : step.stage === 'COMBINE_C21_C22'
                    ? 'C21-C22'
                    : step.stage === 'FINAL_MATRIX'
                    ? 'Final Matrix'
                    : 'Verify'}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <ChevronRight className={`w-3.5 h-3.5 ${isPassed ? 'text-sky-500/50' : 'text-slate-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
