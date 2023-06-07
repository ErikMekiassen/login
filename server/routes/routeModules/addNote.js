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

async function addNote(req, res) {
    try {
        const { email, token, noteHeader, note } = req.body;
        const validity = await verifyAuth(email, token)
        const Id = await getId(email, token)
        await sql.connect({
            user: `${process.env.DB_USERNAME}`,
            password: `${process.env.DB_PASSWORD}`,
            server: `${process.env.DB_URL}`, 
            database: `${process.env.DB_NAME}`,
            encrypt: false
          });
          if (validity === true) {
            const sent = await sql.query(`INSERT INTO [login].dbo.NotesTest (Id, noteHeader, note) VALUES (${Id}, '${noteHeader}', '${note}');`)
            res.send("succesfully added to your notes :)")
          } else {
            res.send("permission denied")
          }
          
        
    } catch (err) {
        console.log(`Eror at addNote: ${err}`);
        res.send("Error in addNote, Error occured")
    }
}

module.exports = addNote