const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'din-email@gmail.com', // Din e-postadress
            pass: 'ditt-lösenord'       // Ditt lösenord
        }
    });

    const mailOptions = {
        from: email,
        to: 'silentshouttattoo@gmail.com', // Mottagarens e-postadress
        subject: `Ny förfrågan från ${name}`,
        text: `Namn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nMeddelande: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('E-post skickad!');
    } catch (error) {
        res.status(500).send('Ett fel uppstod vid skickandet av e-post.');
    }
});

app.listen(3000, () => console.log('Servern körs på http://localhost:3000'));
