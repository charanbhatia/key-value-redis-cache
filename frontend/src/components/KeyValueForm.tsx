import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { API_CONFIG } from "@/config/api";

interface KeyValueFormProps {
  onSuccess?: (key: string, value: string) => void;
}

const KeyValueForm = ({ onSuccess }: KeyValueFormProps) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key || !value) {
      toast.error("Both key and value are required");
      return;
    }
    
    if (key.length > 256 || value.length > 256) {
      toast.error("Key and value must be 256 characters or less");
      return;
    }
    
    try {
      setIsLoading(true);
      // API call to backend service
      const response = await fetch(`${API_CONFIG.BASE_URL}/put`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value }),
      });
      
      const data = await response.json();
      
      if (data.status === "OK") {
        toast.success("Cache entry added successfully");
        if (onSuccess) onSuccess(key, value);
        setKey("");
        setValue("");
      } else {
        toast.error(data.message || "Failed to add cache entry");
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
          <Plus size={18} className="text-cache-primary" />
          Add Cache Entry
        </CardTitle>
        <CardDescription>
          Store a new key-value pair in the cache
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="key" className="text-sm font-medium text-muted-foreground mb-1 block">
              Key <span className="text-xs text-muted-foreground">(max 256 chars)</span>
            </label>
            <Input
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              className="bg-muted/50 border-muted"
              maxLength={256}
            />
            <div className="text-xs text-right mt-1 text-muted-foreground">
              {key.length}/256
            </div>
          </div>
          
          <div>
            <label htmlFor="value" className="text-sm font-medium text-muted-foreground mb-1 block">
              Value <span className="text-xs text-muted-foreground">(max 256 chars)</span>
            </label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="bg-muted/50 border-muted"
              maxLength={256}
            />
            <div className="text-xs text-right mt-1 text-muted-foreground">
              {value.length}/256
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-cache-primary hover:bg-cache-primary/80 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save to Cache"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default KeyValueForm;
