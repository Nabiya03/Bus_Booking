// Importing required modules
const AuthService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for authentication-related controllers
class AuthController {
  // Handling user registration
  static async register(req, res, next) {
    try {
      const { email, password, gender, role } = req.body;
      const user = await AuthService.register(email, password, gender, role);
      res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
    } catch (error) {
      logger.error('Error in register controller', { error: error.message });
      next(error);
    }
  }

  // Handling user login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.status(200).json(new ApiResponse(200, data, 'Login successful'));
    } catch (error) {
      logger.error('Error in login controller', { error: error.message });
      next(error);
    }
  }
}

module.exports = AuthController;