
import CryptoChart from "@/components/CryptoChart";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Trading View By Cdw Burhan</h1>
        </header>
        
        <CryptoChart />
      </div>
    </div>
  );
};

export default Index;
