import { Component, HostBinding } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { UikAppContextHandler } from '@visiativ/uik-am';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [PageLayoutComponent],
  // styles are defined in src/theme/components/app/_basket.scss
})
export class BasketComponent {
  @HostBinding('class') class = 'app-basket';

  constructor(private uikAppContextHandler: UikAppContextHandler) {}

  ngOnInit(): void {
    // Update the whole appContext
    this.uikAppContextHandler.setAppContext({
      applicationName: 'Visiativ Test App',
      title: 'Basket',
    });
  }
}
