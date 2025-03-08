import { VideoMetadata } from '../../../types';
import { getVideoElement, getVideoTitle, getChannelName } from '../selectors';

import { extractVideoId } from './url';

export function getVideoMetadata(videoElement?: HTMLVideoElement): VideoMetadata | null {
  try {
    const video = videoElement || getVideoElement();
    const videoId = extractVideoId(window.location.href);

    if (!video || !videoId) return null;

    const duration = isFiniteDuration(video.duration) ? Math.floor(video.duration) : 0;

    return {
      videoId,
      title: getVideoTitle(),
      channelName: getChannelName(),
      url: window.location.href,
      duration
    };
  } catch (error) {
    console.error('Error extracting video metadata:', error);
    return null;
  }
}

function isFiniteDuration(duration: number): boolean {
  return !isNaN(duration) && isFinite(duration) && duration > 0;
}
