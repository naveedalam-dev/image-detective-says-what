import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Users, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingBag, Edit, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateJoined: Date;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  status: "active" | "inactive";
  loyaltyPoints: number;
}

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock customers data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, AT 12345",
      dateJoined: new Date("2023-06-15"),
      totalOrders: 12,
      totalSpent: 456.78,
      lastOrderDate: new Date("2024-01-15"),
      status: "active",
      loyaltyPoints: 230
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Somewhere, SW 67890",
      dateJoined: new Date("2023-08-22"),
      totalOrders: 8,
      totalSpent: 234.56,
      lastOrderDate: new Date("2024-01-15"),
      status: "active",
      loyaltyPoints: 117
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Elsewhere, EW 54321",
      dateJoined: new Date("2023-04-10"),
      totalOrders: 15,
      totalSpent: 678.90,
      lastOrderDate: new Date("2024-01-14"),
      status: "active",
      loyaltyPoints: 339
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily.w@email.com",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, Nowhere, NW 98765",
      dateJoined: new Date("2023-09-05"),
      totalOrders: 3,
      totalSpent: 89.45,
      lastOrderDate: new Date("2023-12-20"),
      status: "inactive",
      loyaltyPoints: 45
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "+1 (555) 654-3210",
      address: "654 Maple Dr, Anywhere, AW 13579",
      dateJoined: new Date("2023-07-18"),
      totalOrders: 20,
      totalSpent: 892.34,
      lastOrderDate: new Date("2024-01-13"),
      status: "active",
      loyaltyPoints: 446
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getCustomerStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === "active").length;
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

    return { totalCustomers, activeCustomers, totalRevenue, averageOrderValue };
  };

  const stats = getCustomerStats();

  const handleAddCustomer = () => {
    toast({
      title: "Customer Added",
      description: "New customer has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Enter customer information below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name</Label>
                <Input id="customerName" placeholder="Enter customer name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
              <Button onClick={handleAddCustomer} className="w-full">Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customer Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
            <div className="text-2xl font-bold">₹{stats.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order average</p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>Manage your customer database and relationships</CardDescription>
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Loyalty Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {format(customer.dateJoined, "MMM yyyy")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {customer.address.split(',')[0]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.totalOrders}</div>
                    <div className="text-sm text-muted-foreground">orders</div>
                  </TableCell>
                  <TableCell className="font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">₹{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{format(customer.lastOrderDate, "MMM dd, yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.loyaltyPoints} pts</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Customer Details - {selectedCustomer?.name}</DialogTitle>
                          <DialogDescription>
                            Complete customer information and order history
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Contact Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Account Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Joined:</strong> {format(selectedCustomer.dateJoined, "MMM dd, yyyy")}</p>
                                  <p><strong>Status:</strong> {getStatusBadge(selectedCustomer.status)}</p>
                                  <p><strong>Loyalty Points:</strong> {selectedCustomer.loyaltyPoints}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Order Summary</h4>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Total Orders</p>
                                  <p className="font-medium text-lg">{selectedCustomer.totalOrders}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Spent</p>
                                  <p className="font-medium text-lg">${selectedCustomer.totalSpent.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Last Order</p>
                                  <p className="font-medium text-lg">{format(selectedCustomer.lastOrderDate, "MMM dd")}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
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

export default CustomersPage;