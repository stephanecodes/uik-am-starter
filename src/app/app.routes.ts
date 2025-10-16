import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {CatalogComponent} from './features/catalog/catalog.component';
import {CartComponent} from './features/cart/cart.component';
import {PaymentComponent} from './features/payment/payment.component';

export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: CatalogComponent},
      {path: 'cart', component: CartComponent},
      {path: 'payment', component: PaymentComponent},
    ]
  }
];
