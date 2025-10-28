"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { Product } from "./types";

type SellProductModalProps = {
  show: boolean;
  product: Product | null;
  sellQuantity: number;
  customerEmail: string;
  onQuantityChange: (qty: number) => void;
  onEmailChange: (email: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function SellProductModal({ show, product, sellQuantity, customerEmail, onQuantityChange, onEmailChange, onCancel, onConfirm }: SellProductModalProps) {
  if (!show || !product) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md border-border/60 p-6">
        <h3 className="mb-4 text-lg font-semibold">Sell Product</h3>
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            <p className="text-sm text-muted-foreground">Available: {product.quantity} units</p>
            <p className="text-sm text-muted-foreground">Price: ₹{product.price.toFixed(2)} per unit</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity to Sell</label>
            <Input
              type="number"
              min="1"
              max={product.quantity}
              value={sellQuantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Email (Optional)</label>
            <Input
              type="email"
              value={customerEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter customer email"
            />
          </div>

          {sellQuantity > 0 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Total Amount: ₹{(product.price * sellQuantity).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="ghost" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={sellQuantity <= 0 || sellQuantity > product.quantity}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Sell & Generate Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
}


