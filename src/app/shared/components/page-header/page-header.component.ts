import {Component, HostBinding, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikLayoutBreakpointObserverService, UikSidenavService} from "@visiativ/uik-am";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-header',
  imports: [
    MatSidenavModule,
    UikAmModule,
    MatIcon,
    MatToolbar,
    MatBadgeModule,
    MatIconButton,
  ],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';

  private readonly layoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly sidenavService = inject(UikSidenavService);

  layoutMatchesSmallViewport = toSignal(this.layoutBreakpointObserverService.matchesSmallViewport$);

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
