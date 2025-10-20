import {Component, HostBinding, inject, signal, computed, model} from '@angular/core';
import {UikAmModule, UIK_DIALOG_CONFIG_PRESETS} from "@visiativ/uik-am";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatPrefix} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import { ProductService } from '../../shared/services/products.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { DialogSimpleTemplate } from '../../shared/components/dialog/dialog-simple-template';
import { Product } from '../../shared/services/products.service';

import {
  MatDialog
} from '@angular/material/dialog';


@Component({
  selector: 'app-catalog',
  imports: [
    UikAmModule,
    MatButtonModule,
    MatCardModule,
    PageLayoutComponent,
    ProductCardComponent,
    MatFormField,
    MatSuffix,
    MatPaginator,
    MatIcon,
    MatInput,
    MatPrefix,
    FormsModule
  ],
  templateUrl: './catalog.component.html',
  styles: `.flexContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    } `,
    styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent {
  private productService = inject(ProductService);
  products = this.productService.products;
  pageIndex = signal(0);
  pageSize = signal(10);
  paginatedProduct = computed(() => {
    const arr = this.products().slice((this.pageIndex
      () * this.pageSize()), ((this.pageIndex() * this.pageSize()) + (this.pageSize())));
    return arr
  });

  filterValue = signal('Filter');

  readonly dialogConfigPresets = inject(UIK_DIALOG_CONFIG_PRESETS);
  readonly uniqProduct = signal<Product | undefined>(undefined);
  readonly dialog = inject(MatDialog);

  handlePaginationEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize)
    this.pageIndex.set(e.pageIndex);
  }

  openDialog(configPreset: any): void {
    const dialogRef = this.dialog.open(DialogSimpleTemplate, {
      ...configPreset,
      data: {product: this.uniqProduct()},

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.uniqProduct.set(result);
      }
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe();
  }

  openLargeDialog = (productId: number): void => {
    const _product = this.products().find((element) => element.id === productId);
    this.uniqProduct.set(_product);
    this.openDialog(this.dialogConfigPresets.large);
  }

  @HostBinding('class') class = 'app-catalog';
}
