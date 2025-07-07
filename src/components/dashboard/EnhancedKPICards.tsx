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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <EnhancedCard 
          key={index} 
          variant="premium" 
          className={cn(
            "group hover:scale-105 transition-all duration-500 animate-slide-up",
            `stagger-${index + 1}`
          )}
        >
          <EnhancedCardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <EnhancedCardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </EnhancedCardTitle>
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
              "bg-gradient-to-br from-background to-muted/50"
            )}>
              <kpi.icon className={cn("h-5 w-5", kpi.color)} />
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold tracking-tight">
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals || 0}
                  duration={1500 + index * 200}
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  kpi.trend === "up" 
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" 
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                )}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <AnimatedCounter
                    value={kpi.change}
                    suffix="%"
                    decimals={1}
                    duration={1000 + index * 150}
                  />
                </div>
                <span className="text-muted-foreground">{kpi.changeText}</span>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>
      ))}
    </div>
  );
};

export default EnhancedKPICards;