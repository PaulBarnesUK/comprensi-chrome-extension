import { VideoFullData } from '../../types';

export interface VideoEventHandlers {
  pause: EventListener;
  ended: EventListener;
}

export interface VideoWatcherState {
  // Video metadata
  currentVideo: VideoFullData | null;

  // Timing information
  totalWatchTime: number;
  watchPercentage: number;
  lastReportedTime: number;

  // Tracking state
  watchIntervalId: number | null;
  eventHandlers: VideoEventHandlers | null;
  urlObserver: MutationObserver | null;
}
