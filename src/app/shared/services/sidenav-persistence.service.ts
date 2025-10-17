import { Injectable, inject } from '@angular/core';
import { UikSidenavLayout, UikSidenavService } from '@visiativ/uik-am';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Service de persistance de l'état du sidenav
 * Gère la sauvegarde et la restauration du layout dans le localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class SidenavPersistenceService {
  private readonly STORAGE_KEY = 'sidenavLayout';
  private readonly uikSidenavService = inject(UikSidenavService);

  /**
   * Initialise la persistance du sidenav
   * À appeler dans le constructor du composant avec takeUntilDestroyed()
   */
  initializePersistence(): void {
    this.uikSidenavService.sidenavLayout$
      .pipe(takeUntilDestroyed())
      .subscribe((layout) => {
        this.saveLayout(layout);
      });
  }

  /**
   * Restaure le layout sauvegardé
   * À appeler dans ngOnInit()
   */
  restoreLayout(): void {
    const savedLayout = this.getLayout();
    this.uikSidenavService.changeSidenavLayout(savedLayout);
  }

  /**
   * Sauvegarde le layout dans le localStorage
   */
  private saveLayout(layout: UikSidenavLayout): void {
    localStorage.setItem(this.STORAGE_KEY, layout);
  }

  /**
   * Récupère le layout depuis le localStorage
   */
  private getLayout(): UikSidenavLayout {
    return (localStorage.getItem(this.STORAGE_KEY) as UikSidenavLayout) ?? 'initial';
  }
}

