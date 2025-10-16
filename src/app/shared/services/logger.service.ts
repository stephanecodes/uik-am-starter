import { Injectable, isDevMode } from '@angular/core';

/**
 * Service de logging centralisé
 * Tous les logs sont désactivés (masqués)
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isDev = isDevMode();
  private enabled = false; // Désactiver tous les logs

  /**
   * Log d'information (niveau debug) - DÉSACTIVÉ
   */
  log(message: string, ...data: any[]): void {
    if (this.enabled && this.isDev) {
      console.log(message, ...data);
    }
  }

  /**
   * Log d'erreur - DÉSACTIVÉ
   */
  error(message: string, ...data: any[]): void {
    if (this.enabled) {
      console.error(message, ...data);
    }
  }

  /**
   * Log d'avertissement - DÉSACTIVÉ
   */
  warn(message: string, ...data: any[]): void {
    if (this.enabled && this.isDev) {
      console.warn(message, ...data);
    }
  }

  /**
   * Log d'information - DÉSACTIVÉ
   */
  info(message: string, ...data: any[]): void {
    if (this.enabled && this.isDev) {
      console.info(message, ...data);
    }
  }

  /**
   * Groupe de logs - DÉSACTIVÉ
   */
  group(label: string): void {
    if (this.enabled && this.isDev) {
      console.group(label);
    }
  }

  /**
   * Fin de groupe de logs - DÉSACTIVÉ
   */
  groupEnd(): void {
    if (this.enabled && this.isDev) {
      console.groupEnd();
    }
  }

  /**
   * Table de logs - DÉSACTIVÉ
   */
  table(data: any): void {
    if (this.enabled && this.isDev) {
      console.table(data);
    }
  }
}

