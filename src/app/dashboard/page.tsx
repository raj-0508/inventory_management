"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, Edit3, Trash2, Package, Layers3, ArrowDownUp, FileText, Bell, AlertTriangle, ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [user, loading]);

  // Use authenticated user's name directly

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Product>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? products.filter((p) =>
          [p.name, p.sku].some((f) => f.toLowerCase().includes(q))
        )
      : products;
    const sorted = [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortAsc ? av - bv : bv - av;
      }
      return sortAsc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return sorted;
  }, [products, query, sortKey, sortAsc]);

  const resetForm = () => setForm({ id: "", name: "", sku: "", quantity: 0, price: 0 });
  const [form, setForm] = useState<Product>({ id: "", name: "", sku: "", quantity: 0, price: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; product: Product | null }>({ show: false, product: null });
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Per-user storage helpers
  const storageKey = user?.$id ? `products:${user.$id}` : null;
  
  const saveProducts = (next: Product[]) => {
    try {
      if (!storageKey || typeof window === "undefined") return;
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  // Load user products on auth ready
  useEffect(() => {
    if (!loading && user) {
      const loadProducts = () => {
        try {
          if (!storageKey || typeof window === "undefined") return [] as Product[];
          const raw = localStorage.getItem(storageKey);
          return raw ? (JSON.parse(raw) as Product[]) : [];
        } catch {
          return [] as Product[];
        }
      };
      const data = loadProducts();
      setProducts(data);
    }
  }, [loading, user, storageKey]);

  // Check for low stock products and show notification
  useEffect(() => {
    const lowStock = products.filter((p) => p.quantity < 10);
    if (lowStock.length > 0) {
      setLowStockProducts(lowStock);
      setShowLowStockAlert(true);
    }
  }, [products]);

  const handleAdd = () => {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  };
  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm(p);
    setShowForm(true);
  };
  const handleDelete = (product: Product) => {
    setDeleteConfirm({ show: true, product });
  };

  const handleSell = (product: Product) => {
    setSelectedProduct(product);
    setSellQuantity(1);
    setCustomerName("");
    setCustomerEmail("");
    setShowSellModal(true);
  };

  const confirmDelete = () => {
    if (deleteConfirm.product) {
      setProducts((prev) => {
        const next = prev.filter((p) => p.id !== deleteConfirm.product!.id);
        saveProducts(next);
        return next;
      });
    }
    setDeleteConfirm({ show: false, product: null });
  };

  const generateInvoice = (product?: Product, quantity?: number, customer?: { name: string; email: string }) => {
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      company: "TrackNest Inventory Management",
      customer: customer || null,
      products: product ? [{ ...product, quantity: quantity || 1 }] : products,
      totalValue: product ? (product.price * (quantity || 1)) : products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    };
    
    // Create a printable invoice
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${product ? 'Sales Invoice' : 'Inventory Report'} - ${invoiceData.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-details { margin-bottom: 20px; }
              .customer-details { margin-bottom: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; font-size: 18px; margin-top: 20px; text-align: right; }
              .invoice-type { color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${invoiceData.company}</h1>
              <h2>${product ? 'Sales Invoice' : 'Inventory Report'}</h2>
              <p class="invoice-type">${product ? 'Individual Product Sale' : 'Complete Inventory Overview'}</p>
            </div>
            <div class="invoice-details">
              <p><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</p>
              <p><strong>Date:</strong> ${invoiceData.date}</p>
            </div>
            ${customer ? `
            <div class="customer-details">
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> ${customer.name}</p>
              <p><strong>Email:</strong> ${customer.email}</p>
            </div>
            ` : ''}
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>${product ? 'Quantity Sold' : 'Stock Quantity'}</th>
                  <th>Price (₹)</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.products.map(p => `
                  <tr>
                    <td>${p.name}</td>
                    <td>${p.sku}</td>
                    <td>${p.quantity}</td>
                    <td>₹${p.price.toFixed(2)}</td>
                    <td>₹${(p.price * p.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">
              <p>${product ? 'Total Amount: ₹' : 'Total Inventory Value: ₹'}${invoiceData.totalValue.toFixed(2)}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const confirmSell = () => {
    if (!selectedProduct || sellQuantity <= 0 || sellQuantity > selectedProduct.quantity) {
      alert("Invalid quantity!");
      return;
    }

    // Update product quantity
    setProducts((prev) => {
      const next = prev.map((p) => 
        p.id === selectedProduct.id 
          ? { ...p, quantity: p.quantity - sellQuantity }
          : p
      );
      saveProducts(next);
      return next;
    });

    // Generate invoice for the sale
    generateInvoice(selectedProduct, sellQuantity, { name: customerName, email: customerEmail });

    // Close modal
    setShowSellModal(false);
    setSelectedProduct(null);
    setSellQuantity(1);
    setCustomerName("");
    setCustomerEmail("");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.sku) return;
    if (editingId) {
      setProducts((prev) => {
        const next = prev.map((p) => (p.id === editingId ? { ...form, id: editingId } : p));
        saveProducts(next);
        return next;
      });
    } else {
      const id = `p${Date.now()}`;
      setProducts((prev) => {
        const next = [{ ...form, id }, ...prev];
        saveProducts(next);
        return next;
      });
    }
    setShowForm(false);
    resetForm();
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) return null;

  const totalSkus = products.length;
  const totalQty = products.reduce((s, p) => s + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity < 10).length;

  return (
    <div className="w-full px-4 pt-24 pb-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back, {user?.name || "User"}</h1>
            <p className="text-muted-foreground">Manage your inventory: search, add, update, and delete products.</p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or SKU"
                className="pl-9"
              />
            </div>
            <Button onClick={() => generateInvoice()} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              <FileText className="mr-2 h-4 w-4" /> Generate Invoice
            </Button>
            <Button onClick={handleAdd} className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard title="Total SKUs" value={totalSkus} icon={<Package className="h-5 w-5" />} />
          <SummaryCard title="Total Quantity" value={totalQty} icon={<Layers3 className="h-5 w-5" />} />
          <SummaryCard title="Low Stock" value={lowStock} icon={<ArrowDownUp className="h-5 w-5" />} />
        </div>

        <Card className="border-border/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="bg-accent/40 text-left text-foreground">
                  <th
                    className={`p-3 cursor-pointer select-none ${sortKey === "name" ? "font-bold" : ""}`}
                    onClick={() => toggleSort("name")}
                  >
                    Name
                    {sortKey === "name" ? (
                      <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
                    ) : null}
                  </th>
                  <th
                    className={`p-3 cursor-pointer select-none ${sortKey === "sku" ? "font-bold" : ""}`}
                    onClick={() => toggleSort("sku")}
                  >
                    SKU
                    {sortKey === "sku" ? (
                      <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
                    ) : null}
                  </th>
                  <th
                    className={`p-3 cursor-pointer select-none ${sortKey === "quantity" ? "font-bold" : ""}`}
                    onClick={() => toggleSort("quantity")}
                  >
                    Quantity
                    {sortKey === "quantity" ? (
                      <span className="ml-1 align-middle">{sortAsc ? "▲" : "▼"}</span>
                    ) : null}
                  </th>
                  <th
                    className={`p-3 cursor-pointer select-none ${sortKey === "price" ? "font-bold" : ""}`}
                    onClick={() => toggleSort("price")}
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
                        <Button size="sm" variant="ghost" onClick={() => handleSell(p)} title="Sell Product">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(p)} title="Edit Product">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(p)} title="Delete Product">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <Card className="w-full max-w-lg border-border/60 p-4 sm:p-6">
              <h3 className="mb-4 text-lg font-semibold">{editingId ? "Update Product" : "Add Product"}</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">Name</span>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">SKU</span>
                  <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">Quantity</span>
                  <Input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
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
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    min={0}
                    required
                  />
                </label>
                <div className="col-span-1 sm:col-span-2 mt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">
                    {editingId ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md border-border/60 p-6">
              <h3 className="mb-4 text-lg font-semibold text-destructive">Delete Product</h3>
              <p className="mb-6 text-muted-foreground">
                Are you sure you want to delete <strong>&quot;{deleteConfirm.product?.name}&quot;</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setDeleteConfirm({ show: false, product: null })}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Low Stock Alert Modal */}
        {showLowStockAlert && (
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
                {lowStockProducts.map((product) => (
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
                  onClick={() => setShowLowStockAlert(false)}
                  className="border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                >
                  Dismiss
                </Button>
                <Button 
                  onClick={() => {
                    setShowLowStockAlert(false);
                    // You can add logic here to automatically reorder or contact suppliers
                  }}
                  className="bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700 dark:hover:bg-orange-600"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Sell Product Modal */}
        {showSellModal && selectedProduct && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md border-border/60 p-6">
              <h3 className="mb-4 text-lg font-semibold">Sell Product</h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {selectedProduct.sku}</p>
                  <p className="text-sm text-muted-foreground">Available: {selectedProduct.quantity} units</p>
                  <p className="text-sm text-muted-foreground">Price: ₹{selectedProduct.price.toFixed(2)} per unit</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity to Sell</label>
                  <Input
                    type="number"
                    min="1"
                    max={selectedProduct.quantity}
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(Number(e.target.value))}
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Name (Optional)</label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Email (Optional)</label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter customer email"
                  />
                </div>

                {sellQuantity > 0 && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Total Amount: ₹{(selectedProduct.price * sellQuantity).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSellModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmSell}
                  disabled={sellQuantity <= 0 || sellQuantity > selectedProduct.quantity}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Sell & Generate Invoice
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  function toggleSort(key: keyof Product) {
    if (key === sortKey) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }
}

function SummaryCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="border-border/60 p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-500/5">
          <span className="text-blue-600">{icon}</span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
}
