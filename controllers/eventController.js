// eventController.js
const Event = require('../models/Event');
const { sendEmailToVolunteers } = require('../utils/emailService');

// Function to create an event and notify volunteers
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        // Fetch latest event and send email notifications
        await sendEmailToVolunteers(event);

        res.status(201).json({ message: 'Event created and notifications sent!' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ message: error.message });
    }
};
