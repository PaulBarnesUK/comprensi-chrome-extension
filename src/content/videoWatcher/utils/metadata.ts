import { VideoMetadata } from '../../../types';
import { getVideoElement, getVideoTitle, getChannelName } from '../selectors';

import { extractVideoId } from './url';

export function getVideoMetadata(): VideoMetadata | null {
  try {
    const videoElement = getVideoElement();
    const videoId = extractVideoId(window.location.href);

    if (!videoElement || !videoId) return null;

    return {
      videoId,
      title: getVideoTitle(),
      channelName: getChannelName(),
      url: window.location.href,
      duration: Math.floor(videoElement.duration),
    };
  } catch (error) {
    console.error('Error extracting video metadata:', error);
    return null;
  }
}
