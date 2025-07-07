import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import KPICards from "@/components/dashboard/KPICards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentSales from "@/components/dashboard/RecentSales";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="space-y-4">
              <KPICards />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverviewChart />
                <RecentSales />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;