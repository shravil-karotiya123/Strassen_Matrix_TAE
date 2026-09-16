import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const FormulaReferenceGrid: React.FC = () => {
  const products = [
    {
      id: 'P1',
      formula: 'P₁ = (A₁₁ + A₂₂)(B₁₁ + B₂₂)',
      name: 'Diagonal Sum Product',
      desc: 'Joint interaction across principal diagonals of A and B. Essential for C₁₁ and C₂₂.'
    },
    {
      id: 'P2',
      formula: 'P₂ = (A₂₁ + A₂₂)B₁₁',
      name: 'Bottom Row of A with B₁₁',
      desc: 'Builds the bottom-left block C₂₁ and subtracts from C₂₂.'
    },
    {
      id: 'P3',
      formula: 'P₃ = A₁₁(B₁₂ − B₂₂)',
      name: 'A₁₁ with Right Column Diff',
      desc: 'Builds C₁₂ and provides positive contribution to C₂₂.'
    },
    {
      id: 'P4',
      formula: 'P₄ = A₂₂(B₂₁ − B₁₁)',
      name: 'A₂₂ with Left Column Diff',
      desc: 'Balances diagonal terms in C₁₁ and directly builds C₂₁.'
    },
    {
      id: 'P5',
      formula: 'P₅ = (A₁₁ + A₁₂)B₂₂',
      name: 'Top Row of A with B₂₂',
      desc: 'Builds C₁₂ and subtracts terms from C₁₁.'
    },
    {
      id: 'P6',
      formula: 'P₆ = (A₂₁ − A₁₁)(B₁₁ + B₁₂)',
      name: 'Cross Differential Product 1',
      desc: 'Eliminates cross-terms in C₂₂ to match standard row-column product.'
    },
    {
      id: 'P7',
      formula: 'P₇ = (A₁₂ − A₂₂)(B₂₁ + B₂₂)',
      name: 'Cross Differential Product 2',
      desc: 'Cancels residual sub-terms in C₁₁.'
    }
  ];

  const combinations = [
    {
      block: 'C₁₁',
      formula: 'C₁₁ = P₁ + P₄ − P₅ + P₇',
      exp: '= A₁₁B₁₁ + A₁₂B₂₁'
    },
    {
      block: 'C₁₂',
      formula: 'C₁₂ = P₃ + P₅',
      exp: '= A₁₁B₁₂ + A₁₂B₂₂'
    },
    {
      block: 'C₂₁',
      formula: 'C₂₁ = P₂ + P₄',
      exp: '= A₂₁B₁₁ + A₂₂B₂₁'
    },
    {
      block: 'C₂₂',
      formula: 'C₂₂ = P₁ − P₂ + P₃ + P₆',
      exp: '= A₂₁B₁₂ + A₂₂B₂₂'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 7 Products Grid */}
      <div>
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4" />
          <span>The 7 Strassen Multiplications ($P_1 \dots P_7$)</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map(p => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-300 px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/30">
                  {p.id}
                </span>
                <span className="text-[11px] text-slate-400 font-sans">{p.name}</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-white bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                {p.formula}
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Combined Quadrants */}
      <div>
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Combining the Products into Matrix C</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {combinations.map(c => (
            <div
              key={c.block}
              className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2"
            >
              <span className="text-xs font-mono font-bold text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40">
                {c.block}
              </span>
              <div className="font-mono text-xs font-bold text-white">
                {c.formula}
              </div>
              <div className="font-mono text-[11px] text-emerald-400/90 pt-1 border-t border-emerald-500/20">
                Matches: {c.exp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
