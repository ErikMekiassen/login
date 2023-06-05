require('dotenv').config()

// routes.js
const express = require('express')
const router = express.Router()
const SendVerificationMail = require('../modules/SendVerificationMail')

router.get('/deliverMail/:email', (req, res) => {
    const email = req.params.email;
    SendVerificationMail(email)
    .then(() => {
      console.log('Mail sent successfully');
    })
    .catch((error) => {
      console.error('Error sending mail:', error);
    });
    // Store the email in a variable or perform any other desired actions
    console.log('Received request to deliver mail to:', email);
    
    // Send a response
    res.send(`Email received: ${email}`);
});

  /*
  SendVerificationMail()
  .then(() => {
    console.log('Mail sent successfully');
  })
  .catch((error) => {
    console.error('Error sending mail:', error);
  });
  */

module.exports = router;