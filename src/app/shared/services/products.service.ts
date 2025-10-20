interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  warranty: string;
  category: string;
  tags: string[];
  warning?: string;
  offer?: string;
  discount?: string;
  price: number;
  currency: string;
  image: string;
  specifications: Specification[];
}

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  public products = signal<Product[]>([])
  readonly url = 'http://localhost:3000/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(products => this.products.set(products))
    );
  }

  getProduct(id: number): Product | undefined {
    const product: Product | undefined = this.products().find((product) => product.id === id);
    return product;
  }
}