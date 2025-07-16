const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offerId: { type: String, unique: true },
  title: String,
  bank: String,
  discountAmount: Number,
  paymentInstruments: [String] // e.g. ['CREDIT', 'EMI_OPTIONS']
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
