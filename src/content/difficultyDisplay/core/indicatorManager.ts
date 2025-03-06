import { VideoRegistry, VideoData } from '../../../types/difficulty';
import { 
  findThumbnailsForVideoId, 
  shouldDisplayIndicator, 
  injectIndicator 
} from './indicatorInjector';

export function processVideosForIndicators(videoRegistry: VideoRegistry): void {
  const eligibleVideos = findEligibleVideos(videoRegistry);
  injectIndicatorsForVideos(eligibleVideos);
}

function findEligibleVideos(videoRegistry: VideoRegistry): VideoData[] {
  return Object.values(videoRegistry).filter(video => 
    video.difficulty && shouldDisplayIndicator(video.difficulty)
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