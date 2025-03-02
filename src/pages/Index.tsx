
import CryptoChart from "@/components/CryptoChart";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen p-0 md:p-0">
      <div className="w-full mx-auto">
        {/* Beautiful Header with glassmorphism effect */}
        <div className="w-full bg-gradient-to-r from-background to-background-secondary border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center h-16">
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
              
              <div className="flex items-center space-x-4">
                <UserMenu />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <header className="mb-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <img 
                src="/lovable-uploads/05571857-70bb-4683-a5fd-37639eb150c6.png" 
                alt="Profile Logo" 
                className="w-32 h-32 rounded-full mb-4 border-2 border-primary/30 shadow-lg" 
              />
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Forex Trading Hub</h1>
              <p className="text-muted-foreground">Professional trading solutions by Burhan</p>
            </div>
          </header>
          
          <CryptoChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
