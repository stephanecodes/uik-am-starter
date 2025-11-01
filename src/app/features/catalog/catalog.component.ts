import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { UikAmModule, UikAppContextHandler } from '@visiativ/uik-am';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import {
  ProductService,
  PaginationParams,
  ProductFilters,
} from '../../shared/services/product.service';
import { Product } from '../../shared/types/product.types';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';

@Component({
  selector: 'app-catalog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UikAmModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    PageLayoutComponent,
    ProductCardComponent,
    MatIcon,
    MatPaginator,
    MatButtonToggle,
    MatButtonToggleGroup,
  ],
  templateUrl: './catalog.component.html',
  // styles are defined in src/theme/components/app/_catalog.scss
})
export class CatalogComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-catalog';

  private readonly uikAppContextHandler = inject(UikAppContextHandler);
  private readonly productService = inject(ProductService);
  private debounceTimer?: ReturnType<typeof setTimeout>;

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  filterValue = signal<string>('');
  displayMode = signal<'grid' | 'row'>('grid');

  // Effect for debounced search
  private searchEffect = effect(() => {
    const searchTerm = this.filterValue();

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer for debounced search
    this.debounceTimer = setTimeout(() => {
      this.currentPage.set(0); // Reset to first page when searching
      this.loadProducts();
    }, 300);
  });

  // Pagination state
  totalItems = signal<number>(0);
  currentPage = signal<number>(0); // Mat-paginator uses 0-based indexing
  pageSize = signal<number>(10);
  pageSizeOptions = [5, 10, 25, 50];

  ngOnInit(): void {
    // Update the app context
    this.uikAppContextHandler.setAppContext({
      applicationName: 'Visiativ Test App',
      title: 'Catalog',
    });

    this.loadProducts();
  }

  ngOnDestroy(): void {
    // Clean up debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  // Load products from API
  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    const paginationParams: PaginationParams = {
      page: this.currentPage() + 1, // Convert to 1-based indexing for API
      pageSize: this.pageSize(),
    };

    const filters: ProductFilters = {};
    if (this.filterValue().trim()) {
      filters.name = this.filterValue().trim();
    }

    this.productService.getProducts(paginationParams, filters).subscribe({
      next: response => {
        this.products.set(response.products);
        this.totalItems.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      },
    });
  }

  // Handle pagination events
  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadProducts();
  }

  // Clear search filter
  resetFilter(): void {
    this.filterValue.set('');
  }
}
