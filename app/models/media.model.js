const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    id: String,
    name: String,
    date: String,
    link: String,
    type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);