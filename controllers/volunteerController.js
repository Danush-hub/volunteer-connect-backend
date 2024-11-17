// volunteerController.js
const Volunteer = require('../models/Volunteer');
const { sendEmailToVolunteers } = require('../utils/emailService');

exports.registerVolunteer = async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();

        // Fetch latest event and notify new volunteer
        await sendEmailToVolunteers();

        res.status(201).json({ message: 'Volunteer registered successfully' });
    } catch (error) {
        console.error('Error registering volunteer:', error);
        res.status(400).json({ message: error.message });
    }
};
