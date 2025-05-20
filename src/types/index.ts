export interface DifficultyData {
  score: number;
  confidence: number;
}

export interface LanguageData {
  primary: string;
  full: string;
}

export interface VideoBaseData {
  id: string;
  language: LanguageData | null;
  difficulty: DifficultyData;
}

export interface VideoFullData extends VideoBaseData {
  title: string;
  channelName: string;
  duration: number;
  bypassSigmaCheck: boolean;
}

export interface WatchData extends VideoFullData {
  watchTimeSeconds: number;
  watchPercentage: number;
  lastWatched: number;
  watched: boolean;
  comparedWith?: string[];
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
  | 'DESELECT_ALL_LANGUAGES'
  | 'GET_LANGUAGE_WATCH_TIMES'
  | 'UPDATE_VIDEO_LANGUAGE';

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

export interface LanguageWatchStats {
  dailyWatchTimeSeconds: number;
  weeklyWatchTimeSeconds: number;
  totalWatchTimeSeconds: number;
}

export interface LanguageStats {
  [languageCode: string]: LanguageWatchStats;
}

export interface StorageSchema {
  watchedVideos: Record<string, WatchData>;
  settings: {
    settings: ExtensionSettings;
  };
  languageStats: LanguageStats;
}

export interface GetLanguageWatchTimesMessage extends Message {
  type: 'GET_LANGUAGE_WATCH_TIMES';
}

export interface UpdateVideoLanguageMessage extends Message {
  type: 'UPDATE_VIDEO_LANGUAGE';
  data: {
    videoId: string;
    newLanguage: string;
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

export function isGetLanguageWatchTimesMessage(
  message: Message
): message is GetLanguageWatchTimesMessage {
  return message.type === 'GET_LANGUAGE_WATCH_TIMES';
}

export function isUpdateVideoLanguageMessage(
  message: Message
): message is UpdateVideoLanguageMessage {
  return message.type === 'UPDATE_VIDEO_LANGUAGE';
}
