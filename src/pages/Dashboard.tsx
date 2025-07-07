import { SidebarProvider } from "@/components/ui/sidebar";
import EnhancedDashboardHeader from "@/components/dashboard/EnhancedDashboardHeader";
import EnhancedDashboardSidebar from "@/components/dashboard/EnhancedDashboardSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
        <EnhancedDashboardSidebar />
        <div className="flex-1 flex flex-col">
          <EnhancedDashboardHeader />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;