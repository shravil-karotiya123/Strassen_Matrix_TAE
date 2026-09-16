import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { MatrixInputSection } from './components/input/MatrixInputSection';
import { VisualizerWorkspace } from './components/visualizer/VisualizerWorkspace';
import { TheorySection } from './components/theory/TheorySection';
import { ComparisonArena } from './components/comparison/ComparisonArena';
import { ResultsSection } from './components/results/ResultsSection';
import { PosterReferenceModal } from './components/modal/PosterReferenceModal';
import { useStrassenPlayer } from './hooks/useStrassenPlayer';
import { useSoundEffects } from './hooks/useSoundEffects';

export function App() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState<boolean>(false);

  const {
    isMuted,
    toggleMute,
    playStepSound,
    playProductSound,
    playSuccessSound
  } = useSoundEffects();

  const {
    matrixSize,
    matrixA,
    matrixB,
    setMatrixA,
    setMatrixB,
    changeMatrixSize,
    loadPreset,
    randomizeMatrices,
    resetToZeroes,
    currentStepIndex,
    currentStep,
    steps,
    isComplete,
    isPlaying,
    speed,
    setSpeed,
    togglePlay,
    nextStep,
    prevStep,
    goToStep,
    restart,
    skipToResult,
    computation,
    verification
  } = useStrassenPlayer(playStepSound, playProductSound, playSuccessSound);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when typing inside inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        restart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextStep, prevStep, restart]);

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navigation */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
        onNavigateTo={scrollToSection}
      />

      <main className="flex-1 space-y-16">
        {/* Section A: Hero */}
        <HeroSection
          onStartVisualization={() => {
            scrollToSection('visualizer-section');
            if (!isPlaying && currentStepIndex === 0) {
              togglePlay();
            }
          }}
          onLearnAlgorithm={() => scrollToSection('theory-section')}
        />

        {/* Section B: User Input Laboratory */}
        <MatrixInputSection
          matrixSize={matrixSize}
          matrixA={matrixA}
          matrixB={matrixB}
          onMatrixAChange={setMatrixA}
          onMatrixBChange={setMatrixB}
          onSizeChange={changeMatrixSize}
          onSelectPreset={loadPreset}
          onRandomize={() => randomizeMatrices(matrixSize)}
          onResetZeroes={() => resetToZeroes(matrixSize)}
          onStartVisualization={() => {
            scrollToSection('visualizer-section');
            restart();
            setTimeout(() => togglePlay(), 150);
          }}
          onRestart={restart}
          isPlaying={isPlaying}
          speed={speed}
          onSpeedChange={setSpeed}
        />

        {/* Section D & F: Live 3D / 2D Visualizer Workspace */}
        <VisualizerWorkspace
          step={currentStep}
          steps={steps}
          currentStepIndex={currentStepIndex}
          isPlaying={isPlaying}
          isComplete={isComplete}
          speed={speed}
          submatricesA={computation.submatricesA}
          submatricesB={computation.submatricesB}
          onGoToStep={goToStep}
          onTogglePlay={togglePlay}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          onRestart={restart}
          onSkipToResult={skipToResult}
          onSpeedChange={setSpeed}
        />

        {/* Section C & E: Algorithm Theory & Mathematical Foundations */}
        <TheorySection />

        {/* Section G: Traditional vs Strassen Comparative Arena */}
        <ComparisonArena />

        {/* Section H & I: Results & Verification Laboratory */}
        <ResultsSection
          matrixA={matrixA}
          matrixB={matrixB}
          matrixC={computation.result}
          steps={steps}
          verification={verification}
          onRunAgain={() => {
            scrollToSection('visualizer-section');
            restart();
            setTimeout(() => togglePlay(), 100);
          }}
          onChangeInput={() => scrollToSection('input-section')}
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />
      </main>

      {/* Poster Reference Academic Modal */}
      <PosterReferenceModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
}

export default App;
