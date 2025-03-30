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
  const handlePlay = createHandleVideoPlay(state);

  videoElement.addEventListener('pause', handlePause);
  videoElement.addEventListener('ended', handleEnded);
  videoElement.addEventListener('play', handlePlay);

  state.eventHandlers = {
    pause: handlePause,
    ended: handleEnded,
    play: handlePlay
  };
}

export function detachVideoEventListeners(
  videoElement: HTMLVideoElement,
  state: VideoWatcherState
): void {
  if (!state.eventHandlers) return;

  videoElement.removeEventListener('pause', state.eventHandlers.pause);
  videoElement.removeEventListener('ended', state.eventHandlers.ended);
  videoElement.removeEventListener('play', state.eventHandlers.play);

  state.eventHandlers = null;
}

export function createHandleVideoPause(state: VideoWatcherState): EventListener {
  return async () => {
    const videoElement = getVideoElement();
    if (!videoElement) return;

    updateWatchTime(state, videoElement);

    const watchData = await sendWatchProgressUpdate(state);

    if (watchData) {
      state.comparisonTimeout = setTimeout(() => {
        checkForComparisonOpportunity(watchData);
      }, 1000);
    }
  };
}

export function createHandleVideoPlay(state: VideoWatcherState): EventListener {
  return () => {
    if (state.comparisonTimeout) {
      clearTimeout(state.comparisonTimeout);
      state.comparisonTimeout = null;
    }
  };
}

export function createHandleVideoEnded(state: VideoWatcherState): EventListener {
  return () => {
    endVideoTracking(state);
  };
}
