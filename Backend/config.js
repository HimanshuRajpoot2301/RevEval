require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientURL: process.env.CLIENT_URL,
    restCountriesAPI: process.env.REST_COUNTRIES_API,
    flagsAPI: process.env.FLAGS_API,
    countryCodesAPI: process.env.COUNTRY_CODES_API,
};
