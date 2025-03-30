import { VideoFullData, WatchData } from '../../../types';
import { getWatchedVideo } from '../../../utils/storage';

export function calculateWatchPercentage(watchTimeSeconds: number, videoDuration: number): number {
  if (!videoDuration) return 0;
  const validWatchTime = Math.max(0, watchTimeSeconds);
  return Math.min(100, (validWatchTime / videoDuration) * 100);
}

export async function createWatchData(
  videoData: VideoFullData,
  watchTimeSeconds: number
): Promise<WatchData> {
  const validWatchTime = Math.max(0, watchTimeSeconds);
  const watchPercentage = calculateWatchPercentage(validWatchTime, videoData.duration);
  const existingWatchData = await getWatchedVideo(videoData.id);

  return {
    ...existingWatchData,
    ...videoData,
    watchTimeSeconds: Math.floor(validWatchTime),
    watchPercentage,
    lastWatched: Date.now(),
    watched: false
  };
}
