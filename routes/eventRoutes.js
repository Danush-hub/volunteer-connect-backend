// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to add an event
router.post('/', eventController.createEvent);

module.exports = router;
