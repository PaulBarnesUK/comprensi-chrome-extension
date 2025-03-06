import { WATCH_URL_PATTERN, SHORT_URL_PATTERN, EMBED_URL_PATTERN } from '../constants/urlPatterns';

export function extractVideoIdFromUrl(url: string): string | null {
  if (!url) return null;
  
  const watchMatch = url.match(WATCH_URL_PATTERN);
  if (watchMatch?.[1]) return watchMatch[1];
  
  const shortMatch = url.match(SHORT_URL_PATTERN);
  if (shortMatch?.[1]) return shortMatch[1];
  
  const embedMatch = url.match(EMBED_URL_PATTERN);
  if (embedMatch?.[1]) return embedMatch[1];
  
  return null;
} 