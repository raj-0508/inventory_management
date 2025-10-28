"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

type CheckoutModalProps = {
  show: boolean;
  totalAmount: number;
  customerEmail: string;
  onEmailChange: (email: string) => void;
  onCancel: () => void;
  onConfirm: (customer: { name: string; email: string }) => void;
};

export function CheckoutModal({ show, totalAmount, customerEmail, onEmailChange, onCancel, onConfirm }: CheckoutModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md border-border/60 p-6">
        <h3 className="mb-4 text-lg font-semibold">Customer Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Name</label>
            <Input id="customerName" type="text" placeholder="Enter customer name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Email</label>
            <Input
              id="customerEmail"
              type="email"
              value={customerEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter customer email"
            />
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              const nameInput = document.getElementById('customerName') as HTMLInputElement;
              const name = nameInput?.value || 'Customer';
              const email = customerEmail || 'N/A';
              onConfirm({ name, email });
            }}
            className="bg-gradient-to-b from-green-500 to-green-700 text-white"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
}


