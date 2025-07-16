const Offer = require('../models/offer');

// Helper to extract offers from payload
function extractOffersFromPayload(payload) {
  const offers = [];
  const sections = payload?.data?.sections || [];
  sections.forEach(section => {
    (section?.offers || []).forEach(offer => {
      offers.push({
        offerId: offer.id,
        title: offer.title,
        bank: offer.bankName,
        discountAmount: offer.discountAmount || 0,
        paymentInstruments: offer.paymentInstruments || []
      });
    });
  });
  return offers;
}

exports.createOffers = async (req, res) => {
  const response = req.body.flipkartOfferApiResponse;
  const extractedOffers = extractOffersFromPayload(response);

  let newOffersCount = 0;
  for (const offer of extractedOffers) {
    const exists = await Offer.findOne({ offerId: offer.offerId });
    if (!exists) {
      await Offer.create(offer);
      newOffersCount++;
    }
  }

  res.json({
    noOfOffersIdentified: extractedOffers.length,
    noOfNewOffersCreated: newOffersCount
  });
};

exports.getHighestDiscount = async (req, res) => {
  const { amountToPay, bankName, paymentInstrument } = req.query;

  const query = { bank: bankName };
  if (paymentInstrument) {
    query.paymentInstruments = paymentInstrument;
  }

  const offers = await Offer.find(query);
  if (!offers.length) return res.json({ highestDiscountAmount: 0 });

  const maxDiscount = Math.max(...offers.map(o => o.discountAmount));
  res.json({ highestDiscountAmount: maxDiscount });
};
