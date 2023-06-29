const Keyv = require('keyv');
const Database = require('@replit/database');
require('dotenv').config();
const db = new Keyv(process.env.MONGODB || 'sqlite://database.sqlite');
const rdb = new Database()

module.exports = db;
module.exports = rdb;