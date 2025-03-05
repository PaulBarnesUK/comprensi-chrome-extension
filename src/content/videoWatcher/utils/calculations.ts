import { VideoMetadata, WatchData } from '../../../types';

export function calculateWatchPercentage(watchTimeSeconds: number, videoDuration: number): number {
  if (!videoDuration) return 0;
  return Math.min(100, (watchTimeSeconds / videoDuration) * 100);
}

export function createWatchData(videoMetadata: VideoMetadata, watchTimeSeconds: number): WatchData {
  const watchPercentage = calculateWatchPercentage(watchTimeSeconds, videoMetadata.duration);

  return {
    ...videoMetadata,
    watchTimeSeconds: Math.floor(watchTimeSeconds),
    watchPercentage,
    lastWatched: Date.now(),
  };
}
