export function getVideoElement(): HTMLVideoElement | null {
  return document.querySelector('video');
}

export function getTitleElement(): HTMLElement | null {
  return document.querySelector('h1.ytd-video-primary-info-renderer');
}

export function getChannelElement(): HTMLElement | null {
  return document.querySelector('#channel-name #text');
}

export function getVideoTitle(): string {
  const titleElement = getTitleElement();
  return titleElement?.textContent?.trim() || 'Unknown Title';
}

export function getChannelName(): string {
  const channelElement = getChannelElement();
  return channelElement?.textContent?.trim() || 'Unknown Channel';
}
