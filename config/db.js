const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Database connection error:', err);
});

module.exports = db;