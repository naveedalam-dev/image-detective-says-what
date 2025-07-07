import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Minus, ShoppingCart, CreditCard, DollarSign, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const POSPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock product data
  const products: Product[] = [
    { id: "1", name: "Aspirin 100mg", category: "Pain Relief", price: 12.99, stock: 150, barcode: "123456789" },
    { id: "2", name: "Vitamin D3 1000IU", category: "Vitamins", price: 24.99, stock: 75, barcode: "234567890" },
    { id: "3", name: "Cough Syrup", category: "Cold & Flu", price: 8.99, stock: 5, barcode: "345678901" },
    { id: "4", name: "Bandages", category: "First Aid", price: 6.99, stock: 25, barcode: "456789012" },
    { id: "5", name: "Ibuprofen 200mg", category: "Pain Relief", price: 15.99, stock: 100, barcode: "567890123" },
    { id: "6", name: "Vitamin C 500mg", category: "Vitamins", price: 18.99, stock: 80, barcode: "678901234" },
    { id: "7", name: "Thermometer", category: "Medical Devices", price: 29.99, stock: 15, barcode: "789012345" },
    { id: "8", name: "Hand Sanitizer", category: "Hygiene", price: 4.99, stock: 200, barcode: "890123456" }
  ];

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode?.includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.stock > 0;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast({
            title: "Stock Limit Reached",
            description: `Only ${product.stock} units available`,
            variant: "destructive"
          });
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
      toast({
        title: "Stock Limit Reached",
        description: `Only ${product.stock} units available`,
        variant: "destructive"
      });
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before checkout",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Checkout Successful",
      description: `Transaction completed for $${calculateTotal().toFixed(2)}`,
    });
    clearCart();
  };

  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <ShoppingCart className="w-4 h-4 mr-1" />
            {cart.reduce((total, item) => total + item.quantity, 0)} items
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or scan barcode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardHeader>
          </Card>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        {product.stock} left
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No products found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cart Area */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Shopping Cart</span>
                {cart.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right ml-3">
                          <p className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>₹{calculateTax(calculateSubtotal()).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="space-y-2 pt-4">
                  <Button className="w-full" onClick={handleCheckout}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Cash Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default POSPage;