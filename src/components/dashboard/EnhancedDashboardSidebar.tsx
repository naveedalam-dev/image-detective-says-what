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
  Crown
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
            <h2 className="font-semibold text-lg">WKGH</h2>
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