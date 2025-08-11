import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, TrendingUp, RotateCcw, ArrowLeftRight, Plus, Minus, Send, Download, QrCode, Copy, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
export function SwapCard() {
  const [amount, setAmount] = useState("0.00");
  const [isReversed, setIsReversed] = useState(false);
  const [activeTab, setActiveTab] = useState<'convert' | 'send' | 'receive'>('convert');
  const [selectedSendToken, setSelectedSendToken] = useState("LOOP");
  const {
    toast
  } = useToast();
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };
  const handleAmountIncrease = () => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + 1).toFixed(2));
  };
  const handleAmountDecrease = () => {
    const currentAmount = parseFloat(amount) || 0;
    if (currentAmount > 0) {
      setAmount((currentAmount - 1).toFixed(2));
    }
  };
  const handleReverse = () => {
    setIsReversed(!isReversed);
  };
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b8D23d7E8D8d1f24c3");
    toast({
      title: "Endereço copiado!",
      description: "O endereço da carteira foi copiado para a área de transferência."
    });
  };
  const fromToken = isReversed ? "LOOP" : "USDT";
  const toToken = isReversed ? "USDT" : "LOOP";
  const fromTokenName = isReversed ? "Loop (USD)" : "Tether (USD)";
  const toTokenName = isReversed ? "Tether (USD)" : "Loop (USD)";
  const getTokenImage = (token: string) => {
    switch (token) {
      case "USDT":
        return "/lovable-uploads/ff5a0102-1629-41f2-9661-ce83b89dd6da.png";
      case "LOOP":
        return "/lovable-uploads/e295660d-e9ab-40f3-9fee-c16e70675159.png";
      case "WEbdEX":
        return "/lovable-uploads/bb7ea286-24d3-4917-b804-8e58b88017a4.png";
      default:
        return "/lovable-uploads/e295660d-e9ab-40f3-9fee-c16e70675159.png";
    }
  };
  const getTokenName = (token: string) => {
    switch (token) {
      case "USDT":
        return "Tether (USD)";
      case "LOOP":
        return "Loop (USD)";
      case "WEbdEX":
        return "WebdEX Token";
      default:
        return token;
    }
  };
  const renderConvertTab = () => <>
      <div className="space-y-4">
        {/* From Section */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            De
          </Label>
          <div className="bg-secondary/30 border border-border rounded-xl py-4 px-4 hover:bg-secondary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={getTokenImage(fromToken)} alt={fromToken} className="w-10 h-10 rounded-full" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">{fromToken}</div>
                  <div className="text-sm text-muted-foreground">{fromTokenName}</div>
                </div>
              </div>
              <div className="text-right">
                <Input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)} placeholder="0.00" className="text-right text-4xl font-semibold bg-transparent border-none py-2 px-3 h-12 w-24 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center">
          <Button onClick={handleReverse} variant="outline" size="lg" className="rounded-full w-14 h-14 p-0 border-2 border-accent/30 hover:border-accent hover:bg-accent/20 bg-background hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
            <ArrowUpDown className="h-6 w-6" />
          </Button>
        </div>

        {/* To Section */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Para
          </Label>
          <div className="bg-secondary/30 border border-border rounded-xl p-4 hover:bg-secondary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={getTokenImage(toToken)} alt={toToken} className="w-10 h-10 rounded-full" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">{toToken}</div>
                  <div className="text-sm text-muted-foreground">{toTokenName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-semibold text-foreground">
                  {(parseFloat(amount) * 1.02 || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-lg p-3 mt-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Taxa de gás</span>
          <span className="text-foreground font-medium">0.1%</span>
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-12 text-base font-semibold mt-6">
        <ArrowUpDown className="mr-2 h-4 w-4" />
        Converter
      </Button>
    </>;
  const renderSendTab = () => <>
      <div className="space-y-4">
        {/* Token Section */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Enviar
          </Label>
          <div className="bg-secondary/30 border border-border rounded-xl py-4 px-4 hover:bg-secondary/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={getTokenImage(selectedSendToken)} alt={selectedSendToken} className="w-10 h-10 rounded-full" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">{selectedSendToken}</div>
                  <div className="text-sm text-muted-foreground">{getTokenName(selectedSendToken)}</div>
                </div>
                <Select value={selectedSendToken} onValueChange={setSelectedSendToken}>
                  <SelectTrigger className="w-6 h-6 bg-transparent border-none p-0 shadow-none ml-2 hover:bg-accent/20 rounded-full transition-colors">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOOP">
                      <div>
                        <div className="font-medium">LOOP</div>
                        <div className="text-sm text-muted-foreground">Loop (USD)</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="USDT">
                      <div>
                        <div className="font-medium">USDT</div>
                        <div className="text-sm text-muted-foreground">Tether (USD)</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="WEbdEX">
                      <div>
                        <div className="font-medium">WEbdEX</div>
                        <div className="text-sm text-muted-foreground">WebdEX Token</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <Input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)} placeholder="0.00" className="text-right text-4xl font-semibold bg-transparent border-none py-2 px-3 h-12 w-24 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Destination Address */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Endereço de destino
          </Label>
          <Input placeholder="0x742d35Cc6634C0532925a3b8D23d7E8D8d1f24c3" className="bg-secondary/30 border border-border rounded-xl p-4 h-auto text-foreground hover:bg-secondary/40 transition-colors" />
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-lg p-3 mt-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Taxa de rede</span>
          <span className="text-foreground font-medium">0.005 POL</span>
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-12 text-base font-semibold mt-6">
        <Send className="mr-2 h-4 w-4" />
        Enviar
      </Button>
    </>;
  const renderReceiveTab = () => <>
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-lg flex items-center justify-center mb-4">
            <QrCode className="w-20 h-20 sm:w-32 sm:h-32 text-black" />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Escaneie o QR code para receber tokens
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-foreground text-base font-medium">Endereço da carteira</Label>
          <div className="bg-secondary/50 border-2 border-border rounded-lg p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-foreground font-mono text-xs sm:text-sm flex-1 truncate overflow-hidden">
                0x742d35Cc6634C0532925a3b8D23d7E8D8d1f24c3
              </span>
              <Button onClick={handleCopyAddress} variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-accent/20 flex-shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>;
  return <Card className="bg-gradient-card border-2 border-accent/30 shadow-glow backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />
      
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center">
          <div className="bg-secondary/50 p-1 rounded-lg flex">
            <Button onClick={() => setActiveTab('convert')} variant={activeTab === 'convert' ? 'default' : 'ghost'} className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all">
              Converter
            </Button>
            <Button onClick={() => setActiveTab('send')} variant={activeTab === 'send' ? 'default' : 'ghost'} className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all">
              Enviar
            </Button>
            <Button onClick={() => setActiveTab('receive')} variant={activeTab === 'receive' ? 'default' : 'ghost'} className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all">
              Receber
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-8 pb-6 sm:pb-8">
        {activeTab === 'convert' && renderConvertTab()}
        {activeTab === 'send' && renderSendTab()}
        {activeTab === 'receive' && renderReceiveTab()}
      </CardContent>
    </Card>;
}