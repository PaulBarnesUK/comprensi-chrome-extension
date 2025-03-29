/**
 * Scoring utilities for selecting optimal video comparisons based on
 * confidence improvement, difficulty similarity, and recency.
 */

import { WatchData } from '../../../types';
import { COMPARISON_WEIGHTS, CONFIDENCE_THRESHOLD } from '../constants';

/**
 * Calculates weighted comparison score from confidence, difficulty and recency.
 * Higher scores indicate better comparison candidates.
 */
export function calculateComparisonScore(
  currentVideo: WatchData,
  candidateVideo: WatchData,
  recencyIndex: number
): number {
  const confidenceScore = calculateConfidenceScore(currentVideo, candidateVideo);
  const difficultyScore = calculateDifficultyScore(currentVideo, candidateVideo);
  const recencyScore = calculateRecencyScore(recencyIndex);

  return (
    confidenceScore * COMPARISON_WEIGHTS.CONFIDENCE +
    difficultyScore * COMPARISON_WEIGHTS.DIFFICULTY +
    recencyScore * COMPARISON_WEIGHTS.RECENCY
  );
}

/**
 * Sums confidence gaps from threshold (0.85). Higher values indicate
 * greater potential for confidence improvement.
 * Range: 0-1.7 (0 = both videos exceed threshold)
 */
export function calculateConfidenceScore(
  currentVideo: WatchData,
  candidateVideo: WatchData
): number {
  const currentVideoGap = Math.max(0, CONFIDENCE_THRESHOLD - currentVideo.difficulty.confidence);
  const candidateVideoGap = Math.max(
    0,
    CONFIDENCE_THRESHOLD - candidateVideo.difficulty.confidence
  );

  return currentVideoGap + candidateVideoGap;
}

/**
 * Measures difficulty similarity: 1/(abs(diff)+1)
 * Range: 0-1 (1 = identical difficulty, approaching 0 = very different)
 */
export function calculateDifficultyScore(
  currentVideo: WatchData,
  candidateVideo: WatchData
): number {
  return 1 / (Math.abs(currentVideo.difficulty.score - candidateVideo.difficulty.score) + 1);
}

/**
 * Converts position to recency score: 1/(index+1)
 * Range: 0-1 (1 = most recent, 0.5 = second most recent)
 */
export function calculateRecencyScore(recencyIndex: number): number {
  return 1 / (recencyIndex + 1);
}
