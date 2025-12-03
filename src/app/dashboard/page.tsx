"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Card } from "@/components/ui/card";
import { Package, Layers3, ArrowDownUp, ShoppingBag } from "lucide-react";
import { Product, CartItem } from "./components/types";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/db";
import { HeaderBar } from "./components/HeaderBar";
import { SummaryGrid, SummaryCard } from "./components/Summary";
import { ProductsTable } from "./components/ProductsTable";
import { ProductFormModal } from "./components/ProductFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { LowStockAlertModal } from "./components/LowStockAlertModal";
import { SellProductModal } from "./components/SellProductModal";
import { CartSidebar } from "./components/CartSidebar";
import { CheckoutModal } from "./components/CheckoutModal";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [user, loading]);

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
  const [customerEmail, setCustomerEmail] = useState("");

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Per-user storage helpers - REMOVED
  // const storageKey = user?.$id ? `products:${user.$id}` : null;

  // const saveProducts = (next: Product[]) => {
  //   try {
  //     if (!storageKey || typeof window === "undefined") return;
  //     localStorage.setItem(storageKey, JSON.stringify(next));
  //   } catch {}
  // };

  // Load user products on auth ready
  useEffect(() => {
    if (!loading && user) {
      const loadProducts = async () => {
        if (user.$id) {
          const data = await getProducts(user.$id);
          setProducts(data);
        }
      };
      loadProducts();
    }
  }, [loading, user]);

  // Check for low stock products and show notification
  useEffect(() => {
    const lowStock = products.filter((p) => p.quantity < 10);
    if (lowStock.length > 0) {
      setLowStockProducts(lowStock);
      setShowLowStockAlert(true);
    }
  }, [products]);

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= product.quantity) {
        setCart(cart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      } else {
        alert("Not enough stock available!");
      }
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        quantity: quantity,
        price: product.price,
        stockQuantity: product.quantity
      }]);
    }
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem && newQuantity <= cartItem.stockQuantity) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      alert("Not enough stock available!");
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCartCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Show checkout modal
    setShowCheckoutModal(true);
    setCustomerEmail("");
  };

  const processCheckout = async (customer: { name: string; email: string }) => {
    if (cart.length === 0) return;

    // Update product quantities in DB
    const updates = cart.map(async (item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        const newQty = product.quantity - item.quantity;
        await updateProduct(product.id, { quantity: newQty });
      }
    });

    await Promise.all(updates);

    // Refresh products from DB to ensure sync
    if (user?.$id) {
      const fresh = await getProducts(user.$id);
      setProducts(fresh);
    }

    // Generate cart invoice
    generateCartInvoice(cart, customer);

    // Clear cart
    setCart([]);
    setShowCheckoutModal(false);
    setShowCart(false);
  };

  const generateCartInvoice = (items: CartItem[], customer?: { name: string; email: string }) => {
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      company: "TrackNest Inventory Management",
      customer: customer || null,
      products: items,
      totalValue: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Sales Invoice - ${invoiceData.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-details { margin-bottom: 20px; }
              .customer-details { margin-bottom: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; font-size: 18px; margin-top: 20px; text-align: right; }
              .footer { margin-top: 30px; text-align: center; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${invoiceData.company}</h1>
              <h2>Sales Invoice</h2>
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
                  <th>Quantity</th>
                  <th>Unit Price (₹)</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.products.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.sku}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">
              <p>Total Amount: ₹${invoiceData.totalValue.toFixed(2)}</p>
            </div>
            <div class="footer">
              <p>Thank you for your business!</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

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
    setCustomerEmail("");
    setShowSellModal(true);
  };

  const confirmDelete = async () => {
    if (deleteConfirm.product) {
      const success = await deleteProduct(deleteConfirm.product.id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteConfirm.product!.id));
      }
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

  const confirmSell = async () => {
    if (!selectedProduct || sellQuantity <= 0 || sellQuantity > selectedProduct.quantity) {
      alert("Invalid quantity!");
      return;
    }

    // Update product quantity
    const newQty = selectedProduct.quantity - sellQuantity;
    const updated = await updateProduct(selectedProduct.id, { quantity: newQty });

    if (updated) {
      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? updated : p))
      );

      // Generate invoice for the sale
      generateInvoice(selectedProduct, sellQuantity, { name: "Customer", email: customerEmail });
    }

    // Close modal
    setShowSellModal(false);
    setSelectedProduct(null);
    setSellQuantity(1);
    setCustomerEmail("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.sku) return;

    if (user?.$id) {
      if (editingId) {
        const updated = await updateProduct(editingId, form);
        if (updated) {
          setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        }
      } else {
        const newProduct = await addProduct(form, user.$id);
        if (newProduct) {
          setProducts((prev) => [newProduct, ...prev]);
        }
      }
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
        <HeaderBar
          userName={user?.name || "User"}
          query={query}
          onQueryChange={setQuery}
          cartCount={cart.length}
          onToggleCart={() => setShowCart(!showCart)}
          onAddProduct={handleAdd}
        />

        <SummaryGrid>
          <SummaryCard title="Total SKUs" value={totalSkus} icon={<Package className="h-5 w-5" />} />
          <SummaryCard title="Total Quantity" value={totalQty} icon={<Layers3 className="h-5 w-5" />} />
          <SummaryCard title="Low Stock" value={lowStock} icon={<ArrowDownUp className="h-5 w-5" />} />
          <SummaryCard title="Cart Items" value={cart.length} icon={<ShoppingBag className="h-5 w-5" />} />
        </SummaryGrid>

        <Card className="border-border/60">
          <ProductsTable
            products={products}
            filtered={filtered}
            sortKey={sortKey}
            sortAsc={sortAsc}
            onToggleSort={toggleSort}
            onAddToCart={(p) => addToCart(p, 1)}
            onSell={handleSell}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>

        <ProductFormModal
          show={showForm}
          editingId={editingId}
          form={form}
          onChange={setForm}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          show={deleteConfirm.show}
          productName={deleteConfirm.product?.name}
          onCancel={() => setDeleteConfirm({ show: false, product: null })}
          onConfirm={confirmDelete}
        />

        {/* Low Stock Alert Modal */}
        <LowStockAlertModal
          show={showLowStockAlert}
          products={lowStockProducts}
          onDismiss={() => setShowLowStockAlert(false)}
          onSetReminder={() => setShowLowStockAlert(false)}
        />

        {/* Sell Product Modal */}
        <SellProductModal
          show={showSellModal}
          product={selectedProduct}
          sellQuantity={sellQuantity}
          customerEmail={customerEmail}
          onQuantityChange={setSellQuantity}
          onEmailChange={setCustomerEmail}
          onCancel={() => setShowSellModal(false)}
          onConfirm={confirmSell}
        />

        {/* Cart Sidebar */}
        <CartSidebar
          show={showCart}
          cart={cart}
          products={products}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onQtyChange={updateCartQuantity}
          onCheckout={handleCartCheckout}
          getCartTotal={getCartTotal}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          show={showCheckoutModal}
          totalAmount={getCartTotal()}
          customerEmail={customerEmail}
          onEmailChange={setCustomerEmail}
          onCancel={() => setShowCheckoutModal(false)}
          onConfirm={(customer) => processCheckout(customer)}
        />
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


