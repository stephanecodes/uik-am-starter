import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private logger = inject(LoggerService);
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  private favorites: Product[] = [];

  constructor() {
    this.loadFavoritesFromStorage();
  }

  /**
   * Charge les favoris depuis le localStorage
   */
  private loadFavoritesFromStorage(): void {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
        this.favoritesSubject.next(this.favorites);
        this.logger.log('Favoris chargés depuis localStorage:', this.favorites);
      } catch (error) {
        this.logger.error('Erreur lors du chargement des favoris:', error);
        localStorage.removeItem('favorites');
      }
    }
  }

  /**
   * Sauvegarde les favoris dans le localStorage
   */
  private saveFavoritesToStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  /**
   * Retourne l'Observable des favoris
   */
  getFavorites(): Observable<Product[]> {
    return this.favoritesSubject.asObservable();
  }

  /**
   * Ajoute un produit aux favoris
   */
  addToFavorites(product: Product): void {
    const exists = this.favorites.find(p => p.id === product.id);
    if (!exists) {
      this.favorites.push(product);
      this.logger.log('Favoris après ajout:', this.favorites);
      this.favoritesSubject.next([...this.favorites]);
      this.saveFavoritesToStorage();
      this.logger.log('Produit ajouté aux favoris:', product.name);
    }
  }

  /**
   * Retire un produit des favoris
   */
  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.logger.log('Favoris après suppression:', this.favorites);
    this.favoritesSubject.next([...this.favorites]);
    this.saveFavoritesToStorage();
    this.logger.log('Produit retiré des favoris');
  }

  /**
   * Toggle un produit dans les favoris
   */
  toggleFavorite(product: Product): boolean {
    const exists = this.favorites.find(p => p.id === product.id);
    if (exists) {
      this.removeFromFavorites(product.id);
      return false;
    } else {
      this.addToFavorites(product);
      return true;
    }
  }

  /**
   * Vérifie si un produit est dans les favoris
   */
  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  /**
   * Ajoute plusieurs produits aux favoris
   */
  addMultipleToFavorites(products: Product[]): void {
    products.forEach(product => {
      const exists = this.favorites.find(p => p.id === product.id);
      if (!exists) {
        this.favorites.push(product);
      }
    });
    this.logger.log('Favoris après ajout multiple:', this.favorites);
    this.favoritesSubject.next([...this.favorites]);
    this.saveFavoritesToStorage();
    this.logger.log(`${products.length} produits ajoutés aux favoris`);
  }

  /**
   * Vide tous les favoris
   */
  clearFavorites(): void {
    this.favorites = [];
    this.favoritesSubject.next(this.favorites);
    this.saveFavoritesToStorage();
  }

  /**
   * Retourne le nombre de favoris
   */
  getFavoritesCount(): number {
    return this.favorites.length;
  }
}

