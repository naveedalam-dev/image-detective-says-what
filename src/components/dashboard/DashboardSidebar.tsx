import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Products", url: "/dashboard/products", icon: Package2 },
      { title: "POS/Cart", url: "/dashboard/pos", icon: ShoppingCart },
      { title: "Orders", url: "/dashboard/orders", icon: ShoppingBag },
    ]
  },
  {
    title: "Inventory",
    items: [
      { title: "Suppliers", url: "/dashboard/suppliers", icon: Package },
      { title: "Returns", url: "/dashboard/returns", icon: RotateCcw },
    ]
  },
  {
    title: "Finance",
    items: [
      { title: "Expenses", url: "/dashboard/expenses", icon: DollarSign },
      { title: "Reports", url: "/dashboard/reports", icon: FileText },
      { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
    ]
  },
  {
    title: "Administration",
    items: [
      { title: "Customers", url: "/dashboard/customers", icon: Users },
      { title: "User Management", url: "/dashboard/user-management", icon: UserCog },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ]
  }
];

const DashboardSidebar = () => {
  const userRole = localStorage.getItem("userRole") || "admin";

  return (
    <Sidebar>
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "hover:bg-sidebar-accent/50"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>User Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2 text-sm">
              <p className="font-medium capitalize">{userRole} User</p>
              <p className="text-muted-foreground text-xs">
                {localStorage.getItem("userEmail")}
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;