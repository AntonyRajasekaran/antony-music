const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    releasedate: { type: Date, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    year: {type: Number, required: true }
});

module.exports = mongoose.model('Album', albumSchema);