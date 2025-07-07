import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, Bell, Search, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import { Badge } from "@/components/ui/badge";

const EnhancedDashboardHeader = () => {
  const { theme, setTheme } = useTheme();
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userRole = localStorage.getItem("userRole") || "admin";
  const userName = localStorage.getItem("userName") || "User";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-6 transition-all duration-300">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
          Hospital Management System
        </h1>
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
        <div className="relative">
          <EnhancedButton variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </EnhancedButton>
        </div>

        {/* Theme Toggle */}
        <EnhancedButton variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </EnhancedButton>

        {/* Settings */}
        <EnhancedButton variant="ghost" size="icon">
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