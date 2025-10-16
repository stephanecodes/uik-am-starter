import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikSidenavService} from "@visiativ/uik-am";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatBadgeModule} from '@angular/material/badge';
import {PageHeaderComponent} from '../../shared/components/page-header/page-header.component';
import {SidenavPersistenceService} from '../../shared/services/sidenav-persistence.service';

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
  private readonly sidenavPersistence = inject(SidenavPersistenceService);

  @HostBinding('class') class = 'app-page-layout';

  sidenavLayout = toSignal(this.uikSidenavService.sidenavLayout$);

  constructor() {
    this.sidenavPersistence.initializePersistence();
  }

  ngOnInit(): void {
    this.sidenavPersistence.restoreLayout();
  }
}
