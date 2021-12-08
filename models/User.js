const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatarUrl: {
        type: String,
        trim: true,
        default: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    }
});

module.exports = mongoose.model('Usuario', UserSchema);