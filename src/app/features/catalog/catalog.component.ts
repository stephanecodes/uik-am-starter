import { Component, HostBinding, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UikAmModule } from "@visiativ/uik-am";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { BasketService } from '../basket/basket.service';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    UikAmModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    PageLayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule,
    MatChipListbox,
    MatSelectModule
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @HostBinding('class') class = 'app-catalog';
  @ViewChild('productDialog') productDialog!: TemplateRef<any>;

  allProducts: any[] = [];
  products: any[] = [];
  pagedProducts: any[] = [];
  selectedProduct: any = null;

  pageSize = 10;
  currentPage = 0;

  isLoading = true;

  constructor(private http: HttpClient, private dialog: MatDialog, private basketService: BasketService) {}

  ngOnInit() {
    this.isLoading = true;

    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe({
        next: (data) => {
          this.allProducts = data.slice(0, 12);
          this.products = [...this.allProducts];
          this.updatePage();
        },
        error: (err) => {
          console.error('Erreur lors du chargement des produits', err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  filterProducts(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    this.products = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(query)
    );

    this.currentPage = 0;
    this.updatePage();
  }

  openProduct(product: any) {
    this.selectedProduct = product;
    this.dialog.open(this.productDialog);
  }

  addToBasket() {
    if (this.selectedProduct) {
      this.basketService.addToBasket(this.selectedProduct);
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePage();
  }

  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }
}