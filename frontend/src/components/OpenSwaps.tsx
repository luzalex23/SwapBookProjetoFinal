import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const openSwaps = [
  {
    id: "1",
    from: "BTC",
    to: "ETH",
    amount: "0.5",
    status: "Pendente",
    timestamp: "2 min atrás"
  },
  {
    id: "2", 
    from: "ETH",
    to: "USDT",
    amount: "2.1",
    status: "Processando",
    timestamp: "5 min atrás"
  }
];

export function OpenSwaps() {
  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground text-lg font-semibold">
          Swaps Abertos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {openSwaps.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum swap aberto no momento
          </div>
        ) : (
          <div className="space-y-4">
            {openSwaps.map((swap) => (
              <div
                key={swap.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{swap.amount} {swap.from}</span>
                    <span className="text-muted-foreground mx-2">→</span>
                    <span className="font-medium text-foreground">{swap.to}</span>
                  </div>
                  <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                    {swap.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{swap.timestamp}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}