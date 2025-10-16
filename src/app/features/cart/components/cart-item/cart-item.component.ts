import {Component, EventEmitter, HostBinding, Input, Output, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartItem} from '../../../../shared/models/cart-item.model';
import {LoggerService} from '../../../../shared/services/logger.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  @HostBinding('class') class = 'app-cart-item';

  private logger = inject(LoggerService);

  @Input() item!: CartItem;
  
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  ngOnInit() {
    this.logger.log('CartItem - Item reçu:', this.item);
    this.logger.log('CartItem - Quantité:', this.item.quantity);
    this.logger.log('CartItem - Type quantité:', typeof this.item.quantity);
  }

  onQuantityChange(quantity: number): void {
    this.logger.log('CartItem - Changement quantité:', quantity);
    this.quantityChange.emit(quantity);
  }

  onRemove(): void {
    this.remove.emit();
  }
}

