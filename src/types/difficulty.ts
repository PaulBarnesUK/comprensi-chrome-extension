import { VideoBaseData } from './index';

/**
 * Initial state of a video in the registry
 */
export interface InitialVideoState {
  videoId: string;
  state: 'initial';
}

/**
 * Fetched state of a video in the registry
 */
export interface FetchedVideoState {
  videoId: string;
  state: 'fetched';
  data: VideoBaseData;
}

/**
 * Video data can be in either initial or fetched state
 */
export type RegistryVideo = InitialVideoState | FetchedVideoState;

/**
 * Registry type for storing video data
 */
export type VideoRegistry = Record<string, RegistryVideo>;

/**
 * Creates initial state for a video
 */
export function createInitialState(videoId: string): InitialVideoState {
  return { videoId, state: 'initial' };
}

/**
 * Creates fetched state for a video
 */
export function createFetchedState(videoId: string, data: VideoBaseData): FetchedVideoState {
  return {
    videoId,
    state: 'fetched',
    data
  };
}

/**
 * Type guard to check if video is in fetched state
 */
export function isFetchedVideo(video: RegistryVideo): video is FetchedVideoState {
  return video.state === 'fetched';
}
