/*
'use server';
// find den eksakte veien til .env 
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.../.env');
// set opp dotenv til å finne veien til .env
dotenv.config({ path: envPath });

const envJS = {
    "GMAIL_ADRESS": process.env.GMAIL_ADRESS,
    "GMAIL_PASSWORD": process.env.GMAIL_PASSWORD,
    "URL": process.env.URL,
    "SERVER_PORT": process.env.SERVER_PORT,
    "URL_TO_BACKEND": "http://localhost:8080"
}
export default envJS

/*
GMAIL_ADRESS=server.emvit@gmail.com
GMAIL_PASSWORD=Umio13OLF5s
URL=localhost
SERVER_PORT=8080
URL_TO_BACKEND=localhost:8080

*/