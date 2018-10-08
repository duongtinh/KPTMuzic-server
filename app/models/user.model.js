const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: String,
    fullName: String,
    userName: String,
    passWord: String,
    status: String,
    address: String,
    phone: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);