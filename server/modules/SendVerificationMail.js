/* eslint no-console: 0 */

'use strict';
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '..//.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });
async function SendVerificationMail(mailAddress) {
    // SMTP transportør objekt
    //// Meta informasjon
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        sendMail: true,
        newline: 'windows',
        logger: false,
         
        auth: {
            user: process.env.GMAIL_ADRESS,
            pass: process.env.GMAIL_PASSWORD,
        },
      });
      // Melding Objekt
    var message = {
        from: `${process.env.GMAIL_ADRESS}`,
        to: `${mailAddress}`,
        subject: "Hello Stranger",
        text: 'hei.com',
        html: `
            <h1>Welcome to my log in page!</h1>
            <p><a href=${"hei.com"}>Log in</a></p>
            `
        };


    let info = await transporter.sendMail(message);
    console.log('Message sent successfully as %s', info.messageId);
}

module.exports = SendVerificationMail;