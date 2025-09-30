import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {
  UikAmModule,
  UikLayoutBreakpointObserverService,
  UikSidenavLayout,
  UikSidenavNavigationRouteComponent,
  UikSidenavService
} from "@visiativ/uik-am";
import {MatDivider, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    UikAmModule,
    MatSidenav,
    MatNavList,
    MatIcon,
    UikSidenavNavigationRouteComponent,
    RouterLink,
    RouterLinkActive,
    MatDivider,
  ],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  private readonly uikLayoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly uikSidenavService = inject(UikSidenavService);

  @HostBinding('class') class = 'app-main-layout';

  layoutMatchesSmallViewport = toSignal(this.uikLayoutBreakpointObserverService.matchesSmallViewport$);
  sidenavLayout = toSignal(this.uikSidenavService.sidenavLayout$);

  constructor() {
    this.uikSidenavService.sidenavLayout$
      .pipe(takeUntilDestroyed())
      .subscribe((layout) => {
        localStorage.setItem('sidenavLayout', layout);
      });
  }

  ngOnInit(): void {
    const layout: UikSidenavLayout = localStorage.getItem('sidenavLayout') as UikSidenavLayout ?? 'initial';
    this.uikSidenavService.changeSidenavLayout(layout);
  }
}
