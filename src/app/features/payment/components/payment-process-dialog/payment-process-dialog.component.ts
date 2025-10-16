import {Component, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-payment-process-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule],
  template: `
    <div class="dialog-content">
      <mat-spinner diameter="60"></mat-spinner>
      <h2>Paiement en cours...</h2>
      <p>Veuillez patienter pendant que nous traitons votre paiement</p>
    </div>
  `,
  styles: [`
    @import "vars";
    
    :host {
      display: block;
    }
    
    .dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      
      mat-spinner {
        margin-bottom: 1.5rem;
      }
      
      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: $text-primary;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        font-size: 1rem;
        color: $text-secondary;
        margin: 0;
      }
    }
    
    ::ng-deep .mat-mdc-progress-spinner circle {
      stroke: $primary-color !important;
    }
  `]
})
export class PaymentProcessDialogComponent {
  @HostBinding('class') class = 'app-payment-process-dialog';
}

