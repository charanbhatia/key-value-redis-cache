// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://key-value-redis-cache.onrender.com",
} as const;

export default API_CONFIG;
