import {
  Component,
  HostBinding,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services';
import { CartItem } from '../../types';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './basket-item.component.html',
  // styles are defined in src/theme/components/app/_basket-item.scss
})
export class BasketItemComponent {
  @HostBinding('class') class = 'app-basket-item';

  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  // Input: the cart item to display
  cartItem = input.required<CartItem>();

  // Output: emit when item is removed or quantity updated
  itemUpdated = output<void>();

  quantity = signal<number>(1);
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.quantity.set(this.cartItem().quantity);
  }

  onQuantityChange(newQuantity: number): void {
    const oldQuantity = this.quantity();
    this.quantity.set(newQuantity);

    this.cartService
      .updateCartItemQuantity(
        this.cartItem().id,
        this.cartItem().product,
        newQuantity
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            `${this.cartItem().product.name} quantity updated`,
            'Close',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          this.itemUpdated.emit();
        },
        error: () => {
          // Revert quantity on error
          this.quantity.set(oldQuantity);
          this.snackBar.open('Failed to update quantity', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }

  onRemoveFromCart(): void {
    this.cartService.deleteFromCart(this.cartItem().id).subscribe({
      next: () => {
        this.snackBar.open(
          `${this.cartItem().product.name} removed from cart`,
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        this.itemUpdated.emit();
      },
      error: () => {
        this.snackBar.open('Failed to remove item from cart', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  getTotalPrice(): number {
    const cartItem = this.cartItem();
    if (
      !cartItem ||
      !cartItem.product ||
      typeof cartItem.product.price !== 'number'
    ) {
      return 0;
    }
    return cartItem.product.price * this.quantity();
  }

  get product() {
    const cartItem = this.cartItem();
    return cartItem?.product || null;
  }
}
