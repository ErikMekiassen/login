require('dotenv').config()



// modules:
const SendVerificationMail = require('../../modules/SendVerificationMail')

// env
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '.../../.env');
dotenv.config({ path: envPath });



function deliverMail(req, res) {
    const email = req.params.email;
    const token = SendVerificationMail(email)
    .then(() => {
      console.log('Mail sent successfullyyyyyyy: ', process.env.DB_USERNAME);
    })
    .catch((error) => {
      console.error('Error sending mail at deliverMail:', error);
    });
    // Store the email in a variable or perform any other desired actions
    console.log('Received request to deliver mail to:', email);
    
    // Send a response
    console.log("token .get: ", token)
    res.send(`Email received: ${email} and token: ${token}`);
}

module.exports = deliverMail