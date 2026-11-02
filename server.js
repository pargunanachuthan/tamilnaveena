const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pargunanpargunan2000@gmail.com',
        pass: 'kwyvxkzmdakmodaw'
    }
});

app.post('/rsvp', async (req, res) => {
    const { name, email, phone, guests, message } = req.body;
    const html = `
        <h2 style="color:#D4AF37;">New RSVP - Nethaji & Ishwarya Wedding</h2>
        <table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse;">
            <tr><td style="padding:6px 16px 6px 0;color:#888;">Name</td><td><b>${name}</b></td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#888;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#888;">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#888;">Guests</td><td>${guests}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#888;">Message</td><td>${message || 'No message'}</td></tr>
        </table>
    `;
    try {
        await transporter.sendMail({
            from: '"Wedding Invitation" <pargunanpargunan2000@gmail.com>',
            to: 'pargunanpargunan2000@gmail.com, nethajiss7@gmail.com',
            subject: `RSVP from ${name} - Nethaji & Ishwarya Wedding`,
            html
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('RSVP server running on port 3000'));
