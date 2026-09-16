import { Matrix } from '../types/matrix';
import { VerificationStats } from '../types/comparison';
import { multiplyTraditional } from './traditional';
import { computeStrassenWithSteps } from './strassen';

export interface ComprehensiveVerification {
  isIdentical: boolean;
  maxDelta: number;
  tolerance: number;
  strassenResult: Matrix;
  traditionalResult: Matrix;
  deltaMatrix: Matrix;
  stats: VerificationStats;
  message: string;
}

/**
 * Validates that Strassen's algorithm produces exactly the same result as traditional multiplication
 */
export function verifyMultiplicationResults(
  A: Matrix,
  B: Matrix,
  tolerance = 1e-9
): ComprehensiveVerification {
  const trad = multiplyTraditional(A, B);
  const strass = computeStrassenWithSteps(A, B);

  const rows = A.length;
  const cols = B[0].length;
  const deltaMatrix: Matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  let maxDelta = 0;
  let isIdentical = true;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const sVal = strass.result[i]?.[j] ?? 0;
      const tVal = trad.result[i]?.[j] ?? 0;
      const diff = Math.abs(sVal - tVal);
      deltaMatrix[i][j] = diff;
      if (diff > maxDelta) {
        maxDelta = diff;
      }
      if (diff > tolerance) {
        isIdentical = false;
      }
    }
  }

  const message = isIdentical
    ? `VERIFICATION PASSED — Both Strassen and Traditional algorithms produced identical ${rows}×${cols} results (max delta: ${maxDelta.toExponential(2)}).`
    : `VERIFICATION FAILED — Discrepancy detected (max delta: ${maxDelta}).`;

  return {
    isIdentical,
    maxDelta,
    tolerance,
    strassenResult: strass.result,
    traditionalResult: trad.result,
    deltaMatrix,
    stats: {
      passed: isIdentical,
      maxAbsoluteDifference: maxDelta,
      strassenMultiplicationCount: strass.multiplicationCount,
      strassenAdditionCount: strass.additionCount,
      traditionalMultiplicationCount: trad.multiplicationCount,
      traditionalAdditionCount: trad.additionCount,
      strassenExecutionTimeMs: strass.executionTimeMs,
      traditionalExecutionTimeMs: trad.executionTimeMs
    },
    message
  };
}
