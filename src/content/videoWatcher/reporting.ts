import { WatchData } from '../../types';
import { getVideoElement } from './selectors';
import { VideoWatcherState } from './types';
import { createWatchData, calculateWatchPercentage } from './utils/calculations';

const MAX_REASONABLE_TIME_DIFF = 5;

export function setupWatchTimeTracking(state: VideoWatcherState): void {
  if (state.watchIntervalId !== null) return;

  state.watchIntervalId = window.setInterval(() => {
    const videoElement = getVideoElement();
    if (!videoElement || videoElement.paused) return;

    const isAdPlaying = videoElement.closest('.ad-showing') !== null;
    if (isAdPlaying) return;

    updateWatchTime(state, videoElement);

    if (shouldReportProgress(state)) {
      sendWatchProgressUpdate(state)
        .then(() => {
          state.lastReportedTime = videoElement.currentTime;
        })
        .catch(error => {
          console.error('Error sending watch progress:', error);
        });
    }
  }, 2500);
}

export function updateWatchTime(state: VideoWatcherState, videoElement: HTMLVideoElement): void {
  const currentTime = videoElement.currentTime;
  let timeDiff = currentTime - state.lastReportedTime;

  if (timeDiff < 0) {
    state.lastReportedTime = currentTime;
    return;
  }

  if (timeDiff > MAX_REASONABLE_TIME_DIFF) {
    console.log('Unusually large time difference detected:', {
      currentTime,
      lastReportedTime: state.lastReportedTime,
      timeDiff
    });
    timeDiff = Math.min(timeDiff, MAX_REASONABLE_TIME_DIFF);
  }

  state.totalWatchTime += timeDiff;
  state.lastReportedTime = currentTime;

  console.log('Updated watch time:', {
    timeDiff,
    totalWatchTime: state.totalWatchTime,
    lastReportedTime: state.lastReportedTime
  });
}

export function shouldReportProgress(state: VideoWatcherState): boolean {
  console.log('shouldReportProgress', state);
  if (!state.currentVideo) return false;

  const currentWatchPercentage = calculateWatchPercentage(
    state.totalWatchTime,
    state.currentVideo.duration
  );

  return currentWatchPercentage > state.watchPercentage;
}

export function sendWatchProgressUpdate(state: VideoWatcherState): Promise<WatchData | null> {
  if (!state.currentVideo) return Promise.resolve(null);

  const watchData = createWatchData(state.currentVideo, state.totalWatchTime);

  state.watchPercentage = watchData.watchPercentage;

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: 'VIDEO_WATCHED',
        data: watchData
      },
      response => {
        if (chrome.runtime.lastError) {
          console.error('Error sending watch progress:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
          return;
        }

        if (!response || !response.success) {
          console.error('Error response from background script:', response);
          reject(new Error('Failed to save watch data'));
          return;
        }

        const updatedWatchData = response.watchData as WatchData;
        console.log('Reported watch progress:', updatedWatchData);

        resolve(updatedWatchData);
      }
    );
  });
}
