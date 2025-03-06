let observer: MutationObserver | null = null;

export function observeDomChanges(callback: () => void): void {
  if (observer) {
    return;
  }
  
  observer = new MutationObserver(debounce(() => {
    callback();
  }, 500));
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

export function stopObservingDomChanges(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function debounce(fn: Function, delay: number): () => void {
  let timeoutId: number | null = null;
  
  return function() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      fn();
      timeoutId = null;
    }, delay);
  };
} 