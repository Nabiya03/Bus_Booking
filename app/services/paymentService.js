// Importing required modules
const razorpay = require('../config/razorpay');
const { Payment, Booking, Seat } = require('../models');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');
const { PAYMENT_STATUS } = require('../utils/constants');
const BookingService = require('./bookingService');

// Class for payment-related services
class PaymentService {
  // Creating a Razorpay order
  static async createOrder(userId, bookingId, amount) {
    logger.info('Creating payment order', { userId, bookingId });
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      logger.warn('Booking not found for payment', { bookingId });
      throw new ApiError(404, 'Booking not found');
    }
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${userId}_${bookingId}`,
    });
    const payment = await Payment.create({
      userId,
      bookingId,
      razorpayOrderId: order.id,
      amount,
      status: PAYMENT_STATUS.PENDING,
    });
    logger.info('Payment order created', { orderId: order.id });
    return { order, payment };
  }

  // Verifying payment and confirming booking
  static async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId) {
    logger.info('Verifying payment', { razorpayOrderId, bookingId });
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    if (generatedSignature !== razorpaySignature) {
      logger.warn('Payment verification failed: Invalid signature', { razorpayOrderId });
      await BookingService.cancelBooking(bookingId);
      throw new ApiError(400, 'Invalid payment signature');
    }
    await Payment.update(
      { status: PAYMENT_STATUS.COMPLETED },
      { where: { razorpayOrderId } }
    );
    await BookingService.confirmBooking(bookingId);
    logger.info('Payment verified and booking confirmed', { razorpayOrderId });
    return true;
  }

  // Handling payment failure
  static async handlePaymentFailure(bookingId) {
    logger.info('Handling payment failure', { bookingId });
    await BookingService.cancelBooking(bookingId);
    logger.info('Booking cancelled due to payment failure', { bookingId });
  }
}

module.exports = PaymentService;