
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, ArrowUpDown, Clock } from "lucide-react";

// Dados simulados do histórico de swaps
const swapHistory = [
  {
    id: 1,
    type: 'swap',
    from: 'USDT',
    to: 'LOOP',
    fromAmount: '100.00',
    toAmount: '100.00',
    time: '2024-01-21 14:30:25',
    status: 'completed',
    fee: '0.1%'
  },
  {
    id: 2,
    type: 'swap',
    from: 'LOOP',
    to: 'USDT',
    fromAmount: '500.00',
    toAmount: '500.00',
    time: '2024-01-21 12:15:10',
    status: 'completed',
    fee: '0.1%'
  },
  {
    id: 3,
    type: 'swap',
    from: 'USDT',
    to: 'LOOP',
    fromAmount: '250.00',
    toAmount: '250.00',
    time: '2024-01-21 09:45:33',
    status: 'completed',
    fee: '0.1%'
  },
  {
    id: 4,
    type: 'swap',
    from: 'LOOP',
    to: 'USDT',
    fromAmount: '1000.00',
    toAmount: '1000.00',
    time: '2024-01-20 16:20:15',
    status: 'completed',
    fee: '0.1%'
  },
  {
    id: 5,
    type: 'swap',
    from: 'USDT',
    to: 'LOOP',
    fromAmount: '75.00',
    toAmount: '75.00',
    time: '2024-01-20 11:10:48',
    status: 'completed',
    fee: '0.1%'
  }
];

export function SwapHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/20 text-success border-success/30';
      case 'pending':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <CardTitle className="text-foreground text-lg font-semibold">
            Histórico de Swaps
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {swapHistory.map((swap) => (
            <div key={swap.id} className="p-4 border-b border-border/30 last:border-b-0 hover:bg-secondary/20 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-full">
                    <ArrowUpDown className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {swap.fromAmount} {swap.from}
                      </span>
                      <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {swap.toAmount} {swap.to}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(swap.status)}>
                    {getStatusText(swap.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground ml-11">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {swap.time}
                </div>
                <div>
                  Taxa: {swap.fee}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
