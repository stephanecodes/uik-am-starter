import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCartResponse, CartItem, Product } from '../types/product.types';
import { catchError, Observable, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cart';

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
      .pipe(
        catchError(error => {
          console.error('Failed to add item to cart:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Get the total number of items in cart
   */
  getNumberOfItems(): Observable<number> {
    return this.http
      .get<CartItem[]>(`${this.apiUrl}`)
      .pipe(
        map(items => items.reduce((total, item) => total + item.quantity, 0))
      );
  }

  /**
   * Get all items in cart
   */
  getItemsInCart(): Observable<CartItem[]> {
    return this.http
      .get<ApiCartResponse>(`${this.apiUrl}`)
      .pipe(map(response => response.data));
  }
}
