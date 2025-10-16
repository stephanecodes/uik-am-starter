import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private titleSignal = signal<string>('Page title');

  getTitle() {
    return this.titleSignal.asReadonly();
  }

  setTitle(title: string) {
    this.titleSignal.set(title);
  }
}
