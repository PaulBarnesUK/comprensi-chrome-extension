import { getWatchedVideo } from '../../utils/storage';
import { handleVideoEnd } from '../videoComparison';

import { attachVideoEventListeners, detachVideoEventListeners } from './events';
import { setupWatchTimeTracking, sendWatchProgressUpdate } from './reporting';
import { getVideoElement } from './selectors';
import { VideoWatcherState } from './types';
import { getVideoMetadata } from './utils/metadata';
import { isVideoPage, observeUrlChanges } from './utils/url';
import { waitForVideoElement } from './utils/domObserver';
import { retryOperation } from './utils/retry';

function createWatcherState(): VideoWatcherState {
  return {
    currentVideo: null,
    totalWatchTime: 0,
    watchPercentage: 0,
    lastReportedTime: 0,
    watchIntervalId: null,
    eventHandlers: null,
    urlObserver: null
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
      attemptVideoTracking(state);
    }
  };

  state.urlObserver = observeUrlChanges(onUrlChange);
}

function attemptVideoTracking(state: VideoWatcherState): void {
  if (state.watchIntervalId !== null) return;

  // First attempt immediately
  beginVideoTracking(state);

  // If first attempt fails, try again after a delay
  setTimeout(() => {
    if (state.watchIntervalId === null && isVideoPage()) {
      beginVideoTracking(state);
    }
  }, 2000);
}

export async function beginVideoTracking(state: VideoWatcherState): Promise<void> {
  if (state.watchIntervalId !== null) return;

  const videoElement = getVideoElement();

  if (videoElement) {
    await setupVideoTracking(state, videoElement);
  } else {
    waitForVideoElement(async video => {
      await setupVideoTracking(state, video);
    });
  }
}

async function setupVideoTracking(
  state: VideoWatcherState,
  videoElement: HTMLVideoElement
): Promise<void> {
  const getMetadata = () => Promise.resolve(getVideoMetadata(videoElement));

  const metadata = await retryOperation(getMetadata);
  if (!metadata) return;

  state.currentVideo = metadata;
  await initializeWatchState(state, videoElement);

  setupWatchTimeTracking(state);
  attachVideoEventListeners(videoElement, state);
}

async function initializeWatchState(
  state: VideoWatcherState,
  videoElement: HTMLVideoElement
): Promise<void> {
  const previousWatchData = await getWatchedVideo(state.currentVideo!.videoId);

  if (previousWatchData) {
    state.totalWatchTime = previousWatchData.watchTimeSeconds || 0;
    state.watchPercentage = previousWatchData.watchPercentage || 0;
  } else {
    state.totalWatchTime = 0;
    state.watchPercentage = 0;
  }

  state.lastReportedTime = videoElement.currentTime;
}

export async function endVideoTracking(state: VideoWatcherState): Promise<void> {
  if (state.watchIntervalId === null) return;

  window.clearInterval(state.watchIntervalId);
  state.watchIntervalId = null;

  const videoElement = getVideoElement();
  if (videoElement && state.eventHandlers) {
    detachVideoEventListeners(videoElement, state);
  }

  if (state.currentVideo) {
    try {
      const watchData = await sendWatchProgressUpdate(state);

      if (watchData && watchData.watched) {
        setTimeout(() => {
          handleVideoEnd(watchData);
        }, 500);
      }
    } catch (error) {
      console.error('Error sending final watch progress update:', error);
    }
  }

  state.currentVideo = null;
}
