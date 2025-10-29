import { Component, HostBinding } from '@angular/core';
import { UikAmModule, UikAppContextHandler } from '@visiativ/uik-am';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';

@Component({
  selector: 'app-catalog',
  imports: [UikAmModule, MatButtonModule, MatCardModule, PageLayoutComponent],
  templateUrl: './catalog.component.html',
  // styles are defined in src/theme/components/app/_catalog.scss
})
export class CatalogComponent {
  @HostBinding('class') class = 'app-catalog';

  constructor(private uikAppContextHandler: UikAppContextHandler) {}

  ngOnInit(): void {
    // Update the whole appContext
    this.uikAppContextHandler.setAppContext({
      applicationName: 'Visiativ Test App',
      title: 'ZBL Industries',
      subtitle: 'Product Catalog',
    });
  }
}
