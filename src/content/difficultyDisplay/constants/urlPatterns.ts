export const WATCH_URL_PATTERN = /youtube\.com\/watch\?v=([^&]+)/;
export const SHORT_URL_PATTERN = /youtu\.be\/([^?&]+)/;
export const EMBED_URL_PATTERN = /youtube\.com\/embed\/([^?&]+)/;

export const THUMBNAIL_SELECTORS = [
  'a#thumbnail',
  'ytd-thumbnail',
  'ytd-compact-video-renderer a#thumbnail',
  'ytd-grid-video-renderer a#thumbnail',
  'ytd-video-renderer a#thumbnail'
];
