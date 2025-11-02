import { Component, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { Product } from '../../types/product.types';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './product-detail-dialog.component.html',
})
export class ProductDetailDialogComponent {
  @HostBinding('class') class = 'app-product-detail-dialog';

  private readonly dialogRef = inject(
    MatDialogRef<ProductDetailDialogComponent>
  );
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);
  readonly product: Product = inject(MAT_DIALOG_DATA);

  quantity = signal<number>(1);
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  onAddToCart(): void {
    this.cartService.addToCart(this.product, this.quantity()).subscribe();

    this.snackBar.open(
      `${this.product.name} (x${this.quantity()}) added to cart`,
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );

    this.dialogRef.close({ added: true, quantity: this.quantity() });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getTotalPrice(): number {
    return this.product.price * this.quantity();
  }
}
