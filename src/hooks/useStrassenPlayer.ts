import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Matrix } from '../types/matrix';
import { PlaybackSpeed } from '../types/visualizer';
import { computeStrassenWithSteps } from '../algorithms/strassen';
import { verifyMultiplicationResults } from '../algorithms/verification';
import { createZeroMatrix } from '../algorithms/matrixOperations';

export const PRESETS = {
  default2x2: {
    name: 'Default (2×2)',
    A: [[1, 2], [3, 4]],
    B: [[5, 6], [7, 8]]
  },
  symmetric2x2: {
    name: 'Symmetric (2×2)',
    A: [[2, 5], [5, 2]],
    B: [[3, 1], [1, 3]]
  },
  negative2x2: {
    name: 'Negative & Zeroes (2×2)',
    A: [[-1, 4], [0, -3]],
    B: [[2, -5], [1, 0]]
  },
  identity2x2: {
    name: 'Identity Test (2×2)',
    A: [[3, 7], [1, 9]],
    B: [[1, 0], [0, 1]]
  },
  example4x4: {
    name: 'Recursive 4×4 Example',
    A: [
      [1, 2, 3, 1],
      [4, 1, 0, 2],
      [2, 0, 1, 3],
      [1, 3, 2, 1]
    ],
    B: [
      [2, 1, 0, 1],
      [1, 3, 2, 0],
      [0, 1, 3, 2],
      [2, 0, 1, 1]
    ]
  }
};

export function useStrassenPlayer(
  onStepChange?: () => void,
  onProductComputed?: () => void,
  onComplete?: () => void
) {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrixA, setMatrixA] = useState<Matrix>(PRESETS.default2x2.A);
  const [matrixB, setMatrixB] = useState<Matrix>(PRESETS.default2x2.B);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  // Compute full steps from input matrices
  const computation = useMemo(() => {
    return computeStrassenWithSteps(matrixA, matrixB);
  }, [matrixA, matrixB]);

  const verification = useMemo(() => {
    return verifyMultiplicationResults(matrixA, matrixB);
  }, [matrixA, matrixB]);

  const steps = computation.steps;
  const currentStep = steps[currentStepIndex] || steps[0];
  const isComplete = currentStepIndex >= steps.length - 1;

  // Jump to step
  const goToStep = useCallback((index: number) => {
    const target = Math.max(0, Math.min(steps.length - 1, index));
    setCurrentStepIndex(target);
    onStepChange?.();
  }, [steps.length, onStepChange]);

  // Next step
  const nextStep = useCallback(() => {
    setCurrentStepIndex(prev => {
      if (prev < steps.length - 1) {
        const next = prev + 1;
        if (next >= 3 && next <= 9) {
          onProductComputed?.();
        } else {
          onStepChange?.();
        }
        if (next === steps.length - 1) {
          onComplete?.();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        return next;
      } else {
        setIsPlaying(false);
        return prev;
      }
    });
  }, [steps.length, onProductComputed, onStepChange, onComplete]);

  // Prev step
  const prevStep = useCallback(() => {
    setCurrentStepIndex(prev => {
      if (prev > 0) {
        onStepChange?.();
        return prev - 1;
      }
      return 0;
    });
  }, [onStepChange]);

  // Play / Pause
  const togglePlay = useCallback(() => {
    if (isComplete && !isPlaying) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [isComplete, isPlaying]);

  // Restart
  const restart = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  // Skip to Result
  const skipToResult = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(steps.length - 1);
    onComplete?.();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, [steps.length, onComplete]);

  // Load Preset
  const loadPreset = useCallback((presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    setIsPlaying(false);
    setMatrixSize(preset.A.length);
    setMatrixA(preset.A);
    setMatrixB(preset.B);
    setCurrentStepIndex(0);
  }, []);

  // Randomize Matrices
  const randomizeMatrices = useCallback((size = matrixSize) => {
    setIsPlaying(false);
    const generateRandom = (n: number) => {
      return Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * 19) - 9) // -9 to +9
      );
    };
    setMatrixSize(size);
    setMatrixA(generateRandom(size));
    setMatrixB(generateRandom(size));
    setCurrentStepIndex(0);
  }, [matrixSize]);

  // Reset to zeroes
  const resetToZeroes = useCallback((size = matrixSize) => {
    setIsPlaying(false);
    setMatrixSize(size);
    setMatrixA(createZeroMatrix(size, size));
    setMatrixB(createZeroMatrix(size, size));
    setCurrentStepIndex(0);
  }, [matrixSize]);

  // Set Matrix Size & resize arrays
  const changeMatrixSize = useCallback((newSize: number) => {
    setIsPlaying(false);
    setMatrixSize(newSize);

    const resize = (oldM: Matrix, n: number) => {
      const res = createZeroMatrix(n, n);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (oldM[i]?.[j] !== undefined) {
            res[i][j] = oldM[i][j];
          } else {
            res[i][j] = Math.floor(Math.random() * 9) + 1;
          }
        }
      }
      return res;
    };

    setMatrixA(prev => resize(prev, newSize));
    setMatrixB(prev => resize(prev, newSize));
    setCurrentStepIndex(0);
  }, []);

  // Automatic Step Interval when Playing
  useEffect(() => {
    if (!isPlaying) return;

    const baseIntervalMs = 2400; // base duration per step at 1x
    const intervalMs = baseIntervalMs / speed;

    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          if (next >= 3 && next <= 9) {
            onProductComputed?.();
          } else {
            onStepChange?.();
          }
          if (next === steps.length - 1) {
            setIsPlaying(false);
            onComplete?.();
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
          return next;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, steps.length, onProductComputed, onStepChange, onComplete]);

  return {
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
  };
}
