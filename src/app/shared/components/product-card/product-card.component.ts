import { Component, HostBinding, Input } from '@angular/core';

import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardActions,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Product } from '../../types/product.types';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  // styles are defined in src/theme/components/app/_product-card.scss
})
export class ProductCardComponent {
  @HostBinding('class') class = 'app-product-card';

  @Input() product?: Product;
}
