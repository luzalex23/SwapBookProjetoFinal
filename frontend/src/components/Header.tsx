
import { Button } from "@/components/ui/button";
import { ArrowUpDown, History } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <ArrowUpDown className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Swap<span className="text-primary">Book</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <History className="h-4 w-4 mr-2" />
              Histórico de Swaps
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Book de Ofertas
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
