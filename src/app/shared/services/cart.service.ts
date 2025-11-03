import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product.types';
import { Observable, map, tap, BehaviorSubject } from 'rxjs';
import { CartItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cart';
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.refreshCartCount();
  }

  /**
   * Refresh the cart item count from server
   */
  private refreshCartCount(): void {
    this.http
      .get<CartItem[]>(`${this.apiUrl}`)
      .pipe(
        map(items => items.reduce((total, item) => total + item.quantity, 0))
      )
      .subscribe(count => this.cartItemCountSubject.next(count));
  }

  /**
   * Add item to cart on server
   */
  addToCart(product: Product, quantity: number = 1): Observable<CartItem> {
    // Add validation
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return this.http
      .post<CartItem>(this.apiUrl, {
        product,
        quantity,
      })
      .pipe(tap(() => this.refreshCartCount()));
  }

  /**
   * Get the total number of items in cart
   */
  getNumberOfItems(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  /**
   * Get all items in cart
   */
  getItemsInCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}`);
  }

  /**
   * Remove item from cart by cart item ID
   */
  deleteFromCart(cartItemId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${cartItemId}`)
      .pipe(tap(() => this.refreshCartCount()));
  }

  /**
   * Update item quantity in cart by cart item ID
   */
  updateCartItemQuantity(
    cartItemId: string,
    product: Product,
    quantity: number
  ): Observable<CartItem> {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return this.http
      .put<CartItem>(`${this.apiUrl}/${cartItemId}`, {
        product,
        quantity,
      })
      .pipe(
        tap(() => this.refreshCartCount()) // Refresh count after updating item
      );
  }
}
