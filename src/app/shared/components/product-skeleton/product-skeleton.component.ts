import {Component, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-skeleton.component.html',
  styleUrl: './product-skeleton.component.scss'
})
export class ProductSkeletonComponent {
  @HostBinding('class') class = 'product-skeleton';
}

