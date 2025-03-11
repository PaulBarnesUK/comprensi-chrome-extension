import { VideoBaseData, VideoFullData } from '../../types';
import { ApiResponse } from '../../types/api';

/**
 * Mock data for different languages
 */
const MOCK_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ru'];

/**
 * Generates a random difficulty score between 1-100
 */
function generateRandomDifficulty() {
  return {
    score: Math.round(1 + Math.random() * 99),
    sigma: 0.5 + Math.random() * 1.5
  };
}

/**
 * Mock implementation of the video metadata API
 * @param videoId The YouTube video ID
 * @returns Promise resolving to mocked video metadata
 */
export async function mockFetchVideoData(videoId: string): Promise<ApiResponse<VideoFullData>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

  // Generate random language
  const language = MOCK_LANGUAGES[Math.floor(Math.random() * MOCK_LANGUAGES.length)];

  // Create mock metadata
  const metadata: VideoFullData = {
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

export async function mockFetchVideosData(
  videoIds: string[]
): Promise<ApiResponse<VideoBaseData[]>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

  const generateRandomLanguage = () =>
    MOCK_LANGUAGES[Math.floor(Math.random() * MOCK_LANGUAGES.length)];

  return {
    success: true,
    data: videoIds.map(id => ({
      videoId: id,
      language: generateRandomLanguage(),
      difficulty: generateRandomDifficulty()
    }))
  };
}
