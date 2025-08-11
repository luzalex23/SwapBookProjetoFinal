
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from "lucide-react";

const trendingCoins = [
  { 
    symbol: "BTC", 
    name: "Bitcoin", 
    change: "+3.4%", 
    isPositive: true, 
    price: "$68,500",
    volume: "2.1B",
    marketCap: "1.3T"
  },
  { 
    symbol: "ETH", 
    name: "Ethereum", 
    change: "+2.1%", 
    isPositive: true, 
    price: "$2,800",
    volume: "850M",
    marketCap: "336B"
  },
  { 
    symbol: "XAU", 
    name: "Ouro", 
    change: "+1.8%", 
    isPositive: true, 
    price: "$2,050",
    volume: "450M",
    marketCap: "12.5T"
  },
  { 
    symbol: "OPT", 
    name: "Platina", 
    change: "+4.5%", 
    isPositive: true, 
    price: "$1,200",
    volume: "280M",
    marketCap: "38B"
  },
  { 
    symbol: "ADA", 
    name: "Cardano", 
    change: "-0.8%", 
    isPositive: false, 
    price: "$0.45",
    volume: "120M",
    marketCap: "15.8B"
  }
];

export function MarketTrends() {
  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Tendências do Mercado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {trendingCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {coin.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{coin.symbol}</p>
                    <p className="text-sm text-muted-foreground">{coin.name}</p>
                  </div>
                </div>
                <Badge
                  variant={coin.isPositive ? "default" : "destructive"}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    coin.isPositive
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-destructive/20 text-destructive border-destructive/30"
                  }`}
                >
                  {coin.isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {coin.change}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <DollarSign className="h-3 w-3" />
                    Preço
                  </div>
                  <p className="text-sm font-medium text-foreground">{coin.price}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <Activity className="h-3 w-3" />
                    Volume
                  </div>
                  <p className="text-sm font-medium text-foreground">{coin.volume}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <BarChart3 className="h-3 w-3" />
                    Cap. Mercado
                  </div>
                  <p className="text-sm font-medium text-foreground">{coin.marketCap}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
