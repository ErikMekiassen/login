require('dotenv').config()
// routes.js
const express = require('express')
const router = express.Router()

  
// Routes
const deliverMail = require("./routeModules/deliverMail")
const getNotes = require("./routeModules/getNotes")
const addNote = require("./routeModules/addNote")
const allUsers = require("./routeModules/allUsers")

// all routes inside v1
router.get('/deliverMail/:email', deliverMail);
router.post("/getNotes", getNotes)
router.post("/AddNote", addNote)
router.get("/allUsers", allUsers)

module.exports = router;

/*
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


*/