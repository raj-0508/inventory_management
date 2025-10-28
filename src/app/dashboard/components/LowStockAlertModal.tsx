"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell } from "lucide-react";
import { Product } from "./types";

type LowStockAlertModalProps = {
  show: boolean;
  products: Product[];
  onDismiss: () => void;
  onSetReminder?: () => void;
};

export function LowStockAlertModal({ show, products, onDismiss, onSetReminder }: LowStockAlertModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-lg border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">Low Stock Alert!</h3>
        </div>
        <p className="mb-4 text-orange-700 dark:text-orange-300">
          The following products are running low on stock (less than 10 units):
        </p>
        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{product.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.sku})</span>
              </div>
              <span className="text-orange-600 dark:text-orange-400 font-bold">{product.quantity} units</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onDismiss}
            className="border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
          >
            Dismiss
          </Button>
          <Button 
            onClick={onSetReminder || onDismiss}
            className="bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700 dark:hover:bg-orange-600"
          >
            <Bell className="mr-2 h-4 w-4" />
            Set Reminder
          </Button>
        </div>
      </Card>
    </div>
  );
}


