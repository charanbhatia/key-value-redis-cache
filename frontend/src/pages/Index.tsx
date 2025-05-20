import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { ArrowRight, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cache-dark to-black">
      <Header />
      <main className="flex-1 container py-8 px-4 md:py-12 md:px-0">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            High-Performance Key-Value Caching
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Simple, fast, and reliable in-memory caching service
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-cache-primary hover:bg-cache-primary/80 text-white animate-glow">
              <Link to="/add">
                Add Cache Entry
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cache-primary text-cache-primary">
              <Link to="/fetch">
                Fetch Cache Entry
                <Database className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="bg-card/50 border-muted backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sub-millisecond Latency</CardTitle>
              <CardDescription>Process requests with average response time under 5ms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="w-32 h-32 rounded-full bg-cache-primary/20 flex items-center justify-center animate-pulse-light">
                  <div className="w-24 h-24 rounded-full bg-cache-primary/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cache-primary flex items-center justify-center text-lg font-bold text-white">
                      &lt;5ms
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-muted backdrop-blur-sm">
            <CardHeader>
              <CardTitle>High Throughput</CardTitle>
              <CardDescription>Handle over 10,000 requests per second per instance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-full max-w-xs">
                  <div className="absolute inset-0 bg-cache-primary/20 rounded-full blur-3xl"></div>
                  <div className="w-full h-24 bg-gradient-to-r from-cache-primary/20 to-cache-primary rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">10,000+ req/s</span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
                      <div className="h-full bg-white animate-pulse-light" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Service Status: Online</span>
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

export default Index;
