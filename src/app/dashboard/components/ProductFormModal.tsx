"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "./types";

type ProductFormModalProps = {
  show: boolean;
  editingId: string | null;
  form: Product;
  onChange: (next: Product) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function ProductFormModal({ show, editingId, form, onChange, onCancel, onSubmit }: ProductFormModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-lg border-border/60 p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold">{editingId ? "Update Product" : "Add Product"}</h3>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Name</span>
            <Input value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} required />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">SKU</span>
            <Input value={form.sku} onChange={(e) => onChange({ ...form, sku: e.target.value })} required />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) => onChange({ ...form, quantity: Number(e.target.value) })}
              min={0}
              required
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Price (₹)</span>
            <Input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => onChange({ ...form, price: Number(e.target.value) })}
              min={0}
              required
            />
          </label>
          <div className="col-span-1 sm:col-span-2 mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">
              {editingId ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}


