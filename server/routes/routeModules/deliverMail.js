require('dotenv').config()



// modules:
const SendVerificationMail = require('../../modules/SendVerificationMail')

// env
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '.../../.env');
dotenv.config({ path: envPath });



async function deliverMail(req, res) {
    try {
      const email = req.params.email;
      const token = await SendVerificationMail(email);
      console.log('Received request to deliver mail to:', email);
      res.send(`Email received too : ${email}`);
    } catch (error) {
      console.error('Error sending mail at deliverMail:', error);
      res.status(500).json({ message: "Error delivering mail" });
    }
  }
  

module.exports = deliverMail