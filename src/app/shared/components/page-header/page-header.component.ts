import { Component, HostBinding, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  UikAmModule,
  UikLayoutBreakpointObserverService,
  UikSidenavService,
} from '@visiativ/uik-am';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-page-header',
  imports: [
    MatSidenavModule,
    UikAmModule,
    MatIcon,
    MatToolbar,
    MatBadgeModule,
    MatIconButton,
    RouterLink,
  ],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';

  private readonly layoutBreakpointObserverService = inject(
    UikLayoutBreakpointObserverService
  );
  private readonly sidenavService = inject(UikSidenavService);
  private readonly cartService = inject(CartService);

  layoutMatchesSmallViewport = toSignal(
    this.layoutBreakpointObserverService.matchesSmallViewport$
  );

  cartItemCount = toSignal(this.cartService.getNumberOfItems(), {
    initialValue: 0,
  });

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
