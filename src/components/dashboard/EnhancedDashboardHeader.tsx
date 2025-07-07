import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, Bell, Search, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const EnhancedDashboardHeader = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userRole = localStorage.getItem("userRole") || "admin";
  const userName = localStorage.getItem("userName") || "User";

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Aspirin 100mg is running low (5 units left)",
      time: "2 minutes ago",
      type: "warning",
      unread: true
    },
    {
      id: 2,
      title: "New Order",
      message: "Order #ORD-2024-006 received from John Smith",
      time: "15 minutes ago",
      type: "info",
      unread: true
    },
    {
      id: 3,
      title: "Payment Processed",
      message: "Payment of $55.05 has been successfully processed",
      time: "1 hour ago",
      type: "success",
      unread: false
    },
    {
      id: 4,
      title: "System Update",
      message: "System maintenance scheduled for tonight at 2 AM",
      time: "3 hours ago",
      type: "info",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
  };

  const handleNotificationClick = (notificationId: number) => {
    // Mark notification as read
    console.log(`Marking notification ${notificationId} as read`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      default:
        return "🔔";
    }
  };
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-6 transition-all duration-300">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block">
          <EnhancedInput
            variant="glass"
            inputSize="sm"
            placeholder="Search anything..."
            icon={<Search className="h-4 w-4" />}
            className="w-64"
          />
        </div>

        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <EnhancedButton variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </EnhancedButton>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                You have {unreadCount} unread notifications
              </p>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        notification.unread ? "bg-primary/5" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t">
              <EnhancedButton variant="outline" size="sm" className="w-full">
                View All Notifications
              </EnhancedButton>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <EnhancedButton variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </EnhancedButton>

        {/* Settings */}
        <EnhancedButton variant="ghost" size="icon" onClick={handleSettingsClick}>
          <Settings className="h-4 w-4" />
        </EnhancedButton>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-border/50">
          <div className="text-right text-sm hidden sm:block">
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
          <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
              {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default EnhancedDashboardHeader;