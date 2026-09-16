import React from 'react';
import { X, CheckCircle, AlertTriangle, GraduationCap, FileText, ExternalLink } from 'lucide-react';

interface PosterReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterReferenceModal: React.FC<PosterReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#071A36] border border-sky-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Academic Context
              </span>
              <span className="text-xs text-slate-400">DAA (N-PCCD501T)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              S.B. Jain Institute Technical Poster Reference
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Department of Computer Science & Engineering (Data Science) &bull; Nagpur &bull; Session 2026-27
            </p>
          </div>
        </div>

        {/* Poster Reference Metadata */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Author / Student:</span>
            <span className="font-semibold text-sky-300">Shravil Karotiya (USN: CD24049)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Institution:</span>
            <span className="font-semibold text-slate-200">S.B. Jain Institute of Technology, Management & Research</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Original Poster Title:</span>
            <span className="font-semibold text-slate-200">STRASSEN MATRIX MULTIPLICATION</span>
          </div>
        </div>

        {/* Academic Highlights & Mathematical Verification */}
        <div className="space-y-4 text-sm leading-relaxed text-slate-300">
          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/20">
            <h4 className="font-semibold text-sky-300 text-sm flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Core Concepts Preserved & Elevated</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
              <li><strong>Divide-and-Conquer Paradigm:</strong> Decomposing matrices into quadrants to beat the standard $O(n^3)$ barrier.</li>
              <li><strong>Multiplication Reduction:</strong> Lowering recursive block multiplications from 8 to 7.</li>
              <li><strong>Mathematical Formulation:</strong> Computing products $P_1$ through $P_7$ and combining for $C_{11}, C_{12}, C_{21}, C_{22}$.</li>
              <li><strong>Broad Applications:</strong> Computer graphics, deep learning tensors, scientific simulations, and large-scale numerical analysis.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
            <h4 className="font-semibold text-amber-300 text-sm flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Mathematical Clarifications & Rigorous Corrections</span>
            </h4>
            <p className="text-xs text-slate-300 mb-2">
              The original academic poster contained several minor typesetting errors common in introductory materials. This laboratory mathematically verifies and corrects every single formula:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-black/40 border border-red-500/20 text-red-300">
                <span className="font-bold block text-red-400 mb-1">Poster Typo:</span>
                • Traditional: O(n²) (omitted n)<br/>
                • Duplicate labels: M6 listed twice<br/>
                • P2 equation mislabeled as M3
              </div>
              <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-emerald-300">
                <span className="font-bold block text-emerald-400 mb-1">Corrected Laboratory Standard:</span>
                • Traditional: O(n³)<br/>
                • Products: Explicitly P₁ through P₇<br/>
                • Live verified equality against $O(n³)$
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-[#05070A] font-bold text-sm transition-colors shadow-lg shadow-sky-500/20"
          >
            Explore Interactive Lab
          </button>
        </div>
      </div>
    </div>
  );
};
