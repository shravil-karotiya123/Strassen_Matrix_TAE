import React from 'react';
import { Play, BookOpen, Sparkles, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';

interface HeroSectionProps {
  onStartVisualization: () => void;
  onLearnAlgorithm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartVisualization,
  onLearnAlgorithm
}) => {
  return (
    <section id="hero-section" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive 3D Algorithm Laboratory &bull; Verified Mathematics</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            STRASSEN MATRIX <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              MULTIPLICATION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-sky-100/90 leading-relaxed max-w-2xl">
            Explore how divide-and-conquer reduces matrix multiplication from eight recursive multiplications to seven.
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Enter your own matrices and watch Strassen’s algorithm divide, calculate, combine, and produce the final matrix through an interactive mathematical visualization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartVisualization}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all flex items-center space-x-2.5"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>START VISUALIZATION</span>
            </button>
            <button
              onClick={onLearnAlgorithm}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/40 text-slate-200 hover:text-sky-300 font-semibold text-sm tracking-wide shadow-sm hover:-translate-y-0.5 transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>LEARN THE ALGORITHM</span>
            </button>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono">Traditional</span>
              <p className="text-lg font-bold text-slate-200">8 Multiplications</p>
              <span className="text-[11px] text-slate-500 font-mono">O(n³) cubic</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-sky-400 font-mono">Strassen Method</span>
              <p className="text-lg font-bold text-sky-300">7 Multiplications</p>
              <span className="text-[11px] text-sky-400/80 font-mono">O(n<sup>2.8074</sup>)</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-emerald-400 font-mono">Precision</span>
              <p className="text-lg font-bold text-emerald-300">100% Match</p>
              <span className="text-[11px] text-emerald-500 font-mono">Automated Epsilon</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Matrix Laboratory Canvas */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-sky-500/10 via-slate-900/40 to-[#071A36]/60 border border-sky-500/20 p-2 shadow-2xl relative backdrop-blur-sm">
            {/* Top Indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-xs font-mono text-sky-300 bg-[#05070A]/80 px-3 py-1 rounded-full border border-sky-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>3D Active Matrix Spatial Simulation</span>
            </div>
            
            <HeroCanvas />

            {/* Bottom floating equation badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-2.5 rounded-xl bg-slate-950/90 border border-sky-500/30 text-center font-mono text-xs text-slate-300 shadow-lg">
              <span className="text-sky-400">P₁</span> = (A₁₁ + A₂₂)(B₁₁ + B₂₂) &rarr; <span className="text-cyan-300">7 Recursive Multiplications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
