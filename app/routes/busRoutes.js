// Importing required modules
const express = require('express');
const BusController = require('../controllers/busController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants');

// Initializing router
const router = express.Router();

// Defining bus routes
router.post('/', authenticate, authorize([ROLES.ADMIN, ROLES.OPERATOR]), BusController.createBus);
router.get('/', BusController.getBuses);
router.get('/:id', BusController.getBusById);

module.exports = router;