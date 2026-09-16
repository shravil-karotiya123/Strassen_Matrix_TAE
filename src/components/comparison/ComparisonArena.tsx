import React from 'react';
import { RecursionTreeVisualizer } from './RecursionTreeVisualizer';
import { OperationChart } from './OperationChart';
import { Sparkles, Layers, ArrowRight, ShieldCheck } from 'lucide-react';

export const ComparisonArena: React.FC = () => {
  return (
    <section id="comparison-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SECTION G</span>
            <span>&bull;</span>
            <span>Comparative Arena</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            TRADITIONAL VS STRASSEN COMPARISON
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Direct head-to-head comparison of algorithmic complexity, multiplication savings, recursion branching, and arithmetic operation scaling.
          </p>
        </div>
      </div>

      {/* Direct Feature Comparison Table */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#071A36]/60 backdrop-blur-md shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-sm text-slate-100 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Algorithm Feature Matrix</span>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-mono">
              <tr>
                <th className="p-3.5">Feature</th>
                <th className="p-3.5">Traditional Method</th>
                <th className="p-3.5 text-sky-300">Strassen Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Algorithmic Paradigm</td>
                <td className="p-3.5 font-mono">Direct Row &times; Column Product</td>
                <td className="p-3.5 font-mono text-sky-300 font-bold">Divide and Conquer Submatrix Recursion</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Recursive Block Multiplications (2&times;2)</td>
                <td className="p-3.5 font-mono">8 Multiplications</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">7 Multiplications (12.5% Reduction)</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Asymptotic Time Complexity</td>
                <td className="p-3.5 font-mono">&Omicron;(n&sup3;)</td>
                <td className="p-3.5 font-mono text-sky-300 font-bold">&Omicron;(n<sup>log&sub2; 7</sup>) &asymp; &Omicron;(n<sup>2.8074</sup>)</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Additional Additions &amp; Subtractions</td>
                <td className="p-3.5 font-mono">Fewer: 4 additions per 2&times;2</td>
                <td className="p-3.5 font-mono text-amber-300">More: 18 additions / subtractions per 2&times;2</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Optimal Application Regime</td>
                <td className="p-3.5">Small matrices (N &lt; 64), memory-constrained</td>
                <td className="p-3.5 text-emerald-300 font-semibold">Large scientific matrices, dense tensor operations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recursion Tree Visualizer */}
      <RecursionTreeVisualizer />

      {/* Exact Operation Counting Table & Graph */}
      <OperationChart />
    </section>
  );
};
