import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

const KPICards = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Sales",
      value: "+2,350",
      change: "+180.1% from last month", 
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: "Active Customers",
      value: "+12,234",
      change: "+19% since last hour",
      icon: Users,
      trend: "up"
    },
    {
      title: "Daily Sales",
      value: "+573",
      change: "+201 since yesterday",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;