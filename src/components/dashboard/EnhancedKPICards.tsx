import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIData {
  title: string;
  value: number;
  change: number;
  changeText: string;
  icon: React.ElementType;
  trend: "up" | "down";
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color: string;
}

const EnhancedKPICards = () => {
  const kpiData: KPIData[] = [
    {
      title: "Total Revenue",
      value: 45231.89,
      change: 20.1,
      changeText: "from last month",
      icon: DollarSign,
      trend: "up",
      prefix: "$",
      decimals: 2,
      color: "text-emerald-600"
    },
    {
      title: "Sales",
      value: 2350,
      change: 180.1,
      changeText: "from last month", 
      icon: ShoppingCart,
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Active Customers",
      value: 12234,
      change: 19,
      changeText: "since last hour",
      icon: Users,
      trend: "up",
      prefix: "+",
      color: "text-purple-600"
    },
    {
      title: "Daily Sales",
      value: 573,
      change: 201,
      changeText: "since yesterday",
      icon: TrendingUp,
      trend: "up",
      prefix: "+",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={cn(
            "group relative glass rounded-3xl p-8 border border-border-soft",
            "hover:shadow-glow hover:scale-105 hover:-translate-y-2 transition-all duration-700",
            "animate-slide-up opacity-0",
            `stagger-${index + 1}`,
            "before:absolute before:inset-0 before:bg-gradient-primary before:opacity-0 before:rounded-3xl",
            "before:transition-opacity before:duration-500 hover:before:opacity-5"
          )}
        >
          {/* Floating background glow */}
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {kpi.title}
              </p>
              <div className={cn(
                "p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20",
                "group-hover:shadow-glow group-hover:bg-gradient-primary"
              )}>
                <kpi.icon className={cn(
                  "h-6 w-6 transition-all duration-500",
                  kpi.color,
                  "group-hover:text-white"
                )} />
              </div>
            </div>

            {/* Value */}
            <div className="mb-6">
              <div className="text-4xl font-black font-display tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals || 0}
                  duration={2000 + index * 300}
                />
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300",
                "border backdrop-blur-sm",
                kpi.trend === "up" 
                  ? "bg-success-soft text-success border-success/30 shadow-success" 
                  : "bg-destructive/10 text-destructive border-destructive/30"
              )}>
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 animate-bounce" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <AnimatedCounter
                  value={kpi.change}
                  suffix="%"
                  decimals={1}
                  duration={1500 + index * 200}
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium">{kpi.changeText}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnhancedKPICards;