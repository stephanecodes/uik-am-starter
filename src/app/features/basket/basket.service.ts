import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private items: { product: any, quantity: number }[] = [];

  private basketCountSubject = new BehaviorSubject<number>(0);
  basketCount$ = this.basketCountSubject.asObservable();

  constructor() {}

  private updateCount() {
    const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.basketCountSubject.next(total);
  }

  addToBasket(product: any) {
    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        this.items.push({ product, quantity: 1 });
    }

    this.updateCount();
  }

  getBasket() {
    return this.items;
  }

  increaseQuantity(index: number) {
    this.items[index].quantity++;
    this.updateCount();
  }

  decreaseQuantity(index: number) {
    if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
    } else {
      this.removeItem(index);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.updateCount();
  }

  clearBasket() {
    this.items = [];
  }
}