"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Edit3, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "./types";

type ProductsTableProps = {
  products: Product[];
  filtered: Product[];
  sortKey: keyof Product;
  sortAsc: boolean;
  onToggleSort: (key: keyof Product) => void;
  onAddToCart: (product: Product) => void;
  onSell: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductsTable({ filtered, sortKey, sortAsc, onToggleSort, onAddToCart, onSell, onEdit, onDelete }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse text-sm">
        <thead>
          <tr className="bg-accent/40 text-left text-foreground">
            <th
              className={`p-3 cursor-pointer select-none ${sortKey === "name" ? "font-bold" : ""}`}
              onClick={() => onToggleSort("name")}
            >
              Name
              {sortKey === "name" ? (
                <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
              ) : null}
            </th>
            <th
              className={`p-3 cursor-pointer select-none ${sortKey === "sku" ? "font-bold" : ""}`}
              onClick={() => onToggleSort("sku")}
            >
              SKU
              {sortKey === "sku" ? (
                <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
              ) : null}
            </th>
            <th
              className={`p-3 cursor-pointer select-none ${sortKey === "quantity" ? "font-bold" : ""}`}
              onClick={() => onToggleSort("quantity")}
            >
              Quantity
              {sortKey === "quantity" ? (
                <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
              ) : null}
            </th>
            <th
              className={`p-3 cursor-pointer select-none ${sortKey === "price" ? "font-bold" : ""}`}
              onClick={() => onToggleSort("price")}
            >
              Price
              {sortKey === "price" ? (
                <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
              ) : null}
            </th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className={`border-b last:border-0 ${p.quantity < 10 ? 'bg-orange-50 dark:bg-orange-950/20' : ''}`}>
              <td className="p-3 font-medium">
                <div className="flex items-center gap-2">
                  {p.name}
                  {p.quantity < 10 && <AlertTriangle className="h-4 w-4 text-orange-500 dark:text-orange-400" />}
                </div>
              </td>
              <td className="p-3 text-muted-foreground">{p.sku}</td>
              <td className={`p-3 ${p.quantity < 10 ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}`}>
                {p.quantity}
                {p.quantity < 10 && <span className="text-xs text-orange-500 dark:text-orange-400 ml-1">(Low)</span>}
              </td>
              <td className="p-3">₹{p.price.toFixed(2)}</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => p.quantity > 0 ? onAddToCart(p) : alert("Product out of stock!")}
                    title="Add to Cart"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onSell(p)} title="Sell Product">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onEdit(p)} title="Edit Product">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(p)} title="Delete Product">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


