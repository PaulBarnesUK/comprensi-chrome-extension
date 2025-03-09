type RetryableOperation<T> = () => Promise<T | null>;

interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor: number;
}

const defaultRetryOptions: RetryOptions = {
  maxAttempts: 5,
  delayMs: 500,
  backoffFactor: 1.5
};

export async function retryOperation<T>(
  operation: RetryableOperation<T>,
  options: Partial<RetryOptions> = {}
): Promise<T | null> {
  const config = { ...defaultRetryOptions, ...options };

  let result = await operation();
  if (result) return result;

  let currentDelay = config.delayMs;

  for (let attempt = 1; attempt < config.maxAttempts; attempt++) {
    await delay(currentDelay);

    result = await operation();
    if (result) return result;

    currentDelay = Math.floor(currentDelay * config.backoffFactor);
  }

  return null;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
