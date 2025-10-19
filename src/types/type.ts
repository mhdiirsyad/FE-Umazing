interface LoginForm {
  email: String;
  password: String;
}

interface RegisterForm {
  email: String;
  name: String;
  password: String;
}

interface CategoryForm {
  name: string | undefined;
}

interface ProductForm {
  name: string,
  price: number,
  stock: number,
  description: string,
  image?: File | null,
  is_active: string,
  category_id: number,
}

interface Product {
  id: number,
  category_id: number,
  name: string,
  price: number,
  description: string,
  stock: number,
  is_active: number | boolean,
  image: File | string,
  created_at: string,
}

interface OrderItem {
  product_name: string,
  product_price: number,
  quantity: number,
  subtotal: number,
}

interface Order {
  id: number,
  user_id: number,
  user: string,
  address: string,
  status: string,
  total: number,
  order_items: OrderItem[],
  created_at: string,
  completed_at: string | null,
}

interface OrderForm {
  address: string,
}

interface UpdateOrderPayload {
  status: string
}

interface BestSellProduct {
  'total_sold': number,
  'product': Product,
}

interface CartItem {
  id: number,
  product_id: number,
  product_name: string,
  product_price: number,
  quantity: number,
  product_stock: number,
  product_image: string,
}

interface Cart {
  id: number
  cart_items: CartItem[]
}

interface CartForm {
  product_id: number,
  quantity: number,
}

export type {
  LoginForm,
  RegisterForm,
  CategoryForm,
  ProductForm,
  Order,
  Product,
  Cart,
  CartItem,
  OrderForm,
  CartForm,
  UpdateOrderPayload,
  BestSellProduct,
};