import { VideoMetadata } from '../../types';

export interface VideoEventHandlers {
    pause: EventListener;
    ended: EventListener;
}

export interface VideoWatcherState {
    // Video metadata
    currentVideo: VideoMetadata | null;
    
    // Timing information
    totalWatchTime: number;
    watchPercentage: number;
    lastReportedTime: number;
    
    // Tracking state
    watchIntervalId: number | null;
    eventHandlers: VideoEventHandlers | null;
    urlObserver: MutationObserver | null;
} 