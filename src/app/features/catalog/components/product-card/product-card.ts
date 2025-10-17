import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @HostBinding('class') class = 'product-card';
  
  @Input() product!: Product;
  @Input() isSelected: boolean = false;
  @Input() isFavorite: boolean = false;

  @Output() addToCart = new EventEmitter<Product>();
  @Output() toggleFavorite = new EventEmitter<Product>();
  @Output() openDetails = new EventEmitter<Product>();
  @Output() select = new EventEmitter<Product>();
  @Output() selectionChange = new EventEmitter<boolean>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.product);
  }

  onOpenDetails(): void {
    this.openDetails.emit(this.product);
  }

  onSelect(): void {
    this.select.emit(this.product);
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectionChange.emit(checked);
  }
}
