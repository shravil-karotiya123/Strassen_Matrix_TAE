export type Matrix = number[][];

export type SubmatrixKey = 'A11' | 'A12' | 'A21' | 'A22' | 'B11' | 'B12' | 'B21' | 'B22';

export type ProductKey = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';

export type ResultSubmatrixKey = 'C11' | 'C12' | 'C21' | 'C22';

export interface MatrixBlockPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export interface PartitionedMatrix {
  M11: Matrix;
  M12: Matrix;
  M21: Matrix;
  M22: Matrix;
}

export interface StrassenProducts {
  P1: Matrix;
  P2: Matrix;
  P3: Matrix;
  P4: Matrix;
  P5: Matrix;
  P6: Matrix;
  P7: Matrix;
}

export interface MatrixValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
  paddedSize?: number;
}
