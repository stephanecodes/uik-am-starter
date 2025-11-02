export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  warranty: string;
  category: string;
  tags: string[];
  warning: string;
  offer: string | null;
  discount: string | null;
  price: number;
  currency: string;
  image: string;
  specifications: ProductSpecification[];
}

export interface ApiProductsResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Product[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
