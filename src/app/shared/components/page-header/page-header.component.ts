import {Component, HostBinding, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikLayoutBreakpointObserverService, UikSidenavService} from "@visiativ/uik-am";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {toSignal} from '@angular/core/rxjs-interop';
import {UikAppContext} from '@visiativ/uik-am';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../../features/basket/basket.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    UikAmModule,
    MatIcon,
    MatToolbar,
    MatBadgeModule,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';

  basketCount$!: Observable<number>;

  exampleAppContext: UikAppContext = {
    applicationName: "ZBL Industries",
    title: "ZBL Industries",
    subtitle: "Product catalog",
  }

  private basketService = inject(BasketService);

  constructor() {
    this.basketCount$ = this.basketService.basketCount$;
  }

  private readonly layoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly sidenavService = inject(UikSidenavService);

  layoutMatchesSmallViewport = toSignal(this.layoutBreakpointObserverService.matchesSmallViewport$);

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}