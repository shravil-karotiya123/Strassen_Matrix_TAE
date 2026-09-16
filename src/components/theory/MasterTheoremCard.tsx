import React from 'react';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const MasterTheoremCard: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#071A36] to-[#05070A] border border-sky-500/30 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
        <Cpu className="w-5 h-5 text-sky-400" />
        <h4 className="font-bold text-base text-white">
          Master Theorem Derivation of $O(n^{\log_2 7})$
        </h4>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        Let $T(n)$ represent the time complexity to multiply two $n \times n$ matrices using Strassen’s algorithm. Dividing the matrices into 4 sub-blocks of size $\frac{n}{2} \times \frac{n}{2}$ yields 7 sub-problems plus matrix additions/subtractions taking $\Theta(n^2)$ work:
      </p>

      {/* Recurrence Equation Box */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-sky-500/20 font-mono text-center text-sm sm:text-base text-sky-300">
        T(n) = 7 &bull; T(n / 2) + &Theta;(n&sup2;)
      </div>

      {/* Step by step parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-slate-400 block">Subproblems (a):</span>
          <span className="text-sky-300 font-bold text-sm">a = 7</span>
          <span className="text-[10px] text-slate-500 block">(vs a = 8 in Standard)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-slate-400 block">Dimension Divisor (b):</span>
          <span className="text-sky-300 font-bold text-sm">b = 2</span>
          <span className="text-[10px] text-slate-500 block">(quadrant halving)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-slate-400 block">Critical Exponent:</span>
          <span className="text-emerald-300 font-bold text-sm">log₂ 7 &asymp; 2.8074</span>
          <span className="text-[10px] text-emerald-400/80 block">(&gt; 2, Case 1 applies)</span>
        </div>
      </div>

      {/* Conclusion */}
      <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-slate-200 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-sky-300 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Final Asymptotic Bound:</span>
        </div>
        <p className="leading-relaxed">
          Because $\log_2 7 \approx 2.8074 &gt; 2$, the work done at the recursive leaves dominates the partition/recombination work. Hence:
          <strong className="text-white block font-mono text-sm mt-1">
            T(n) = &Theta;(n<sup>log&sub2; 7</sup>) &asymp; &Theta;(n<sup>2.8074</sup>)
          </strong>
        </p>
      </div>
    </div>
  );
};
