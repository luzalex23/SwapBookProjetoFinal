import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TradeModal({
  open,
  onOpenChange,
  type,
  order
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type: 'buy' | 'sell';
  order: {
    price: string;
    amount: string;
    sender: {
      display: string;
      full: string;
    };
  } | null;
}) {
  const [userAmount, setUserAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setUserAmount("");
      setError("");
    }
  }, [open]);

  if (!order) return null;

  const maxAmount = parseFloat(order.amount);
  const parsedAmount = parseFloat(userAmount);

  const handleConfirm = () => {
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Digite uma quantidade válida.");
      return;
    }

    if (parsedAmount > maxAmount) {
      setError(`Quantidade máxima permitida: ${maxAmount.toFixed(4)}`);
      return;
    }

    // Executar ação de trade
    console.log(`[${type.toUpperCase()}]`, {
      price: order.price,
      amount: userAmount,
      to: order.sender.full,
    });

    onOpenChange(false); // Fecha o modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === 'buy' ? 'Confirmar Compra' : 'Confirmar Venda'}</DialogTitle>
          <DialogDescription>
            {type === 'buy'
              ? 'Digite a quantidade que deseja comprar.'
              : 'Digite a quantidade que deseja vender.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <div><strong>Preço unitário:</strong> {order.price} USDT</div>
          <div><strong>Disponível:</strong> {maxAmount.toFixed(4)}</div>
          <div><strong>Carteira:</strong> {order.sender.display}</div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantidade</label>
            <Input
              type="number"
              placeholder="Ex: 100.0"
              value={userAmount}
              onChange={(e) => {
                setUserAmount(e.target.value);
                setError("");
              }}
              min="0"
              step="any"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleConfirm}
            className={type === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            Confirmar {type === 'buy' ? 'Compra' : 'Venda'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
