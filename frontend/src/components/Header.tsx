
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const location = useLocation();
  
  return (
    <header className={cn("w-full py-4 border-b border-muted", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-cache-primary p-2 rounded-md animate-pulse-light">
            <Database size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-1">
              <span>KV</span>
              <span className="text-cache-primary">Cache</span>
            </h1>
            <p className="text-xs text-cache-gray">High-Performance Key-Value Caching Service</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm"
              className={location.pathname === '/add' ? 'bg-muted text-white' : 'text-cache-gray hover:text-white'}
              asChild
            >
              <Link to="/add">Add Entry</Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={location.pathname === '/fetch' ? 'bg-muted text-white' : 'text-cache-gray hover:text-white'}
              asChild
            >
              <Link to="/fetch">Fetch Entry</Link>
            </Button>
          </nav>
          <span className="px-3 py-1 bg-muted text-xs font-medium rounded-full text-cache-light">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
