const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customAlias: { type: String, unique: true },
    expirationDate: { type: Date },
    password: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clickCount: { type: Number, default: 0 },
    maxClicks: { type: Number },
});

module.exports = mongoose.model('Url', urlSchema);