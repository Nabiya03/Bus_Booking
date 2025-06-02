// Importing required modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

// Class for authentication-related services
class AuthService {
  // Registering a new user
  static async register(email, password, gender, role) {
    logger.info('Attempting user registration', { email, role });
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn('Registration failed: Email exists', { email });
      throw new ApiError(400, 'Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, gender, role });
    logger.info('User registered successfully', { userId: user.id });
    return user;
  }

  // Logging in a user
  static async login(email, password) {
    logger.info('Attempting user login', { email });
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn('Login failed: Invalid credentials', { email });
      throw new ApiError(401, 'Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    logger.info('User logged in successfully', { userId: user.id });
    return { user, token };
  }
}

module.exports = AuthService;