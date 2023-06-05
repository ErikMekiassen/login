
const routes = require('./routes/routes.js')
const SendVerificationMail = require('./modules/SendVerificationMail'); 
const cors = require('cors');
const express = require("express")
const app = express()
// find den eksakte veien til .env 
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '..//.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });
app.use(cors());
app.use('/v1', routes);
app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on port ${process.env.SERVER_PORT}`);
    console.log(`${envPath}`);
})