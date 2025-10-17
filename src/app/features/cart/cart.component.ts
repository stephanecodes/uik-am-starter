import {Component, HostBinding, inject, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CartService} from '../../shared/services/cart.service';
import {PageTitleService} from '../../shared/services/page-title.service';
import {CartItem} from '../../shared/models/cart-item.model';
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {Button} from '../../shared/components/button/button';
import {CartItemComponent} from './components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, Button, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-cart';

  private cartService = inject(CartService);
  private router = inject(Router);
  private pageTitleService = inject(PageTitleService);
  private subscription?: Subscription;

  cartItems: CartItem[] = [];
  total = 0;

  ngOnInit(): void {
    this.pageTitleService.setTitle('Votre panier');
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadCart(): void {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
  }

  onQuantityChange(quantity: number, productId: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Voulez-vous vraiment vider le panier ?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/payment']);
  }

  continueShopping(): void {
    this.router.navigate(['/home']);
  }
}

