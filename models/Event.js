// Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    volunteersRequired: { type: Number, required: true, min: 1 },
    eligibility: { type: String, default: 'Open to all' },
    location: { type: String, required: true },
    whatsappLink: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid WhatsApp link!`
        }
    },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
