
import CryptoChart from "@/components/CryptoChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Trading View By Cdw Burhan</h1>
        </header>
        
        <CryptoChart />
      </div>
    </div>
  );
};

export default Index;
