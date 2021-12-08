const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    postDate: {
        type: Date,
        default: new Date(),
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
});

module.exports = mongoose.model('Post', PostSchema);