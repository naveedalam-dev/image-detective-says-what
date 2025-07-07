import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  Download, 
  History as HistoryIcon,
  ShoppingBag,
  CreditCard,
  Users,
  Settings,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Activity,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { format, subDays, isWithinInterval } from "date-fns";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  type: "order" | "payment" | "user_action" | "system" | "inventory" | "customer";
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  status?: "success" | "warning" | "error" | "info";
  amount?: number;
  metadata?: Record<string, any>;
}

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("all");

  // Mock history data
  const historyData: HistoryItem[] = [
    {
      id: "1",
      type: "order",
      title: "New Order Created",
      description: "Order #ORD-2024-001 created by John Smith for $55.05",
      timestamp: new Date("2024-01-16T10:30:00"),
      user: "John Smith",
      status: "success",
      amount: 55.05,
      metadata: { orderId: "ORD-2024-001", items: 3 }
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Processed",
      description: "Credit card payment of $55.05 processed successfully",
      timestamp: new Date("2024-01-16T10:32:00"),
      user: "System",
      status: "success",
      amount: 55.05,
      metadata: { transactionId: "TXN-2024-001", method: "Credit Card" }
    },
    {
      id: "3",
      type: "inventory",
      title: "Stock Updated",
      description: "Aspirin 100mg stock reduced by 2 units",
      timestamp: new Date("2024-01-16T10:32:30"),
      user: "System",
      status: "info",
      metadata: { productId: "1", productName: "Aspirin 100mg", change: -2 }
    },
    {
      id: "4",
      type: "user_action",
      title: "User Login",
      description: "Dr. Sarah Wilson logged into the system",
      timestamp: new Date("2024-01-16T09:15:00"),
      user: "Dr. Sarah Wilson",
      status: "info",
      metadata: { role: "pharmacist", ip: "192.168.1.100" }
    },
    {
      id: "5",
      type: "system",
      title: "Backup Completed",
      description: "Daily system backup completed successfully",
      timestamp: new Date("2024-01-16T02:00:00"),
      user: "System",
      status: "success",
      metadata: { backupSize: "2.4GB", duration: "15 minutes" }
    },
    {
      id: "6",
      type: "customer",
      title: "New Customer Registered",
      description: "Emily Johnson created a new customer account",
      timestamp: new Date("2024-01-15T16:45:00"),
      user: "Emily Johnson",
      status: "success",
      metadata: { customerId: "CUST-2024-005", email: "emily.j@email.com" }
    },
    {
      id: "7",
      type: "order",
      title: "Order Cancelled",
      description: "Order #ORD-2024-004 cancelled by customer request",
      timestamp: new Date("2024-01-15T14:20:00"),
      user: "Mike Johnson",
      status: "warning",
      amount: 41.02,
      metadata: { orderId: "ORD-2024-004", reason: "Customer request" }
    },
    {
      id: "8",
      type: "system",
      title: "Low Stock Alert",
      description: "Cough Syrup stock is running low (5 units remaining)",
      timestamp: new Date("2024-01-15T12:00:00"),
      user: "System",
      status: "warning",
      metadata: { productId: "3", productName: "Cough Syrup", stock: 5 }
    },
    {
      id: "9",
      type: "payment",
      title: "Payment Failed",
      description: "Credit card payment of $41.02 failed - insufficient funds",
      timestamp: new Date("2024-01-15T11:30:00"),
      user: "System",
      status: "error",
      amount: 41.02,
      metadata: { transactionId: "TXN-2024-004", error: "Insufficient funds" }
    },
    {
      id: "10",
      type: "user_action",
      title: "Settings Updated",
      description: "Store information updated by Admin User",
      timestamp: new Date("2024-01-15T10:15:00"),
      user: "Admin User",
      status: "info",
      metadata: { section: "Store Information", changes: ["phone", "address"] }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4" />;
      case "payment":
        return <CreditCard className="w-4 h-4" />;
      case "user_action":
        return <Users className="w-4 h-4" />;
      case "system":
        return <Settings className="w-4 h-4" />;
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "customer":
        return <Users className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-success text-success-foreground">Success</Badge>;
      case "warning":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Warning</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "info":
        return <Badge variant="outline">Info</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "info":
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesTab = activeTab === "all" || item.type === activeTab;
    
    const matchesDate = isWithinInterval(item.timestamp, {
      start: dateRange.from,
      end: dateRange.to
    });
    
    return matchesSearch && matchesType && matchesStatus && matchesTab && matchesDate;
  });

  const getHistoryStats = () => {
    const totalEvents = historyData.length;
    const todayEvents = historyData.filter(item => 
      format(item.timestamp, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    ).length;
    const successEvents = historyData.filter(item => item.status === "success").length;
    const errorEvents = historyData.filter(item => item.status === "error").length;

    return { totalEvents, todayEvents, successEvents, errorEvents };
  };

  const stats = getHistoryStats();

  const handleExport = () => {
    // Mock export functionality
    console.log("Exporting history data...");
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HistoryIcon className="w-8 h-8" />
            History
          </h2>
          <p className="text-muted-foreground">
            Track all system activities, transactions, and user actions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* History Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">All recorded events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayEvents}</div>
            <p className="text-xs text-muted-foreground">Events today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successEvents}</div>
            <p className="text-xs text-muted-foreground">Successful operations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.errorEvents}</div>
            <p className="text-xs text-muted-foreground">Failed operations</p>
          </CardContent>
        </Card>
      </div>

      {/* History Content */}
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>
            Complete log of all system activities and user actions
          </CardDescription>
          
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search history..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="user_action">User Actions</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="order">Orders</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="user_action">Users</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="customer">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-8">
                  <HistoryIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No history found matching your criteria.</p>
                </div>
              ) : (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {filteredHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            item.status === "success" && "bg-success/10 text-success",
                            item.status === "warning" && "bg-warning/10 text-warning",
                            item.status === "error" && "bg-destructive/10 text-destructive",
                            item.status === "info" && "bg-muted",
                            !item.status && "bg-muted"
                          )}>
                            {getTypeIcon(item.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <div className="flex items-center gap-2">
                              {item.amount && (
                                <span className="text-sm font-medium">
                                  ${item.amount.toFixed(2)}
                                </span>
                              )}
                              {getStatusBadge(item.status)}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" />
                                {format(item.timestamp, "MMM dd, yyyy HH:mm")}
                              </span>
                              {item.user && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {item.user}
                                </span>
                              )}
                            </div>
                            
                            {item.metadata && (
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Eye className="w-3 h-3 mr-1" />
                                Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default HistoryPage;