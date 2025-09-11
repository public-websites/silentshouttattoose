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

    // Kontrollera vilken typ av förfrågan det är
    const isArtRequest = req.body.type === 'art';
    
    const mailOptions = {
        from: email,
        to: isArtRequest ? 'konst@silentshouttattoo.se' : 'tatuering@silentshouttattoo.se', // Mottagarens e-postadress beroende på typ
        subject: `Ny ${isArtRequest ? 'konst' : 'tatuerings'}förfrågan från ${name}`,
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
