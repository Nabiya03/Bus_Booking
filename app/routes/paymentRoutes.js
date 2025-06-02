// Importing required modules
const express = require('express');
const PaymentController = require('../controllers/paymentController');
const { authenticate } = require('../middlewares/authMiddleware');

// Initializing router
const router = express.Router();

// Defining payment routes
router.post('/create-order', authenticate, PaymentController.createOrder);
router.post('/verify', authenticate, PaymentController.verifyPayment);

module.exports = router;