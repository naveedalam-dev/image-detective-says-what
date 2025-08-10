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
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between glass border-b border-border-soft px-8 transition-all duration-500">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2 rounded-xl hover:bg-primary/10 transition-all duration-300" />
        <div className="font-display text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          POS System
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* AI-Enhanced Search */}
        <div className="hidden md:block relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
          <EnhancedInput
            variant="glass"
            inputSize="sm"
            placeholder="AI-powered search..."
            icon={<Search className="h-4 w-4 text-primary" />}
            className="w-80 h-12 glass border border-border-soft shadow-soft hover:shadow-glow transition-all duration-300"
          />
        </div>

        {/* Notifications with Glow */}
        <div className="relative group">
          <EnhancedButton 
            variant="ghost" 
            size="icon" 
            className="relative h-12 w-12 rounded-2xl hover:bg-primary/10 transition-all duration-300 group-hover:shadow-glow"
          >
            <Bell className="h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300" />
            <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 text-xs bg-gradient-primary text-primary-foreground animate-pulse-glow border-2 border-background">
              3
            </Badge>
          </EnhancedButton>
        </div>

        {/* Premium Theme Toggle */}
        <EnhancedButton 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="h-12 w-12 rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:shadow-glow group"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-foreground group-hover:text-primary transition-all duration-300 group-hover:rotate-180" />
          ) : (
            <Moon className="h-5 w-5 text-foreground group-hover:text-primary transition-all duration-300 group-hover:-rotate-12" />
          )}
        </EnhancedButton>

        {/* Settings with Animation */}
        <EnhancedButton 
          variant="ghost" 
          size="icon"
          className="h-12 w-12 rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:shadow-glow group"
        >
          <Settings className="h-5 w-5 text-foreground group-hover:text-primary group-hover:rotate-90 transition-all duration-300" />
        </EnhancedButton>
        
        {/* Premium User Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-border-soft/70">
          <div className="text-right text-sm hidden sm:block space-y-1">
            <p className="font-semibold text-foreground font-display">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize font-medium">{userRole}</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300 blur-xl"></div>
            <Avatar className="h-12 w-12 ring-2 ring-primary/30 transition-all duration-500 hover:ring-primary hover:ring-4 hover:shadow-glow group-hover:scale-110 relative z-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-lg font-display">
                {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedDashboardHeader;