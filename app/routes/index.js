// Importing required modules
const express = require('express');
const authRoutes = require('./authRoutes');
const busRoutes = require('./busRoutes');
const bookingRoutes = require('./bookingRoutes');
const operatorRoutes = require('./operatorRoutes');
const paymentRoutes = require('./paymentRoutes');

// Initializing router
const router = express.Router();

// Mounting routes
router.use('/auth', authRoutes);
router.use('/buses', busRoutes);
router.use('/bookings', bookingRoutes);
router.use('/operators', operatorRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;