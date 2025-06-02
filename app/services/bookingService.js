// Importing required modules
const { Booking, Seat, User, Bus } = require('../models');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');
const { SEAT_STATUS, BOOKING_STATUS } = require('../utils/constants');

// Class for booking-related services
class BookingService {
  // Checking adjacent seat gender compatibility
  static async checkAdjacentSeats(busId, seatNumber, userId, userGender) {
    logger.info('Checking adjacent seats for gender compatibility', { busId, seatNumber, userId });
    const seats = await Seat.findAll({ where: { busId } });
    const totalSeats = seats.length;
    const adjacentSeatNumbers = [
      seatNumber - 1 > 0 ? seatNumber - 1 : null,
      seatNumber + 1 <= totalSeats ? seatNumber + 1 : null,
    ].filter(Boolean);

    const adjacentSeats = await Seat.findAll({
      where: { busId, seatNumber: adjacentSeatNumbers, status: 'booked' },
      include: [{ model: Booking, include: [{ model: User, attributes: ['gender'] }] }],
    });

    for (const seat of adjacentSeats) {
      const booking = seat.Booking;
      if (booking.userId !== userId && booking.User.gender !== userGender) {
        logger.warn('Gender conflict detected in adjacent seat', { seatNumber, adjacentSeat: seat.seatNumber });
        throw new ApiError(400, 'Cannot book seat next to opposite gender');
      }
    }
  }

  // Creating a booking and blocking seats
  static async createBooking(userId, busId, seatNumbers) {
    logger.info('Creating booking', { userId, busId, seatNumbers });
    const user = await User.findByPk(userId);
    const bus = await Bus.findByPk(busId);
    if (!bus) {
      logger.warn('Bus not found', { busId });
      throw new ApiError(404, 'Bus not found');
    }

    const seats = await Seat.findAll({
      where: { busId, seatNumber: seatNumbers, status: SEAT_STATUS.AVAILABLE },
    });

    if (seats.length !== seatNumbers.length) {
      logger.warn('Some seats are not available', { busId, seatNumbers });
      throw new ApiError(400, 'One or more seats are not available');
    }

    // Checking gender compatibility for each seat
    for (const seatNumber of seatNumbers) {
      await this.checkAdjacentSeats(busId, seatNumber, userId, user.gender);
    }

    // Blocking seats for 6 minutes
    const blockedUntil = new Date(Date.now() + 6 * 60 * 1000);
    await Seat.update(
      { status: SEAT_STATUS.BLOCKED, blockedUntil },
      { where: { busId, seatNumber: seatNumbers } }
    );

    // Creating booking
    const booking = await Booking.create({ userId, busId, status: BOOKING_STATUS.PENDING });
    await Seat.update({ bookingId: booking.id }, { where: { busId, seatNumber: seatNumbers } });

    logger.info('Booking created and seats blocked', { bookingId: booking.id });
    return booking;
  }

  // Confirming booking after payment
  static async confirmBooking(bookingId) {
    logger.info('Confirming booking', { bookingId });
    const booking = await Booking.findByPk(bookingId, { include: [{ model: Seat }] });
    if (!booking) {
      logger.warn('Booking not found', { bookingId });
      throw new ApiError(404, 'Booking not found');
    }
    await Seat.update(
      { status: SEAT_STATUS.BOOKED, blockedUntil: null },
      { where: { bookingId } }
    );
    await Booking.update({ status: BOOKING_STATUS.CONFIRMED }, { where: { id: bookingId } });
    logger.info('Booking confirmed successfully', { bookingId });
    return booking;
  }

  // Cancelling booking on payment failure
  static async cancelBooking(bookingId) {
    logger.info('Cancelling booking', { bookingId });
    const booking = await Booking.findByPk(bookingId, { include: [{ model: Seat }] });
    if (!booking) {
      logger.warn('Booking not found', { bookingId });
      throw new ApiError(404, 'Booking not found');
    }
    await Seat.update(
      { status: SEAT_STATUS.AVAILABLE, bookingId: null, blockedUntil: null },
      { where: { bookingId } }
    );
    await Booking.update({ status: BOOKING_STATUS.CANCELLED }, { where: { id: bookingId } });
    logger.info('Booking cancelled successfully', { bookingId });
    return booking;
  }
}

module.exports = BookingService;