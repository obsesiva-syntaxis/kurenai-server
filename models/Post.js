const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/es-mx');
moment.locale('Es-mx');

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
        default: moment().format(),
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