import {Component, input, computed} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCard,MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions} from "@angular/material/card";
import { Product } from "../../services/products.service";


@Component({
  selector: 'product-card-component',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatIcon,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent {
  product = input<Product | undefined>();
  imageUrl = computed(() => `http://localhost:3000${this.product()?.image ? this.product()?.image : ""}`);


}