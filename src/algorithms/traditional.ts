import { Matrix } from '../types/matrix';
import { createZeroMatrix } from './matrixOperations';

export interface TraditionalResult {
  result: Matrix;
  multiplicationCount: number;
  additionCount: number;
  executionTimeMs: number;
}

/**
 * Standard O(n³) row-by-column matrix multiplication
 */
export function multiplyTraditional(A: Matrix, B: Matrix): TraditionalResult {
  const start = performance.now();
  const n = A.length;
  const m = B[0].length;
  const kDim = B.length;

  const result = createZeroMatrix(n, m);
  let multiplicationCount = 0;
  let additionCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let sum = 0;
      for (let k = 0; k < kDim; k++) {
        sum += (A[i][k] ?? 0) * (B[k][j] ?? 0);
        multiplicationCount++;
        if (k > 0) additionCount++;
      }
      result[i][j] = sum;
    }
  }

  const end = performance.now();

  return {
    result,
    multiplicationCount,
    additionCount,
    executionTimeMs: Math.max(0.001, end - start)
  };
}
