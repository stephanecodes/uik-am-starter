import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private logger = inject(LoggerService);
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  /**
   * Récupère tous les items du panier
   */
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  /**
   * Récupère le nombre total d'items dans le panier
   */
  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  /**
   * Récupère le prix total du panier
   */
  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
    );
  }

  /**
   * Ajoute un produit au panier
   */
  addToCart(product: Product, quantity: number = 1): void {
    const productId = Number(product.id);

    const currentItems = [...this.cartItems.value];
    const existingItemIndex = currentItems.findIndex(item => Number(item.product.id) === productId);

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex] = {
        ...currentItems[existingItemIndex],
        quantity: currentItems[existingItemIndex].quantity + quantity
      };
      this.logger.log(`${product.name} - quantité mise à jour: ${currentItems[existingItemIndex].quantity}`);
    } else {
      const newItem: CartItem = { product, quantity };
      currentItems.push(newItem);
      this.logger.log(`${product.name} - nouveau produit ajouté (quantité: ${quantity})`);
    }

    this.cartItems.next(currentItems);
    this.saveCartToStorage();
    
    this.logger.log('Panier actuel:', this.cartItems.value);
    this.logger.log('Nombre total items:', this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0));
  }

  /**
   * Ajoute plusieurs produits au panier
   */
  addMultipleToCart(products: Product[], quantity: number = 1): void {
    products.forEach(product => this.addToCart(product, quantity));
  }

  /**
   * Supprime un produit du panier
   */
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveCartToStorage();
    this.logger.log(`Produit ${productId} supprimé du panier`);
  }

  /**
   * Met à jour la quantité d'un produit dans le panier
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCartToStorage();
      this.logger.log(`Quantité du produit ${productId} mise à jour: ${quantity}`);
    }
  }

  /**
   * Vide complètement le panier
   */
  clearCart(): void {
    this.cartItems.next([]);
    this.saveCartToStorage();
    this.logger.log('Panier vidé');
  }

  /**
   * Vérifie si un produit est dans le panier
   */
  isInCart(productId: number): boolean {
    return this.cartItems.value.some(item => item.product.id === productId);
  }

  /**
   * Sauvegarde le panier dans le localStorage
   */
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  /**
   * Charge le panier depuis le localStorage
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        this.logger.log('Panier chargé depuis localStorage:', items);
        
        const normalizedItems = items.map((item: any) => ({
          ...item,
          quantity: Number(item.quantity)
        }));
        
        this.logger.log('Panier normalisé:', normalizedItems);
        this.cartItems.next(normalizedItems);
      } catch (error) {
        this.logger.error('Erreur lors du chargement du panier:', error);
        localStorage.removeItem('cart');
      }
    }
  }
}

