import React from 'react';
import { Sparkles, Volume2, VolumeX, BookOpen, Layers, PlayCircle, HelpCircle } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPosterModal: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  onOpenPosterModal,
  onNavigateTo
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#05070A]/85 border-b border-sky-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigateTo('hero-section')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 p-[1px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
            <div className="w-full h-full bg-[#05070A] rounded-[7px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-slate-100 via-sky-200 to-cyan-400 bg-clip-text text-transparent">
                STRASSEN LAB
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                O(n<sup>2.807</sup>)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Interactive 3D Matrix Multiplication
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateTo('input-section')}
            className="hover:text-sky-400 transition-colors flex items-center space-x-1.5"
          >
            <span>Input Matrices</span>
          </button>
          <button
            onClick={() => onNavigateTo('visualizer-section')}
            className="hover:text-sky-400 transition-colors flex items-center space-x-1.5"
          >
            <PlayCircle className="w-4 h-4 text-sky-400" />
            <span>3D Visualizer</span>
          </button>
          <button
            onClick={() => onNavigateTo('theory-section')}
            className="hover:text-sky-400 transition-colors flex items-center space-x-1.5"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Algorithm Theory</span>
          </button>
          <button
            onClick={() => onNavigateTo('comparison-section')}
            className="hover:text-sky-400 transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Complexity & Benchmarks</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-sky-500/50 text-slate-300 hover:text-sky-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Academic Reference Modal Trigger */}
          <button
            onClick={onOpenPosterModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-950 to-slate-900 border border-sky-500/40 hover:border-sky-400 text-xs font-semibold text-sky-300 hover:text-white shadow-sm hover:shadow-sky-500/20 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Academic Reference</span>
            <span className="sm:hidden">Poster</span>
          </button>
        </div>
      </div>
    </header>
  );
};
