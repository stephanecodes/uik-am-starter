import {Component, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-payment-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  template: `
    <div class="dialog-content">
      <div class="success-icon">
        <mat-icon>check_circle</mat-icon>
      </div>
      <h2>Paiement accepté</h2>
      <p>Votre commande a été validée avec succès</p>
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
      
      .success-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba($success, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: $success;
        }
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
  `]
})
export class PaymentConfirmDialogComponent {
  @HostBinding('class') class = 'app-payment-confirm-dialog';
}

