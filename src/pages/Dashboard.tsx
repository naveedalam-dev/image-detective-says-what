import { SidebarProvider } from "@/components/ui/sidebar";
import EnhancedDashboardHeader from "@/components/dashboard/EnhancedDashboardHeader";
import EnhancedDashboardSidebar from "@/components/dashboard/EnhancedDashboardSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-hero relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-elevated to-primary-soft/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-primary opacity-5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <EnhancedDashboardSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <EnhancedDashboardHeader />
          <main className="flex-1 overflow-auto scrollbar-thin">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;