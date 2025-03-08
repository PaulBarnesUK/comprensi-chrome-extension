import { VideoRegistry, VideoData } from '../../../types/difficulty';
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

function findEligibleVideos(
  videoRegistry: VideoRegistry,
  selectedLanguages: string[]
): VideoData[] {
  return Object.values(videoRegistry).filter(
    video =>
      video.difficulty &&
      shouldDisplayIndicator(video.difficulty) &&
      selectedLanguages.includes(video.difficulty.language)
  );
}

function injectIndicatorsForVideos(videos: VideoData[]): void {
  if (!videos.length) return;

  console.log(`Injecting indicators for ${videos.length} videos`);

  videos.forEach(video => {
    if (!video.difficulty) return;

    const thumbnails = findThumbnailsForVideoId(video.videoId);

    if (thumbnails.length) {
      console.log(`Found ${thumbnails.length} thumbnails for video ${video.videoId}`);

      thumbnails.forEach(thumbnail => {
        injectIndicator(thumbnail, video.difficulty!);
      });
    }
  });
}
