// Importing required modules
const { Operator } = require('../models');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for operator-related services
class OperatorService {
  // Creating a new operator
  static async createOperator(name, contactEmail) {
    logger.info('Creating new operator', { name, contactEmail });
    const operator = await Operator.create({ name, contactEmail });
    logger.info('Operator created successfully', { operatorId: operator.id });
    return operator;
  }

  // Fetching all operators
  static async getOperators() {
    logger.info('Fetching all operators');
    const operators = await Operator.findAll();
    logger.info('Operators fetched successfully', { count: operators.length });
    return operators;
  }
}

module.exports = OperatorService;