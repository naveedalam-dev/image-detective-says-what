import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CreditCard, DollarSign, Calendar, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

interface Payment {
  id: string;
  transactionId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed" | "refunded";
  date: Date;
  processingFee: number;
  netAmount: number;
}

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  // Mock payments data
  const payments: Payment[] = [
    {
      id: "1",
      transactionId: "TXN-2024-001",
      orderNumber: "ORD-2024-001",
      customerName: "John Smith",
      amount: 55.05,
      paymentMethod: "Credit Card",
      status: "completed",
      date: new Date("2024-01-15T10:30:00"),
      processingFee: 1.65,
      netAmount: 53.40
    },
    {
      id: "2",
      transactionId: "TXN-2024-002",
      orderNumber: "ORD-2024-002",
      customerName: "Sarah Johnson",
      amount: 32.36,
      paymentMethod: "Cash",
      status: "completed",
      date: new Date("2024-01-15T14:15:00"),
      processingFee: 0,
      netAmount: 32.36
    },
    {
      id: "3",
      transactionId: "TXN-2024-003",
      orderNumber: "ORD-2024-003",
      customerName: "Mike Davis",
      amount: 49.66,
      paymentMethod: "Credit Card",
      status: "pending",
      date: new Date("2024-01-14T16:45:00"),
      processingFee: 1.49,
      netAmount: 48.17
    },
    {
      id: "4",
      transactionId: "TXN-2024-004",
      orderNumber: "ORD-2024-004",
      customerName: "Emily Wilson",
      amount: 41.02,
      paymentMethod: "Debit Card",
      status: "failed",
      date: new Date("2024-01-14T09:20:00"),
      processingFee: 0,
      netAmount: 0
    },
    {
      id: "5",
      transactionId: "TXN-2024-005",
      orderNumber: "ORD-2024-005",
      customerName: "Robert Brown",
      amount: 40.98,
      paymentMethod: "Cash",
      status: "completed",
      date: new Date("2024-01-13T11:10:00"),
      processingFee: 0,
      netAmount: 40.98
    },
    {
      id: "6",
      transactionId: "TXN-2024-006",
      orderNumber: "ORD-2024-001",
      customerName: "John Smith",
      amount: 12.99,
      paymentMethod: "Credit Card",
      status: "refunded",
      date: new Date("2024-01-16T09:15:00"),
      processingFee: 0.39,
      netAmount: -12.99
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
      case "pending":
        return (
          <Badge variant="default" className="bg-warning text-warning-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="secondary">
            <TrendingUp className="w-3 h-3 mr-1" />
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
      case "Debit Card":
        return <CreditCard className="w-4 h-4" />;
      case "Cash":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getPaymentStats = () => {
    const totalPayments = payments.filter(p => p.status === "completed").reduce((sum, payment) => sum + payment.amount, 0);
    const totalFees = payments.filter(p => p.status === "completed").reduce((sum, payment) => sum + payment.processingFee, 0);
    const netRevenue = payments.filter(p => p.status === "completed").reduce((sum, payment) => sum + payment.netAmount, 0);
    const pendingPayments = payments.filter(p => p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0);

    return { totalPayments, totalFees, netRevenue, pendingPayments };
  };

  const stats = getPaymentStats();

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
      </div>

      {/* Payment Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalPayments.toFixed(2)}</div>
            <div className="text-2xl font-bold">Rs {stats.totalPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalFees.toFixed(2)}</div>
            <div className="text-2xl font-bold">Rs {stats.totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Transaction fees paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.netRevenue.toFixed(2)}</div>
            <div className="text-2xl font-bold">Rs {stats.netRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">After processing fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingPayments.toFixed(2)}</div>
            <div className="text-2xl font-bold">Rs {stats.pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>View and manage all payment transactions</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search payments..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Net Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.transactionId}</TableCell>
                  <TableCell>{payment.orderNumber}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">Rs {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <span className="ml-2">{payment.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <div>
                        <div>{format(payment.date, "MMM dd, yyyy")}</div>
                        <div className="text-sm text-muted-foreground">{format(payment.date, "HH:mm")}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.processingFee > 0 ? `Rs ${payment.processingFee.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className={`font-medium ${payment.netAmount < 0 ? 'text-destructive' : ''}`}>
                    Rs {payment.netAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No payments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentsPage;