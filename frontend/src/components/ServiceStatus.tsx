
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const ServiceStatus = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  
  useEffect(() => {
    // This would be replaced with the actual API base URL in a real application
    // For this example, we'll just use a placeholder
    setApiBaseUrl("https://cache-service.example.com:7171");
  }, []);
  
  return (
    <Card className="border-muted bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity size={18} className="text-cache-primary" />
          Service Status
        </CardTitle>
        <CardDescription>
          Key-Value Cache Service connection information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cache-success animate-pulse-light"></span>
              <span className="text-sm font-medium text-cache-success">Active</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">API Endpoint:</span>
            <span className="text-sm font-medium">{apiBaseUrl}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Version:</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <p className="mb-1">⚡ HTTP API for fast key-value operations</p>
          <p>📊 Sub-millisecond response times</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
