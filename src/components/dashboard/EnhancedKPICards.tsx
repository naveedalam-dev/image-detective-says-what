import { AnimatedCounter } from "@/components/ui/animated-counter";
import { DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIData {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const EnhancedKPICards = () => {
  const kpiData: KPIData[] = [
    {
      title: "Revenue",
      value: 45231.89,
      change: 20.1,
      trend: "up",
      icon: DollarSign,
      prefix: "$",
      decimals: 2
    },
    {
      title: "Sales",
      value: 2350,
      change: 12.5,
      trend: "up",
      icon: ShoppingCart
    },
    {
      title: "Users",
      value: 12234,
      change: 8.2,
      trend: "up",
      icon: Users,
      prefix: "+"
    },
    {
      title: "Growth",
      value: 573,
      change: 4.1,
      trend: "down",
      icon: TrendingUp,
      suffix: "%",
      decimals: 1
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={cn(
            "group relative",
            "bg-card/40 backdrop-blur-sm border border-border/50",
            "rounded-xl p-6",
            "hover:bg-card/60 hover:border-border",
            "transition-all duration-300 ease-out",
            "animate-fade-in",
            `stagger-${index + 1}`
          )}
        >
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent rounded-xl" />
          
          <div className="relative space-y-4">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-background/60 border border-border/40">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className={cn(
                "text-xs font-mono px-2 py-1 rounded-md",
                kpi.trend === "up" 
                  ? "text-success bg-success/10 border border-success/20" 
                  : "text-destructive bg-destructive/10 border border-destructive/20"
              )}>
                {kpi.trend === "up" ? "↗" : "↘"} {kpi.change.toFixed(1)}%
              </div>
            </div>

            {/* Title */}
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {kpi.title}
            </div>

            {/* Value */}
            <div className="text-2xl font-mono font-bold tracking-tighter text-foreground">
              <AnimatedCounter
                value={kpi.value}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
                decimals={kpi.decimals || 0}
                duration={1500 + index * 100}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnhancedKPICards;