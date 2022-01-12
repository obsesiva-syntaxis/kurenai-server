const mongoose = require('mongoose');
const moment = require('moment-timezone');
require('moment/locale/es-mx');
moment.locale('Es-mx');

const dateSantiago = moment.tz(moment().format(), 'America/Santiago');

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
        default: dateSantiago.format(),
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