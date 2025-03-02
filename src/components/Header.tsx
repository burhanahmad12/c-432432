
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-background to-background-secondary border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/7604d70b-2ceb-4abf-9175-60662e7c3b15.png" 
                  alt="Forex Logo" 
                  className="w-8 h-8 rounded-full border border-primary/20"
                />
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Forex<span className="text-foreground">Hub</span>
                </span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
