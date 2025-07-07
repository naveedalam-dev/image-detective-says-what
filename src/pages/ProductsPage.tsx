import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProductsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    barcode: ""
  });

  // Mock product data
  const products = [
    {
      id: "1",
      name: "Aspirin 100mg",
      category: "Pain Relief",
      price: 12.99,
      stock: 150,
      status: "In Stock"
    },
    {
      id: "2", 
      name: "Vitamin D3 1000IU",
      category: "Vitamins",
      price: 24.99,
      stock: 75,
      status: "In Stock"
    },
    {
      id: "3",
      name: "Cough Syrup",
      category: "Cold & Flu",
      price: 8.99,
      stock: 5,
      status: "Low Stock"
    },
    {
      id: "4",
      name: "Bandages",
      category: "First Aid",
      price: 6.99,
      stock: 0,
      status: "Out of Stock"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge variant="default" className="bg-success text-success-foreground">{status}</Badge>;
      case "Low Stock":
        return <Badge variant="default" className="bg-warning text-warning-foreground">{status}</Badge>;
      case "Out of Stock":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAddProduct = () => {
    // Validate required fields
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Category, Price, Stock).",
        variant: "destructive"
      });
      return;
    }

    // Validate price and stock are numbers
    if (isNaN(Number(newProduct.price)) || isNaN(Number(newProduct.stock))) {
      toast({
        title: "Validation Error", 
        description: "Price and Stock must be valid numbers.",
        variant: "destructive"
      });
      return;
    }

    // Validate positive values
    if (Number(newProduct.price) <= 0 || Number(newProduct.stock) < 0) {
      toast({
        title: "Validation Error",
        description: "Price must be greater than 0 and Stock cannot be negative.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would make an API call
    console.log("Adding new product:", newProduct);
    
    toast({
      title: "Product Added Successfully",
      description: `${newProduct.name} has been added to your inventory.`,
    });

    // Reset form and close dialog
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      barcode: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter product details to add to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input 
                  id="productName" 
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={newProduct.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                    <SelectItem value="Vitamins">Vitamins</SelectItem>
                    <SelectItem value="Cold & Flu">Cold & Flu</SelectItem>
                    <SelectItem value="First Aid">First Aid</SelectItem>
                    <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                    <SelectItem value="Hygiene">Hygiene</SelectItem>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs) *</Label>
                  <Input 
                    id="price" 
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    min="0"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode (Optional)</Label>
                <Input 
                  id="barcode" 
                  placeholder="Enter barcode"
                  value={newProduct.barcode}
                  onChange={(e) => handleInputChange("barcode", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddProduct}
                  className="flex-1"
                >
                  Add Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active products in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.status === "In Stock").length}</div>
            <p className="text-xs text-muted-foreground">Products available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.status === "Low Stock").length}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.status === "Out of Stock").length}</div>
            <p className="text-xs text-muted-foreground">Unavailable products</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product catalog and inventory levels</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>Rs {product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
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

export default ProductsPage;