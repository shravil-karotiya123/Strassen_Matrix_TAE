import React, { useState } from 'react';
import { generateComplexityDataset } from '../../algorithms/complexity';
import { MatrixBenchmarkRow } from '../../types/comparison';
import { Table, TrendingUp, Sparkles, Check } from 'lucide-react';

export const OperationChart: React.FC = () => {
  const [dataset] = useState<MatrixBenchmarkRow[]>(() => generateComplexityDataset());
  const [selectedDim, setSelectedDim] = useState<number>(64);

  const selectedRow = dataset.find(r => r.dimension === selectedDim) || dataset[5];

  return (
    <div className="space-y-6">
      {/* High-level summary metrics for selected matrix dimension */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900/80 to-indigo-950/40 border border-sky-500/30 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-mono">Tested Matrix Size:</span>
          <p className="text-xl font-bold font-mono text-sky-300">{selectedRow.dimension} &times; {selectedRow.dimension}</p>
          <span className="text-[11px] text-slate-500 font-mono">N = {selectedRow.dimension}</span>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-mono">Traditional Multiplications:</span>
          <p className="text-lg font-bold font-mono text-slate-200">
            {selectedRow.traditionalMultiplications.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500 font-mono">O(N³) = {selectedRow.dimension}³</span>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-sky-400 font-mono">Strassen Multiplications:</span>
          <p className="text-lg font-bold font-mono text-sky-400">
            {selectedRow.strassenMultiplications.toLocaleString()}
          </p>
          <span className="text-[11px] text-sky-400/80 font-mono">O(N^2.807)</span>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-emerald-400 font-mono">Multiplication Savings:</span>
          <p className="text-lg font-bold font-mono text-emerald-400">
            {selectedRow.multiplicationSavingsPercent}%
          </p>
          <span className="text-[11px] text-emerald-500 font-mono">
            {selectedRow.crossoverStatus}
          </span>
        </div>
      </div>

      {/* Full Complexity Table */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Table className="w-4 h-4 text-sky-400" />
            <h4 className="font-bold text-sm text-slate-200">Exact Arithmetic Operation Scaling (Powers of 2)</h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">Click row to inspect</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Dimension (N)</th>
                <th className="p-3">Trad. Mults (N³)</th>
                <th className="p-3">Strassen Mults (7<sup>log₂N</sup>)</th>
                <th className="p-3">Mult Savings</th>
                <th className="p-3">Trad. Adds</th>
                <th className="p-3">Strassen Adds</th>
                <th className="p-3">Practical Regimes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dataset.map(row => {
                const isSelected = row.dimension === selectedDim;
                return (
                  <tr
                    key={row.dimension}
                    onClick={() => setSelectedDim(row.dimension)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-sky-500/15 text-white font-semibold'
                        : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <td className="p-3 font-bold text-sky-300">
                      {row.dimension}&times;{row.dimension}
                    </td>
                    <td className="p-3 text-slate-300">
                      {row.traditionalMultiplications.toLocaleString()}
                    </td>
                    <td className="p-3 text-cyan-300 font-bold">
                      {row.strassenMultiplications.toLocaleString()}
                    </td>
                    <td className="p-3 text-emerald-400">
                      {row.multiplicationSavingsPercent > 0 ? `-${row.multiplicationSavingsPercent}%` : '0%'}
                    </td>
                    <td className="p-3 text-slate-400">
                      {row.traditionalAdditions.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-400">
                      {row.strassenAdditions.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                          row.crossoverStatus === 'Strassen Faster'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : row.crossoverStatus === 'Transitional'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {row.crossoverStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
