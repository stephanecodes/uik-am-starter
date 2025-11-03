import { CartItem } from './cart.types';

export interface PaymentRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  ccv: string;
  cardholderName: string;
  totalAmount: number;
  items: CartItem[];
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
}
