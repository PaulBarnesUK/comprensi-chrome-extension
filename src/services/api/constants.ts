const isDevelopment = () => {
  // Check if extension is loaded unpacked (common for development)
  return chrome.runtime.getManifest().update_url === undefined;
};

export const API_BASE_URL = isDevelopment()
  ? 'http://localhost:8787'
  : 'https://ext-api.paul-barnes-psnl.workers.dev';

export const API_ENDPOINTS = {
  VIDEO: '/videos',
  VIDEOS: '/videos',
  COMPARE: '/compare'
};

export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000;
