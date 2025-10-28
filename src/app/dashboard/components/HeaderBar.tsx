"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Plus } from "lucide-react";

type HeaderBarProps = {
  userName: string;
  query: string;
  onQueryChange: (value: string) => void;
  cartCount: number;
  onToggleCart: () => void;
  onAddProduct: () => void;
};

export function HeaderBar({ userName, query, onQueryChange, cartCount, onToggleCart, onAddProduct }: HeaderBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">Manage your inventory: search, add, update, and delete products.</p>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or SKU"
            className="pl-9"
          />
        </div>
        <Button 
          onClick={onToggleCart} 
          className="relative bg-gradient-to-b from-green-500 to-green-700 text-white"
          variant="outline"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
        <Button onClick={onAddProduct} className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
    </div>
  );
}


