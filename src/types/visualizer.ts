import { Matrix, SubmatrixKey, ProductKey, ResultSubmatrixKey } from './matrix';

export type StepStage =
  | 'INPUT'
  | 'DIVIDE'
  | 'TEMP_SUMS'
  | 'P1'
  | 'P2'
  | 'P3'
  | 'P4'
  | 'P5'
  | 'P6'
  | 'P7'
  | 'COMBINE_C11_C12'
  | 'COMBINE_C21_C22'
  | 'FINAL_MATRIX'
  | 'VERIFICATION';

export interface VisualizerStep {
  id: number;
  stage: StepStage;
  stageIndex: number;
  totalStages: number;
  title: string;
  subtitle: string;
  formulaLatex: string;
  formulaReadable: string;
  substitutedFormula: string;
  explanation: string;
  activeSubmatricesA: SubmatrixKey[];
  activeSubmatricesB: SubmatrixKey[];
  activeProducts: ProductKey[];
  activeResultBlocks: ResultSubmatrixKey[];
  intermediateResult?: {
    label: string;
    matrix: Matrix;
    scalarValue?: number;
  };
  matrixA: Matrix;
  matrixB: Matrix;
  currentMatrixC?: Matrix;
  productsCalculated: Partial<Record<ProductKey, Matrix>>;
  resultsCalculated: Partial<Record<ResultSubmatrixKey, Matrix>>;
  animationKey: string;
}

export type PlaybackSpeed = 0.5 | 1 | 2 | 4;

export interface VisualizationState {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  autoPlay: boolean;
  matrixSize: number;
  matrixA: Matrix;
  matrixB: Matrix;
  steps: VisualizerStep[];
  isComplete: boolean;
}
