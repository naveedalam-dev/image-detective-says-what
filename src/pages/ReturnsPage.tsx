import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, RotateCcw, Calendar, DollarSign, Package, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Return {
  id: string;
  returnNumber: string;
  orderNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "processed";
  returnDate: Date;
  refundAmount: number;
  notes?: string;
}

const ReturnsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock returns data
  const returns: Return[] = [
    {
      id: "1",
      returnNumber: "RET-2024-001",
      orderNumber: "ORD-2024-001",
      customerName: "John Smith",
      productName: "Aspirin 100mg",
      quantity: 1,
      reason: "Damaged product",
      status: "approved",
      returnDate: new Date("2024-01-16"),
      refundAmount: 12.99,
      notes: "Product packaging was damaged during shipping"
    },
    {
      id: "2",
      returnNumber: "RET-2024-002",
      orderNumber: "ORD-2024-003",
      customerName: "Mike Davis",
      productName: "Thermometer",
      quantity: 1,
      reason: "Wrong item received",
      status: "pending",
      returnDate: new Date("2024-01-15"),
      refundAmount: 29.99,
      notes: "Customer ordered digital thermometer but received analog"
    },
    {
      id: "3",
      returnNumber: "RET-2024-003",
      orderNumber: "ORD-2024-002",
      customerName: "Sarah Johnson",
      productName: "Cough Syrup",
      quantity: 1,
      reason: "Expired product",
      status: "processed",
      returnDate: new Date("2024-01-14"),
      refundAmount: 8.99,
      notes: "Product was past expiration date"
    },
    {
      id: "4",
      returnNumber: "RET-2024-004",
      orderNumber: "ORD-2024-005",
      customerName: "Robert Brown",
      productName: "Hand Sanitizer",
      quantity: 2,
      reason: "Customer changed mind",
      status: "rejected",
      returnDate: new Date("2024-01-13"),
      refundAmount: 0,
      notes: "Return requested after 30-day return policy period"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-success text-success-foreground">Approved</Badge>;
      case "processed":
        return <Badge variant="default" className="bg-chart-blue text-white">Processed</Badge>;
      case "pending":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredReturns = returns.filter(returnItem => {
    const matchesSearch = 
      returnItem.returnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || returnItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getReturnStats = () => {
    const totalReturns = returns.length;
    const pendingReturns = returns.filter(r => r.status === "pending").length;
    const approvedReturns = returns.filter(r => r.status === "approved").length;
    const totalRefunds = returns
      .filter(r => r.status === "processed")
      .reduce((sum, returnItem) => sum + returnItem.refundAmount, 0);

    return { totalReturns, pendingReturns, approvedReturns, totalRefunds };
  };

  const stats = getReturnStats();

  const handleAddReturn = () => {
    toast({
      title: "Return Added",
      description: "New return request has been created successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Returns</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Return
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Return Request</DialogTitle>
              <DialogDescription>Enter return details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input id="orderNumber" placeholder="Enter order number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Return Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damaged">Damaged product</SelectItem>
                    <SelectItem value="wrong-item">Wrong item received</SelectItem>
                    <SelectItem value="expired">Expired product</SelectItem>
                    <SelectItem value="defective">Defective product</SelectItem>
                    <SelectItem value="changed-mind">Customer changed mind</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
              <Button onClick={handleAddReturn} className="w-full">Create Return</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Return Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReturns}</div>
            <p className="text-xs text-muted-foreground">All return requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReturns}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedReturns}</div>
            <p className="text-xs text-muted-foreground">Ready for processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRefunds.toFixed(2)}</div>
            <div className="text-2xl font-bold">Rs {stats.totalRefunds.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Processed refunds</p>
          </CardContent>
        </Card>
      </div>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
          <CardDescription>Manage product returns and refund requests</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search returns..." 
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return #</TableHead>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Refund</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                  <TableCell>{returnItem.orderNumber}</TableCell>
                  <TableCell>{returnItem.customerName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{returnItem.productName}</div>
                      <div className="text-sm text-muted-foreground">Qty: {returnItem.quantity}</div>
                    </div>
                  </TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {format(returnItem.returnDate, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {returnItem.refundAmount > 0 ? `Rs ${returnItem.refundAmount.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReturnsPage;