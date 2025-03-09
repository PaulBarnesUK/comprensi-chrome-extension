type ElementFoundCallback<T extends Element> = (element: T) => void;

export function waitForElement<T extends Element>(
  selector: string,
  callback: ElementFoundCallback<T>,
  timeoutMs = 30000
): void {
  const element = document.querySelector<T>(selector);

  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver(() => {
    const element = document.querySelector<T>(selector);
    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    observer.disconnect();
  }, timeoutMs);
}

export function waitForVideoElement(
  callback: ElementFoundCallback<HTMLVideoElement>,
  timeoutMs = 30000
): void {
  waitForElement<HTMLVideoElement>(
    '.html5-video-player video.html5-main-video',
    callback,
    timeoutMs
  );
}
