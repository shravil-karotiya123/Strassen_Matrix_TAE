import React from 'react';
import { ComprehensiveVerification } from '../../algorithms/verification';
import { CheckCircle2, XCircle, ShieldCheck, Clock, Zap, Cpu } from 'lucide-react';

interface VerificationCardProps {
  verification: ComprehensiveVerification;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({ verification }) => {
  const { isIdentical, maxDelta, stats, message } = verification;

  return (
    <div className={`p-6 rounded-2xl border shadow-2xl transition-all ${
      isIdentical
        ? 'bg-gradient-to-br from-emerald-950/40 via-[#071A36]/60 to-[#05070A] border-emerald-500/40'
        : 'bg-gradient-to-br from-red-950/40 via-[#071A36]/60 to-[#05070A] border-red-500/40'
    }`}>
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          {isIdentical ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
              <XCircle className="w-6 h-6" />
            </div>
          )}
          <div>
            <h4 className="text-lg font-bold text-white">
              {isIdentical ? 'VERIFICATION PASSED' : 'VERIFICATION FAILED'}
            </h4>
            <p className="text-xs text-slate-300">
              {isIdentical
                ? 'Both Strassen and Traditional matrix multiplication produced identical results.'
                : 'Numerical discrepancy detected exceeding epsilon threshold.'}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          Max &Delta;: {maxDelta.toExponential(2)}
        </span>
      </div>

      {/* Live Calculated Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-slate-400 block flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>Strassen Mults:</span>
          </span>
          <span className="text-base font-bold text-sky-300">
            {stats.strassenMultiplicationCount}
          </span>
          <span className="text-[10px] text-slate-500 block">7 recursive branches</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-slate-400 block flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>Traditional Mults:</span>
          </span>
          <span className="text-base font-bold text-slate-200">
            {stats.traditionalMultiplicationCount}
          </span>
          <span className="text-[10px] text-slate-500 block">8 standard products</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-slate-400 block flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Strassen Time:</span>
          </span>
          <span className="text-base font-bold text-cyan-300">
            {stats.strassenExecutionTimeMs.toFixed(3)} ms
          </span>
          <span className="text-[10px] text-slate-500 block">Client browser run</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-slate-400 block flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Equality Status:</span>
          </span>
          <span className="text-base font-bold text-emerald-400">
            {isIdentical ? '100% Match' : 'Mismatch'}
          </span>
          <span className="text-[10px] text-emerald-500 block">&epsilon; = 1e-9 tolerance</span>
        </div>
      </div>
    </div>
  );
};
