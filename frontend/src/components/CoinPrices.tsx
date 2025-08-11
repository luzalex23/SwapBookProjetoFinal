
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface CoinData {
  image: string;
  name: string;
  symbol: string;
  price: string;
  volume: string;
  change: string;
  isPositive: boolean;
}

async function getInfosTokensInCoinGeckoAPI(): Promise<CoinData[]> {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=btc%2Ceth%2Cbnb%2Csol%2Cxrp%2Cdoge%2Cada%2Cavax%2Cshib%2Cdot&precision=8';
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-7sZmBPXdt9ZHbRMhh4HXyTLh'}
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data.map((coin: any) => ({
      image: coin.image,
      name: coin.name,
      symbol: coin.symbol?.toUpperCase() || coin.name,
      price: `$${coin.current_price.toFixed(2)}`,
      volume: `$${coin.total_volume.toLocaleString()}`,
      change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
      isPositive: coin.price_change_percentage_24h >= 0,
    }));
  } catch (error) {
    // Fallback data in case of API error
    return [
      {
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        name: "Bitcoin",
        symbol: "BTC",
        price: "$43,250.00",
        volume: "$23,456,789,012",
        change: "+2.45%",
        isPositive: true
      },
      {
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        name: "Ethereum",
        symbol: "ETH",
        price: "$2,650.00",
        volume: "$12,345,678,901",
        change: "+1.85%",
        isPositive: true
      },
      {
        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        name: "BNB",
        symbol: "BNB",
        price: "$245.00",
        volume: "$1,234,567,890",
        change: "-0.25%",
        isPositive: false
      },
      {
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        name: "Solana",
        symbol: "SOL",
        price: "$98.50",
        volume: "$2,345,678,901",
        change: "+3.75%",
        isPositive: true
      }
    ];
  }
}

export function CoinPrices() {
  const [topCoins, setTopCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const coins = await getInfosTokensInCoinGeckoAPI();
        setTopCoins(coins);
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground text-lg font-semibold flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Preços das Principais Moedas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/50 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted"></div>
                    <div>
                      <div className="w-12 h-3 bg-muted rounded mb-1"></div>
                      <div className="w-16 h-2 bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-3 bg-muted rounded mb-1"></div>
                    <div className="w-12 h-2 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-lg font-semibold flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Preços das Principais Moedas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topCoins.map((coin, index) => (
            <div
              key={`${coin.symbol}-${index}`}
              className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full object-contain border border-border"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{coin.symbol}</p>
                    <p className="text-xs text-muted-foreground">{coin.name}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-foreground text-sm">{coin.price}</p>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant={coin.isPositive ? "default" : "destructive"}
                      className={`text-xs ${
                        coin.isPositive
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-destructive/20 text-destructive border-destructive/30"
                      }`}
                    >
                      {coin.isPositive ? (
                        <TrendingUp className="h-2 w-2 mr-1" />
                      ) : (
                        <TrendingDown className="h-2 w-2 mr-1" />
                      )}
                      {coin.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Vol: {coin.volume}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
