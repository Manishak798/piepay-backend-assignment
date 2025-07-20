import { Document } from 'mongoose';

export interface IOffer extends Document {
  offerId: string;
  title: string;
  bank: string;
  discountAmount: number;
  paymentInstruments: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
