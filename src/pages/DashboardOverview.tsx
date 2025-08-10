import EnhancedKPICards from "@/components/dashboard/EnhancedKPICards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentSales from "@/components/dashboard/RecentSales";

const DashboardOverview = () => {
  return (
    <div className="container-fluid py-12 space-y-12 animate-fade-in">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black font-display bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-xl font-medium max-w-2xl">
            Welcome back! Here's your real-time business intelligence and performance metrics.
          </p>
        </div>
        <div className="animate-float">
          <div className="glass rounded-3xl p-6 border border-border-soft shadow-glow">
            <div className="text-sm text-muted-foreground font-semibold">Live Status</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <span className="font-bold text-success">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
      
      <EnhancedKPICards />
      
      <div className="grid gap-12 lg:grid-cols-7">
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