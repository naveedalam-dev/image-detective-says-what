import EnhancedKPICards from "@/components/dashboard/EnhancedKPICards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentSales from "@/components/dashboard/RecentSales";

const DashboardOverview = () => {
  return (
    <div className="container-fluid py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
      </div>
      
      <EnhancedKPICards />
      
      <div className="grid gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4 animate-slide-up stagger-3">
          <OverviewChart />
        </div>
        <div className="lg:col-span-3 animate-slide-up stagger-4">
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;