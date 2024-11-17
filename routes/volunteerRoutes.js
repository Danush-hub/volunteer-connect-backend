// volunteerRoutes.js
const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer'); // Ensure Volunteer model is correctly imported

// POST route to register a new volunteer
router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;

    // Basic validation to ensure required fields are present
    if (!name || !email || !phone) {
        return res.status(400).send("Missing required fields: name, email, or phone.");
    }

    try {
        // Create a new volunteer instance using the request body
        const newVolunteer = new Volunteer({
            name,
            email,
            phone
        });

        // Save the new volunteer to the database
        await newVolunteer.save();

        // Send a success response
        res.status(201).send("Volunteer registered successfully.");
    } catch (error) {
        console.error("Error saving volunteer:", error);
        
        // Send an error response
        res.status(500).send("Failed to register volunteer.");
    }
});

module.exports = router;
