// Importing required modules
const BookingService = require('../services/bookingService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for booking-related controllers
class BookingController {
  // Handling booking creation
  static async createBooking(req, res, next) {
    try {
      const { busId, seatNumbers } = req.body;
      const userId = req.user.id;
      const booking = await BookingService.createBooking(userId, busId, seatNumbers);
      res.status(201).json(new ApiResponse(201, booking, 'Booking created and seats blocked'));
    } catch (error) {
      logger.error('Error in createBooking controller', { error: error.message });
      next(error);
    }
  }
}

module.exports = BookingController;