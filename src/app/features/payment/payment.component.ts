import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {Button} from '../../shared/components/button/button';
import {CartService} from '../../shared/services/cart.service';
import {PageTitleService} from '../../shared/services/page-title.service';
import {PaymentProcessDialogComponent} from './components/payment-process-dialog/payment-process-dialog.component';
import {PaymentConfirmDialogComponent} from './components/payment-confirm-dialog/payment-confirm-dialog.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    PageLayoutComponent, 
    Button,
    MatDialogModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @HostBinding('class') class = 'app-payment';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private cartService = inject(CartService);
  private pageTitleService = inject(PageTitleService);

  paymentForm!: FormGroup;
  isProcessing = false;

  ngOnInit(): void {
    this.pageTitleService.setTitle('Paiement');
    this.initForm();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      countryCode: ['+33', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\s]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: ['France', Validators.required],
      
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid && !this.isProcessing) {
      this.isProcessing = true;
      
      const processDialogRef = this.dialog.open(PaymentProcessDialogComponent, {
        disableClose: true,
        width: '400px'
      });

      setTimeout(() => {
        processDialogRef.close();
        
        const confirmDialogRef = this.dialog.open(PaymentConfirmDialogComponent, {
          disableClose: true,
          width: '400px'
        });

        setTimeout(() => {
          confirmDialogRef.close();
          this.cartService.clearCart();
          this.router.navigate(['/home']);
          this.isProcessing = false;
        }, 2000);
      }, 2000);
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  cancelPayment(): void {
    this.router.navigate(['/cart']);
  }

  get f() {
    return this.paymentForm.controls;
  }
}

