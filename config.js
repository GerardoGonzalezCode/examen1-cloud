const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    URL_TONE: process.env.API_URL,
    APIKEY_TONE: process.env.API_KEY,
    PORT:  8080
}