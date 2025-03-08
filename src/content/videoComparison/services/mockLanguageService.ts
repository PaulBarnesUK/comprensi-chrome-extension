import { ApiResponse } from '../../../types/api';
import { DifficultyData } from '../../../types/difficulty';
import { VideoLanguageResponse } from './languageService';

// Languages for mock data
const LANGUAGES = ['fr', 'es', 'de', 'it', 'pt', 'en', 'hi', 'ko', 'ja', 'zh'];

function generateRandomScore(): number {
  return Math.floor(Math.random() * 100) + 1;
}

function generateRandomSigma(): number {
  return Math.floor(Math.random() * 20) + 1;
}

function generateRandomLanguage(): string {
  const index = Math.floor(Math.random() * LANGUAGES.length);
  return LANGUAGES[index];
}

function generateMockDifficultyData(): DifficultyData {
  return {
    score: generateRandomScore(),
    sigma: generateRandomSigma(),
    language: generateRandomLanguage()
  };
}

export async function mockFetchVideo(videoId: string): Promise<ApiResponse<VideoLanguageResponse>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    success: true,
    data: {
      videoId,
      difficulty: generateMockDifficultyData()
    }
  };
}
