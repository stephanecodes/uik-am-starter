import { Component, HostBinding, OnInit } from '@angular/core';
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
    MatButtonToggleModule
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @HostBinding('class') class = 'app-catalog';

  allProducts: any[] = [];   // Tous les produits
  products: any[] = [];      // Produits filtrés
  pagedProducts: any[] = [];

  pageSize = 10;
  currentPage = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe(data => {
        this.allProducts = data.slice(0, 12);
        this.products = [...this.allProducts];
        this.updatePage();
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