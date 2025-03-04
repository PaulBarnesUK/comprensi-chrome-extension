import { VideoWatcherState } from './types';
import { getVideoElement } from './selectors';
import { createWatchData } from './utils/calculations';
import { calculateWatchPercentage } from './utils/calculations';

export function setupWatchTimeTracking(state: VideoWatcherState): void {
    if (state.watchIntervalId !== null) return;

    state.watchIntervalId = window.setInterval(() => {
        const videoElement = getVideoElement();
        if (!videoElement || videoElement.paused) return;

        updateWatchTime(state, videoElement);

        if (shouldReportProgress(state)) {
            sendWatchProgressUpdate(state);
            state.lastReportedTime = videoElement.currentTime;
        }
    }, 2500);
}

export function updateWatchTime(state: VideoWatcherState, videoElement: HTMLVideoElement): void {

    state.totalWatchTime += videoElement.currentTime - state.lastReportedTime;

}

export function shouldReportProgress(state: VideoWatcherState): boolean {
    if (!state.currentVideo) return false;

    const currentWatchPercentage = calculateWatchPercentage(
        state.totalWatchTime,
        state.currentVideo.duration
    );

    return currentWatchPercentage > state.watchPercentage;
}

export function sendWatchProgressUpdate(state: VideoWatcherState): void {
    if (!state.currentVideo) return;

    const watchData = createWatchData(
        state.currentVideo,
        state.totalWatchTime
    );

    state.watchPercentage = watchData.watchPercentage;

    chrome.runtime.sendMessage({
        type: 'VIDEO_WATCHED',
        data: watchData
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error sending watch progress:', chrome.runtime.lastError);
        } else {
            console.log('Reported watch progress:', watchData);
        }
    });
}