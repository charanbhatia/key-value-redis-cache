
interface CacheResponse {
  status: "OK" | "ERROR";
  message?: string;
  key?: string;
  value?: string;
}

// In-memory cache for demo purposes
const cache = new Map<string, string>();

export const setupMockService = () => {
  // Mock the fetch API for demonstration purposes
  const originalFetch = window.fetch;
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input.toString();
    
    // Handle PUT operation
    if (url.includes("/put") && init?.method === "POST") {
      try {
        const body = JSON.parse(init.body as string);
        const { key, value } = body;
        
        // Validate input
        if (!key || typeof key !== "string") {
          return mockResponse({
            status: "ERROR",
            message: "Key is required and must be a string."
          });
        }
        
        if (!value || typeof value !== "string") {
          return mockResponse({
            status: "ERROR",
            message: "Value is required and must be a string."
          });
        }
        
        if (key.length > 256) {
          return mockResponse({
            status: "ERROR",
            message: "Key length cannot exceed 256 characters."
          });
        }
        
        if (value.length > 256) {
          return mockResponse({
            status: "ERROR",
            message: "Value length cannot exceed 256 characters."
          });
        }
        
        // Store in cache
        cache.set(key, value);
        
        return mockResponse({
          status: "OK",
          message: "Key inserted/updated successfully."
        });
      } catch (e) {
        return mockResponse({
          status: "ERROR",
          message: "Invalid JSON payload."
        });
      }
    }
    
    // Handle GET operation
    if (url.includes("/get")) {
      const urlObj = new URL(url, window.location.origin);
      const key = urlObj.searchParams.get("key");
      
      if (!key) {
        return mockResponse({
          status: "ERROR",
          message: "Key cannot be empty."
        });
      }
      
      const value = cache.get(key);
      
      if (!value) {
        return mockResponse({
          status: "ERROR",
          message: "Key not found."
        }, 404);
      }
      
      return mockResponse({
        status: "OK",
        key,
        value
      });
    }
    
    // Pass through to original fetch for any other requests
    return originalFetch(input, init);
  };
  
  // Helper to create a mock response
  function mockResponse(body: CacheResponse, status = 200) {
    return Promise.resolve({
      status,
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(JSON.stringify(body)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    } as Response);
  }
  
  console.log("Mock cache service initialized");
  
  // Return a cleanup function
  return () => {
    window.fetch = originalFetch;
    console.log("Mock cache service cleaned up");
  };
};
