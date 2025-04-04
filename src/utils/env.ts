export const isDevelopment = () => {
  // Check if extension is loaded unpacked (common for development)
  return chrome.runtime.getManifest().update_url === undefined;
};
