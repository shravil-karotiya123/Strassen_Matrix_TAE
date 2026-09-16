import React from 'react';
import { BookOpen, Sparkles, AlertCircle, CheckCircle2, Cpu, Zap, Lightbulb } from 'lucide-react';
import { MasterTheoremCard } from './MasterTheoremCard';
import { FormulaReferenceGrid } from './FormulaReferenceGrid';

export const TheorySection: React.FC = () => {
  return (
    <section id="theory-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SECTION C &amp; E</span>
            <span>&bull;</span>
            <span>Pedagogical Foundations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            ALGORITHM THEORY &amp; MATHEMATICAL FOUNDATION
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A comprehensive academic exploration of standard matrix multiplication, the divide-and-conquer breakthrough, and Volker Strassen’s asymptotic optimization.
          </p>
        </div>
      </div>

      {/* Conceptual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What is Matrix Multiplication? */}
        <div className="p-6 rounded-2xl bg-[#071A36]/60 border border-sky-500/20 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-sky-400">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">What is Matrix Multiplication?</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In standard linear algebra, the product of two $n \times n$ matrices $A$ and $B$ produces a matrix $C$ where each element $C_{ij}$ is computed as the dot product of the $i$-th row of $A$ and the $j$-th column of $B$:
          </p>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-xs sm:text-sm text-sky-300">
            C<sub>ij</sub> = &sum;<sub>k=1..n</sub> ( A<sub>ik</sub> &times; B<sub>kj</sub> )
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Since there are $n^2$ entries and each entry requires $n$ scalar multiplications and $n-1$ scalar additions, standard matrix multiplication requires exactly $n^3$ multiplications and $n^3 - n^2$ additions, establishing the classical $\mathcal{O}(n^3)$ cubic complexity bound.
          </p>
        </div>

        {/* Card 2: What is Strassen's Algorithm? */}
        <div className="p-6 rounded-2xl bg-[#071A36]/60 border border-sky-500/20 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">The Strassen Divide-and-Conquer Shift</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Until 1969, it was widely conjectured that matrix multiplication fundamentally required $\mathcal{O}(n^3)$ time. German mathematician <strong>Volker Strassen</strong> proved this wrong by showing that a $2 \times 2$ block multiplication could be computed with only <strong>7 recursive matrix multiplications</strong> instead of 8:
          </p>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-xs sm:text-sm text-cyan-300">
            Standard: 8 Mults + 4 Adds &rarr; Strassen: 7 Mults + 18 Adds/Subtractions
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Because multiplication is asymptotically much more expensive than addition when applied recursively to matrix blocks, saving even a single multiplication drops the asymptotic exponent from $3.0$ down to $\log_2 7 \approx 2.8074$.
          </p>
        </div>
      </div>

      {/* Master Theorem Card */}
      <MasterTheoremCard />

      {/* Complete Formula Breakdown */}
      <FormulaReferenceGrid />

      {/* Practical Considerations & Trade-offs */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="font-bold text-sm sm:text-base text-slate-200 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Practical Engineering Realities &amp; The Crossover Point</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-sky-400 block">Addition Constant Overhead:</span>
            Strassen trades 1 multiplication for several additions/subtractions. For small matrices ($n &lt; 64$), the addition overhead outweighs the multiplication savings.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-sky-400 block">Hardware &amp; Cache Locality:</span>
            Modern CPU/GPU BLAS libraries use hybrid algorithms (e.g., Strassen at top recursive levels, switching to optimized SIMD matrix kernels at leaf thresholds $N \approx 64-128$).
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <span className="font-bold text-sky-400 block">Numerical Precision &amp; Stability:</span>
            Due to intermediate subtractions, Strassen’s method exhibits slightly larger error accumulation bounds than standard multiplication in floating-point arithmetic.
          </div>
        </div>
      </div>
    </section>
  );
};
