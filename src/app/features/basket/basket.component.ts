import { Component, HostBinding, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { BasketItemComponent } from '../../shared/components/basket-item/basket-item.component';
import { UikAppContextHandler, UikAmModule } from '@visiativ/uik-am';
import { CartService } from '../../shared/services/cart.service';
import { CartItem } from '../../shared/types/product.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [
    CommonModule,
    RouterModule,
    PageLayoutComponent,
    BasketItemComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    UikAmModule,
  ],
  // styles are defined in src/theme/components/app/_basket.scss
})
export class BasketComponent implements OnInit {
  @HostBinding('class') class = 'app-basket';

  private readonly uikAppContextHandler = inject(UikAppContextHandler);
  private readonly cartService = inject(CartService);

  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  data = signal<CartItem[] | null>(null);

  ngOnInit(): void {
    // Update the whole appContext
    this.uikAppContextHandler.setAppContext({
      applicationName: 'Visiativ Test App',
      title: 'Basket',
    });

    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading.set(true);
    this.error.set(null);

    this.cartService.getItemsInCart().subscribe({
      next: cartItems => {
        this.loading.set(false);
        this.data.set(cartItems);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load cart items. Please try again.');
      },
    });
  }

  onItemUpdated(): void {
    this.loadCartItems();
  }

  getTotalPrice(): number {
    const items = this.data();
    if (!items || items.length === 0) return 0;

    return items.reduce((total, item) => {
      if (
        !item ||
        !item.product ||
        typeof item.product.price !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        return total;
      }
      return total + item.product.price * item.quantity;
    }, 0);
  }

  getTotalItems(): number {
    const items = this.data();
    if (!items || items.length === 0) return 0;

    return items.reduce((total, item) => {
      if (!item || typeof item.quantity !== 'number') {
        return total;
      }
      return total + item.quantity;
    }, 0);
  }
}
