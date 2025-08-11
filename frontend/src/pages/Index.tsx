
import { Header } from "@/components/Header";
import { SwapCard } from "@/components/SwapCard";
import { CoinPrices } from "@/components/CoinPrices";
import { OrderBook } from "@/components/OrderBook";
import { SwapHistory } from "@/components/SwapHistory";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Centralized main swap interface */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl">
            <SwapCard />
          </div>
        </div>

        {/* Order Book - Full width for better table display */}
        <div className="mb-8">
          <OrderBook />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coin prices */}
          <CoinPrices />
          
          {/* Swap History */}
          <SwapHistory />
        </div>
      </main>
    </div>
  );
};

export default Index;
