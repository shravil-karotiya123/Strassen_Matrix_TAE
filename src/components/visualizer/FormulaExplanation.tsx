import React from 'react';
import { VisualizerStep } from '../../types/visualizer';
import { BookOpen, Calculator, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatCompactValue } from '../../algorithms/matrixOperations';

interface FormulaExplanationProps {
  step: VisualizerStep;
}

export const FormulaExplanation: React.FC<FormulaExplanationProps> = ({ step }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 rounded-2xl bg-[#071A36]/80 border border-sky-500/20 shadow-xl backdrop-blur-md h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-sky-400" />
          <h3 className="font-bold text-sm text-slate-100">Operation & Formula</h3>
        </div>
        <span className="text-[11px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
          Stage {step.stageIndex + 1}/{step.totalStages}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h4 className="text-base font-bold text-white tracking-tight">
          {step.title}
        </h4>
        <p className="text-xs text-sky-300/90 font-medium">
          {step.subtitle}
        </p>
      </div>

      {/* Formula Display Box */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <span className="text-[11px] uppercase font-mono font-bold text-slate-400 block">
          Algebraic Formulation:
        </span>
        <div className="font-mono text-sm sm:text-base text-cyan-300 bg-slate-900/60 p-2 rounded-lg border border-cyan-500/20 shadow-inner">
          {step.formulaReadable}
        </div>
      </div>

      {/* Substituted Real User Values */}
      <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-mono font-bold text-sky-300">
            Real Input Numerical Evaluation:
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            Live Computed
          </span>
        </div>
        <div className="font-mono text-xs sm:text-sm text-slate-100 bg-slate-950/80 p-2.5 rounded-lg border border-sky-500/20 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {step.substitutedFormula}
        </div>
      </div>

      {/* Intermediate Result (if any) */}
      {step.intermediateResult && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              {step.intermediateResult.label} Output:
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-sm bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
            {formatCompactValue(step.intermediateResult.matrix)}
          </span>
        </div>
      )}

      {/* Plain Language Pedagogical Explanation */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] uppercase font-mono font-bold text-slate-400 flex items-center space-x-1.5">
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Educational Insights:</span>
        </span>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          {step.explanation}
        </p>
      </div>
    </div>
  );
};
