export interface FlipkartOfferPayload {
  data?: {
    sections?: Array<{
      offers?: Array<{
        id: string;
        title: string;
        bankName: string;
        discountAmount?: number;
        paymentInstruments?: string[];
      }>
    }>
  }
}
