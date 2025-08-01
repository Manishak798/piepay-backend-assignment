import mongoose, { Schema, Model } from 'mongoose';
import { IOffer } from '../interface/offer.interface';

const offerSchema: Schema = new mongoose.Schema(
  {
    offerId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    bank: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    paymentInstruments: { type: [String], required: true },
  },
  { timestamps: true }
);

const Offer: Model<IOffer> = mongoose.model<IOffer>('Offer', offerSchema);
export default Offer;
