
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Database, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  operation?: "put" | "get";
  key?: string;
  value?: string;
  timestamp?: number;
}

const ResultDisplay = ({ operation, key, value, timestamp }: ResultDisplayProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (key && value) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [key, value]);

  if (!operation && !key && !value) {
    return (
      <Card className="border-muted bg-card/50 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database size={18} className="text-cache-primary" />
            Cache Results
          </CardTitle>
          <CardDescription>
            Results from cache operations will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[240px]">
          <div className="text-muted-foreground text-center">
            <div className="text-cache-primary text-5xl mb-4 opacity-20 mx-auto w-16 h-16">
              <Database className="w-full h-full" />
            </div>
            <p>No cache operations performed yet</p>
            <p className="text-sm mt-2">Add or fetch a cache entry to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "border-muted bg-card/50 backdrop-blur-sm h-full transition-all duration-300",
      animate && "border-cache-primary animate-glow"
    )}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Database size={18} className="text-cache-primary" />
          Cache Results
        </CardTitle>
        <CardDescription>
          {operation === "put" ? "Entry added to cache" : "Entry retrieved from cache"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-md border border-muted">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="rounded bg-cache-primary/20 px-2 py-0.5 text-cache-primary">
                {operation === "put" ? "PUT Operation" : "GET Operation"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-cache-success/20 text-cache-success px-2 py-0.5 rounded-full">
              <Check size={12} />
              <span>Success</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 bg-cache-primary rounded-full"></span> Key
              </div>
              <div className="bg-muted/50 p-2 rounded text-sm overflow-x-auto whitespace-nowrap font-mono">{key}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 bg-cache-primary rounded-full"></span> Value
              </div>
              <div className="bg-muted/50 p-2 rounded text-sm overflow-x-auto whitespace-nowrap font-mono">{value}</div>
            </div>
          </div>
        </div>
        
        {timestamp && (
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock size={12} />
            <span>Timestamp: {new Date(timestamp).toLocaleString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
