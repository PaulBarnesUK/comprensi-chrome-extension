export interface VideoMetadata {
  videoId: string;
  title: string;
  channelName: string;
  url: string;
  duration: number;
}

export interface WatchData extends VideoMetadata {
  watchTimeSeconds: number;
  watchPercentage: number;
  lastWatched: number;
}

export interface ExtensionSettings {
  minimumWatchPercentage: number;
  minimumWatchTimeSeconds: number;
  maximumWatchTimeSeconds: number;
}

export type MessageType = 
  | 'CONTENT_SCRIPT_LOADED'
  | 'VIDEO_WATCHED'
  | 'GET_WATCH_HISTORY'
  | 'CLEAR_WATCH_HISTORY';

export interface Message {
  type: MessageType;
}

export interface VideoWatchedMessage extends Message {
  type: 'VIDEO_WATCHED';
  data: WatchData;
}

export interface StorageSchema {
  watchedVideos: Record<string, WatchData>;
  settings: {
    settings: ExtensionSettings;
  };
}

export function isVideoWatchedMessage(message: Message): message is VideoWatchedMessage {
  return message.type === 'VIDEO_WATCHED';
}