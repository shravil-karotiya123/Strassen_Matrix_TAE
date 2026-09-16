import { MatrixBenchmarkRow } from '../types/comparison';

/**
 * Calculates exact arithmetic operations for traditional matrix multiplication (N x N)
 * Multiplications: N³
 * Additions: N² * (N - 1)
 */
export function getTraditionalOperations(n: number): { multiplications: number; additions: number; total: number } {
  const mults = Math.pow(n, 3);
  const adds = Math.pow(n, 2) * (n - 1);
  return {
    multiplications: mults,
    additions: adds,
    total: mults + adds
  };
}

/**
 * Calculates exact arithmetic operations for pure Strassen matrix multiplication (N x N where N is a power of 2)
 * Recurrence for multiplications: M(n) = 7 * M(n/2), M(1) = 1 => M(n) = 7^(log2(n)) = n^(log2 7)
 * Recurrence for additions: A(n) = 7 * A(n/2) + 18 * (n/2)², A(1) = 0 => A(n) = 6 * (7^(log2(n)) - 4^(log2(n))) = 6 * (n^(log2 7) - n²)
 */
export function getStrassenOperations(n: number): { multiplications: number; additions: number; total: number } {
  if (n <= 1) {
    return { multiplications: 1, additions: 0, total: 1 };
  }
  const k = Math.round(Math.log2(n));
  const mults = Math.pow(7, k);
  const adds = 6 * (Math.pow(7, k) - Math.pow(4, k));
  return {
    multiplications: mults,
    additions: Math.max(0, adds),
    total: mults + Math.max(0, adds)
  };
}

/**
 * Generates complexity comparison table rows for N = 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048
 */
export function generateComplexityDataset(): MatrixBenchmarkRow[] {
  const dimensions = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

  return dimensions.map(dim => {
    const trad = getTraditionalOperations(dim);
    const strass = getStrassenOperations(dim);

    const multSavings = ((trad.multiplications - strass.multiplications) / trad.multiplications) * 100;

    let crossoverStatus: 'Traditional Faster' | 'Transitional' | 'Strassen Faster' = 'Traditional Faster';
    if (dim < 64) {
      crossoverStatus = 'Traditional Faster';
    } else if (dim <= 128) {
      crossoverStatus = 'Transitional';
    } else {
      crossoverStatus = 'Strassen Faster';
    }

    return {
      dimension: dim,
      traditionalMultiplications: trad.multiplications,
      traditionalAdditions: trad.additions,
      traditionalTotalOps: trad.total,
      strassenMultiplications: strass.multiplications,
      strassenAdditions: strass.additions,
      strassenTotalOps: strass.total,
      multiplicationSavingsPercent: Math.max(0, Math.round(multSavings * 10) / 10),
      crossoverStatus
    };
  });
}
