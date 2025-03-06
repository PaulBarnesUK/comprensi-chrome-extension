export const WATCH_URL_PATTERN = /youtube\.com\/watch\?v=([^&]+)/;
export const SHORT_URL_PATTERN = /youtu\.be\/([^?&]+)/;
export const EMBED_URL_PATTERN = /youtube\.com\/embed\/([^?&]+)/;

export const THUMBNAIL_SELECTORS = [
  'a#thumbnail:not([data-difficulty-processed="true"])',
  'ytd-thumbnail:not([data-difficulty-processed="true"])',
  'ytd-compact-video-renderer:not([data-difficulty-processed="true"]) a#thumbnail',
  'ytd-grid-video-renderer:not([data-difficulty-processed="true"]) a#thumbnail',
  'ytd-video-renderer:not([data-difficulty-processed="true"]) a#thumbnail'
]; 