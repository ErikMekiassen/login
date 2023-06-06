const jwt = require('jsonwebtoken');
const sql = require('mssql');
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '..//.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });



async function CheckUser(mailAddress) {
  try {
    // Create a new token
    const token = jwt.sign({ email: mailAddress }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });

    // Connect to MSSQL database
    await sql.connect({
        user: `${process.env.DB_USERNAME}`,
        password: `${process.env.DB_PASSWORD}`,
        server: `${process.env.DB_URL}`, 
        database: `${process.env.DB_NAME}`,
        encrypt: false
    });

    // Check if email is used before
    const queryResult = await sql.query`SELECT * FROM LoginInfo WHERE Email = ${mailAddress}`;
    const isEmailUsed = queryResult.recordset.length > 0;

    if (!isEmailUsed) {
      // Insert email and token into the table
      await sql.query`INSERT INTO LoginInfo (Email, Token) VALUES (${mailAddress}, ${token})`;
    }

    // Close the database connection
    await sql.close();
    console.log("token: ", token)
    return token;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('An error occurred:', error);
    throw error;
  }
}
module.exports = CheckUser