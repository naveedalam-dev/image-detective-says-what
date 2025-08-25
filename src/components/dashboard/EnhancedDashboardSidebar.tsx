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
    <Sidebar className="glass border-r border-border-soft/70 backdrop-blur-3xl">
      <SidebarHeader className="p-8 border-b border-border-soft/50">
        <div className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-3xl blur-lg transition-opacity duration-500"></div>
            <div className="h-14 w-14 rounded-3xl overflow-hidden shadow-glow border-2 border-primary/30 relative z-10 transition-all duration-300 group-hover:scale-110">
              <img 
                src="/Artboard 1.png" 
                alt="Wahab Kidney & General Hospital" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="font-black text-2xl font-display text-primary">POS</h2>
            <p className="text-sm text-muted-foreground font-semibold">Hospital Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6 py-8 space-y-8">
        {menuItems.map((section, sectionIndex) => (
          <SidebarGroup key={section.title} className="space-y-4">
            <SidebarGroupLabel className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4 font-display">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="group p-0">
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden",
                            "hover:bg-primary/5 hover:shadow-soft hover:scale-105",
                            "animate-slide-up opacity-0",
                            `stagger-${sectionIndex * 4 + itemIndex + 1}`,
                            isActive && "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-glow border border-primary/20"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <>
                                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-r-full" />
                              </>
                            )}
                            <div className={cn(
                              "p-3 rounded-xl transition-all duration-500 group-hover:scale-110",
                              "bg-gradient-to-br from-background to-muted-soft border border-border-soft",
                              isActive ? "bg-gradient-primary text-primary-foreground shadow-glow" : "group-hover:bg-primary/10"
                            )}>
                              <item.icon className={cn(
                                "h-5 w-5 transition-all duration-500",
                                isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                              )} />
                            </div>
                            <span className={cn(
                              "font-semibold font-display transition-all duration-300 text-base",
                              isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                            )}>
                              {item.title}
                            </span>
                            {item.badge && (
                              <Badge 
                                variant="secondary" 
                                className={cn(
                                  "ml-auto text-xs h-6 px-3 transition-all duration-300 font-bold rounded-xl",
                                  "border border-border-soft shadow-soft",
                                  isActive ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted-soft hover:bg-primary/10"
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
        
      <SidebarFooter className="p-6 border-t border-border-soft/50">
        <div className="space-y-4">
          {/* Premium User Profile Card */}
          <div className="relative group glass rounded-3xl p-6 border border-border-soft hover:shadow-glow transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 rounded-2xl blur-lg transition-opacity duration-500"></div>
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow relative z-10 transition-all duration-300 group-hover:scale-110">
                  <span className="text-primary-foreground font-black text-lg font-display">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-bold text-base truncate font-display">{userName}</p>
                <p className="text-sm text-muted-foreground capitalize font-semibold">{userRole}</p>
              </div>
            </div>
          </div>
          
          {/* Premium Logout Button */}
          <EnhancedButton 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-muted-foreground hover:text-destructive p-4 rounded-2xl font-semibold hover:bg-destructive/10 transition-all duration-300 group"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Sign Out
          </EnhancedButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default EnhancedDashboardSidebar;