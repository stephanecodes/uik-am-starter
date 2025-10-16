import {Component, HostBinding, inject, Signal, computed, effect} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikLayoutBreakpointObserverService, UikSidenavService} from "@visiativ/uik-am";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {CartService} from '../../services/cart.service';
import {PageTitleService} from '../../services/page-title.service';
import {FavoritesService} from '../../services/favorites.service';
import {LoggerService} from '../../services/logger.service';

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
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';

  private readonly layoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly sidenavService = inject(UikSidenavService);
  private readonly cartService = inject(CartService);
  private readonly pageTitleService = inject(PageTitleService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly logger = inject(LoggerService);

  layoutMatchesSmallViewport = toSignal(this.layoutBreakpointObserverService.matchesSmallViewport$);
  pageTitle = this.pageTitleService.getTitle();
  
  cartItems = toSignal(this.cartService.getCartItems(), { initialValue: [] });
  
  cartCount = computed(() => {
    const count = this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
    this.logger.log('Header - Nombre total articles panier:', count, 'Items:', this.cartItems());
    return count;
  });

  favoriteItems = toSignal(this.favoritesService.getFavorites(), { initialValue: [] });
  
  favoritesCount = computed(() => {
    const count = this.favoriteItems().length;
    this.logger.log('Header - Nombre de favoris:', count, 'Items:', this.favoriteItems());
    return count;
  });

  isBumping = false;
  private previousCount = 0;

  constructor() {
    effect(() => {
      const currentCount = this.cartCount();
      
      if (currentCount > this.previousCount && currentCount > 0) {
        this.triggerBump();
      }
      
      this.previousCount = currentCount;
    });
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  private triggerBump() {
    this.isBumping = true;
    setTimeout(() => {
      this.isBumping = false;
    }, 300);
  }
}
