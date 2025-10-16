import {Component, HostBinding, OnInit, inject, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UikAmModule} from "@visiativ/uik-am";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {toSignal} from '@angular/core/rxjs-interop';
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {ProductsService} from '../../shared/services/products.service';
import {CartService} from '../../shared/services/cart.service';
import {PageTitleService} from '../../shared/services/page-title.service';
import {FavoritesService} from '../../shared/services/favorites.service';
import {LoggerService} from '../../shared/services/logger.service';
import {Product} from '../../shared/models/product.model';
import {ProductCard} from './components/product-card/product-card';
import {ProductDetailModal} from './components/product-detail-modal/product-detail-modal';
import {Button} from '../../shared/components/button/button';
import {ProductSkeletonComponent} from '../../shared/components/product-skeleton/product-skeleton.component';

/**
 * Interface pour l'événement d'ajout au panier
 * Peut être soit un Product (depuis la carte), soit un objet avec product et quantity (depuis la modal)
 */
type AddToCartEvent = Product | { product: Product; quantity: number };


@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    FormsModule,
    UikAmModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PageLayoutComponent,
    ProductCard,
    ProductDetailModal,
    Button,
    ProductSkeletonComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  @HostBinding('class') class = 'app-catalog';

  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private pageTitleService = inject(PageTitleService);
  private favoritesService = inject(FavoritesService);
  private logger = inject(LoggerService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  selectedProducts = new Set<number>();
  favoriteProducts = new Set<number>();
  
  private favoriteItems = toSignal(this.favoritesService.getFavorites(), { initialValue: [] });
  
  skeletonItems = Array(10).fill(0);
  
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  selectedProduct: Product | null = null;
  isModalOpen = false;

  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';
  sortOrder = '';
  showFilters = false;

  categories: string[] = [];
  brands: string[] = [];

  constructor() {
    effect(() => {
      const favorites = this.favoriteItems();
      this.favoriteProducts.clear();
      favorites.forEach(product => {
        this.favoriteProducts.add(product.id);
      });
    });
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Catalogue');
    this.loadProducts();
  }

  /**
   * Charge les produits depuis l'API
   */
  loadProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.extractFilterOptions();
        this.applyFilters();
        this.isLoading = false;
        this.logger.log('Produits chargés:', this.products.length);
        this.logger.log('Premier produit:', this.products[0]);
      },
      error: (error) => {
        this.logger.error('Erreur lors du chargement des produits:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Extrait les options pour les filtres depuis les produits
   */
  extractFilterOptions(): void {
    this.categories = [...new Set(this.products.map(p => p.category))].sort();
    this.brands = [...new Set(this.products.map(p => p.brand))].sort();
  }

  /**
   * Applique les filtres aux produits
   */
  applyFilters(): void {
    let filtered = [...this.products];

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    if (this.selectedBrand) {
      filtered = filtered.filter(product => product.brand === this.selectedBrand);
    }

    if (this.sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  /**
   * Réinitialise tous les filtres
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.sortOrder = '';
    this.applyFilters();
  }

  /**
   * Retourne les produits de la page actuelle
   */
  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  /**
   * Change de page
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Retourne un tableau de numéros de pages pour l'affichage
   */
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * Gère le changement du nombre d'éléments par page
   */
  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  /**
   * Ajoute un produit au panier
   */
  addToCart(event: AddToCartEvent): void {
    if ('product' in event) {
      this.cartService.addToCart(event.product, event.quantity);
    } else {
      this.cartService.addToCart(event, 1);
    }
  }

  /**
   * Bascule l'état favori d'un produit
   */
  toggleFavorite(product: Product): void {
    this.favoritesService.toggleFavorite(product);
  }

  /**
   * Ouvre les détails d'un produit
   */
  openProductDetails(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  /**
   * Ferme la modal de détails
   */
  closeProductDetails(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  /**
   * Sélectionne un produit
   */
  selectProduct(product: Product): void {
    if (this.selectedProducts.has(product.id)) {
      this.selectedProducts.delete(product.id);
    } else {
      this.selectedProducts.add(product.id);
    }
    this.logger.log('Produits sélectionnés:', this.selectedProducts.size);
  }

  /**
   * Gère le changement de sélection d'un produit
   */
  onProductSelectionChange(product: Product, selected: boolean): void {
    if (selected) {
      this.selectedProducts.add(product.id);
    } else {
      this.selectedProducts.delete(product.id);
    }
    this.logger.log('Produits sélectionnés:', this.selectedProducts.size);
  }

  /**
   * Vérifie si un produit est sélectionné
   */
  isProductSelected(product: Product): boolean {
    return this.selectedProducts.has(product.id);
  }

  /**
   * Vérifie si un produit est dans les favoris
   */
  isProductFavorite(product: Product): boolean {
    return this.favoriteProducts.has(product.id);
  }

  /**
   * Ajoute tous les produits sélectionnés au panier
   */
  addSelectedToCart(): void {
    const selectedProductsList = this.products.filter(p => this.selectedProducts.has(p.id));
    this.cartService.addMultipleToCart(selectedProductsList);
    this.selectedProducts.clear();
  }

  /**
   * Ajoute tous les produits sélectionnés aux favoris
   */
  addSelectedToFavorites(): void {
    const selectedProductsList = this.products.filter(p => this.selectedProducts.has(p.id));
    this.favoritesService.addMultipleToFavorites(selectedProductsList);
    this.selectedProducts.clear();
  }
}
