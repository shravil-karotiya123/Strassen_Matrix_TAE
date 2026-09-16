import React from 'react';
import { Layers, GraduationCap, Cpu, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPosterModal: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPosterModal, onScrollToTop }) => {
  return (
    <footer className="w-full bg-[#030508] border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
            <span className="font-bold text-slate-100 text-lg tracking-wide">
              STRASSEN ALGORITHM LAB
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            An open educational interactive visualization laboratory demonstrating Volker Strassen’s sub-cubic matrix multiplication algorithm. Designed to bridge abstract asymptotic theory with dynamic 2D and 3D visual geometry.
          </p>
          <div className="flex items-center space-x-2 text-xs text-sky-400/80">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side In-Browser Execution &bull; Zero Server Latency</span>
          </div>
        </div>

        {/* Academic Reference */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>Academic Reference</span>
          </h4>
          <p className="text-xs text-slate-400">
            Inspired by coursework at <strong className="text-slate-300">S.B. Jain Institute of Technology, Management & Research, Nagpur</strong>
          </p>
          <p className="text-xs text-slate-400">
            Department of CSE (Data Science) &bull; DAA (N-PCCD501T)
          </p>
          <button
            onClick={onOpenPosterModal}
            className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 flex items-center space-x-1"
          >
            <span>View Technical Poster Reference</span>
          </button>
        </div>

        {/* Mathematical Foundations */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Foundations</span>
          </h4>
          <ul className="text-xs space-y-1.5 text-slate-400 font-mono">
            <li>Volker Strassen (1969)</li>
            <li>Recurrence: T(n) = 7T(n/2) + O(n²)</li>
            <li>Complexity: O(n<sup>log₂ 7</sup>) ≈ O(n<sup>2.8074</sup>)</li>
            <li>Base Multiplications: 7 (vs 8)</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Strassen Matrix Multiplication Laboratory. Developed for interactive algorithms education.
        </div>
        <button
          onClick={onScrollToTop}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-400 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
