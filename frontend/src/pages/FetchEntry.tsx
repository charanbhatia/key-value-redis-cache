import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Database, Plus } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import ResultDisplay from "@/components/ResultDisplay";

const API_BASE_URL = "http://52.77.248.194:7171";

const FetchEntry = () => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    operation?: "get";
    key?: string;
    value?: string;
    timestamp?: number;
  }>({});

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
        setResult({
          operation: "get",
          key: data.key,
          value: data.value,
          timestamp: Date.now(),
        });
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cache-dark to-black">
      <Header />
      <main className="flex-1 container py-6 px-4 md:py-8 md:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Fetch Cache Entry</h2>
            <p className="text-muted-foreground">Retrieve a value from the cache by its key</p>
          </div>
          <Button variant="outline" className="border-cache-primary text-cache-primary" asChild>
            <Link to="/add">
              <Plus className="mr-2" size={16} />
              Add Cache Entry
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  className="w-full bg-cache-primary hover:bg-cache-primary/80 text-white animate-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Fetching..." : "Fetch from Cache"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <ResultDisplay {...result} />
          </div>
        </div>
      </main>
      <footer className="w-full flex flex-col items-center justify-center text-center text-sm text-muted-foreground py-4">
        <p>KV Cache • High-Performance Key-Value Caching Service • Version 1.0.0</p>
        <p className="mt-1">© 2025 • High-Performance Caching System</p>
      </footer>
    </div>
  );
};

export default FetchEntry;
