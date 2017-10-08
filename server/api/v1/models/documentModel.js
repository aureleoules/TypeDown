const mongoose = require('mongoose'),
Schema = mongoose.Schema

const DocumentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Document', DocumentSchema);