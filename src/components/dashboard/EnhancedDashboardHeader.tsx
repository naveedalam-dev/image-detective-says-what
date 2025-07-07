Here's the fixed version with the missing closing brackets added:

```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun, Bell, Search, Settings, X, Check, AlertTriangle, Info, CheckCircle, Clock, Filter, MoreVertical, Zap, TrendingUp, Package, DollarSign, Users, Shield, Activity, ChevronDown, Star, Flame, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  timestamp: Date;
  type: "warning" | "success" | "info" | "error" | "system" | "critical" | "security";
  priority: "low" | "medium" | "high" | "critical" | "urgent" | "emergency";
  unread: boolean;
  category: "orders" | "inventory" | "payments" | "system" | "alerts" | "security" | "customers" | "reports";
  actionable?: boolean;
  actionText?: string;
  actionUrl?: string;
  avatar?: string;
  metadata?: {
    amount?: number;
    orderId?: string;
    customerId?: string;
    productName?: string;
    count?: number;
  };
  tags?: string[];
  source?: string;
}

const EnhancedDashboardHeader = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"time" | "priority">("time");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userRole = localStorage.getItem("userRole") || "admin";
  const userName = localStorage.getItem("userName") || "User";
  const userProfileImage = localStorage.getItem("userProfileImage") || "";

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize ultra-realistic notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        title: "🚨 EMERGENCY: System Security Breach Detected",
        message: "Multiple unauthorized access attempts from IP 45.123.67.89. System automatically locked. Immediate security review required. All admin accounts temporarily suspended.",
        time: "15 seconds ago",
        timestamp: new Date(Date.now() - 15 * 1000),
        type: "critical",
        priority: "emergency",
        unread: true,
        category: "security",
        actionable: true,
        actionText: "Secure Now",
        actionUrl: "/dashboard/security",
        tags: ["URGENT", "SECURITY", "BREACH"],
        source: "Security Monitor",
        metadata: { customerId: "SEC-BREACH-001" }
      },
      {
        id: 2,
        title: "⚡ CRITICAL: Life-Saving Medication Stock Alert",
        message: "Insulin Glargine 100 units/mL is CRITICALLY LOW (2 units remaining). 8 diabetic patients require immediate supply. Emergency procurement initiated.",
        time: "45 seconds ago",
        timestamp: new Date(Date.now() - 45 * 1000),
        type: "error",
        priority: "urgent",
        unread: true,
        category: "inventory",
        actionable: true,
        actionText: "Emergency Order",
        actionUrl: "/dashboard/inventory",
        tags: ["CRITICAL", "LIFE-SAVING", "INSULIN"],
        source: "Inventory System",
        metadata: { productName: "Insulin Glargine", count: 2 }
      },
      {
        id: 3,
        title: "💎 VIP PRIORITY: $25,847.50 Premium Payment",
        message: "Platinum member Dr. Elizabeth Harrison processed premium payment. Priority handling required. Exclusive benefits package activated.",
        time: "2 minutes ago",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: "success",
        priority: "critical",
        unread: true,
        category: "payments",
        actionable: true,
        actionText: "VIP Service",
        actionUrl: "/dashboard/payments",
        tags: ["VIP", "PREMIUM", "PLATINUM"],
        source: "Payment Gateway",
        metadata: { amount: 25847.50, customerId: "VIP-001" }
      },
      {
        id: 4,
        title: "🔥 URGENT: Emergency Prescription Order",
        message: "Dr. Michael Chen submitted STAT prescription for cardiac emergency patient. Requires immediate preparation and priority delivery within 30 minutes.",
        time: "3 minutes ago",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        type: "warning",
        priority: "urgent",
        unread: true,
        category: "orders",
        actionable: true,
        actionText: "Process STAT",
        actionUrl: "/dashboard/orders",
        tags: ["STAT", "CARDIAC", "EMERGENCY"],
        source: "Prescription System",
        metadata: { orderId: "STAT-2024-001", customerId: "EMG-001" }
      },
      {
        id: 5,
        title: "⭐ MILESTONE: 10,000th Customer Served!",
        message: "Congratulations! You've just served your 10,000th customer this year. Outstanding achievement! Customer satisfaction: 99.2%. Revenue milestone: $2.4M.",
        time: "8 minutes ago",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        type: "success",
        priority: "high",
        unread: true,
        category: "system",
        tags: ["MILESTONE", "ACHIEVEMENT", "10K"],
        source: "Analytics Engine",
        metadata: { count: 10000, amount: 2400000 }
      },
      {
        id: 6,
        title: "📊 AI INSIGHT: Revenue Optimization Alert",
        message: "AI detected 34% revenue increase opportunity. Recommend adjusting pricing for 12 high-demand products. Projected additional revenue: $8,247/month.",
        time: "15 minutes ago",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: "info",
        priority: "high",
        unread: true,
        category: "reports",
        actionable: true,
        actionText: "View Insights",
        actionUrl: "/dashboard/reports",
        tags: ["AI", "OPTIMIZATION", "REVENUE"],
        source: "AI Analytics",
        metadata: { amount: 8247 }
      },
      {
        id: 7,
        title: "🎯 SMART ALERT: Bulk Order Opportunity",
        message: "Customer HealthCare Plus requesting bulk order (500+ units). Potential revenue: $45,000. Special pricing negotiation recommended.",
        time: "22 minutes ago",
        timestamp: new Date(Date.now() - 22 * 60 * 1000),
        type: "info",
        priority: "medium",
        unread: false,
        category: "customers",
        actionable: true,
        actionText: "Negotiate Deal",
        actionUrl: "/dashboard/customers",
        tags: ["BULK", "OPPORTUNITY", "NEGOTIATION"],
        source: "Sales Intelligence",
        metadata: { amount: 45000, customerId: "HCP-BULK-001" }
      },
      {
        id: 8,
        title: "🔧 SYSTEM: Automated Backup Completed",
        message: "Daily automated backup successfully completed. 2.4GB data secured. Cloud sync: 100%. Recovery point: 99.99% reliability. Next backup: 24 hours.",
        time: "1 hour ago",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: "system",
        priority: "low",
        unread: false,
        category: "system",
        tags: ["BACKUP", "AUTOMATED", "SECURE"],
        source: "Backup Service"
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;
  const criticalCount = notifications.filter(n => (n.priority === "critical" || n.priority === "urgent" || n.priority === "emergency") && n.unread).length;
  const emergencyCount = notifications.filter(n => n.priority === "emergency" && n.unread).length;
  const urgentCount = notifications.filter(n => n.priority === "urgent" && n.unread).length;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      )
    );
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setNotificationsOpen(false);
    } else {
      setSelectedNotification(notification);
      setShowDetailModal(true);
    }
  };

  const markAllAsRead = () => {
    setIsAnimating(true);
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
      setIsAnimating(false);
      setIsLoading(false);
    }, 600);
  };

  const clearAllNotifications = () => {
    setIsAnimating(true);
    setIsLoading(true);
    setTimeout(() => {
      setNotifications([]);
      setIsAnimating(false);
      setIsLoading(false);
      setNotificationsOpen(false);
    }, 600);
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = cn(
      "w-5 h-5 flex-shrink-0 transition-all duration-300 drop-shadow-md",
      (priority === "emergency" || priority === "urgent") && "animate-pulse scale-110"
    );
    
    switch (type) {
      case "critical":
      case "security":
        return <Shield className={cn(iconClass, "text-red-600 drop-shadow-lg animate-pulse")} />;
      case "error":
        return <AlertTriangle className={cn(iconClass, "text-red-500 drop-shadow-lg")} />;
      case "warning":
        return <AlertCircle className={cn(iconClass, "text-amber-500 drop-shadow-md")} />;
      case "success":
        return <CheckCircle className={cn(iconClass, "text-emerald-500 drop-shadow-md")} />;
      case "info":
        return <Info className={cn(iconClass, "text-blue-500 drop-shadow-md")} />;
      case "system":
        return <Activity className={cn(iconClass, "text-purple-500 drop-shadow-md")} />;
      default:
        return <Bell className={cn(iconClass, "text-gray-500")} />;
    }
  };

  const getPriorityStyles = (priority: string, unread: boolean) => {
    const baseStyles = "transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer";
    
    switch (priority) {
      case "emergency":
        return cn(
          baseStyles,
          "border-l-4 border-l-red-700 bg-gradient-to-r from-red-100 via-red-50 to-transparent dark:from-red-950/40 dark:via-red-950/20 dark:to-transparent",
          unread && "ring-4 ring-red-600/40 shadow-2xl shadow-red-600/30 animate-pulse border-2 border-red-600/50"
        );
      case "urgent":
        return cn(
          baseStyles,
          "border-l-4 border-l-red-600 bg-gradient-to-r from-red-50 via-red-25 to-transparent dark:from-red-950/30 dark:via-red-950/15 dark:to-transparent",
          unread && "ring-3 ring-red-500/35 shadow-xl shadow-red-500/25 animate-pulse"
        );
      case "critical":
        return cn(
          baseStyles,
          "border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 via-red-25 to-transparent dark:from-red-950/25 dark:via-red-950/10 dark:to-transparent",
          unread && "ring-2 ring-red-400/30 shadow-lg shadow-red-400/20"
        );
      case "high":
        return cn(
          baseStyles,
          "border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 via-amber-25 to-transparent dark:from-amber-950/25 dark:via-amber-950/10 dark:to-transparent",
          unread && "ring-2 ring-amber-400/30 shadow-lg shadow-amber-400/20"
        );
      case "medium":
        return cn(
          baseStyles,
          "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 via-blue-25 to-transparent dark:from-blue-950/25 dark:via-blue-950/10 dark:to-transparent",
          unread && "ring-2 ring-blue-400/25 shadow-md shadow-blue-400/15"
        );
      case "low":
        return cn(
          baseStyles,
          "border-l-4 border-l-gray-400 bg-gradient-to-r from-gray-50 via-gray-25 to-transparent dark:from-gray-950/20 dark:via-gray-950/10 dark:to-transparent",
          unread && "ring-1 ring-gray-300/20"
        );
      default:
        return cn(baseStyles, "border-l-4 border-l-gray-300");
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "emergency":
        return (
          <Badge className="bg-red-700 text-white text-xs px-2 py-0.5 animate-pulse shadow-xl font-bold">
            🚨 EMERGENCY
          </Badge>
        );
      case "urgent":
        return (
          <Badge className="bg-red-600 text-white text-xs px-2 py-0.5 animate-pulse shadow-lg font-bold">
            ⚡ URGENT
          </Badge>
        );
      case "critical":
        return (
          <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 shadow-md font-semibold">
            🔥 CRITICAL
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5 shadow-md font-semibold">
            ⭐ HIGH
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5 font-medium">
            📋 MEDIUM
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            📝 LOW
          </Badge>
        );
      default:
        return null;
    }
  };

  const filterNotifications = (category: string) => {
    let filtered = notifications;
    
    if (category !== "all") {
      if (category === "unread") {
        filtered = notifications.filter(n => n.unread);
      } else if (category === "critical") {
        filtered = notifications.filter(n => n.priority === "critical" || n.priority === "urgent" || n.priority === "emergency");
      } else {
        filtered = notifications.filter(n => n.category === category);
      }
    }
    
    if (showOnlyUnread) {
      filtered = filtered.filter(n => n.unread);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { emergency: 6, urgent: 5, critical: 4, high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        
        if (aPriority !== bPriority) return bPriority - aPriority;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  };

  const getTabCount = (category: string) => {
    const filtered = filterNotifications(category);
    const unreadInCategory = filtered.filter(n => n.unread).length;
    return unreadInCategory > 0 ? unreadInCategory : null;
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (seconds < 30) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "orders": return <Package className="w-4 h-4" />;
      case "inventory": return <Package className="w-4 h-4" />;
      case "payments": return <DollarSign className="w-4 h-4" />;
      case "system": return <Activity className="w-4 h-4" />;
      case "alerts": return <AlertTriangle className="w-4 h-4" />;
      case "security": return <Shield className="w-4 h-4" />;
      case "customers": return <Users className="w-4 h-4" />;
      case "reports": return <TrendingUp className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationWidth = () => {
    if (isMobile) return "w-[calc(100vw-0.5rem)]";
    return "w-[420px] sm:w-[480px] lg:w-[520px] xl:w-[580px]";
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 sm:h-16 items-center justify-between border-b bg-background/98 backdrop-blur-xl px-2 sm:px-4 lg:px-6 transition-all duration-300 shadow-sm border-border/50">
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          <SidebarTrigger />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          {/* Search - Ultra Responsive */}
          <div className="hidden lg:block">
            <EnhancedInput
              variant="glass"
              inputSize="sm"
              placeholder="Search anything..."
              icon={<Search className="h-4 w-4" />}
              className="w-40 xl:w-56 2xl:w-64 transition-all duration-300"
            />
          </div>

          {/* Mobile Search Button */}
          <div className="lg:hidden">
            <EnhancedButton 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 sm:h-9 sm:w-9 hover:scale-110 transition-all duration-300"
            >
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </EnhancedButton>
          </div>

          {/* GOD-Level Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <EnhancedButton 
                  ref={bellRef}
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "relative h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 transition-all duration-500 hover:scale-110 focus:scale-110",
                    emergencyCount > 0 && "animate-bounce ring-4 ring-red-700/40 bg-red-100 dark:bg-red-950/30",
                    urgentCount > 0 && !emergencyCount && "animate-pulse ring-3 ring-red-600/30 bg-red-50 dark:bg-red-950/20",
                    criticalCount > 0 && !urgentCount && !emergencyCount && "ring-2 ring-red-500/25 bg-red-25 dark:bg-red-950/15"
                  )}
                >
                  <Bell className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300",
                    unreadCount > 0 && "text-primary",
                    emergencyCount > 0 && "text-red-700 animate-pulse",
                    urgentCount > 0 && !emergencyCount && "text-red-600",
                    criticalCount > 0 && !urgentCount && !emergencyCount && "text-red-500"
                  )} />
                  
                  {/* Ultra-Premium Notification Badge */}
                  {unreadCount > 0 && (
                    <Badge className={cn(
                      "absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-xl border-2 border-background",
                      emergencyCount > 0 
                        ? "bg-red-700 text-white shadow-red-700/60 animate-pulse ring-2 ring-red-700/40 scale-110" 
                        : urgentCount > 0
                        ? "bg-red-600 text-white shadow-red-600/50 animate-pulse ring-2 ring-red-600/30 scale-105"
                        : criticalCount > 0
                        ? "bg-red-500 text-white shadow-red-500/40 ring-2 ring-red-500/25"
                        : "bg-primary text-primary-foreground shadow-primary/50 ring-2 ring-primary/30"
                    )}>
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </Badge>
                  )}
                  
                  {/* Emergency Pulse Rings */}
                  {emergencyCount > 0 && (
                    <>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-700 rounded-full animate-ping opacity-75" />
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-700 rounded-full animate-ping opacity-50 animation-delay-150" />
                    </>
                  )}
                  
                  {/* Urgent Pulse Ring */}
                  {urgentCount > 0 && !emergencyCount && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75" />
                  )}
                  
                  {/* Critical Glow */}
                  {criticalCount > 0 && !urgentCount && !emergencyCount && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-75" />
                  )}
                </EnhancedButton>
              </div>
            </PopoverTrigger>
            
            <PopoverContent 
              className={cn(
                getNotificationWidth(),
                "p-0 shadow-2xl border-0 bg-background/99 backdrop-blur-xl rounded-2xl overflow-hidden"
              )}
              align="end"
              sideOffset={isMobile ? 8 : 12}
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Ultra-Premium Header */}
                <div className="relative p-3 sm:p-4 lg:p-6 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                  <div className="relative flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground flex items-center gap-2">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        Notifications
                        {emergencyCount > 0 && (
                          <Badge className="bg-red-700 text-white text-xs animate-pulse font-bold">
                            {emergencyCount} EMERGENCY
                          </Badge>
                        )}
                        {urgentCount > 0 && !emergencyCount && (
                          <Badge className="bg-red-600 text-white text-xs animate-pulse font-bold">
                            {urgentCount} URGENT
                          </Badge>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {unreadCount > 0 
                          ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}${criticalCount > 0 ? ` • ${criticalCount} critical` : ''}`
                          : "All caught up! 🎉"
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {unreadCount > 0 && (
                        <EnhancedButton
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs hover:bg-primary/10 h-7 px-2 sm:px-3"
                          loading={isLoading}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Mark all read</span>
                          <span className="sm:hidden">Read</span>
                        </EnhancedButton>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EnhancedButton variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                            <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                          </EnhancedButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Notification Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={markAllAsRead}>
                            <Check className="w-4 h-4 mr-2" />
                            Mark all as read
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setShowOnlyUnread(!showOnlyUnread)}>
                            <Filter className="w-4 h-4 mr-2" />
                            {showOnlyUnread ? "Show all" : "Show unread only"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSortBy(sortBy === "time" ? "priority" : "time")}>