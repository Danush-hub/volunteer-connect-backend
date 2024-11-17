// Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }
}, { collection: 'volunteers' });

module.exports = mongoose.model('Volunteer', volunteerSchema);
