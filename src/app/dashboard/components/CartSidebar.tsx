"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ShoppingBag, X } from "lucide-react";
import { CartItem, Product } from "./types";

type CartSidebarProps = {
  show: boolean;
  cart: CartItem[];
  products: Product[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onQtyChange: (productId: string, qty: number) => void;
  onCheckout: () => void;
  getCartTotal: () => number;
};

export function CartSidebar({ show, cart, products, onClose, onRemove, onQtyChange, onCheckout, getCartTotal }: CartSidebarProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/50 p-4">
      <Card className="w-full max-w-md h-full max-h-[90vh] flex flex-col border-border/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cart.length} items)
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => {
              const currentProduct = products.find(p => p.id === item.productId);
              return (
                <div key={item.productId} className="p-3 border rounded-lg bg-accent/30">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-sm text-muted-foreground">
                        Available: {currentProduct?.quantity || 0} units
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onRemove(item.productId)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onQtyChange(item.productId, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = Number(e.target.value);
                        if (!isNaN(newQty)) {
                          onQtyChange(item.productId, newQty);
                        }
                      }}
                      className="w-16 text-center"
                      min={1}
                      max={item.stockQuantity}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onQtyChange(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stockQuantity}
                    >
                      +
                    </Button>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                      <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <Button 
              onClick={onCheckout}
              className="w-full bg-gradient-to-b from-green-500 to-green-700 text-white"
              size="lg"
            >
              <FileText className="mr-2 h-4 w-4" />
              Generate Bill
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}


