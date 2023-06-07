// modules:
const sql = require("mssql")

// env
require('dotenv').config()
const dotenv = require('dotenv');
const path = require("path")
const envPath = path.resolve(__dirname, '.../../.env');
dotenv.config({ path: envPath });

async function allUsers (req, res){
    try{
        await sql.connect({
            user: `${process.env.DB_USERNAME}`,
            password: `${process.env.DB_PASSWORD}`,
            server: `${process.env.DB_URL}`, 
            database: `${process.env.DB_NAME}`,
            encrypt: false 
      })
      const allUsers = await sql.query("SELECT * FROM LoginInfo")
      await sql.close()
      res.status(200).json(allUsers)
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('An error occurred at allUsers:', error);
      throw error;
    }
  }

  module.exports = allUsers