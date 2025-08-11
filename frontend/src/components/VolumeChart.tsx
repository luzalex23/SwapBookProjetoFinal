import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const weeklyData = [
  { day: "Seg", volume: 3200 },
  { day: "Ter", volume: 2800 },
  { day: "Qua", volume: 4100 },
  { day: "Qui", volume: 4800 },
  { day: "Sex", volume: 3900 },
  { day: "Sáb", volume: 5200 },
  { day: "Dom", volume: 4300 }
];

export function VolumeChart() {
  const maxVolume = Math.max(...weeklyData.map(d => d.volume));

  return (
    <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Volume Semanal de Negociações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {weeklyData.map((data, index) => {
            const height = (data.volume / maxVolume) * 160;
            return (
              <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-primary rounded-t-md transition-all duration-500 hover:shadow-glow relative group"
                  style={{ height: `${height}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    ${data.volume.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Volume Total:</span>
            <span className="text-foreground font-medium">
              ${weeklyData.reduce((sum, d) => sum + d.volume, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}