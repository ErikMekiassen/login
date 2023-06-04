require('dotenv').config()

// routes.js
const router = require('express').Router()
const path = require('path')
const nodemailer = require('nodemailer')

const transport = {
    //this is the authentication for sending email.
host: 'smtp.gmail.com',
port: 465,
secure: true, // use TLS
auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
},
}