import React from 'react';
import { Matrix, SubmatrixKey, ProductKey, ResultSubmatrixKey } from '../../types/matrix';
import { VisualizerStep } from '../../types/visualizer';
import { Layers, CheckCircle2, Box } from 'lucide-react';
import { formatCompactValue } from '../../algorithms/matrixOperations';

interface SubmatrixPanelProps {
  step: VisualizerStep;
  submatricesA: { A11: Matrix; A12: Matrix; A21: Matrix; A22: Matrix };
  submatricesB: { B11: Matrix; B12: Matrix; B21: Matrix; B22: Matrix };
}

export const SubmatrixPanel: React.FC<SubmatrixPanelProps> = ({
  step,
  submatricesA,
  submatricesB
}) => {
  const { activeSubmatricesA, activeSubmatricesB, productsCalculated, resultsCalculated } = step;

  const renderQuadrantCard = (
    label: SubmatrixKey,
    matrix: Matrix,
    isActive: boolean
  ) => {
    return (
      <div
        className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
          isActive
            ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/20 ring-1 ring-sky-400'
            : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={`font-bold ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
            {label}
          </span>
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          )}
        </div>
        <div className="text-center font-semibold text-sm">
          {formatCompactValue(matrix)}
        </div>
      </div>
    );
  };

  const productKeys: ProductKey[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
  const resultKeys: ResultSubmatrixKey[] = ['C11', 'C12', 'C21', 'C22'];

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-2xl bg-[#071A36]/80 border border-sky-500/20 shadow-xl backdrop-blur-md h-full">
      {/* Panel Header */}
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
        <Layers className="w-4 h-4 text-sky-400" />
        <h3 className="font-bold text-sm text-slate-100">Submatrix Decomposition</h3>
      </div>

      {/* Matrix A Quadrants */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono font-bold text-sky-300">Matrix A Sub-Blocks</span>
        <div className="grid grid-cols-2 gap-2">
          {renderQuadrantCard('A11', submatricesA.A11, activeSubmatricesA.includes('A11'))}
          {renderQuadrantCard('A12', submatricesA.A12, activeSubmatricesA.includes('A12'))}
          {renderQuadrantCard('A21', submatricesA.A21, activeSubmatricesA.includes('A21'))}
          {renderQuadrantCard('A22', submatricesA.A22, activeSubmatricesA.includes('A22'))}
        </div>
      </div>

      {/* Matrix B Quadrants */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono font-bold text-indigo-300">Matrix B Sub-Blocks</span>
        <div className="grid grid-cols-2 gap-2">
          {renderQuadrantCard('B11', submatricesB.B11, activeSubmatricesB.includes('B11'))}
          {renderQuadrantCard('B12', submatricesB.B12, activeSubmatricesB.includes('B12'))}
          {renderQuadrantCard('B21', submatricesB.B21, activeSubmatricesB.includes('B21'))}
          {renderQuadrantCard('B22', submatricesB.B22, activeSubmatricesB.includes('B22'))}
        </div>
      </div>

      {/* Computed Products (P1 - P7) Status */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <span className="text-xs font-mono font-bold text-cyan-300 flex items-center justify-between">
          <span>7 Strassen Products</span>
          <span className="text-[10px] text-slate-400 font-normal">
            {Object.keys(productsCalculated).length}/7 Ready
          </span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-1.5">
          {productKeys.map(pkey => {
            const isComputed = !!productsCalculated[pkey];
            const isActive = step.activeProducts.includes(pkey);
            const val = productsCalculated[pkey] ? formatCompactValue(productsCalculated[pkey]!) : '—';

            return (
              <div
                key={pkey}
                className={`p-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400'
                    : isComputed
                    ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600'
                }`}
              >
                <span className="font-bold">{pkey}:</span>
                <span className={isComputed ? 'text-sky-300 font-bold' : 'text-slate-600'}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Computed Results (C11 - C22) Status */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <span className="text-xs font-mono font-bold text-emerald-300 flex items-center justify-between">
          <span>Result Quadrants (C)</span>
          <span className="text-[10px] text-slate-400 font-normal">
            {Object.keys(resultsCalculated).length}/4 Combined
          </span>
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {resultKeys.map(ckey => {
            const isComputed = !!resultsCalculated[ckey];
            const isActive = step.activeResultBlocks.includes(ckey);
            const val = resultsCalculated[ckey] ? formatCompactValue(resultsCalculated[ckey]!) : '—';

            return (
              <div
                key={ckey}
                className={`p-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400'
                    : isComputed
                    ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600'
                }`}
              >
                <span className="font-bold">{ckey}:</span>
                <span className={isComputed ? 'text-emerald-300 font-bold' : 'text-slate-600'}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
