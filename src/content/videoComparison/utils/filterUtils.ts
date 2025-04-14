import { WatchData } from '../../../types';

export function filterVideosInLanguage(
  videos: WatchData[],
  currentVideoLanguage: string,
  selectedLanguages: string[]
): WatchData[] {
  if (!currentVideoLanguage || !selectedLanguages.includes(currentVideoLanguage)) {
    return [];
  }

  return videos.filter(video => video.language && video.language.primary === currentVideoLanguage);
}
