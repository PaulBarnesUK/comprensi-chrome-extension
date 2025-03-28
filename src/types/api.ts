export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export enum ComparisonResult {
  FIRST_HARDER = 'first_harder',
  SECOND_HARDER = 'second_harder',
  SIMILAR = 'similar'
}

export interface CompareRequest {
  firstVideoId: string;
  secondVideoId: string;
  language: string;
  result: ComparisonResult;
  clientFingerprint?: string;
}

export interface CompareResponse {
  firstVideo: {
    videoId: string;
    difficulty: {
      score: number;
    };
  };
  secondVideo: {
    videoId: string;
    difficulty: {
      score: number;
    };
  };
}
