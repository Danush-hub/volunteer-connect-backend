// emailService.js
const nodemailer = require('nodemailer');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/Event');
require('dotenv').config();  // Load environment variables

// Create Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com", // Mailjet SMTP server
    port: 587, // SMTP port for TLS
    auth: {
        user: process.env.API_KEY, // SMTP username
        pass: process.env.SECRET_KEY, // SMTP password
    }
});

// Send email to volunteers about the latest event
exports.sendEmailToVolunteers = async (latestEvent) => {
    try {
        // Fetch all volunteers' email addresses
        const volunteers = await Volunteer.find();
        const emails = volunteers.map((v) => v.email);

        if (emails.length === 0) {
            console.log('No volunteer emails found.');
            return;
        }

        // Get the latest event or use the provided one
        const event = latestEvent || await Event.findOne().sort({ date: -1 });
        if (!event) {
            console.log('No event found to notify volunteers.');
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Ensure this matches SMTP user
            to: emails.join(", "), // Join emails into a single string
            subject: `New Volunteering Event: ${event.title}`,
            text: `Hello Volunteer,\n\nWe are excited to announce a new volunteering opportunity:\n\n` +
                  `Event Name: ${event.title}\n` +
                  `Description: ${event.description}\n` +
                  `Location: ${event.location}\n` +
                  `Date: ${new Date(event.date).toLocaleString()}\n\n` +
                  `Join us and make a difference! For more details, join our WhatsApp group:\n${event.whatsappGroupLink}\n\n` +
                  `Thank you for your willingness to help!\n\nBest Regards,\nVolunteer Team`,
        };

        // Send email to all volunteers
        await transporter.sendMail(mailOptions);
        console.log(`Emails sent for event: ${event.title}`);
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};




// Send test email function
/*const sendTestEmail = () => {
    transporter.sendMail({
        from: 'sagdanush6204@gmail.com',
        to: 'pathiyam.pvt.ltd@gmail.com',
        subject: 'Test Email',
        text: 'Hello from Volunteer-connect!'
    }, (error, info) => {
        if (error) {
            console.log('Error sending test email:', error);
        } else {
            console.log('Test email sent:', info.response);
        }
    });
};
sendTestEmail();*/


