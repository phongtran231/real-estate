import path from "path";

require('dotenv').config();

module.exports = {
	server: {
		port: process.env.APP_PORT || 8000,
		secret_key: process.env.SECRET_KEY,
		default_locale: process.env.DEFAULT_LOCALE
	},
	database: {
		host: process.env.DB_HOST || 'mongodb://localhost:27017',
		db_name: process.env.DB_NAME || 'real_estate',
	},
}