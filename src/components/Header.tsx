
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import { Home, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  
  return (
    <div className="w-full bg-gradient-to-r from-background to-background-secondary border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link to="/">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <img 
                  src="/lovable-uploads/7604d70b-2ceb-4abf-9175-60662e7c3b15.png" 
                  alt="Forex Logo" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-primary/20"
                />
                <span className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Forex<span className="text-foreground">Hub</span>
                </span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0 sm:h-9 sm:w-auto sm:px-2 flex items-center justify-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline text-xs md:text-sm">Home</span>
              </Button>
            </Link>
            
            {user && (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0 sm:h-9 sm:w-auto sm:px-2 flex items-center justify-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline text-xs md:text-sm">Profile</span>
                  </Button>
                </Link>
                
                <Link to="/settings">
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0 sm:h-9 sm:w-auto sm:px-2 flex items-center justify-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline text-xs md:text-sm">Settings</span>
                  </Button>
                </Link>
              </>
            )}
            
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
