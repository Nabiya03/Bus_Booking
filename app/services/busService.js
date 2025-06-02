// Importing required modules
const { Bus } = require('../models');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for bus-related services
class BusService {
  // Creating a new bus
  static async createBus(busNumber, operatorId, source, destination, departureTime, totalSeats) {
    logger.info('Creating new bus', { busNumber, operatorId });
    const bus = await Bus.create({ busNumber, operatorId, source, destination, departureTime, totalSeats });
    // Creating seats for the bus
    const seats = Array.from({ length: totalSeats }, (_, i) => ({
      busId: bus.id,
      seatNumber: i + 1,
      status: 'available',
    }));
    await Seat.bulkCreate(seats);
    logger.info('Bus and seats created successfully', { busId: bus.id });
    return bus;
  }

  // Fetching all buses
  static async getBuses() {
    logger.info('Fetching all buses');
    const buses = await Bus.findAll({ include: [{ model: Seat }] });
    logger.info('Buses fetched successfully', { count: buses.length });
    return buses;
  }

  // Fetching a bus by ID
  static async getBusById(id) {
    logger.info('Fetching bus by ID', { busId: id });
    const bus = await Bus.findByPk(id, { include: [{ model: Seat }] });
    if (!bus) {
      logger.warn('Bus not found', { busId: id });
      throw new ApiError(404, 'Bus not found');
    }
    logger.info('Bus fetched successfully', { busId: id });
    return bus;
  }
}

module.exports = BusService;