// API Configuration
declare const __VITE_API_BASE_URL__: string | undefined;

const getApiBaseUrl = (): string => {
  // Try to get from environment variable
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) {
    return (import.meta as any).env.VITE_API_BASE_URL;
  }
  
  // Fallback to production URL
  return "https://key-value-redis-cache.onrender.com";
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
} as const;

export default API_CONFIG;
