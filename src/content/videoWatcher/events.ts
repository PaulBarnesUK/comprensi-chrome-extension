import { VideoWatcherState } from './types';
import { updateWatchTime, sendWatchProgressUpdate } from './reporting';
import { getVideoElement } from './selectors';
import { endVideoTracking } from './detector';

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
    return () => {
        const videoElement = getVideoElement();
        if (!videoElement || videoElement.paused) return;

        updateWatchTime(state, videoElement);
        sendWatchProgressUpdate(state);
    };
}

export function createHandleVideoEnded(state: VideoWatcherState): EventListener {
    return () => {
        endVideoTracking(state);
    };
} 