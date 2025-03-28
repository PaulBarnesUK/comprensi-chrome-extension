import { WatchData } from '../../../types';
import { getSelectedLanguages } from '../../../utils/storage';
import { filterRecentVideosInLanguage } from '../utils/filterUtils';

export async function findEligibleComparisonVideo(
  recentVideos: WatchData[],
  currentVideoId: string
): Promise<WatchData | null> {
  if (recentVideos.length < 2) {
    return null;
  }

  const currentVideoIndex = recentVideos.findIndex(video => video.id === currentVideoId);

  if (currentVideoIndex === -1 || currentVideoIndex > 0) {
    return null;
  }

  const currentVideo = recentVideos[0];

  if (!currentVideo.language) {
    console.log('Current video has no language data, skipping comparison');
    return null;
  }

  const selectedLanguages = await getSelectedLanguages();

  const eligibleVideos = filterRecentVideosInLanguage(
    recentVideos.slice(1), // Exclude current video
    currentVideo.language,
    selectedLanguages
  );

  if (eligibleVideos.length === 0) {
    console.log('No eligible videos for comparison in the same language');
    return null;
  }

  return eligibleVideos[0];
}
