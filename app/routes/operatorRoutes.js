// Importing required modules
const express = require('express');
const OperatorController = require('../controllers/operatorController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants');

// Initializing router
const router = express.Router();

// Defining operator routes
router.post('/', authenticate, authorize([ROLES.ADMIN]), OperatorController.createOperator);
router.get('/', authenticate, authorize([ROLES.ADMIN, ROLES.SUPPORT]), OperatorController.getOperators);

module.exports = router;