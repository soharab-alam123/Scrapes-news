const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    hnId: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
