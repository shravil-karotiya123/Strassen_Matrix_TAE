import { Matrix, PartitionedMatrix } from '../types/matrix';

/**
 * Creates an empty matrix initialized with zeros
 */
export function createZeroMatrix(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

/**
 * Clones a matrix deeply
 */
export function cloneMatrix(M: Matrix): Matrix {
  return M.map(row => [...row]);
}

/**
 * Adds two equal-dimension matrices: A + B
 */
export function matrixAdd(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const result = createZeroMatrix(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = (A[i]?.[j] ?? 0) + (B[i]?.[j] ?? 0);
    }
  }
  return result;
}

/**
 * Subtracts two equal-dimension matrices: A - B
 */
export function matrixSubtract(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const result = createZeroMatrix(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = (A[i]?.[j] ?? 0) - (B[i]?.[j] ?? 0);
    }
  }
  return result;
}

/**
 * Partitions an n x n matrix into 4 equal quadrants: M11, M12, M21, M22
 */
export function partitionMatrix(M: Matrix): PartitionedMatrix {
  const n = M.length;
  const half = Math.floor(n / 2);

  const M11 = createZeroMatrix(half, half);
  const M12 = createZeroMatrix(half, half);
  const M21 = createZeroMatrix(half, half);
  const M22 = createZeroMatrix(half, half);

  for (let i = 0; i < half; i++) {
    for (let j = 0; j < half; j++) {
      M11[i][j] = M[i][j];
      M12[i][j] = M[i][j + half];
      M21[i][j] = M[i + half][j];
      M22[i][j] = M[i + half][j + half];
    }
  }

  return { M11, M12, M21, M22 };
}

/**
 * Combines 4 equal submatrices back into an n x n matrix
 */
export function combineSubmatrices(
  M11: Matrix,
  M12: Matrix,
  M21: Matrix,
  M22: Matrix
): Matrix {
  const half = M11.length;
  const n = half * 2;
  const result = createZeroMatrix(n, n);

  for (let i = 0; i < half; i++) {
    for (let j = 0; j < half; j++) {
      result[i][j] = M11[i][j];
      result[i][j + half] = M12[i][j];
      result[i + half][j] = M21[i][j];
      result[i + half][j + half] = M22[i][j];
    }
  }

  return result;
}

/**
 * Checks if number is power of 2
 */
export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Gets next power of 2
 */
export function nextPowerOfTwo(n: number): number {
  if (n <= 1) return 1;
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

/**
 * Pads matrix with zeroes to make it power-of-two square
 */
export function padMatrixToPowerOfTwo(M: Matrix): { padded: Matrix; originalSize: number; targetSize: number } {
  const rows = M.length;
  const cols = M[0]?.length || 0;
  const maxDim = Math.max(rows, cols);
  const targetSize = isPowerOfTwo(maxDim) ? maxDim : nextPowerOfTwo(maxDim);

  const padded = createZeroMatrix(targetSize, targetSize);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      padded[i][j] = M[i][j] ?? 0;
    }
  }

  return { padded, originalSize: maxDim, targetSize };
}

/**
 * Trims padded matrix back to original dimensions
 */
export function unpadMatrix(M: Matrix, originalRows: number, originalCols: number): Matrix {
  const result = createZeroMatrix(originalRows, originalCols);
  for (let i = 0; i < originalRows; i++) {
    for (let j = 0; j < originalCols; j++) {
      result[i][j] = M[i][j];
    }
  }
  return result;
}

/**
 * Pretty formats a matrix for UI display or tooltips
 */
export function formatMatrixString(M: Matrix): string {
  if (!M || M.length === 0) return '[]';
  return M.map(row => `[ ${row.join(', ')} ]`).join('\n');
}

/**
 * Formats a scalar value or compact matrix string
 */
export function formatCompactValue(M: Matrix): string {
  if (M.length === 1 && M[0].length === 1) {
    return `${M[0][0]}`;
  }
  return `[${M.map(r => r.join(' ')).join('; ')}]`;
}
