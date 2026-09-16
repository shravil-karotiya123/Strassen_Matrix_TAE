import React, { useState } from 'react';
import { GitFork, Layers, ChevronRight } from 'lucide-react';

export const RecursionTreeVisualizer: React.FC = () => {
  const [depth, setDepth] = useState<number>(2);

  // Depth 1: N=2 -> 8 vs 7 nodes
  // Depth 2: N=4 -> 64 vs 49 nodes
  // Depth 3: N=8 -> 512 vs 343 nodes
  const tradLeaves = Math.pow(8, depth);
  const strassLeaves = Math.pow(7, depth);
  const leafSavings = tradLeaves - strassLeaves;

  return (
    <div className="p-6 rounded-2xl bg-[#071A36]/70 border border-sky-500/20 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-base text-white flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-sky-400" />
            <span>Recursion Tree Branching Visualizer</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare the exponential branching factor of standard 8-way recursion vs Strassen’s 7-way recursion.
          </p>
        </div>

        {/* Depth Selector */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-mono pl-1">Recursion Level:</span>
          {[1, 2, 3].map(d => (
            <button
              key={d}
              onClick={() => setDepth(d)}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                depth === d
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              L{d} (N={Math.pow(2, d)})
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side Tree Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traditional Tree */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">
              Traditional Method (8-way Branching)
            </span>
            <span className="text-xs font-mono text-slate-500">
              T(n) = 8T(n/2) + O(n²)
            </span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Leaf Recursive Multiplications:</span>
              <span className="text-base font-bold text-slate-200">{tradLeaves.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full w-full rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            At recursion depth {depth}, computing an $N={Math.pow(2, depth)}$ matrix requires $8^{{${depth}}} = {tradLeaves}$ base scalar multiplications.
          </p>
        </div>

        {/* Strassen Tree */}
        <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-300">
              Strassen Method (7-way Branching)
            </span>
            <span className="text-xs font-mono text-sky-400/80">
              T(n) = 7T(n/2) + O(n²)
            </span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Leaf Recursive Multiplications:</span>
              <span className="text-base font-bold text-sky-300">{strassLeaves.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(strassLeaves / tradLeaves) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
            <span>Multiplications Eliminated:</span>
            <span className="font-bold">+{leafSavings.toLocaleString()} ({Math.round(((tradLeaves - strassLeaves)/tradLeaves)*100)}% saved)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
