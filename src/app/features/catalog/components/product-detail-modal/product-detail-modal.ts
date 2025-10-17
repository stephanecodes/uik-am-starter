import {Component, EventEmitter, HostBinding, Input, Output, OnChanges, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../../../../shared/models/product.model';
import {Button} from '../../../../shared/components/button/button';
import {LoggerService} from '../../../../shared/services/logger.service';

@Component({
  selector: 'app-product-detail-modal',
  imports: [CommonModule, Button],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.scss'
})
export class ProductDetailModal implements OnChanges {
  @HostBinding('class') class = 'product-detail-modal';

  private logger = inject(LoggerService);

  @Input() product: Product | null = null;
  @Input() isOpen: boolean = false;

  ngOnChanges(): void {
    if (this.product) {
      this.logger.log('Produit sélectionné:', this.product);
      this.logger.log('Spécifications:', this.product.specifications);
    }
  }
  
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<{product: Product, quantity: number}>();
  @Output() toggleFavorite = new EventEmitter<Product>();

  quantity: number = 1;

  onClose(): void {
    this.close.emit();
  }

  private isAddingToCart = false;

  onAddToCart(): void {
    if (this.product && !this.isAddingToCart) {
      this.isAddingToCart = true;
      this.addToCart.emit({product: this.product, quantity: this.quantity});
      
      setTimeout(() => {
        this.onClose();
        this.isAddingToCart = false;
      }, 100);
    }
  }

  onToggleFavorite(): void {
    if (this.product) {
      this.toggleFavorite.emit(this.product);
    }
  }

  onQuantityChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.quantity = parseInt(target.value) || 1;
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
