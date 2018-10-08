const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    id: String,
    name: String,
    date: String,
    content: String,
    type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', DocumentSchema);