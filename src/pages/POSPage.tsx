import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Minus, 
  X, 
  CreditCard, 
  Banknote, 
  QrCode,
  Trash2,
  ShoppingBag,
  Printer
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Receipt from "@/components/pos/Receipt";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<{
    items: CartItem[];
    total: number;
    paymentMethod: string;
    transactionId: string;
    timestamp: string;
  } | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Mock product data
  const products: Product[] = [
    { id: "1", name: "Espresso", category: "Coffee", price: 2.50, stock: 100 },
    { id: "2", name: "Cappuccino", category: "Coffee", price: 3.75, stock: 100 },
    { id: "3", name: "Latte", category: "Coffee", price: 4.25, stock: 100 },
    { id: "4", name: "Americano", category: "Coffee", price: 3.00, stock: 100 },
    { id: "5", name: "Croissant", category: "Food", price: 2.95, stock: 50 },
    { id: "6", name: "Bagel", category: "Food", price: 3.50, stock: 30 },
    { id: "7", name: "Muffin", category: "Food", price: 2.75, stock: 25 },
    { id: "8", name: "Sandwich", category: "Food", price: 7.95, stock: 20 }
  ];

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.stock > 0;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const generateTransactionId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const transactionId = generateTransactionId();
    const timestamp = new Date().toLocaleString();
    const total = calculateTotal();
    const method = "Cash"; // Default payment method
    
    // Store transaction details for receipt
    setLastTransaction({
      items: [...cart],
      total,
      paymentMethod: method,
      transactionId,
      timestamp
    });
    
    toast({
      title: "Payment Successful",
      description: `Paid $${total.toFixed(2)} with ${method} - Receipt ready to print`,
    });
    
    clearCart();
    setShowReceipt(true);
  };

  const handlePayment = (method: string) => {
    if (cart.length === 0) return;
    
    const transactionId = generateTransactionId();
    const timestamp = new Date().toLocaleString();
    const total = calculateTotal();
    
    // Store transaction details for receipt
    setLastTransaction({
      items: [...cart],
      total,
      paymentMethod: method,
      transactionId,
      timestamp
    });
    
    toast({
      title: "Payment Successful",
      description: `Paid $${total.toFixed(2)} with ${method}`,
    });
    
    clearCart();
    setShowPaymentModal(false);
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                body { margin: 0; padding: 20px; font-family: monospace; }
                @media print { body { margin: 0; padding: 0; } }
              </style>
            </head>
            <body>
              ${receiptRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">POS</h1>
            <Badge variant="outline" className="text-sm">
              <ShoppingBag className="w-3 h-3 mr-1" />
              {totalItems} items
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-border focus:border-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-81px)]">
        {/* Main Content - Products */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Category Filter */}
          <div className="flex gap-2 mb-6">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm font-medium"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="p-6 bg-card border border-border hover:border-primary rounded-lg transition-all duration-200 hover:shadow-md text-left group"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found</p>
            </div>
          )}
        </div>

        {/* Cart Sidebar */}
        <div className="w-96 bg-muted/20 border-l border-border flex flex-col">
          {/* Cart Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Cart</h2>
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
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-border bg-background">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl p-8 w-full max-w-md shadow-lg animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Payment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPaymentModal(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-3xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold"
                onClick={() => handlePayment("Cash")}
              >
                <Banknote className="w-5 h-5 mr-3" />
                Cash
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg font-semibold"
                onClick={() => handlePayment("Card")}
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Card
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg font-semibold"
                onClick={() => handlePayment("QR Code")}
              >
                <QrCode className="w-5 h-5 mr-3" />
                QR Code
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && lastTransaction && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl p-8 w-full max-w-md shadow-lg animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Receipt</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReceipt(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Receipt Preview */}
            <div className="mb-6 max-h-96 overflow-y-auto border border-border rounded-lg">
              <Receipt
                ref={receiptRef}
                items={lastTransaction.items}
                total={lastTransaction.total}
                paymentMethod={lastTransaction.paymentMethod}
                transactionId={lastTransaction.transactionId}
                timestamp={lastTransaction.timestamp}
              />
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold"
                onClick={handlePrintReceipt}
              >
                <Printer className="w-5 h-5 mr-3" />
                Print Receipt
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg font-semibold"
                onClick={() => setShowReceipt(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSPage;