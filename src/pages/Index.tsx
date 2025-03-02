
import CryptoChart from "@/components/CryptoChart";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
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
  );
};

export default Index;
