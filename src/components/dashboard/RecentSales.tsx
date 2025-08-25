import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
  {
    name: "Jackson Lee", 
    email: "jackson.lee@email.com",
    amount: "+$39.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com", 
    amount: "+$299.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00"
  }
];

const RecentSales = () => {
  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-mono font-bold tracking-tight">Recent Sales</h3>
          <p className="text-xs text-muted-foreground font-mono mt-1">265 sales this month</p>
        </div>

        {/* Sales List */}
        <div className="space-y-4">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <Avatar className="h-8 w-8 border border-border/40">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback className="text-xs font-mono bg-background/60">
                  {sale.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium font-mono truncate">{sale.name}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{sale.email}</p>
              </div>
              <div className="text-sm font-mono font-bold text-success">
                {sale.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSales;