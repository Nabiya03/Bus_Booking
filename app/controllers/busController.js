// Importing required modules
const BusService = require('../services/busService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for bus-related controllers
class BusController {
  // Handling bus creation
  static async createBus(req, res, next) {
    try {
      const { busNumber, operatorId, source, destination, departureTime, totalSeats } = req.body;
      const bus = await BusService.createBus(busNumber, operatorId, source, destination, departureTime, totalSeats);
      res.status(201).json(new ApiResponse(201, bus, 'Bus created successfully'));
    } catch (error) {
      logger.error('Error in createBus controller', { error: error.message });
      next(error);
    }
  }

  // Fetching all buses
  static async getBuses(req, res, next) {
    try {
      const buses = await BusService.getBuses();
      res.status(200).json(new ApiResponse(200, buses, 'Buses fetched successfully'));
    } catch (error) {
      logger.error('Error in getBuses controller', { error: error.message });
      next(error);
    }
  }

  // Fetching a bus by ID
  static async getBusById(req, res, next) {
    try {
      const bus = await BusService.getBusById(req.params.id);
      res.status(200).json(new ApiResponse(200, bus, 'Bus fetched successfully'));
    } catch (error) {
      logger.error('Error in getBusById controller', { error: error.message });
      next(error);
    }
  }
}

module.exports = BusController;