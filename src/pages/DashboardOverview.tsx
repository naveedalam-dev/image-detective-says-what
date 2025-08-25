import EnhancedKPICards from "@/components/dashboard/EnhancedKPICards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentSales from "@/components/dashboard/RecentSales";

const DashboardOverview = () => {
  return (
    <div className="container-fluid py-8 space-y-8 animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-mono font-bold tracking-tighter">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Real-time analytics and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-lg">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-success">Live</span>
        </div>
      </div>
      
      <EnhancedKPICards />
      
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <OverviewChart />
        </div>
        <div className="lg:col-span-3">
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;