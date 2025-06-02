// Importing required modules
const express = require('express');
const AuthController = require('../controllers/authController');

// Initializing router
const router = express.Router();

// Defining auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;