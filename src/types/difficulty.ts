/**
 * Types for difficulty rating functionality
 */

/**
 * Difficulty data returned from the API
 */
export interface DifficultyData {
  score: number;
  sigma: number; // Confidence/uncertainty
  language: string; // Language of the video content
}

/**
 * Data structure for tracking videos
 */
export interface VideoData {
  videoId: string;
  difficulty?: DifficultyData;
}

/**
 * Registry type for storing video data
 */
export type VideoRegistry = Record<string, VideoData>; 