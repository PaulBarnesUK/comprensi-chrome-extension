import { WatchData } from '../../../types';
import { ONE_DAY_MS } from '../constants';

export function filterRecentVideosInLanguage(
  videos: WatchData[],
  currentVideoLanguage: string,
  selectedLanguages: string[]
): WatchData[] {
  if (!currentVideoLanguage || !selectedLanguages.includes(currentVideoLanguage)) {
    return [];
  }

  const now = Date.now();

  return videos.filter(
    video =>
      video.language &&
      video.language.primary === currentVideoLanguage &&
      now - video.lastWatched <= ONE_DAY_MS
  );
}
