import { Matrix, ProductKey, ResultSubmatrixKey } from '../types/matrix';
import { VisualizerStep } from '../types/visualizer';
import {
  matrixAdd,
  matrixSubtract,
  partitionMatrix,
  combineSubmatrices,
  cloneMatrix,
  formatCompactValue
} from './matrixOperations';
import { multiplyTraditional } from './traditional';

export interface StrassenComputationResult {
  result: Matrix;
  steps: VisualizerStep[];
  products: Record<ProductKey, Matrix>;
  submatricesA: { A11: Matrix; A12: Matrix; A21: Matrix; A22: Matrix };
  submatricesB: { B11: Matrix; B12: Matrix; B21: Matrix; B22: Matrix };
  results: Record<ResultSubmatrixKey, Matrix>;
  multiplicationCount: number;
  additionCount: number;
  executionTimeMs: number;
}

/**
 * Executes Strassen's algorithm and records step-by-step visualizer states
 */
export function computeStrassenWithSteps(A: Matrix, B: Matrix): StrassenComputationResult {
  const start = performance.now();
  const n = A.length;

  let multiplicationCount = 0;
  let additionCount = 0;

  // Base 1x1 case fallback
  if (n === 1) {
    const singleProduct = [[A[0][0] * B[0][0]]];
    const end = performance.now();
    return {
      result: singleProduct,
      steps: [],
      products: {
        P1: singleProduct,
        P2: singleProduct,
        P3: singleProduct,
        P4: singleProduct,
        P5: singleProduct,
        P6: singleProduct,
        P7: singleProduct,
      },
      submatricesA: { A11: A, A12: [[0]], A21: [[0]], A22: [[0]] },
      submatricesB: { B11: B, B12: [[0]], B21: [[0]], B22: [[0]] },
      results: { C11: singleProduct, C12: [[0]], C21: [[0]], C22: [[0]] },
      multiplicationCount: 1,
      additionCount: 0,
      executionTimeMs: end - start
    };
  }

  // 1. Partition input matrices into 4 submatrices
  const { M11: A11, M12: A12, M21: A21, M22: A22 } = partitionMatrix(A);
  const { M11: B11, M12: B12, M21: B21, M22: B22 } = partitionMatrix(B);

  // Helper for recursive multiplication if submatrices are > 1x1
  const multiplyRecursive = (X: Matrix, Y: Matrix): Matrix => {
    if (X.length === 1) {
      multiplicationCount++;
      return [[X[0][0] * Y[0][0]]];
    }
    // For visual clarity in educational mode, we can use recursive Strassen or traditional for leaf blocks
    const subRes = computeStrassenPure(X, Y);
    multiplicationCount += subRes.multiplicationCount;
    additionCount += subRes.additionCount;
    return subRes.result;
  };

  const add = (X: Matrix, Y: Matrix): Matrix => {
    additionCount += X.length * X[0].length;
    return matrixAdd(X, Y);
  };

  const sub = (X: Matrix, Y: Matrix): Matrix => {
    additionCount += X.length * X[0].length;
    return matrixSubtract(X, Y);
  };

  // 2. Compute 7 Strassen Products
  // P1 = (A11 + A22) * (B11 + B22)
  const A11_plus_A22 = add(A11, A22);
  const B11_plus_B22 = add(B11, B22);
  const P1 = multiplyRecursive(A11_plus_A22, B11_plus_B22);

  // P2 = (A21 + A22) * B11
  const A21_plus_A22 = add(A21, A22);
  const P2 = multiplyRecursive(A21_plus_A22, B11);

  // P3 = A11 * (B12 - B22)
  const B12_minus_B22 = sub(B12, B22);
  const P3 = multiplyRecursive(A11, B12_minus_B22);

  // P4 = A22 * (B21 - B11)
  const B21_minus_B11 = sub(B21, B11);
  const P4 = multiplyRecursive(A22, B21_minus_B11);

  // P5 = (A11 + A12) * B22
  const A11_plus_A12 = add(A11, A12);
  const P5 = multiplyRecursive(A11_plus_A12, B22);

  // P6 = (A21 - A11) * (B11 + B12)
  const A21_minus_A11 = sub(A21, A11);
  const B11_plus_B12 = add(B11, B12);
  const P6 = multiplyRecursive(A21_minus_A11, B11_plus_B12);

  // P7 = (A12 - A22) * (B21 + B22)
  const A12_minus_A22 = sub(A12, A22);
  const B21_plus_B22 = add(B21, B22);
  const P7 = multiplyRecursive(A12_minus_A22, B21_plus_B22);

  // 3. Combine 7 products to calculate C submatrices
  // C11 = P1 + P4 - P5 + P7
  const C11 = add(sub(add(P1, P4), P5), P7);

  // C12 = P3 + P5
  const C12 = add(P3, P5);

  // C21 = P2 + P4
  const C21 = add(P2, P4);

  // C22 = P1 - P2 + P3 + P6
  const C22 = add(add(sub(P1, P2), P3), P6);

  // Final combined matrix C
  const finalC = combineSubmatrices(C11, C12, C21, C22);

  const end = performance.now();

  // Helper strings for values
  const vA11 = formatCompactValue(A11);
  const vA12 = formatCompactValue(A12);
  const vA21 = formatCompactValue(A21);
  const vA22 = formatCompactValue(A22);

  const vB11 = formatCompactValue(B11);
  const vB12 = formatCompactValue(B12);
  const vB21 = formatCompactValue(B21);
  const vB22 = formatCompactValue(B22);

  const vP1 = formatCompactValue(P1);
  const vP2 = formatCompactValue(P2);
  const vP3 = formatCompactValue(P3);
  const vP4 = formatCompactValue(P4);
  const vP5 = formatCompactValue(P5);
  const vP6 = formatCompactValue(P6);
  const vP7 = formatCompactValue(P7);

  const vC11 = formatCompactValue(C11);
  const vC12 = formatCompactValue(C12);
  const vC21 = formatCompactValue(C21);
  const vC22 = formatCompactValue(C22);

  // Generate the 14 visualizer steps (0 to 13)
  const steps: VisualizerStep[] = [
    {
      id: 0,
      stage: 'INPUT',
      stageIndex: 0,
      totalStages: 13,
      title: '01 — Input Matrices A and B',
      subtitle: `Target matrix dimension: ${n} × ${n}`,
      formulaLatex: 'C = A \\times B',
      formulaReadable: 'C = A × B',
      substitutedFormula: `Matrix A (${n}×${n}) × Matrix B (${n}×${n})`,
      explanation: 'Strassen’s algorithm starts with two square matrices A and B. Instead of computing the standard 8 sub-block products, Strassen divides each matrix into 4 equal quadrants and uses 7 clever intermediate products.',
      activeSubmatricesA: [],
      activeSubmatricesB: [],
      activeProducts: [],
      activeResultBlocks: [],
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: {},
      resultsCalculated: {},
      animationKey: 'input_stage'
    },
    {
      id: 1,
      stage: 'DIVIDE',
      stageIndex: 1,
      totalStages: 13,
      title: '02 — Divide into Submatrices',
      subtitle: `Partitioning each ${n}×${n} matrix into four ${(n/2)}×${(n/2)} sub-blocks`,
      formulaLatex: 'A = \\begin{bmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \\end{bmatrix}, \\quad B = \\begin{bmatrix} B_{11} & B_{12} \\\\ B_{21} & B_{22} \\end{bmatrix}',
      formulaReadable: 'A = [ [A11, A12], [A21, A22] ], B = [ [B11, B12], [B21, B22] ]',
      substitutedFormula: `A: { A11=${vA11}, A12=${vA12}, A21=${vA21}, A22=${vA22} } | B: { B11=${vB11}, B12=${vB12}, B21=${vB21}, B22=${vB22} }`,
      explanation: 'Divide and conquer begins by decomposing Matrix A and Matrix B into four submatrices: top-left (11), top-right (12), bottom-left (21), and bottom-right (22).',
      activeSubmatricesA: ['A11', 'A12', 'A21', 'A22'],
      activeSubmatricesB: ['B11', 'B12', 'B21', 'B22'],
      activeProducts: [],
      activeResultBlocks: [],
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: {},
      resultsCalculated: {},
      animationKey: 'divide_stage'
    },
    {
      id: 2,
      stage: 'TEMP_SUMS',
      stageIndex: 2,
      totalStages: 13,
      title: '03 — The Strassen Breakthrough',
      subtitle: 'Replacing 8 standard multiplications with 7 structured products',
      formulaLatex: 'T(n) = 7 T(n/2) + \\Theta(n^2) \\implies \\mathcal{O}(n^{\\log_2 7}) \\approx \\mathcal{O}(n^{2.8074})',
      formulaReadable: 'T(n) = 7*T(n/2) + O(n^2) => O(n^2.8074) vs Traditional O(n^3)',
      substitutedFormula: 'Preparing linear combinations of A and B quadrants for P1 through P7',
      explanation: 'Volker Strassen discovered in 1969 that by performing 10 additions/subtractions on the submatrices, we can compute all four quadrants of C with only 7 recursive matrix multiplications instead of 8.',
      activeSubmatricesA: ['A11', 'A22'],
      activeSubmatricesB: ['B11', 'B22'],
      activeProducts: [],
      activeResultBlocks: [],
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: {},
      resultsCalculated: {},
      animationKey: 'strassen_intro'
    },
    {
      id: 3,
      stage: 'P1',
      stageIndex: 3,
      totalStages: 13,
      title: '04 — Compute Product P₁',
      subtitle: 'Main diagonal sum product: (A₁₁ + A₂₂) × (B₁₁ + B₂₂)',
      formulaLatex: 'P_1 = (A_{11} + A_{22})(B_{11} + B_{22})',
      formulaReadable: 'P1 = (A11 + A22) * (B11 + B22)',
      substitutedFormula: `P1 = (${vA11} + ${vA22}) × (${vB11} + ${vB22}) = ${formatCompactValue(A11_plus_A22)} × ${formatCompactValue(B11_plus_B22)} = ${vP1}`,
      explanation: 'P₁ captures the joint diagonal interactions between both input matrices. It will be a key contributor to both C₁₁ and C₂₂.',
      activeSubmatricesA: ['A11', 'A22'],
      activeSubmatricesB: ['B11', 'B22'],
      activeProducts: ['P1'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P1',
        matrix: P1
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1 },
      resultsCalculated: {},
      animationKey: 'calc_p1'
    },
    {
      id: 4,
      stage: 'P2',
      stageIndex: 4,
      totalStages: 13,
      title: '05 — Compute Product P₂',
      subtitle: 'Lower row of A with top-left of B: (A₂₁ + A₂₂) × B₁₁',
      formulaLatex: 'P_2 = (A_{21} + A_{22}) B_{11}',
      formulaReadable: 'P2 = (A21 + A22) * B11',
      substitutedFormula: `P2 = (${vA21} + ${vA22}) × ${vB11} = ${formatCompactValue(A21_plus_A22)} × ${vB11} = ${vP2}`,
      explanation: 'P₂ combines the bottom row elements of A (A₂₁ + A₂₂) multiplied by B₁₁. It directly builds C₂₁ and assists C₂₂.',
      activeSubmatricesA: ['A21', 'A22'],
      activeSubmatricesB: ['B11'],
      activeProducts: ['P1', 'P2'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P2',
        matrix: P2
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2 },
      resultsCalculated: {},
      animationKey: 'calc_p2'
    },
    {
      id: 5,
      stage: 'P3',
      stageIndex: 5,
      totalStages: 13,
      title: '06 — Compute Product P₃',
      subtitle: 'Top-left of A with right-column difference of B: A₁₁ × (B₁₂ − B₂₂)',
      formulaLatex: 'P_3 = A_{11} (B_{12} - B_{22})',
      formulaReadable: 'P3 = A11 * (B12 - B22)',
      substitutedFormula: `P3 = ${vA11} × (${vB12} - ${vB22}) = ${vA11} × ${formatCompactValue(B12_minus_B22)} = ${vP3}`,
      explanation: 'P₃ takes A₁₁ and scales it by the difference between B’s right-column blocks (B₁₂ − B₂₂).',
      activeSubmatricesA: ['A11'],
      activeSubmatricesB: ['B12', 'B22'],
      activeProducts: ['P1', 'P2', 'P3'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P3',
        matrix: P3
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3 },
      resultsCalculated: {},
      animationKey: 'calc_p3'
    },
    {
      id: 6,
      stage: 'P4',
      stageIndex: 6,
      totalStages: 13,
      title: '07 — Compute Product P₄',
      subtitle: 'Bottom-right of A with left-column difference of B: A₂₂ × (B₂₁ − B₁₁)',
      formulaLatex: 'P_4 = A_{22} (B_{21} - B_{11})',
      formulaReadable: 'P4 = A22 * (B21 - B11)',
      substitutedFormula: `P4 = ${vA22} × (${vB21} - ${vB11}) = ${vA22} × ${formatCompactValue(B21_minus_B11)} = ${vP4}`,
      explanation: 'P₄ multiplies A₂₂ by the left column differential (B₂₁ − B₁₁). This balances out unwanted terms in C₁₁ and C₂₁.',
      activeSubmatricesA: ['A22'],
      activeSubmatricesB: ['B11', 'B21'],
      activeProducts: ['P1', 'P2', 'P3', 'P4'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P4',
        matrix: P4
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4 },
      resultsCalculated: {},
      animationKey: 'calc_p4'
    },
    {
      id: 7,
      stage: 'P5',
      stageIndex: 7,
      totalStages: 13,
      title: '08 — Compute Product P₅',
      subtitle: 'Top row of A with bottom-right of B: (A₁₁ + A₁₂) × B₂₂',
      formulaLatex: 'P_5 = (A_{11} + A_{12}) B_{22}',
      formulaReadable: 'P5 = (A11 + A12) * B22',
      substitutedFormula: `P5 = (${vA11} + ${vA12}) × ${vB22} = ${formatCompactValue(A11_plus_A12)} × ${vB22} = ${vP5}`,
      explanation: 'P₅ combines the top row of A (A₁₁ + A₁₂) multiplied by B₂₂. It is used in forming C₁₁ and C₁₂.',
      activeSubmatricesA: ['A11', 'A12'],
      activeSubmatricesB: ['B22'],
      activeProducts: ['P1', 'P2', 'P3', 'P4', 'P5'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P5',
        matrix: P5
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5 },
      resultsCalculated: {},
      animationKey: 'calc_p5'
    },
    {
      id: 8,
      stage: 'P6',
      stageIndex: 8,
      totalStages: 13,
      title: '09 — Compute Product P₆',
      subtitle: 'Column-1 difference of A with Row-1 sum of B: (A₂₁ − A₁₁) × (B₁₁ + B₁₂)',
      formulaLatex: 'P_6 = (A_{21} - A_{11})(B_{11} + B_{12})',
      formulaReadable: 'P6 = (A21 - A11) * (B11 + B12)',
      substitutedFormula: `P6 = (${vA21} - ${vA11}) × (${vB11} + ${vB12}) = ${formatCompactValue(A21_minus_A11)} × ${formatCompactValue(B11_plus_B12)} = ${vP6}`,
      explanation: 'P₆ allows exact algebraic cancellation of cross-diagonal products when calculating the bottom-right quadrant C₂₂.',
      activeSubmatricesA: ['A11', 'A21'],
      activeSubmatricesB: ['B11', 'B12'],
      activeProducts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P6',
        matrix: P6
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5, P6 },
      resultsCalculated: {},
      animationKey: 'calc_p6'
    },
    {
      id: 9,
      stage: 'P7',
      stageIndex: 9,
      totalStages: 13,
      title: '10 — Compute Product P₇',
      subtitle: 'Column-2 difference of A with Row-2 sum of B: (A₁₂ − A₂₂) × (B₂₁ + B₂₂)',
      formulaLatex: 'P_7 = (A_{12} - A_{22})(B_{21} + B_{22})',
      formulaReadable: 'P7 = (A12 - A22) * (B21 + B22)',
      substitutedFormula: `P7 = (${vA12} - ${vA22}) × (${vB21} + ${vB22}) = ${formatCompactValue(A12_minus_A22)} × ${formatCompactValue(B21_plus_B22)} = ${vP7}`,
      explanation: 'P₇ completes the 7 products. All 7 multiplications are now finished using only 7 recursive operations instead of 8!',
      activeSubmatricesA: ['A12', 'A22'],
      activeSubmatricesB: ['B21', 'B22'],
      activeProducts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
      activeResultBlocks: [],
      intermediateResult: {
        label: 'P7',
        matrix: P7
      },
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5, P6, P7 },
      resultsCalculated: {},
      animationKey: 'calc_p7'
    },
    {
      id: 10,
      stage: 'COMBINE_C11_C12',
      stageIndex: 10,
      totalStages: 13,
      title: '11 — Combine Products for C₁₁ and C₁₂',
      subtitle: 'C₁₁ = P₁ + P₄ − P₅ + P₇  and  C₁₂ = P₃ + P₅',
      formulaLatex: 'C_{11} = P_1 + P_4 - P_5 + P_7, \\quad C_{12} = P_3 + P_5',
      formulaReadable: 'C11 = P1 + P4 - P5 + P7, C12 = P3 + P5',
      substitutedFormula: `C11 = ${vP1} + ${vP4} - ${vP5} + ${vP7} = ${vC11} | C12 = ${vP3} + ${vP5} = ${vC12}`,
      explanation: 'Notice how algebraic expansion cancels out the unwanted cross-terms, leaving exactly (A₁₁B₁₁ + A₁₂B₂₁) for C₁₁ and (A₁₁B₁₂ + A₁₂B₂₂) for C₁₂!',
      activeSubmatricesA: [],
      activeSubmatricesB: [],
      activeProducts: ['P1', 'P3', 'P4', 'P5', 'P7'],
      activeResultBlocks: ['C11', 'C12'],
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5, P6, P7 },
      resultsCalculated: { C11, C12 },
      animationKey: 'combine_c11_c12'
    },
    {
      id: 11,
      stage: 'COMBINE_C21_C22',
      stageIndex: 11,
      totalStages: 13,
      title: '12 — Combine Products for C₂₁ and C₂₂',
      subtitle: 'C₂₁ = P₂ + P₄  and  C₂₂ = P₁ − P₂ + P₃ + P₆',
      formulaLatex: 'C_{21} = P_2 + P_4, \\quad C_{22} = P_1 - P_2 + P_3 + P_6',
      formulaReadable: 'C21 = P2 + P4, C22 = P1 - P2 + P3 + P6',
      substitutedFormula: `C21 = ${vP2} + ${vP4} = ${vC21} | C22 = ${vP1} - ${vP2} + ${vP3} + ${vP6} = ${vC22}`,
      explanation: 'Combining P₂ and P₄ gives the exact lower-left quadrant C₂₁, while P₁ − P₂ + P₃ + P₆ produces the exact lower-right quadrant C₂₂.',
      activeSubmatricesA: [],
      activeSubmatricesB: [],
      activeProducts: ['P1', 'P2', 'P3', 'P4', 'P6'],
      activeResultBlocks: ['C11', 'C12', 'C21', 'C22'],
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5, P6, P7 },
      resultsCalculated: { C11, C12, C21, C22 },
      animationKey: 'combine_c21_c22'
    },
    {
      id: 12,
      stage: 'FINAL_MATRIX',
      stageIndex: 12,
      totalStages: 13,
      title: '13 — Assemble Final Result Matrix C',
      subtitle: 'Merging C₁₁, C₁₂, C₂₁, C₂₂ into the full product matrix C',
      formulaLatex: 'C = \\begin{bmatrix} C_{11} & C_{12} \\\\ C_{21} & C_{22} \\end{bmatrix}',
      formulaReadable: 'C = [ [C11, C12], [C21, C22] ]',
      substitutedFormula: `C = [ [${vC11}, ${vC12}], [${vC21}, ${vC22}] ]`,
      explanation: 'The four submatrix quadrants assemble together into the completed product matrix C. The entire computation finished using 7 recursive products instead of 8.',
      activeSubmatricesA: [],
      activeSubmatricesB: [],
      activeProducts: [],
      activeResultBlocks: ['C11', 'C12', 'C21', 'C22'],
      currentMatrixC: finalC,
      matrixA: cloneMatrix(A),
      matrixB: cloneMatrix(B),
      productsCalculated: { P1, P2, P3, P4, P5, P6, P7 },
      resultsCalculated: { C11, C12, C21, C22 },
      animationKey: 'final_assembly'
    }
  ];

  return {
    result: finalC,
    steps,
    products: { P1, P2, P3, P4, P5, P6, P7 },
    submatricesA: { A11, A12, A21, A22 },
    submatricesB: { B11, B12, B21, B22 },
    results: { C11, C12, C21, C22 },
    multiplicationCount,
    additionCount,
    executionTimeMs: end - start
  };
}

/**
 * Pure Strassen implementation for recursive sub-blocks
 */
export function computeStrassenPure(A: Matrix, B: Matrix): {
  result: Matrix;
  multiplicationCount: number;
  additionCount: number;
} {
  const n = A.length;
  if (n === 1) {
    return {
      result: [[A[0][0] * B[0][0]]],
      multiplicationCount: 1,
      additionCount: 0
    };
  }

  let multiplicationCount = 0;
  let additionCount = 0;

  const { M11: A11, M12: A12, M21: A21, M22: A22 } = partitionMatrix(A);
  const { M11: B11, M12: B12, M21: B21, M22: B22 } = partitionMatrix(B);

  const add = (X: Matrix, Y: Matrix) => {
    additionCount += X.length * X[0].length;
    return matrixAdd(X, Y);
  };
  const sub = (X: Matrix, Y: Matrix) => {
    additionCount += X.length * X[0].length;
    return matrixSubtract(X, Y);
  };

  const rec = (X: Matrix, Y: Matrix) => {
    const res = computeStrassenPure(X, Y);
    multiplicationCount += res.multiplicationCount;
    additionCount += res.additionCount;
    return res.result;
  };

  const P1 = rec(add(A11, A22), add(B11, B22));
  const P2 = rec(add(A21, A22), B11);
  const P3 = rec(A11, sub(B12, B22));
  const P4 = rec(A22, sub(B21, B11));
  const P5 = rec(add(A11, A12), B22);
  const P6 = rec(sub(A21, A11), add(B11, B12));
  const P7 = rec(sub(A12, A22), add(B21, B22));

  const C11 = add(sub(add(P1, P4), P5), P7);
  const C12 = add(P3, P5);
  const C21 = add(P2, P4);
  const C22 = add(add(sub(P1, P2), P3), P6);

  return {
    result: combineSubmatrices(C11, C12, C21, C22),
    multiplicationCount,
    additionCount
  };
}
