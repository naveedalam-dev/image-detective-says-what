import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Package, DollarSign, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { format } from "date-fns";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      date: new Date("2024-01-15T10:30:00"),
      status: "completed",
      paymentMethod: "Credit Card",
      items: [
        { id: "1", name: "Aspirin 100mg", quantity: 2, price: 12.99, total: 25.98 },
        { id: "2", name: "Vitamin D3 1000IU", quantity: 1, price: 24.99, total: 24.99 }
      ],
      subtotal: 50.97,
      tax: 4.08,
      total: 55.05
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      date: new Date("2024-01-15T14:15:00"),
      status: "processing",
      paymentMethod: "Cash",
      items: [
        { id: "3", name: "Cough Syrup", quantity: 1, price: 8.99, total: 8.99 },
        { id: "4", name: "Bandages", quantity: 3, price: 6.99, total: 20.97 }
      ],
      subtotal: 29.96,
      tax: 2.40,
      total: 32.36
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customerName: "Mike Davis",
      customerEmail: "mike.davis@email.com",
      date: new Date("2024-01-14T16:45:00"),
      status: "pending",
      paymentMethod: "Credit Card",
      items: [
        { id: "5", name: "Ibuprofen 200mg", quantity: 1, price: 15.99, total: 15.99 },
        { id: "7", name: "Thermometer", quantity: 1, price: 29.99, total: 29.99 }
      ],
      subtotal: 45.98,
      tax: 3.68,
      total: 49.66
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      customerName: "Emily Wilson",
      customerEmail: "emily.w@email.com",
      date: new Date("2024-01-14T09:20:00"),
      status: "cancelled",
      paymentMethod: "Credit Card",
      items: [
        { id: "6", name: "Vitamin C 500mg", quantity: 2, price: 18.99, total: 37.98 }
      ],
      subtotal: 37.98,
      tax: 3.04,
      total: 41.02
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      customerName: "Robert Brown",
      customerEmail: "robert.brown@email.com",
      date: new Date("2024-01-13T11:10:00"),
      status: "completed",
      paymentMethod: "Cash",
      items: [
        { id: "8", name: "Hand Sanitizer", quantity: 5, price: 4.99, total: 24.95 },
        { id: "1", name: "Aspirin 100mg", quantity: 1, price: 12.99, total: 12.99 }
      ],
      subtotal: 37.94,
      tax: 3.04,
      total: 40.98
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="default" className="bg-chart-blue text-white">
            <Package className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="default" className="bg-warning text-warning-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "completed").length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const totalRevenue = orders
      .filter(o => o.status === "completed")
      .reduce((sum, order) => sum + order.total, 0);

    return { totalOrders, completedOrders, pendingOrders, totalRevenue };
  };

  const stats = getOrderStats();

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>

      {/* Order Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <div>
                        <div>{format(order.date, "MMM dd, yyyy")}</div>
                        <div className="text-sm text-muted-foreground">{format(order.date, "HH:mm")}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell className="font-medium">Rs {order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
                          <DialogDescription>
                            Complete order information and items
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Customer Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Order Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Date:</strong> {format(selectedOrder.date, "MMM dd, yyyy HH:mm")}</p>
                                  <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                                  <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="font-medium mb-3">Order Items</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedOrder.items.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>Rs {item.price.toFixed(2)}</TableCell>
                                      <TableCell>Rs {item.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>Rs {selectedOrder.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Tax:</span>
                                  <span>Rs {selectedOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                  <span>Total:</span>
                                  <span>Rs {selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default OrdersPage;