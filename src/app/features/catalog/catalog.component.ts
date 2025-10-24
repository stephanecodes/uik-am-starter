import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UikAmModule } from "@visiativ/uik-am";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
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

  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe(data => {
        this.products = data;
      });
  }
}