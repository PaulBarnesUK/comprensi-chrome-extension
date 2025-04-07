// Declare the global variable injected by Vite
declare const __APP_MODE__: string;

export const isDevelopment = __APP_MODE__ === 'development';
