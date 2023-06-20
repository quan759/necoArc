const Keyv = require('keyv');
require('dotenv').config();
const db = new Keyv(process.env.MONGODB || 'sqlite://database.sqlite');

module.exports = db;