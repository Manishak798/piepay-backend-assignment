import express, { Router } from 'express';
import offerController from '../controllers/offer.controller';

const router: Router = express.Router();

router.post('/offer', offerController.createOffers);
router.get('/highest-discount', offerController.getHighestDiscount);

export default router;
