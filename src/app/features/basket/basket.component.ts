import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { BasketService } from "./basket.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChip, MatChipListbox } from "@angular/material/chips";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatChipListbox,
        MatChip,
        RouterModule
    ],
    templateUrl: './basket.component.html'
})
export class BasketComponent {
    constructor(private basketService: BasketService) {}

    get items() {
        return this.basketService.getBasket();
    }

    increaseQuantity(i: number) {
        this.basketService.increaseQuantity(i);
    }

    decreaseQuantity(i: number) {
        this.basketService.decreaseQuantity(i);
    }

    remove(i: number) {
        this.basketService.removeItem(i);
    }
}