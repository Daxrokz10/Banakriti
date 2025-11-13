const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: function () { // username can be optional for Google-only signups if you want
            // Allow missing username if OAuth path provides one; adjust as needed
            return !this.googleId;
        }
    },
    email: {
        type: String,
        required: function () { // username can be optional for Google-only signups if you want
            // Allow missing username if OAuth path provides one; adjust as needed
            return !this.googleId;
        }
    },
    password: {
        type: String,
        required: function () {
            // Password is required only for local accounts (no googleId)
            return !this.googleId;
        }
    },
    role: {
        type: String,
        default: "user"
    },
    googleId: {
        type: String,
        // optional; populated when user signs in via Google
    },
    oauthProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    }
}, {
    timestamps: true,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);
module.exports = User;