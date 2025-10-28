export type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
};

export type CartItem = {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  stockQuantity: number;
};


