require('dotenv').config()
const sql = require("mssql")
// routes.js
const express = require('express')
const router = express.Router()
const SendVerificationMail = require('../modules/SendVerificationMail')

// env
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '..//.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });


router.get('/deliverMail/:email', (req, res) => {
    const email = req.params.email;
    const token = SendVerificationMail(email)
    .then(() => {
      console.log('Mail sent successfully', process.env.DB_USERNAME);
    })
    .catch((error) => {
      console.error('Error sending mail:', error);
    });
    // Store the email in a variable or perform any other desired actions
    console.log('Received request to deliver mail to:', email);
    
    // Send a response
    console.log("token .get: ", token)
    res.send(`Email received: ${email} and token: ${token}`);
});
router.post("/getNotes", async function(req, res){
  try {
    const { email, token } = req.body;
      // Connect to MSSQL database
    await sql.connect({
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      server: `${process.env.DB_URL}`, 
      database: `${process.env.DB_NAME}`,
      encrypt: false
    });
    const answer = await sql.query(`SELECT * FROM LoginInfo WHERE Email = '${email}' AND Token = '${token}'`);
    if (answer.recordset.length > 0) {
      // User with matching email and token exists
      // Perform necessary actions here
      
      res.status(200).json({ message: "User exists" });
    } else {
      // User with matching email and token does not exist
      // Handle the case here

      res.status(404).json({ message: "User not found" });
    }

  } catch (err) {
    console.log("An error happend at POST /getNotes", err)
    throw err
  }

})
router.get("/allUsers", async function(){
  try{
      sql.connect({
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      server: `${process.env.DB_URL}`, 
      database: `${process.env.DB_NAME}`,
      encrypt: false 
    })
    const allUsers = await sql.query("SELECT * FROM LoginInfo")
    await sql.close()
    return allUsers
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('An error occurred:', error);
    throw error;
  }
})

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