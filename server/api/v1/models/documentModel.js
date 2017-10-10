const mongoose = require('mongoose'),
Schema = mongoose.Schema

const DocumentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    owner: {
        type: String,
        required: false
    },
    public: {
        type: Boolean,
        required: true,
        default: true
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