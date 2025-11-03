import {
  Component,
  inject,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UikAmModule } from '@visiativ/uik-am';

export interface PaymentDialogData {
  state: 'processing' | 'success' | 'error';
}

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UikAmModule,
  ],
  templateUrl: './payment-dialog.component.html',
  // styles are defined in src/theme/components/app/_payment-dialog.scss
})
export class PaymentDialogComponent {
  @HostBinding('class') class = 'app-payment-dialog';

  private readonly dialogRef = inject(MatDialogRef<PaymentDialogComponent>);
  private readonly router = inject(Router);

  public readonly data: PaymentDialogData = inject(MAT_DIALOG_DATA);

  updateState(newState: 'processing' | 'success' | 'error'): void {
    this.data.state = newState;
  }

  backToCatalog(): void {
    this.dialogRef.close();
    this.router.navigate(['/catalog']);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
