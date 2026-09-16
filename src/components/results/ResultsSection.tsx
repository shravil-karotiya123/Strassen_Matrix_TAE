import React, { useState } from 'react';
import { Matrix } from '../../types/matrix';
import { VisualizerStep } from '../../types/visualizer';
import { ComprehensiveVerification } from '../../algorithms/verification';
import { VerificationCard } from './VerificationCard';
import { ExportModal } from './ExportModal';
import {
  RotateCcw,
  Edit3,
  Download,
  Share2,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ResultsSectionProps {
  matrixA: Matrix;
  matrixB: Matrix;
  matrixC: Matrix;
  steps: VisualizerStep[];
  verification: ComprehensiveVerification;
  onRunAgain: () => void;
  onChangeInput: () => void;
  onOpenPosterModal: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  matrixA,
  matrixB,
  matrixC,
  steps,
  verification,
  onRunAgain,
  onChangeInput,
  onOpenPosterModal
}) => {
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const n = matrixC.length;

  return (
    <section id="results-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SECTION H &amp; I</span>
            <span>&bull;</span>
            <span>Verification &amp; Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            FINAL COMPUTED MATRIX &amp; VERIFICATION
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Inspect the synthesized result matrix C, element-by-element verification against traditional $O(n^3)$ algorithm, and academic applications.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onRunAgain}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span>RUN AGAIN</span>
          </button>
          <button
            onClick={onChangeInput}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>CHANGE INPUT</span>
          </button>
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center space-x-2 shadow-md shadow-sky-500/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CALCULATION</span>
          </button>
        </div>
      </div>

      {/* Main Result Matrix Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Matrix C Visual Grid */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#071A36]/80 border border-sky-500/30 shadow-2xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-xl text-emerald-400">Matrix C</span>
              <span className="text-xs text-slate-400 font-mono">
                = A &times; B ({n} &times; {n})
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Strassen Computed</span>
            </span>
          </div>

          <div className="flex justify-center py-4">
            <div
              className="grid gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800"
              style={{
                gridTemplateColumns: `repeat(${n}, minmax(${n > 4 ? '50px' : '72px'}, 1fr))`
              }}
            >
              {matrixC.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`res-${r}-${c}`}
                    className="aspect-square flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-slate-100 font-mono font-bold text-base sm:text-lg shadow-inner group hover:scale-105 transition-transform"
                  >
                    <span>{val}</span>
                    <span className="text-[9px] text-emerald-400/80 font-normal">
                      C<sub>{r + 1}{c + 1}</sub>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="lg:col-span-6">
          <VerificationCard verification={verification} />
        </div>
      </div>

      {/* Applications & Educational Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Card 1: Applications */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
            Real-World Applications
          </span>
          <h4 className="font-bold text-slate-200 text-sm">Large-Scale Numerical Computing</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strassen and hybrid sub-cubic matrix algorithms power high-performance tensor libraries (BLAS/LAPACK), physics simulations, machine learning training matrices, and 3D computer graphics transformations.
          </p>
        </div>

        {/* Card 2: Advantages */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
            Theoretical Advantages
          </span>
          <h4 className="font-bold text-slate-200 text-sm">Sub-Cubic Asymptotic Scaling</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reduces recursive branching from 8 to 7, bringing the exponent from 3.0 down to $\approx 2.8074$. At $N=2048$, this eliminates over 75% of expensive matrix multiplications.
          </p>
        </div>

        {/* Card 3: Limitations & Future */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Algorithm Limitations
          </span>
          <h4 className="font-bold text-slate-200 text-sm">Addition Overhead &amp; Stability</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Requires 18 matrix additions per 2&times;2 quadrant, resulting in crossover points ($N \approx 64-128$) where hardware overhead matches theoretical gains. Also exhibits slightly looser numerical error bounds.
          </p>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        matrixA={matrixA}
        matrixB={matrixB}
        matrixC={matrixC}
        steps={steps}
        verification={verification}
      />
    </section>
  );
};
