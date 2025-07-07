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
import { Search, Plus, DollarSign, Calendar, Receipt, TrendingUp, Building, Truck, Zap, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
  vendor: string;
  paymentMethod: string;
  status: "paid" | "pending" | "overdue";
  receiptNumber?: string;
  notes?: string;
}

const ExpensesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock expenses data
  const expenses: Expense[] = [
    {
      id: "1",
      description: "Monthly rent for pharmacy space",
      category: "Rent",
      amount: 3500.00,
      date: new Date("2024-01-01"),
      vendor: "Property Management Co.",
      paymentMethod: "Bank Transfer",
      status: "paid",
      receiptNumber: "REC-2024-001",
      notes: "January rent payment"
    },
    {
      id: "2",
      description: "Electricity bill",
      category: "Utilities",
      amount: 245.50,
      date: new Date("2024-01-05"),
      vendor: "City Electric Company",
      paymentMethod: "Credit Card",
      status: "paid",
      receiptNumber: "REC-2024-002"
    },
    {
      id: "3",
      description: "Medical supplies inventory",
      category: "Inventory",
      amount: 1250.75,
      date: new Date("2024-01-10"),
      vendor: "MedSupply Corp",
      paymentMethod: "Check",
      status: "paid",
      receiptNumber: "REC-2024-003",
      notes: "Monthly inventory restocking"
    },
    {
      id: "4",
      description: "Staff training workshop",
      category: "Training",
      amount: 450.00,
      date: new Date("2024-01-12"),
      vendor: "Healthcare Training Institute",
      paymentMethod: "Credit Card",
      status: "pending",
      notes: "Pharmacy technician certification course"
    },
    {
      id: "5",
      description: "Delivery service fees",
      category: "Delivery",
      amount: 125.30,
      date: new Date("2024-01-15"),
      vendor: "QuickDelivery Services",
      paymentMethod: "Bank Transfer",
      status: "overdue",
      receiptNumber: "REC-2024-005"
    }
  ];

  const categories = ["all", "Rent", "Utilities", "Inventory", "Training", "Delivery", "Marketing", "Insurance", "Maintenance"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Rent":
        return <Building className="w-4 h-4" />;
      case "Utilities":
        return <Zap className="w-4 h-4" />;
      case "Inventory":
        return <Receipt className="w-4 h-4" />;
      case "Training":
        return <Users className="w-4 h-4" />;
      case "Delivery":
        return <Truck className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getExpenseStats = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const paidExpenses = expenses.filter(e => e.status === "paid").reduce((sum, expense) => sum + expense.amount, 0);
    const pendingExpenses = expenses.filter(e => e.status === "pending").reduce((sum, expense) => sum + expense.amount, 0);
    const overdueExpenses = expenses.filter(e => e.status === "overdue").reduce((sum, expense) => sum + expense.amount, 0);

    return { totalExpenses, paidExpenses, pendingExpenses, overdueExpenses };
  };

  const stats = getExpenseStats();

  const handleAddExpense = () => {
    toast({
      title: "Expense Added",
      description: "New expense has been recorded successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Record a new business expense.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter expense description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input id="vendor" placeholder="Enter vendor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
              <Button onClick={handleAddExpense} className="w-full">Add Expense</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expense Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalExpenses.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All recorded expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.paidExpenses.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.paidExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingExpenses.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.pendingExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.overdueExpenses.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.overdueExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Past due payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
          <CardDescription>Track and manage all business expenses</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search expenses..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      {expense.receiptNumber && (
                        <div className="text-sm text-muted-foreground">
                          Receipt: {expense.receiptNumber}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getCategoryIcon(expense.category)}
                      <span className="ml-2">{expense.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell className="font-medium">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">₹{expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {format(expense.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Receipt</Button>
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

export default ExpensesPage;