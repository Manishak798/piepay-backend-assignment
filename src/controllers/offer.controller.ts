import { Request, Response } from 'express';
import Offer from '../models/offer.model';
import { IOffer } from '../interface/offer.interface';
import { FlipkartOfferPayload } from '../interface/flipkartPayload.interface';

class OfferController {
  private extractOffersFromPayload(payload: FlipkartOfferPayload): IOffer[] {
    const offers: IOffer[] = [];
    const sections = payload?.data?.sections || [];

    sections.forEach(section => {
      (section?.offers || []).forEach(offer => {
        offers.push({
          offerId: offer.id,
          title: offer.title,
          bank: offer.bankName,
          discountAmount: offer.discountAmount || 0,
          paymentInstruments: offer.paymentInstruments || []
        } as IOffer);
      });
    });

    return offers;
  }

  public createOffers = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = req.body.flipkartOfferApiResponse as FlipkartOfferPayload;
      const extractedOffers = this.extractOffersFromPayload(response);

      let newOffersCount = 0;

      for (const offer of extractedOffers) {
        const exists = await Offer.findOne({ offerId: offer.offerId });
        if (!exists) {
          await Offer.create(offer);
          newOffersCount++;
        }
      }

      res.status(200).json({
        noOfOffersIdentified: extractedOffers.length,
        noOfNewOffersCreated: newOffersCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create offers' });
    }
  };

  public getHighestDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { amountToPay, bankName, paymentInstrument } = req.query as {
        amountToPay?: string;
        bankName?: string;
        paymentInstrument?: string;
      };

      if (!bankName) {
        res.status(400).json({ error: 'bankName is required' });
        return;
      }

      const query: Record<string, any> = { bank: bankName };
      if (paymentInstrument) {
        query.paymentInstruments = paymentInstrument;
      }

      const offers = await Offer.find(query);
      if (!offers.length) {
        res.status(200).json({ highestDiscountAmount: 0 });
        return;
      }

      const maxDiscount = Math.max(...offers.map(o => o.discountAmount));
      res.status(200).json({ highestDiscountAmount: maxDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch highest discount' });
    }
  };
}

export default new OfferController();
