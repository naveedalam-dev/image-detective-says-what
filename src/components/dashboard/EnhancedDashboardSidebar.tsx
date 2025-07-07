import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Package2, 
  ShoppingCart, 
  ShoppingBag,
  Package,
  RotateCcw,
  DollarSign,
  FileText,
  CreditCard,
  Users,
  UserCog,
  Settings,
  LogOut,
  Crown,
  History,
  Clock,
  Eye,
  Edit,
  Plus
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, badge: null },
      { title: "Products", url: "/dashboard/products", icon: Package2, badge: "156" },
      { title: "POS/Cart", url: "/dashboard/pos", icon: ShoppingCart, badge: null },
      { title: "Orders", url: "/dashboard/orders", icon: ShoppingBag, badge: "12" },
    ]
  },
  {
    title: "Inventory",
    items: [
      { title: "Suppliers", url: "/dashboard/suppliers", icon: Package, badge: null },
      { title: "Returns", url: "/dashboard/returns", icon: RotateCcw, badge: "3" },
    ]
  },
  {
    title: "Finance",
    items: [
      { title: "Expenses", url: "/dashboard/expenses", icon: DollarSign, badge: null },
      { title: "Reports", url: "/dashboard/reports", icon: FileText, badge: null },
      { title: "Payments", url: "/dashboard/payments", icon: CreditCard, badge: null },
    ]
  },
  {
    title: "Administration",
    items: [
      { title: "Customers", url: "/dashboard/customers", icon: Users, badge: null },
      { title: "User Management", url: "/dashboard/user-management", icon: UserCog, badge: null },
      { title: "Settings", url: "/dashboard/settings", icon: Settings, badge: null },
    ]
  }
];

// Recent activity history
const recentHistory = [
  {
    id: 1,
    action: "Viewed Order",
    item: "ORD-2024-001",
    time: "2 min ago",
    icon: Eye,
    url: "/dashboard/orders"
  },
  {
    id: 2,
    action: "Added Product",
    item: "Aspirin 100mg",
    time: "5 min ago",
    icon: Plus,
    url: "/dashboard/products"
  },
  {
    id: 3,
    action: "Updated Customer",
    item: "John Smith",
    time: "12 min ago",
    icon: Edit,
    url: "/dashboard/customers"
  },
  {
    id: 4,
    action: "Processed Payment",
    item: "$125.50",
    time: "18 min ago",
    icon: DollarSign,
    url: "/dashboard/payments"
  }
];
const EnhancedDashboardSidebar = () => {
  const userRole = localStorage.getItem("userRole") || "admin";
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg border-2 border-white">
            <img 
              src="/Artboard 1.png" 
              alt="Wahab Kidney & General Hospital" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">WKGH</h2>
            <p className="text-xs text-muted-foreground">Hospital Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {menuItems.map((section) => (
          <SidebarGroup key={section.title} className="mb-6">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="group">
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-accent/50 relative overflow-hidden",
                            isActive && "bg-primary/10 text-primary shadow-lg shadow-primary/20"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl" />
                            )}
                            <item.icon className={cn(
                              "h-5 w-5 transition-all duration-300 group-hover:scale-110",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                              "font-medium transition-colors duration-300",
                              isActive ? "text-primary" : "text-foreground"
                            )}>
                              {item.title}
                            </span>
                            {item.badge && (
                              <Badge 
                                variant="secondary" 
                                className={cn(
                                  "ml-auto text-xs h-5 px-2 transition-all duration-300",
                                  isActive && "bg-primary/20 text-primary"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
        {/* Recent History Section */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <History className="h-3 w-3" />
            Recent Activity
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {recentHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.url)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/30 cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <item.icon className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.item}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="text-[10px]">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-border/30">
              <EnhancedButton
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-muted-foreground hover:text-primary"
                onClick={() => navigate("/dashboard/reports")}
              >
                <History className="h-3 w-3 mr-2" />
                View All Activity
              </EnhancedButton>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        
      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <EnhancedButton 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </EnhancedButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default EnhancedDashboardSidebar;