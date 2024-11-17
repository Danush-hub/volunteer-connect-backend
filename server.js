// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const { sendEmailToVolunteers } = require('./utils/emailService');  // Import email service

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('MongoDB connected successfully');
    startWatchingEvents();  // Start watching for new events
})
  .catch((error) => console.error('MongoDB connection failed:', error.message));

// Use event routes for handling events and volunteer routes
app.use('/api/events', eventRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Watch for new events and send email notifications
async function startWatchingEvents() {
    const eventCollection = mongoose.connection.collection('events');  // Access the 'events' collection

    // Watch for insert operations
    const changeStream = eventCollection.watch([{ $match: { operationType: 'insert' } }]);

    changeStream.on('change', async (change) => {
        console.log('Change detected:', change);  // Add this log to check the event change
        try {
            const newEvent = change.fullDocument;

            // Send email to volunteers
            await sendEmailToVolunteers(newEvent);
            console.log('Email sent for new event:', newEvent.eventName);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });

    console.log('Watching for new events...');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
