
var config = {}

config.db = {};

config.db.host = process.env.DB_HOST || 'localhost';
config.db.port = process.env.DB_PORT || 27017;
config.db.database = process.env.DB_NAME || 'UA_NFC';

module.exports = config;