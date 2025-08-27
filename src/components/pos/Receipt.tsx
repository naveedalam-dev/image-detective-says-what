import { forwardRef } from "react";

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptProps {
  items: ReceiptItem[];
  total: number;
  paymentMethod: string;
  transactionId: string;
  timestamp: string;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, total, paymentMethod, transactionId, timestamp }, ref) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax

    return (
      <div 
        ref={ref} 
        className="bg-white text-black p-6 max-w-sm mx-auto font-mono text-sm"
        style={{ width: '300px' }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
          <h1 className="text-lg font-bold">COFFEE SHOP POS</h1>
          <p className="text-xs">123 Main Street</p>
          <p className="text-xs">City, State 12345</p>
          <p className="text-xs">Tel: (555) 123-4567</p>
        </div>

        {/* Transaction Info */}
        <div className="mb-4 text-xs">
          <div className="flex justify-between">
            <span>Date/Time:</span>
            <span>{timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span>Transaction:</span>
            <span>#{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Cashier:</span>
            <span>Admin</span>
          </div>
        </div>

        <div className="border-b border-dashed border-gray-400 mb-4"></div>

        {/* Items */}
        <div className="mb-4">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span className="truncate flex-1 mr-2">{item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600 ml-2">
                {item.quantity} x ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-b border-dashed border-gray-400 mb-4"></div>

        {/* Totals */}
        <div className="mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-dashed border-gray-400 pt-2">
            <span>TOTAL:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-b border-dashed border-gray-400 mb-4"></div>

        {/* Payment Info */}
        <div className="mb-4 text-xs">
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span>{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change:</span>
            <span>$0.00</span>
          </div>
        </div>

        <div className="border-b border-dashed border-gray-400 mb-4"></div>

        {/* Footer */}
        <div className="text-center text-xs">
          <p className="mb-2">Thank you for your business!</p>
          <p className="mb-2">Have a great day!</p>
          <p>*** CUSTOMER COPY ***</p>
        </div>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";

export default Receipt;