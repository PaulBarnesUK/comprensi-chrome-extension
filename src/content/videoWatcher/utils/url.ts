export function isVideoPage(): boolean {
    return window.location.pathname === '/watch';
}

export function extractVideoId(url: string): string | null {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
}

export function observeUrlChanges(onUrlChange: () => void): MutationObserver {
    let lastUrl = window.location.href;

    const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            onUrlChange();
        }
    });
    
    observer.observe(document, { subtree: true, childList: true });
    return observer;
} 