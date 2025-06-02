// Importing required modules
const PaymentService = require('../services/paymentService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for payment-related controllers
class PaymentController {
  // Handling payment order creation
  static async createOrder(req, res, next) {
    try {
      const { bookingId, amount } = req.body;
      const userId = req.user.id;
      const data = await PaymentService.createOrder(userId, bookingId, amount);
      res.status(201).json(new ApiResponse(201, data, 'Payment order created'));
    } catch (error) {
      logger.error('Error in createOrder controller', { error: error.message });
      next(error);
    }
  }

  // Handling payment verification
  static async verifyPayment(req, res, next) {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;
      await PaymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId);
      res.status(200).json(new ApiResponse(200, null, 'Payment verified and booking confirmed'));
    } catch (error) {
      logger.error('Error in verifyPayment controller', { error: error.message });
      await PaymentService.handlePaymentFailure(req.body.bookingId);
      next(error);
    }
  }
}

module.exports = PaymentController;