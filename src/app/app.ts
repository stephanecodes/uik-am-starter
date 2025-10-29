import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { UikAmModule, UikAppContextHandler } from '@visiativ/uik-am';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UikAmModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected title = 'Visiativ Test App';

  private _appContextSubscription?: Subscription;

  constructor(
    private readonly uikAppContextHandler: UikAppContextHandler,
    private readonly titleService: Title
  ) {}

  ngOnInit() {
    // Subscribe to app context changes to update the title
    this._appContextSubscription =
      this.uikAppContextHandler.appContext$.subscribe(context => {
        // Create title from context
        const title = this.createTitleFromContext(context);
        this.titleService.setTitle(title);
      });

    // Set initial context
    this.uikAppContextHandler.setAppContext({
      applicationName: 'Visiativ Test App',
      title: '',
    });
  }

  private createTitleFromContext(context: any): string {
    // Simple title creation logic - you can customize this
    if (context?.title && context?.applicationName) {
      return `${context.title} - ${context.applicationName}`;
    } else if (context?.title) {
      return context.title;
    } else if (context?.applicationName) {
      return context.applicationName;
    }
    return this.title; // fallback to default title
  }

  ngOnDestroy() {
    if (this._appContextSubscription) {
      this._appContextSubscription.unsubscribe();
    }
  }
}
