import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Search } from "lucide-react";

interface KeyValueFetchProps {
  onFetch?: (key: string, value: string) => void;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:7171";

const KeyValueFetch = ({ onFetch }: KeyValueFetchProps) => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key) {
      toast.error("Key is required");
      return;
    }
    
    if (key.length > 256) {
      toast.error("Key must be 256 characters or less");
      return;
    }
    
    try {
      setIsLoading(true);
      // Example API call - would be replaced with actual endpoint
      const response = await fetch(`${API_BASE_URL}/get?key=${encodeURIComponent(key)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (data.status === "OK") {
        toast.success("Cache entry found");
        if (onFetch) onFetch(data.key, data.value);
      } else {
        toast.error(data.message || "Failed to retrieve cache entry");
      }
    } catch (error) {
      toast.error("Failed to connect to cache service");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-muted bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search size={18} className="text-cache-primary" />
          Fetch Cache Entry
        </CardTitle>
        <CardDescription>
          Retrieve a value from the cache by its key
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fetch-key" className="text-sm font-medium text-muted-foreground mb-1 block">
              Key
            </label>
            <Input
              id="fetch-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key to fetch"
              className="bg-muted/50 border-muted"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-cache-primary hover:bg-cache-primary/80 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Fetching..." : "Fetch from Cache"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default KeyValueFetch;
