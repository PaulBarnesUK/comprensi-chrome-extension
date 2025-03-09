import { VideoMetadata } from '../../types';
import { ApiResponse } from '../../types/api';

/**
 * Mock data for different languages
 */
const MOCK_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ru'];

/**
 * Generates a random difficulty score between 1-10
 */
function generateRandomDifficulty() {
  return {
    score: 1 + Math.random() * 9,
    sigma: 0.5 + Math.random() * 1.5
  };
}

/**
 * Mock implementation of the video metadata API
 * @param videoId The YouTube video ID
 * @returns Promise resolving to mocked video metadata
 */
export async function mockFetchVideoMetadata(videoId: string): Promise<ApiResponse<VideoMetadata>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

  // Generate random language
  const language = MOCK_LANGUAGES[Math.floor(Math.random() * MOCK_LANGUAGES.length)];

  // Create mock metadata
  const metadata: VideoMetadata = {
    videoId,
    title: `Mock Video Title for ${videoId}`,
    channelName: 'Mock Channel',
    duration: 300 + Math.floor(Math.random() * 900), // 5-20 minutes
    language,
    difficulty: generateRandomDifficulty()
  };

  return {
    success: true,
    data: metadata
  };
}
