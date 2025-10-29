import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { BasketComponent } from './features/basket/basket.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent },
      { path: 'basket', component: BasketComponent },
    ],
  },
];
