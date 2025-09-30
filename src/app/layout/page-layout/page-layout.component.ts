import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikSidenavLayout, UikSidenavService} from "@visiativ/uik-am";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {MatBadgeModule} from '@angular/material/badge';
import {PageHeaderComponent} from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-page-layout',
  imports: [
    MatSidenavModule,
    UikAmModule,
    MatBadgeModule,
    PageHeaderComponent,
  ],
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent implements OnInit {
  private readonly uikSidenavService = inject(UikSidenavService);

  @HostBinding('class') class = 'app-main-layout';

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
