import { VideoFullData, WatchData } from '../../../types';

export function calculateWatchPercentage(watchTimeSeconds: number, videoDuration: number): number {
  if (!videoDuration) return 0;
  const validWatchTime = Math.max(0, watchTimeSeconds);
  return Math.min(100, (validWatchTime / videoDuration) * 100);
}

export function createWatchData(videoData: VideoFullData, watchTimeSeconds: number): WatchData {
  const validWatchTime = Math.max(0, watchTimeSeconds);
  const watchPercentage = calculateWatchPercentage(validWatchTime, videoData.duration);

  return {
    ...videoData,
    watchTimeSeconds: Math.floor(validWatchTime),
    watchPercentage,
    lastWatched: Date.now(),
    watched: false
  };
}
