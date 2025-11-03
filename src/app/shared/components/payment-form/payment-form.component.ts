import { Component, HostBinding, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UikIntlTelInputComponent, UikValidators } from '@visiativ/uik-am';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    UikIntlTelInputComponent,
  ],
  templateUrl: './payment-form.component.html',
  // styles are defined in src/theme/components/app/_payment-form.scss
})
export class PaymentFormComponent {
  @HostBinding('class') class = 'app-payment-form';

  // Modern dependency injection
  private readonly formBuilder = inject(FormBuilder);

  backToBasket = output<void>();

  paymentForm: FormGroup;

  constructor() {
    this.paymentForm = this.formBuilder.group({
      // Name section
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '+33 605-040-302',
        {
          validators: [UikValidators.telNumberValidator()],
          updateOn: 'blur',
        },
      ],
      email: ['', [Validators.required, Validators.email]],

      // Delivery Address section
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],

      // Payment section
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      ccv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardholderName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onBackToBasket(): void {
    this.backToBasket.emit();
  }

  onSubmitPayment(): void {
    if (this.paymentForm.valid) {
      // TODO: Implement payment submission in the future
      console.log('Payment form submitted:', this.paymentForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.paymentForm.markAllAsTouched();
    }
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.paymentForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }

    return field.invalid && (field.dirty || field.touched);
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.paymentForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field.hasError('minlength')) {
      return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.hasError('telNumber')) {
      return 'Please enter a valid phone number';
    }
    if (field.hasError('pattern')) {
      if (fieldName === 'cardNumber')
        return 'Please enter a valid 16-digit card number';
      if (fieldName === 'expiryDate')
        return 'Please enter date in MM/YY format';
      if (fieldName === 'ccv') return 'Please enter a valid 3-4 digit CCV';
    }

    return 'Invalid input';
  }
}
