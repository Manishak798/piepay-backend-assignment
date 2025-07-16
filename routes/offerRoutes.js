const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.post('/offer', offerController.createOffers);
router.get('/highest-discount', offerController.getHighestDiscount);

module.exports = router;
