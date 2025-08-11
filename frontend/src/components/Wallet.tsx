import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet as WalletIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const walletBalances = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.5", value: "15,430", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", amount: "3.2", value: "5,680", icon: "Ξ" },
  { symbol: "USDT", name: "Tether", amount: "1000", value: "1,000", icon: "$" }
];

export function Wallet() {
  const [showBalances, setShowBalances] = useState(true);
  
  const totalValue = walletBalances.reduce((sum, balance) => sum + parseFloat(balance.value.replace(",", "")), 0);

  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground text-lg font-semibold flex items-center gap-2">
          <WalletIcon className="h-5 w-5 text-primary" />
          Carteira
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBalances(!showBalances)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg bg-gradient-glow border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Saldo Total</p>
          <p className="text-2xl font-bold text-foreground">
            {showBalances ? `$${totalValue.toLocaleString()}` : "••••••"}
          </p>
          <p className="text-xs text-success mt-1">+5.2% últimas 24h</p>
        </div>

        <div className="space-y-3">
          {walletBalances.map((balance) => (
            <div
              key={balance.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {balance.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{balance.symbol}</p>
                  <p className="text-xs text-muted-foreground">{balance.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">
                  {showBalances ? balance.amount : "••••"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {showBalances ? `$${balance.value}` : "••••"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}