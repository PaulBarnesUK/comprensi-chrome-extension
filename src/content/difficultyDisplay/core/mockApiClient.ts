import { ApiResponse, DifficultyResponse } from '../../../types/api';
import { DifficultyData } from '../../../types/difficulty';

// Languages for mock data
const LANGUAGES = ['fr', 'es', 'de', 'it', 'pt', 'en', 'hi', 'ko', 'ja', 'zh'];

// Generate a random difficulty score between 1 and 100
function generateRandomScore(): number {
  return Math.floor(Math.random() * 100) + 1;
}

// Generate a random sigma value between 1 and 20
function generateRandomSigma(): number {
  return Math.floor(Math.random() * 20) + 1;
}

// Generate a random language from the available options
function generateRandomLanguage(): string {
  const index = Math.floor(Math.random() * LANGUAGES.length);
  return LANGUAGES[index];
}

// Simulate some videos having no data (returning null)
function shouldHaveData(): boolean {
  return Math.random() > 0.2; // 80% chance of having data
}

// Generate mock difficulty data for a video
function generateMockDifficultyData(): DifficultyData | null {
  if (!shouldHaveData()) {
    return null;
  }
  
  return {
    score: generateRandomScore(),
    sigma: generateRandomSigma(),
    language: generateRandomLanguage()
  };
}

export async function mockFetchDifficultyData(videoIds: string[]): Promise<ApiResponse<DifficultyResponse>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const videos: Record<string, DifficultyData | null> = {};
  
  videoIds.forEach(videoId => {
    videos[videoId] = generateMockDifficultyData();
  });
  
  return {
    success: true,
    data: { videos }
  };
} 