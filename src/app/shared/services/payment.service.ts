import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PaymentRequest, PaymentResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/payments'; // JSON Server URL

  /**
   * Add payment to the server - persists payment data via API
   */
  addPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    const transactionId = this.generateTransactionId();

    const paymentRecord = {
      ...paymentData,
      transactionId,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    return this.http.post<PaymentResponse>(this.apiUrl, paymentRecord).pipe(
      map(response => ({
        ...response,
        transactionId,
        success: true,
        message: 'Payment processed and saved successfully',
      }))
    );
  }

  /**
   * Generate a mock transaction ID
   */
  private generateTransactionId(): string {
    return `T_${Date.now()}_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  }
}
