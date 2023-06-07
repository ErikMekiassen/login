/* eslint no-console: 0 */
'use strict';
const CheckUser = require("./CheckUser")
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const { log } = require("console");
const envPath = path.resolve(__dirname, '..//.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });


async function SendVerificationMail(mailAddress) {
    const token = await CheckUser(mailAddress)
    // SMTP transportør objekt
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
            <p><a href=${`localhost:3000/home/${token}`}>Log in: ${token}</a></p>
            `
        };

    let info = await transporter.sendMail(message);
    console.log('Message sent successfully as %s', info.messageId);
    console.log("token from sendverificationMail: ", token);
    return token
}

module.exports = SendVerificationMail;