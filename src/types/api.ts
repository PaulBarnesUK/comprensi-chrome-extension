import { DifficultyData } from './difficulty';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface DifficultyResponse {
  videos: {
    [videoId: string]: DifficultyData | null;
  };
} 