import { VideoRegistry, FetchedVideoState, isFetchedVideo } from '../types';
import {
  findThumbnailsForVideoId,
  shouldDisplayIndicator,
  injectIndicator
} from './indicatorInjector';
import { getSelectedLanguages } from '../../../utils/messaging';

export async function processVideosForIndicators(videoRegistry: VideoRegistry): Promise<void> {
  try {
    const selectedLanguages = await getSelectedLanguages();
    const eligibleVideos = findEligibleVideos(videoRegistry, selectedLanguages);

    injectIndicatorsForVideos(eligibleVideos);
  } catch (error) {
    console.error('Error processing videos for indicators:', error);
  }
}

/**
 * Finds videos that are eligible for indicator display
 */
function findEligibleVideos(
  videoRegistry: VideoRegistry,
  selectedLanguages: string[]
): FetchedVideoState[] {
  return Object.values(videoRegistry)
    .filter(isFetchedVideo)
    .filter(
      video =>
        shouldDisplayIndicator(video.data) &&
        video.data.language?.primary !== undefined &&
        selectedLanguages.includes(video.data.language.primary)
    );
}

/**
 * Injects difficulty indicators for the provided videos
 */
function injectIndicatorsForVideos(videos: FetchedVideoState[]): void {
  if (!videos.length) return;

  console.log(`Injecting indicators for ${videos.length} videos`);

  videos.forEach(video => {
    const thumbnails = findThumbnailsForVideoId(video.videoId);

    if (thumbnails.length) {
      console.log(`Found ${thumbnails.length} thumbnails for video ${video.videoId}`);

      thumbnails.forEach(thumbnail => {
        injectIndicator(thumbnail, video.data);
      });
    }
  });
}
