import { getWatchedVideo } from '../../utils/storage';
import { handleVideoEnd } from '../videoComparison';

import { attachVideoEventListeners, detachVideoEventListeners } from './events';
import { setupWatchTimeTracking, sendWatchProgressUpdate } from './reporting';
import { getVideoElement } from './selectors';
import { VideoWatcherState } from './types';
import { getVideoMetadata } from './utils/metadata';
import { isVideoPage, observeUrlChanges } from './utils/url';

function createWatcherState(): VideoWatcherState {
  return {
    currentVideo: null,
    totalWatchTime: 0,
    watchPercentage: 0,
    lastReportedTime: 0,
    watchIntervalId: null,
    eventHandlers: null,
    urlObserver: null,
  };
}

export async function initVideoWatchDetector(): Promise<void> {
  const state = createWatcherState();

  if (isVideoPage()) {
    await beginVideoTracking(state);
  }

  setupUrlChangeDetection(state);
}

function setupUrlChangeDetection(state: VideoWatcherState): void {
  const onUrlChange = async () => {
    endVideoTracking(state);

    if (isVideoPage()) {
      setTimeout(async () => await beginVideoTracking(state), 1000); // Small delay to ensure the page has loaded
    }
  };

  state.urlObserver = observeUrlChanges(onUrlChange);
}

export async function beginVideoTracking(state: VideoWatcherState): Promise<void> {
  if (state.watchIntervalId !== null) return;

  const videoElement = getVideoElement();
  if (!videoElement) return;

  state.currentVideo = getVideoMetadata();
  if (!state.currentVideo) return;

  await initializeWatchState(state);

  setupWatchTimeTracking(state);
  attachVideoEventListeners(videoElement, state);

  console.log('Tracking video:', state.currentVideo.videoId);
}

async function initializeWatchState(state: VideoWatcherState): Promise<void> {
  const previousWatchData = await getWatchedVideo(state.currentVideo!.videoId);

  if (previousWatchData) {
    state.totalWatchTime = previousWatchData.watchTimeSeconds || 0;
    state.watchPercentage = previousWatchData.watchPercentage || 0;
    state.lastReportedTime = state.totalWatchTime;
  } else {
    state.totalWatchTime = 0;
    state.lastReportedTime = 0;
    state.watchPercentage = 0;
  }
}

export async function endVideoTracking(state: VideoWatcherState): Promise<void> {
    console.log('endVideoTracking', state);
//   if (state.watchIntervalId === null) return;

//   window.clearInterval(state.watchIntervalId);
//   state.watchIntervalId = null;

  const videoElement = getVideoElement();
  if (videoElement && state.eventHandlers) {
    detachVideoEventListeners(videoElement, state);
  }

  if (state.currentVideo) {
    const watchData = sendWatchProgressUpdate(state);

    console.log('watchData', watchData);
    
    if (watchData && watchData.watched) {
      // Add a small delay to ensure the video has fully ended
      setTimeout(() => {
        handleVideoEnd(watchData);
      }, 500);
    }
  }

  console.log('Stopped tracking video');
  state.currentVideo = null;
}
