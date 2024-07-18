const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitedHistory: [{ timestamp: {type: Number}}],
},
{timestamp: true});

const url = mongoose.model('url', urlSchema);

module.exports = url;   

