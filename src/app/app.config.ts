import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { provideUikCore } from '@visiativ/uik-am';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Register French locale use for exemple for currency
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Registers core services and configuration required by the UIK AM library.
    provideUikCore(),
    // Registers Angular's HttpClient and enables dependency-injected HTTP interceptors.
    // This is required for UIK service or component that depends on HttpClient, such as UikBrandingService.
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
