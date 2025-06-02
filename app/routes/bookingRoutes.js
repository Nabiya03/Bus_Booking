// Importing required modules
const express = require('express');
const BookingController = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');

// Initializing router
const router = express.Router();

// Defining booking routes
router.post('/', authenticate, BookingController.createBooking);

module.exports = router;