const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Countdown', countdownSchema);