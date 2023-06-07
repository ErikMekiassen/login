// modules:
const sql = require("mssql")
const getId = require("../../modules/getId")
const verifyAuth = require("../../modules/verifyAuth")
// env
require('dotenv').config()
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '.../../.env');
dotenv.config({ path: envPath });



async function getNotes(req, res){
    try {
      const { email, token } = req.body;
      const validity = await verifyAuth(email, token)
        // Connect to MSSQL database
      await sql.connect({
        user: `${process.env.DB_USERNAME}`,
        password: `${process.env.DB_PASSWORD}`,
        server: `${process.env.DB_URL}`, 
        database: `${process.env.DB_NAME}`,
        encrypt: false
      });
      const id = await getId(email, token)
      if (validity === true) {
        const userId = id; 
        const notesResponse = await sql.query(`SELECT * FROM NotesTest WHERE Id = ${userId}`);
        const Notes = notesResponse.recordset;
        res.status(200).json({
          message: "User exists",
          notes: Notes
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
  
    } catch (err) {
      console.log("An error happend at POST /getNotes", err)
      throw err
    }
  
  }
  module.exports = getNotes