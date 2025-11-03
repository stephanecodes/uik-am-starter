import { Product } from './product.types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
