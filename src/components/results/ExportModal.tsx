import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Download } from 'lucide-react';
import { Matrix } from '../../types/matrix';
import { VisualizerStep } from '../../types/visualizer';
import { ComprehensiveVerification } from '../../algorithms/verification';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  matrixA: Matrix;
  matrixB: Matrix;
  matrixC: Matrix;
  steps: VisualizerStep[];
  verification: ComprehensiveVerification;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  matrixA,
  matrixB,
  matrixC,
  steps,
  verification
}) => {
  const [activeTab, setActiveTab] = useState<'latex' | 'json' | 'markdown'>('latex');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const matrixToLatex = (M: Matrix) => {
    return `\\begin{bmatrix} ${M.map(r => r.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
  };

  const latexContent = `% Strassen Matrix Multiplication Verification Export
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
\\section*{Strassen Matrix Multiplication}
\\[
A = ${matrixToLatex(matrixA)}, \\quad B = ${matrixToLatex(matrixB)}
\\]
\\[
C = A \\times B = ${matrixToLatex(matrixC)}
\\]

\\subsection*{The 7 Strassen Intermediate Products}
\\begin{align*}
P_1 &= (A_{11} + A_{22})(B_{11} + B_{22}) \\\\
P_2 &= (A_{21} + A_{22}) B_{11} \\\\
P_3 &= A_{11} (B_{12} - B_{22}) \\\\
P_4 &= A_{22} (B_{21} - B_{11}) \\\\
P_5 &= (A_{11} + A_{12}) B_{22} \\\\
P_6 &= (A_{21} - A_{11})(B_{11} + B_{12}) \\\\
P_7 &= (A_{12} - A_{22})(B_{21} + B_{22})
\\end{align*}

\\subsection*{Submatrix Combinations}
\\begin{align*}
C_{11} &= P_1 + P_4 - P_5 + P_7 \\\\
C_{12} &= P_3 + P_5 \\\\
C_{21} &= P_2 + P_4 \\\\
C_{22} &= P_1 - P_2 + P_3 + P_6
\\end{align*}

\\textbf{Verification Result:} ${verification.isIdentical ? 'PASSED (Matches O(n^3))' : 'FAILED'}
\\end{document}`;

  const jsonContent = JSON.stringify(
    {
      metadata: {
        algorithm: 'Strassen Matrix Multiplication',
        dimension: matrixA.length,
        timestamp: new Date().toISOString()
      },
      inputs: {
        matrixA,
        matrixB
      },
      output: {
        matrixC
      },
      verification: verification.stats,
      steps: steps.map(s => ({
        stage: s.stage,
        title: s.title,
        formula: s.formulaReadable,
        evaluated: s.substitutedFormula
      }))
    },
    null,
    2
  );

  const markdownContent = `# Strassen Matrix Multiplication Calculation Summary

## Input Matrices
- **Matrix A**: \`${JSON.stringify(matrixA)}\`
- **Matrix B**: \`${JSON.stringify(matrixB)}\`

## Computed Result Matrix C
\`\`\`text
${matrixC.map(r => `[ ${r.join(',\t')} ]`).join('\n')}
\`\`\`

## Verification
- **Status**: ${verification.isIdentical ? 'PASSED' : 'FAILED'}
- **Strassen Multiplications**: ${verification.stats.strassenMultiplicationCount}
- **Traditional Multiplications**: ${verification.stats.traditionalMultiplicationCount}
- **Max Absolute Difference**: ${verification.maxDelta}
`;

  const getExportText = () => {
    if (activeTab === 'latex') return latexContent;
    if (activeTab === 'json') return jsonContent;
    return markdownContent;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#071A36] border border-sky-500/30 rounded-2xl shadow-2xl p-6 text-slate-200 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <FileCode className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white">Export Calculation Trace</h3>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 my-4">
          {(['latex', 'json', 'markdown'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                activeTab === tab
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre">
          {getExportText()}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end space-x-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-colors shadow-md shadow-sky-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY CODE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
