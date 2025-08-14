import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { getPendingSwaps } from '@/js/IteracaoContrato.js';
import { TradeModal } from "@/components/ui/TradeModal";

const sellOrders = [];

void async function pegaSwapsPendentes(): Promise<void> {
  const swaps = await getPendingSwaps();
  swaps.map(index => {
    const fullSender = String(index[1]);
    sellOrders.push({
      id: String(index[0]),
      sender: {
        display: fullSender.slice(0, 6) + "..." + fullSender.slice(-4), // mostrado na tela
        full: fullSender // para copiar inteiro
      },
      amount: String(index[3]).slice(0, 10),
      price: String(index[5])

    });
  });

}();

const buyOrders = [
  { price: 0.3834, amount: 234.5000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
  { price: 0.3833, amount: 67.8000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
  { price: 0.3832, amount: 890.1000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
  { price: 0.3831, amount: 45.3000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
  { price: 0.3830, amount: 156.7000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
  { price: 0.3829, amount: 78.9000, sender: "0xa639f0CB23B7831FDC80103ef9Efa86b9ADB7ac9" },
].map(order => ({
  ...order,
  price: order.price.toFixed(4),
  amount: order.amount.toFixed(4),
  sender: {
    display: order.sender.slice(0, 6) + "..." + order.sender.slice(-4),
    full: order.sender
  }
}));


// Minhas ordens de oferta
const myOrders = {
  completed: [
    { type: 'buy', price: 0.3156, amount: 150.0000, status: 'executada', date: '2024-01-20 14:30' },
    { type: 'sell', price: 0.3789, amount: 89.5000, status: 'executada', date: '2024-01-20 13:15' },
    { type: 'buy', price: 0.3234, amount: 200.0000, status: 'executada', date: '2024-01-20 11:45' },
    { type: 'sell', price: 0.3712, amount: 75.2000, status: 'executada', date: '2024-01-20 10:20' },
  ],
  open: [
    { type: 'buy', price: 0.3789, amount: 500.0000, status: 'aberta', date: '2024-01-20 15:00' },
  ]
};

const currentPrice = "0.3836";
const priceChange = "+0.0023";
const percentChange = "+0.60%";

// Dados para o gráfico de volume
const volumeData = {
  '1d': { volume: '2.3M', change: '+5.2%' },
  '7d': { volume: '18.7M', change: '+12.8%' },
  '30d': { volume: '89.4M', change: '+23.1%' },
  '1y': { volume: '1.2B', change: '+156.7%' }
};

// Dados para gráfico de preço
const priceChartData = {
  '1d': [
    { time: '00:00', price: 0.3820, volume: 125000 },
    { time: '04:00', price: 0.3825, volume: 98000 },
    { time: '08:00', price: 0.3830, volume: 156000 },
    { time: '12:00', price: 0.3835, volume: 189000 },
    { time: '16:00', price: 0.3840, volume: 165000 },
    { time: '20:00', price: 0.3836, volume: 142000 },
  ],
  '7d': [
    { time: 'Seg', price: 0.3750, volume: 1200000 },
    { time: 'Ter', price: 0.3780, volume: 980000 },
    { time: 'Qua', price: 0.3810, volume: 1350000 },
    { time: 'Qui', price: 0.3825, volume: 1180000 },
    { time: 'Sex', price: 0.3840, volume: 1450000 },
    { time: 'Sáb', price: 0.3838, volume: 1100000 },
    { time: 'Dom', price: 0.3836, volume: 890000 },
  ],
  '30d': [
    { time: 'Sem 1', price: 0.3650, volume: 5200000 },
    { time: 'Sem 2', price: 0.3720, volume: 4800000 },
    { time: 'Sem 3', price: 0.3780, volume: 6100000 },
    { time: 'Sem 4', price: 0.3836, volume: 5900000 },
  ],
  '1y': [
    { time: 'Jan', price: 0.2850, volume: 18500000 },
    { time: 'Fev', price: 0.3100, volume: 16200000 },
    { time: 'Mar', price: 0.3250, volume: 19800000 },
    { time: 'Abr', price: 0.3400, volume: 21300000 },
    { time: 'Mai', price: 0.3550, volume: 18900000 },
    { time: 'Jun', price: 0.3650, volume: 22100000 },
    { time: 'Jul', price: 0.3750, volume: 20400000 },
    { time: 'Ago', price: 0.3800, volume: 17600000 },
    { time: 'Set', price: 0.3820, volume: 19200000 },
    { time: 'Out', price: 0.3830, volume: 18700000 },
    { time: 'Nov', price: 0.3835, volume: 20800000 },
    { time: 'Dez', price: 0.3836, volume: 19500000 },
  ],
};

export function OrderBook() {

  
const [modalOpen, setModalOpen] = useState(false);
const [modalType, setModalType] = useState<'buy' | 'sell' | null>(null);
const [selectedOrder, setSelectedOrder] = useState<any>(null);

const handleOpenModal = (type: 'buy' | 'sell', order: any) => {
  setModalType(type);
  setSelectedOrder(order);
  setModalOpen(true);
};

  const [selectedPeriod, setSelectedPeriod] = useState('1d');

  const currentChartData = priceChartData[selectedPeriod as keyof typeof priceChartData];

  return (
    
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground text-lg font-semibold">
              Book de Ofertas
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/20 text-success border-success/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              WEbdEX/USDT
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Sell Orders (Asks) */}
          <div className="p-4 border-r border-border/30">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Vendas (Asks)</h3>
              <div className="grid grid-cols-4 gap-5 text-xs text-muted-foreground mb-2">
                <span>Preço (USDT)</span>
                <span>Quantidade</span>
                <span>Carteira</span>
              </div>
            </div>
            <div className="space-y-1">
              {sellOrders.map((order, index) => (
                <div key={index} className="grid grid-cols-4 gap-6 text-sm hover:bg-destructive/10 p-1 rounded cursor-pointer transition-colors">
                  <span className="text-success font-medium">{order.price}</span>
                  <span className="text-left text-muted-foreground">{order.amount}</span>
                  <span
                    onClick={() => navigator.clipboard.writeText(order.sender.full)}
                    title="Clique para copiar"
                    style={{ cursor: "pointer" }}
                  >
                    {order.sender.display}
                  </span>
                  <Button className="bg-green-500 text-white hover:bg-green-600" onClick={() => handleOpenModal('buy', order)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Comprar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Orders (Bids) */}
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Compras (Bids)</h3>
              <div className="grid grid-cols-4 gap-6 text-xs text-muted-foreground mb-2">
                <span>Preço (USDT)</span>
                <span className="text-right">Quantidade</span>
                <span className="text-right">Carteira</span>
              </div>
            </div>
            <div className="space-y-1">
              {buyOrders.map((order, index) => (
                <div key={index} className="grid grid-cols-4 gap-6 text-sm hover:bg-success/10 p-1 rounded cursor-pointer transition-colors">
                  <span className="text-success font-medium">{order.price}</span>
                  <span className="text-right text-foreground">{order.amount}</span>
                  <span
                    onClick={() => navigator.clipboard.writeText(order.sender.full)}
                    title="Clique para copiar"
                    style={{ cursor: "pointer" }}
                  >
                    {order.sender.display}
                  </span>
                  <Button
                    className="bg-destructive text-white hover:bg-destructive/80"
                    onClick={() => handleOpenModal('sell', order)}
                  >
                    <Minus className="h-4 w-3 mr-1" />
                    Vender
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minhas Ordens de Oferta */}
        <div className="border-t border-border/30 p-4 bg-secondary/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Minhas Ordens de Oferta</h3>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Abrir nova ordem
            </Button>
          </div>

          {/* Ordens em Aberto */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Ordens em Aberto</h4>
            <div className="hidden sm:grid grid-cols-5 gap-2 text-xs text-muted-foreground mb-2">
              <span>Tipo</span>
              <span>Preço (USDT)</span>
              <span>Quantidade</span>
              <span>Status</span>
              <span>Data</span>
            </div>
            <div className="space-y-2">
              {myOrders.open.map((order, index) => (
                <div key={index} className="p-3 rounded bg-warning/10 border border-warning/30">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${order.type === 'buy' ? 'text-success' : 'text-destructive'}`}>
                        {order.type === 'buy' ? 'Compra' : 'Venda'}
                      </span>
                      <Badge variant="outline" className="text-xs bg-warning/20 text-warning border-warning/30">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs">Preço:</span>
                        <span className="text-foreground ml-1">{order.price.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Qtd:</span>
                        <span className="text-foreground ml-1">{order.amount.toFixed(4)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{order.date}</div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:grid grid-cols-5 gap-2 text-sm items-center">
                    <span className={order.type === 'buy' ? 'text-success font-medium' : 'text-destructive font-medium'}>
                      {order.type === 'buy' ? 'Compra' : 'Venda'}
                    </span>
                    <span className="text-foreground">{order.price.toFixed(4)}</span>
                    <span className="text-foreground">{order.amount.toFixed(4)}</span>
                    <Badge variant="outline" className="text-xs bg-warning/20 text-warning border-warning/30 w-fit">
                      {order.status}
                    </Badge>
                    <span className="text-muted-foreground text-xs">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ordens Executadas */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Ordens Executadas (Últimas 4)</h4>
            <div className="hidden sm:grid grid-cols-5 gap-2 text-xs text-muted-foreground mb-2">
              <span>Tipo</span>
              <span>Preço (USDT)</span>
              <span>Quantidade</span>
              <span>Status</span>
              <span>Data</span>
            </div>
            <div className="space-y-2">
              {myOrders.completed.map((order, index) => (
                <div key={index} className="p-3 rounded bg-secondary/10 hover:bg-secondary/20 transition-colors">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${order.type === 'buy' ? 'text-success' : 'text-destructive'}`}>
                        {order.type === 'buy' ? 'Compra' : 'Venda'}
                      </span>
                      <Badge variant="outline" className="text-xs bg-success/20 text-success border-success/30">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs">Preço:</span>
                        <span className="text-foreground ml-1">{order.price.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Qtd:</span>
                        <span className="text-foreground ml-1">{order.amount.toFixed(4)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{order.date}</div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:grid grid-cols-5 gap-2 text-sm items-center">
                    <span className={order.type === 'buy' ? 'text-success font-medium' : 'text-destructive font-medium'}>
                      {order.type === 'buy' ? 'Compra' : 'Venda'}
                    </span>
                    <span className="text-foreground">{order.price.toFixed(4)}</span>
                    <span className="text-foreground">{order.amount.toFixed(4)}</span>
                    <Badge variant="outline" className="text-xs bg-success/20 text-success border-success/30 w-fit">
                      {order.status}
                    </Badge>
                    <span className="text-muted-foreground text-xs">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Price */}
        <div className="border-t border-border/30 p-4 bg-secondary/20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{currentPrice}</div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-success font-medium">{priceChange}</span>
                <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {percentChange}
                </Badge>
              </div>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="border-t border-border/30 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Volume de Negociações</h3>
              <div className="flex gap-1">
                {Object.keys(volumeData).map((period) => (
                  <Button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    variant={selectedPeriod === period ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 px-3 text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {volumeData[selectedPeriod as keyof typeof volumeData].volume}
                  </div>
                  <div className="text-sm text-muted-foreground">Volume Total</div>
                </div>
                <div className="text-right">
                  <div className="text-success font-medium">
                    {volumeData[selectedPeriod as keyof typeof volumeData].change}
                  </div>
                  <div className="text-sm text-muted-foreground">Variação</div>
                </div>
              </div>

              {/* Price Chart */}
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentChartData}>
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      domain={['dataMin - 0.005', 'dataMax + 0.005']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `$${value.toFixed(3)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'price' ? `$${value.toFixed(4)}` : value.toLocaleString(),
                        name === 'price' ? 'Preço' : 'Volume'
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <TradeModal
      open={modalOpen}
      onOpenChange={setModalOpen}
      type={modalType as 'buy' | 'sell'}
      order={selectedOrder}
    />
    </Card>
  );
}
