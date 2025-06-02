// Importing required modules
const OperatorService = require('../services/operatorService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for operator-related controllers
class OperatorController {
  // Handling operator creation
  static async createOperator(req, res, next) {
    try {
      const { name, contactEmail } = req.body;
      const operator = await OperatorService.createOperator(name, contactEmail);
      res.status(201).json(new ApiResponse(201, operator, 'Operator created successfully'));
    } catch (error) {
      logger.error('Error in createOperator controller', { error: error.message });
      next(error);
    }
  }

  // Fetching all operators
  static async getOperators(req, res, next) {
    try {
      const operators = await OperatorService.getOperators();
      res.status(200).json(new ApiResponse(200, operators, 'Operators fetched successfully'));
    } catch (error) {
      logger.error('Error in getOperators controller', { error: error.message });
      next(error);
    }
  }
}

module.exports = OperatorController;