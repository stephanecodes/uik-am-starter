import { inject, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../types/product.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cart';
  private cartItems = signal<CartItem[]>([]);

  /**
   * Add a product to the cart with specified quantity
   */
  addToCart(product: Product, quantity: number = 1): void {}
}
