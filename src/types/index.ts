export interface DifficultyData {
  score: number;
  confidence: number;
}

export interface VideoBaseData {
  id: string;
  language: string;
  difficulty: DifficultyData;
}

export interface VideoFullData extends VideoBaseData {
  title: string;
  channelName: string;
  duration: number;
}

export interface WatchData extends VideoFullData {
  watchTimeSeconds: number;
  watchPercentage: number;
  lastWatched: number;
  watched: boolean;
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
  | 'CLEAR_WATCH_HISTORY'
  | 'GET_SELECTED_LANGUAGES'
  | 'SAVE_SELECTED_LANGUAGES'
  | 'SELECT_ALL_LANGUAGES'
  | 'DESELECT_ALL_LANGUAGES';

export interface Message {
  type: MessageType;
}

export interface VideoWatchedMessage extends Message {
  type: 'VIDEO_WATCHED';
  data: WatchData;
}

export interface GetSelectedLanguagesMessage extends Message {
  type: 'GET_SELECTED_LANGUAGES';
}

export interface SaveSelectedLanguagesMessage extends Message {
  type: 'SAVE_SELECTED_LANGUAGES';
  data: {
    languages: string[];
  };
}

export interface SelectAllLanguagesMessage extends Message {
  type: 'SELECT_ALL_LANGUAGES';
}

export interface DeselectAllLanguagesMessage extends Message {
  type: 'DESELECT_ALL_LANGUAGES';
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

export function isGetSelectedLanguagesMessage(
  message: Message
): message is GetSelectedLanguagesMessage {
  return message.type === 'GET_SELECTED_LANGUAGES';
}

export function isSaveSelectedLanguagesMessage(
  message: Message
): message is SaveSelectedLanguagesMessage {
  return message.type === 'SAVE_SELECTED_LANGUAGES';
}

export function isSelectAllLanguagesMessage(
  message: Message
): message is SelectAllLanguagesMessage {
  return message.type === 'SELECT_ALL_LANGUAGES';
}

export function isDeselectAllLanguagesMessage(
  message: Message
): message is DeselectAllLanguagesMessage {
  return message.type === 'DESELECT_ALL_LANGUAGES';
}
