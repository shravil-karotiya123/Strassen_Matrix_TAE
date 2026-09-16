import React from 'react';
import { Matrix, SubmatrixKey } from '../../types/matrix';

interface MatrixGridEditorProps {
  label: string;
  matrix: Matrix;
  onChange: (newMatrix: Matrix) => void;
  accentColor: 'sky' | 'indigo' | 'emerald';
  activeSubmatrices?: SubmatrixKey[];
  disabled?: boolean;
}

export const MatrixGridEditor: React.FC<MatrixGridEditorProps> = ({
  label,
  matrix,
  onChange,
  accentColor,
  activeSubmatrices = [],
  disabled = false
}) => {
  const n = matrix.length;
  const half = Math.floor(n / 2);

  const getSubmatrixForCell = (r: number, c: number): SubmatrixKey => {
    const isTop = r < half;
    const isLeft = c < half;
    const prefix = label.includes('A') ? 'A' : 'B';
    if (isTop && isLeft) return `${prefix}11` as SubmatrixKey;
    if (isTop && !isLeft) return `${prefix}12` as SubmatrixKey;
    if (!isTop && isLeft) return `${prefix}21` as SubmatrixKey;
    return `${prefix}22` as SubmatrixKey;
  };

  const handleCellChange = (r: number, c: number, valueStr: string) => {
    const newMatrix = matrix.map(row => [...row]);
    if (valueStr === '' || valueStr === '-') {
      newMatrix[r][c] = 0;
    } else {
      const num = parseFloat(valueStr);
      if (!isNaN(num)) {
        newMatrix[r][c] = num;
      }
    }
    onChange(newMatrix);
  };

  const getCellHighlightClass = (r: number, c: number) => {
    const subKey = getSubmatrixForCell(r, c);
    const isActive = activeSubmatrices.includes(subKey);

    if (isActive) {
      return 'bg-sky-500/25 border-sky-400 text-sky-200 ring-2 ring-sky-400/50 shadow-lg shadow-sky-500/20';
    }

    // Default quadrant coloring for divide-and-conquer clarity
    const isTop = r < half;
    const isLeft = c < half;
    if (isTop && isLeft) return 'bg-sky-950/30 border-sky-600/30 text-slate-100 hover:border-sky-500/60';
    if (isTop && !isLeft) return 'bg-cyan-950/30 border-cyan-600/30 text-slate-100 hover:border-cyan-500/60';
    if (!isTop && isLeft) return 'bg-indigo-950/30 border-indigo-600/30 text-slate-100 hover:border-indigo-500/60';
    return 'bg-blue-950/30 border-blue-600/30 text-slate-100 hover:border-blue-500/60';
  };

  return (
    <div className="flex flex-col space-y-2 p-4 rounded-2xl bg-[#071A36]/60 border border-sky-500/20 shadow-xl backdrop-blur-md">
      {/* Matrix Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="font-mono font-bold text-lg text-sky-400">{label}</span>
          <span className="text-xs text-slate-400 font-mono">
            ({n} &times; {n})
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
          Quadrant Coded
        </span>
      </div>

      {/* Editable Matrix Grid */}
      <div className="overflow-x-auto py-2 flex justify-center">
        <div
          className="grid gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80"
          style={{
            gridTemplateColumns: `repeat(${n}, minmax(${n > 4 ? '44px' : '60px'}, 1fr))`
          }}
        >
          {matrix.map((row, r) =>
            row.map((val, c) => {
              const subKey = getSubmatrixForCell(r, c);
              return (
                <div key={`${r}-${c}`} className="relative group">
                  <input
                    type="number"
                    disabled={disabled}
                    value={val}
                    onChange={e => handleCellChange(r, c, e.target.value)}
                    className={`w-full aspect-square text-center font-mono font-semibold rounded-lg border text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 ${getCellHighlightClass(
                      r,
                      c
                    )} ${disabled ? 'opacity-80 cursor-not-allowed' : ''}`}
                    aria-label={`${label} cell row ${r + 1} column ${c + 1} (${subKey})`}
                  />
                  {/* Subtle Submatrix badge in cell corner */}
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono text-slate-400/80 pointer-events-none select-none group-hover:text-sky-300">
                    {subKey}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
