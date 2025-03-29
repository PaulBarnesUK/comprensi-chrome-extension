import { endVideoTracking } from './detector';
import { updateWatchTime, sendWatchProgressUpdate } from './reporting';
import { getVideoElement } from './selectors';
import { VideoWatcherState } from './types';
import { checkForComparisonOpportunity } from '../videoComparison/core/comparison';

export function attachVideoEventListeners(
  videoElement: HTMLVideoElement,
  state: VideoWatcherState
): void {
  const handlePause = createHandleVideoPause(state);
  const handleEnded = createHandleVideoEnded(state);

  videoElement.addEventListener('pause', handlePause);
  videoElement.addEventListener('ended', handleEnded);

  state.eventHandlers = {
    pause: handlePause,
    ended: handleEnded
  };
}

export function detachVideoEventListeners(
  videoElement: HTMLVideoElement,
  state: VideoWatcherState
): void {
  if (!state.eventHandlers) return;

  videoElement.removeEventListener('pause', state.eventHandlers.pause);
  videoElement.removeEventListener('ended', state.eventHandlers.ended);

  state.eventHandlers = null;
}

export function createHandleVideoPause(state: VideoWatcherState): EventListener {
  return async () => {
    const videoElement = getVideoElement();
    if (!videoElement) return;

    updateWatchTime(state, videoElement);

    const watchData = await sendWatchProgressUpdate(state);

    if (watchData) {
      // make this timeout cancel on video play
      setTimeout(() => {
        checkForComparisonOpportunity(watchData);
      }, 500);
    }
  };
}

export function createHandleVideoEnded(state: VideoWatcherState): EventListener {
  return () => {
    endVideoTracking(state);
  };
}
