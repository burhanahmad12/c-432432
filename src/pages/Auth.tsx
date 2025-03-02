
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 mb-8">
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
          
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Forex Trading Hub
          </h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
