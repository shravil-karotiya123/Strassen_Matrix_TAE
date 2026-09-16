export interface MatrixBenchmarkRow {
  dimension: number;
  traditionalMultiplications: number;
  traditionalAdditions: number;
  traditionalTotalOps: number;
  strassenMultiplications: number;
  strassenAdditions: number;
  strassenTotalOps: number;
  multiplicationSavingsPercent: number;
  crossoverStatus: 'Traditional Faster' | 'Transitional' | 'Strassen Faster';
}

export interface VerificationStats {
  passed: boolean;
  maxAbsoluteDifference: number;
  strassenMultiplicationCount: number;
  strassenAdditionCount: number;
  traditionalMultiplicationCount: number;
  traditionalAdditionCount: number;
  strassenExecutionTimeMs: number;
  traditionalExecutionTimeMs: number;
}
