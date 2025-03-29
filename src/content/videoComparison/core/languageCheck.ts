import { WatchData } from '../../../types';
import { getSelectedLanguages } from '../../../utils/storage';
import { filterRecentVideosInLanguage } from '../utils/filterUtils';
import { calculateComparisonScore } from '../utils/scoringUtils';

/**
 * Finds optimal video for comparison with currently watched video.
 * Uses scoring based on confidence needs, difficulty similarity, and recency.
 */
export async function findEligibleComparisonVideo(
  recentVideos: WatchData[],
  currentVideoId: string
): Promise<WatchData | null> {
  if (recentVideos.length < 2) {
    return null;
  }

  if (recentVideos[0].id !== currentVideoId) {
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

  return findOptimalComparisonVideo(currentVideo, eligibleVideos);
}

/**
 * Selects video with highest weighted score across confidence (50%),
 * difficulty similarity (30%), and recency (20%).
 */
function findOptimalComparisonVideo(
  currentVideo: WatchData,
  eligibleVideos: WatchData[]
): WatchData {
  let bestVideo = eligibleVideos[0];
  let bestScore = -Infinity;

  for (let i = 0; i < eligibleVideos.length; i++) {
    const candidateVideo = eligibleVideos[i];
    const score = calculateComparisonScore(currentVideo, candidateVideo, i);

    if (score > bestScore) {
      bestScore = score;
      bestVideo = candidateVideo;
    }
  }

  return bestVideo;
}
